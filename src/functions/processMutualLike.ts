import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { receiverId, action = "like" } = await req.json();

    // ✅ תיקון 1: בדיקת receiverId
    if (!receiverId) {
      return Response.json({ error: 'Missing receiverId' }, { status: 400 });
    }

    const currentUserId = user.id;

    // ✅ תיקון 2: בדיקה שהמשתמש לא נותן לייק לעצמו
    if (receiverId === currentUserId) {
      return Response.json({ error: 'Cannot like yourself' }, { status: 400 });
    }

    // ✅ תיקון 3: validation לערך action
    const validActions = ['like', 'pass', 'challenge'];
    if (!validActions.includes(action)) {
      return Response.json({ error: 'Invalid action. Must be: like, pass, or challenge' }, { status: 400 });
    }

    // ✅ תיקון 4: בדיקה אם כבר קיים לייק מהמשתמש הנוכחי למקבל
    const existingLikes = await base44.asServiceRole.entities.Like.filter({
      sender_id: currentUserId,
      receiver_id: receiverId
    });

    // אם כבר יש לייק/pass/challenge קיים - לא ליצור חדש
    if (existingLikes && existingLikes.length > 0) {
      const existingLike = existingLikes[0];

      // אם הפעולה הקיימת זהה לחדשה - להחזיר את הקיים
      if (existingLike.action === action) {
        return Response.json({
          success: true,
          is_mutual: existingLike.is_mutual,
          like: existingLike,
          message: 'Like already exists'
        });
      }

      // אם המשתמש רוצה לשנות את הפעולה (למשל מ-pass ל-like)
      // נעדכן את הרשומה הקיימת במקום ליצור חדשה
      const updatedLike = await base44.asServiceRole.entities.Like.update(existingLike.id, {
        action: action,
        is_mutual: false // נאפס את ה-mutual ונבדוק מחדש
      });

      // אם הפעולה החדשה היא pass - לא צריך לבדוק התאמה
      if (action === 'pass') {
        return Response.json({
          success: true,
          is_mutual: false,
          like: updatedLike,
          message: 'Updated to pass'
        });
      }

      // נמשיך לבדוק התאמה עם הלייק המעודכן
      return await checkAndCreateMatch(base44, currentUserId, receiverId, updatedLike);
    }

    // יצירת לייק חדש (רק אם לא קיים)
    const newLike = await base44.entities.Like.create({
      sender_id: currentUserId,
      receiver_id: receiverId,
      action: action,
      is_mutual: false
    });

    // אם הפעולה היא pass - לא צריך לבדוק התאמה
    if (action === 'pass') {
      return Response.json({
        success: true,
        is_mutual: false,
        like: newLike
      });
    }

    // בדיקת התאמה
    return await checkAndCreateMatch(base44, currentUserId, receiverId, newLike);

  } catch (error) {
    console.error("Error in processMutualLike:", error);
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
});

// ✅ פונקציה נפרדת לבדיקת התאמה - קוד נקי יותר
async function checkAndCreateMatch(base44: any, currentUserId: string, receiverId: string, currentLike: any) {
  try {
    // בדיקת לייקים הפוכים
    const reverseLikes = await base44.asServiceRole.entities.Like.filter({
      sender_id: receiverId,
      receiver_id: currentUserId
    });

    const oppositeLike = reverseLikes.find((l: any) => l.action === 'like' || l.action === 'challenge');
    const hasReceiverPassed = reverseLikes.some((l: any) => l.action === 'pass');

    // אם המקבל עשה pass - אין התאמה
    if (hasReceiverPassed) {
      return Response.json({
        success: true,
        is_mutual: false,
        like: currentLike,
        message: 'Receiver previously passed'
      });
    }

    // אם אין לייק הפוך - אין התאמה (עדיין)
    if (!oppositeLike) {
      return Response.json({
        success: true,
        is_mutual: false,
        like: currentLike
      });
    }

    // יש התאמה! 🎉
    // חיפוש התאמה קיימת (גם archived)
    const allMatches = await base44.asServiceRole.entities.Match.list('-created_date', 200);
    let match = allMatches.find((m: any) =>
      (m.user1_id === currentUserId && m.user2_id === receiverId) ||
      (m.user1_id === receiverId && m.user2_id === currentUserId)
    );

    if (match) {
      // אם ההתאמה במצב archived, נפעיל אותה מחדש
      if (match.status === "archived") {
        match = await base44.asServiceRole.entities.Match.update(match.id, {
          status: "active",
          proposal_status: "none",
          proposed_date: null,
          proposed_time: null,
          proposed_court: null,
          proposed_court_id: null,
          proposed_by: null,
          proposal_notes: null
        });
      }
    } else {
      // יצירת התאמה חדשה רק אם לא קיימת כלל
      match = await base44.asServiceRole.entities.Match.create({
        user1_id: currentUserId,
        user2_id: receiverId,
        status: "active",
        proposal_status: "none"
      });
    }

    // עדכון שני הלייקים להיות mutual
    await Promise.all([
      base44.asServiceRole.entities.Like.update(currentLike.id, {
        is_mutual: true,
        match_id: match.id
      }),
      base44.asServiceRole.entities.Like.update(oppositeLike.id, {
        is_mutual: true,
        match_id: match.id
      })
    ]);

    // יצירת הודעת מערכת
    await base44.asServiceRole.entities.Message.create({
      match_id: match.id,
      sender_id: "SYSTEM",
      content: "🎾 יש לכם התאמה! קבעו מועד למשחק בצ'אט.",
      read: false
    });

    // שליחת התראה למקבל
    await sendMatchNotification(base44, currentUserId, receiverId, match.id);

    return Response.json({
      success: true,
      is_mutual: true,
      match_id: match.id,
      match: match
    });

  } catch (error) {
    console.error("Error in checkAndCreateMatch:", error);
    throw error;
  }
}

// ✅ פונקציה נפרדת להתראות
async function sendMatchNotification(base44: any, senderId: string, receiverId: string, matchId: string) {
  try {
    const [receiverData, senderData] = await Promise.all([
      base44.asServiceRole.entities.User.filter({ id: receiverId }),
      base44.asServiceRole.entities.User.filter({ id: senderId })
    ]);

    if (receiverData[0] && senderData[0]) {
      const senderDisplayName = senderData[0].first_name && senderData[0].last_name
        ? `${senderData[0].first_name} ${senderData[0].last_name}`
        : senderData[0].full_name || 'משתמש';

      await base44.asServiceRole.entities.Notification.create({
        user_id: receiverId,
        type: "match_created",
        title: "יש התאמה! 🎉",
        message: `יש לך התאמה עם ${senderDisplayName}! פתח צ'אט וקבעו מועד למשחק`,
        related_entity_id: matchId,
        related_entity_type: "Match",
        action_url: "Chats",
        other_user_id: senderId,
        other_user_name: senderDisplayName,
        other_user_image: senderData[0].profile_image,
        is_read: false
      });
    }
  } catch (error) {
    console.error("Error sending notification:", error);
    // לא זורקים שגיאה - ההתראה היא לא קריטית
  }
}
