# TENNIX Setup Guide

## Project Initialization Complete ✓

Your TENNIX application is now fully configured and connected to Supabase!

## What's Been Set Up

### 1. **Project Structure**
- React + TypeScript + Vite for fast development
- Organized file structure with components, services, types, and styles
- Configured for path aliases (`@/` points to `src/`)

### 2. **Supabase Connection**
- ✓ Authentication service configured
- ✓ Database profiles table created with RLS policies
- ✓ Environment variables loaded from `.env`

### 3. **Authentication Flow**
- User registration (`/signup`)
- User login (`/login`)
- Protected dashboard (`/dashboard`)
- Automatic session management
- Sign out functionality

### 4. **Database Security**
- Row Level Security (RLS) enabled on all tables
- User data isolation - each user can only access their own data
- Proper foreign key relationships with auth.users

## Running Your Application

### First Time Setup
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` and you'll see:
- Login page at `/login`
- Sign up page at `/signup`
- Protected dashboard at `/dashboard` (after authentication)

### Build for Production
```bash
npm run build
```

## Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code style |
| `npm run lint:fix` | Fix linting issues |
| `npm run format` | Format code with Prettier |
| `npm run test` | Run tests |
| `npm run test:watch` | Watch mode for tests |
| `npm run test:coverage` | Generate coverage report |

## Environment Variables

The following variables are already configured in `.env`:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

These are loaded automatically - no additional setup needed!

## Database Schema

### profiles table
Stores user profile information linked to Supabase auth.users:
- `id` (uuid) - Primary key
- `user_id` (uuid) - References auth.users.id
- `email` (text) - User's email
- `created_at` (timestamptz) - Profile creation date
- `updated_at` (timestamptz) - Last update date

**Security**: Only authenticated users can access their own profile data.

## Next Steps

1. **Test Authentication**:
   - Sign up a new account at `/signup`
   - Login at `/login`
   - Verify the dashboard displays your user info

2. **Customize Dashboard**:
   - Edit `/src/pages/Dashboard.tsx` to add your features
   - Add more pages in `/src/pages/`
   - Create components in `/src/components/`

3. **Add Database Tables**:
   - Create new tables via Supabase migrations
   - Update TypeScript types in `/src/types/`
   - Create services in `/src/services/`

4. **Deploy**:
   - Build the project: `npm run build`
   - Deploy the `dist/` folder to your hosting provider

## Important Notes

- **Never commit `.env`** - It contains sensitive API keys
- **RLS is enabled** - Database access is automatically restricted by user
- **Authentication state** - Automatically managed by AuthContext provider
- **Type safety** - TypeScript strict mode is enabled for better code quality

## Troubleshooting

### Port already in use
If port 5173 is already in use:
```bash
npm run dev -- --port 3000
```

### Build errors
Clear cache and rebuild:
```bash
rm -rf node_modules dist
npm install
npm run build
```

### Authentication not working
1. Verify `.env` has correct Supabase credentials
2. Check browser console for error messages
3. Ensure Supabase Auth is enabled in your project settings

## Support

For more information:
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev)
- [Supabase Documentation](https://supabase.com/docs)
