# CLAUDE.md - AI Assistant Guide for TENNIX

> This file provides context and guidelines for AI assistants working on the TENNIX project.

## Project Overview

**Repository:** TENNIX
**Status:** New/Initializing
**Last Updated:** 2025-11-24

TENNIX is a newly created repository. This CLAUDE.md file establishes foundational guidelines and should be updated as the project evolves.

---

## Repository Structure

```
TENNIX/
├── CLAUDE.md           # AI assistant guidelines (this file)
├── README.md           # Project documentation (to be created)
├── package.json        # Node.js dependencies (to be created)
├── tsconfig.json       # TypeScript configuration (to be created)
├── src/                # Source code directory (to be created)
│   ├── index.ts        # Main entry point
│   ├── components/     # UI components (if applicable)
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript type definitions
│   └── services/       # Business logic and API services
├── tests/              # Test files (to be created)
├── docs/               # Documentation (to be created)
└── .github/            # GitHub workflows and templates (to be created)
```

*Note: Update this structure as the project develops.*

---

## Development Workflow

### Getting Started

```bash
# Clone the repository
git clone <repository-url>
cd TENNIX

# Install dependencies (once package.json exists)
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Branch Naming Convention

- `main` or `master` - Production-ready code
- `develop` - Integration branch for features
- `feature/<description>` - New features
- `fix/<description>` - Bug fixes
- `claude/<session-id>` - AI assistant working branches

### Commit Message Format

Follow conventional commits:
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

**Examples:**
```
feat(auth): add user authentication flow
fix(api): resolve timeout issue in fetch requests
docs: update README with installation instructions
```

---

## Code Conventions

### TypeScript Guidelines

1. **Use strict TypeScript** - Enable strict mode in tsconfig.json
2. **Explicit types** - Prefer explicit type annotations for function parameters and return types
3. **Avoid `any`** - Use `unknown` or proper types instead
4. **Interface over type** - Use interfaces for object shapes, types for unions/aliases

```typescript
// Good
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): Promise<User> {
  // implementation
}

// Avoid
function getUser(id: any): any {
  // implementation
}
```

### File Naming

- **Components:** PascalCase (e.g., `UserProfile.tsx`)
- **Utilities:** camelCase (e.g., `formatDate.ts`)
- **Types:** PascalCase with `.types.ts` suffix (e.g., `User.types.ts`)
- **Tests:** Same name with `.test.ts` suffix (e.g., `formatDate.test.ts`)
- **Constants:** SCREAMING_SNAKE_CASE for values, camelCase for files

### Import Order

1. External dependencies (npm packages)
2. Internal absolute imports
3. Relative imports
4. Type imports

```typescript
// External
import React from 'react';
import { useState } from 'react';

// Internal absolute
import { apiClient } from '@/services/api';

// Relative
import { formatDate } from '../utils/formatDate';

// Types
import type { User } from '@/types/User';
```

---

## Testing Guidelines

### Test Structure

```typescript
describe('ComponentName', () => {
  describe('methodName', () => {
    it('should do expected behavior when given specific input', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

### Testing Best Practices

1. **Test behavior, not implementation**
2. **One assertion per test** (when practical)
3. **Use descriptive test names**
4. **Mock external dependencies**
5. **Maintain test isolation**

---

## AI Assistant Guidelines

### Do's

- **Read before modifying** - Always read existing code before making changes
- **Follow existing patterns** - Match the coding style already in use
- **Keep changes minimal** - Only modify what's necessary for the task
- **Test your changes** - Run tests after making modifications
- **Update documentation** - Keep CLAUDE.md and other docs current
- **Commit frequently** - Make atomic commits with clear messages

### Don'ts

- **Don't over-engineer** - Keep solutions simple and focused
- **Don't add unnecessary features** - Stick to what's requested
- **Don't ignore errors** - Address all linting/type errors
- **Don't leave debug code** - Remove console.logs and commented code
- **Don't create duplicate files** - Check for existing implementations first

### When Uncertain

1. Check existing code for similar patterns
2. Read relevant documentation
3. Ask for clarification if the task is ambiguous
4. Document assumptions in commit messages

---

## Common Commands Reference

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run linter
npm run lint:fix     # Fix linting issues
npm run format       # Format code with Prettier

# Testing
npm test             # Run all tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage

# Git
git status           # Check working tree status
git diff             # View unstaged changes
git log --oneline -10 # View recent commits
```

---

## Environment Setup

### Required Tools

- Node.js (LTS version recommended)
- npm or yarn
- Git

### Environment Variables

Create a `.env` file for local development (never commit this file):

```env
# Example environment variables
NODE_ENV=development
API_URL=http://localhost:3000
# Add project-specific variables as needed
```

---

## Troubleshooting

### Common Issues

1. **Dependencies not installing**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **TypeScript errors after pulling**
   ```bash
   npm run build --clean
   ```

3. **Tests failing unexpectedly**
   ```bash
   npm run test -- --clearCache
   ```

---

## Project-Specific Notes

*Add project-specific information here as the project develops:*

- Key architectural decisions
- Important dependencies and their purposes
- Known issues or limitations
- External service integrations
- Deployment procedures

---

## Changelog

| Date | Changes |
|------|---------|
| 2025-11-24 | Initial CLAUDE.md creation |

---

*This document should be updated whenever significant changes are made to the project structure, conventions, or workflows.*
