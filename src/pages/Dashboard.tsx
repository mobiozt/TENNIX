import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (err) {
      console.error('Sign out failed:', err);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>TENNIX Dashboard</h1>
        <div className="header-right">
          <span className="user-email">{user?.email}</span>
          <button onClick={handleSignOut} className="btn btn-secondary">
            Sign Out
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="welcome-section">
          <h2>Welcome to TENNIX</h2>
          <p>You're successfully connected to Supabase!</p>
          <div className="info-box">
            <h3>Connected User</h3>
            <p>ID: {user?.id}</p>
            <p>Email: {user?.email}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
