# TENNIX

A modern web application built with React, TypeScript, Vite, and Supabase for real-time data management and authentication.

## Features

- **User Authentication**: Secure email/password authentication with Supabase
- **Modern UI**: Clean and responsive design with CSS
- **Type Safety**: Full TypeScript support for enhanced development experience
- **Real-time Database**: Supabase for scalable backend

## Prerequisites

- Node.js (LTS version recommended)
- npm or yarn

## Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
# Build for production
npm run build
```

### Testing

```bash
# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

## Project Structure

```
src/
├── components/      # Reusable UI components
├── context/        # React Context for state management
├── pages/          # Page components
├── services/       # API and external services
├── styles/         # CSS stylesheets
├── types/          # TypeScript type definitions
├── App.tsx         # Main application component
└── index.tsx       # Application entry point
```

## Environment Variables

Create a `.env` file with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Authentication

The application uses Supabase Auth with email/password authentication. User sessions are managed automatically through the AuthContext provider.

### Pages

- `/login` - User login page
- `/signup` - New user registration
- `/dashboard` - Protected dashboard (requires authentication)

## Code Style

The project uses:
- **ESLint** for code linting
- **Prettier** for code formatting

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## Contributing

Follow the conventional commits format for commit messages:

```
<type>(<scope>): <description>
```

**Types**: feat, fix, docs, style, refactor, test, chore

## License

Private project
