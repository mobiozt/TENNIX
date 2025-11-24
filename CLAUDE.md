# CLAUDE.md - AI Assistant Guide for TENNIX

> This file provides context and guidelines for AI assistants working on the TENNIX project.

## Project Overview

**Repository:** TENNIX
**Status:** Pre-initialization (Empty Project)
**Last Updated:** 2025-11-24

TENNIX is a newly created repository awaiting project initialization. Currently, only this CLAUDE.md file exists. This document serves as both a guide for AI assistants and a blueprint for the planned project structure.

---

## Current State

```
TENNIX/
└── CLAUDE.md           # AI assistant guidelines (this file)
```

**What exists:** Only this documentation file.
**What's needed:** Project initialization (see Initialization Checklist below).

---

## Planned Repository Structure

Once initialized, the project should follow this structure:

```
TENNIX/
├── CLAUDE.md           # AI assistant guidelines (this file)
├── README.md           # Project documentation
├── package.json        # Node.js dependencies
├── package-lock.json   # Dependency lock file
├── tsconfig.json       # TypeScript configuration
├── .eslintrc.js        # ESLint configuration
├── .prettierrc         # Prettier configuration
├── .gitignore          # Git ignore rules
├── .env.example        # Environment variable template
├── src/                # Source code directory
│   ├── index.ts        # Main entry point
│   ├── components/     # UI components (if applicable)
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript type definitions
│   └── services/       # Business logic and API services
├── tests/              # Test files
│   └── *.test.ts       # Test specifications
├── docs/               # Additional documentation
└── .github/            # GitHub workflows and templates
    └── workflows/      # CI/CD pipeline definitions
```

---

## Initialization Checklist

Before development can begin, complete these setup tasks:

### Required Setup
- [ ] Create `package.json` with project metadata and scripts
- [ ] Create `tsconfig.json` with strict TypeScript configuration
- [ ] Create `.gitignore` for Node.js projects
- [ ] Create `README.md` with project description
- [ ] Create `src/` directory with `index.ts` entry point

### Recommended Setup
- [ ] Configure ESLint (`.eslintrc.js`) for code linting
- [ ] Configure Prettier (`.prettierrc`) for code formatting
- [ ] Set up testing framework (Jest or Vitest)
- [ ] Create `.env.example` for environment variable documentation
- [ ] Set up GitHub Actions for CI/CD (`.github/workflows/`)

### Sample Initialization Commands
```bash
# Initialize package.json
npm init -y

# Install TypeScript and dev dependencies
npm install --save-dev typescript @types/node ts-node

# Initialize TypeScript configuration
npx tsc --init

# Install testing framework (choose one)
npm install --save-dev vitest        # Vitest (recommended for modern projects)
npm install --save-dev jest ts-jest @types/jest  # Jest

# Install linting and formatting
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install --save-dev prettier eslint-config-prettier
```

---

## Development Workflow

### Getting Started (After Initialization)

```bash
# Clone the repository
git clone <repository-url>
cd TENNIX

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Lint code
npm run lint

# Format code
npm run format
```

### Branch Naming Convention

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/<description>` - New features (e.g., `feature/user-auth`)
- `fix/<description>` - Bug fixes (e.g., `fix/login-timeout`)
- `claude/<session-id>` - AI assistant working branches
- `docs/<description>` - Documentation updates

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style (formatting, whitespace) |
| `refactor` | Code refactoring (no feature/fix) |
| `test` | Adding or updating tests |
| `chore` | Maintenance tasks |
| `perf` | Performance improvements |
| `ci` | CI/CD changes |

**Examples:**
```bash
feat(auth): add user authentication flow
fix(api): resolve timeout issue in fetch requests
docs: update README with installation instructions
test(utils): add unit tests for date formatting
chore: update dependencies to latest versions
```

---

## Code Conventions

### TypeScript Guidelines

1. **Use strict TypeScript** - Enable `"strict": true` in tsconfig.json
2. **Explicit types** - Always annotate function parameters and return types
3. **Avoid `any`** - Use `unknown`, generics, or proper types instead
4. **Interface over type** - Use interfaces for object shapes, types for unions/aliases
5. **Readonly by default** - Use `readonly` for properties that shouldn't change

```typescript
// Good - explicit types, interface for objects
interface User {
  readonly id: string;
  name: string;
  email: string;
  createdAt: Date;
}

function getUser(id: string): Promise<User | null> {
  // implementation
}

async function processUsers(users: readonly User[]): Promise<void> {
  // implementation
}

// Avoid - any types, implicit returns
function getUser(id: any): any {
  // implementation
}
```

### File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `UserProfile.tsx` |
| Utilities | camelCase | `formatDate.ts` |
| Types | PascalCase + `.types.ts` | `User.types.ts` |
| Tests | Same name + `.test.ts` | `formatDate.test.ts` |
| Constants | camelCase file, SCREAMING_SNAKE values | `config.ts` with `API_URL` |
| Hooks | camelCase with `use` prefix | `useAuth.ts` |

### Import Order

Organize imports in this order, separated by blank lines:

```typescript
// 1. Node.js built-ins
import path from 'path';
import fs from 'fs';

// 2. External dependencies (npm packages)
import express from 'express';
import { z } from 'zod';

// 3. Internal absolute imports (@/ alias)
import { apiClient } from '@/services/api';
import { logger } from '@/utils/logger';

// 4. Relative imports
import { formatDate } from '../utils/formatDate';
import { Button } from './Button';

// 5. Type-only imports
import type { User } from '@/types/User';
import type { Request, Response } from 'express';
```

### Error Handling

```typescript
// Use custom error classes for domain errors
class ValidationError extends Error {
  constructor(message: string, public readonly field: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Handle errors explicitly, don't swallow them
async function fetchUser(id: string): Promise<User> {
  try {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw new ValidationError(`User not found: ${id}`, 'id');
    }
    throw error; // Re-throw unexpected errors
  }
}
```

---

## Testing Guidelines

### Recommended Framework

**Vitest** is recommended for new TypeScript projects due to:
- Native ESM support
- Fast execution
- Jest-compatible API
- Built-in TypeScript support

### Test Structure

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('UserService', () => {
  describe('getUser', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should return user when valid ID is provided', async () => {
      // Arrange
      const userId = 'user-123';
      const expectedUser = { id: userId, name: 'John' };

      // Act
      const result = await userService.getUser(userId);

      // Assert
      expect(result).toEqual(expectedUser);
    });

    it('should throw ValidationError when user not found', async () => {
      // Arrange
      const invalidId = 'nonexistent';

      // Act & Assert
      await expect(userService.getUser(invalidId))
        .rejects.toThrow(ValidationError);
    });
  });
});
```

### Testing Best Practices

1. **Test behavior, not implementation** - Focus on inputs and outputs
2. **Descriptive test names** - Should read like documentation
3. **One logical assertion per test** - Easier to identify failures
4. **Mock external dependencies** - Database, APIs, file system
5. **Maintain test isolation** - Tests shouldn't depend on each other
6. **Use factories for test data** - Avoid repetitive object creation

### Test File Organization

```
tests/
├── unit/               # Unit tests (isolated functions/classes)
│   └── utils/
│       └── formatDate.test.ts
├── integration/        # Integration tests (multiple components)
│   └── api/
│       └── userRoutes.test.ts
└── e2e/               # End-to-end tests (full system)
    └── auth.e2e.test.ts
```

---

## AI Assistant Guidelines

### Do's

- **Read before modifying** - Always read existing code before making changes
- **Follow existing patterns** - Match the coding style already in use
- **Keep changes minimal** - Only modify what's necessary for the task
- **Test your changes** - Run tests after making modifications
- **Update documentation** - Keep CLAUDE.md and other docs current
- **Commit frequently** - Make atomic commits with clear messages
- **Handle errors properly** - Don't swallow errors or leave empty catch blocks
- **Use TypeScript strictly** - Leverage the type system fully

### Don'ts

- **Don't over-engineer** - Keep solutions simple and focused
- **Don't add unnecessary features** - Stick to what's requested
- **Don't ignore errors** - Address all linting/type errors
- **Don't leave debug code** - Remove console.logs and commented code
- **Don't create duplicate files** - Check for existing implementations first
- **Don't use `any`** - Find the correct type or use `unknown`
- **Don't skip tests** - Add tests for new functionality

### When Uncertain

1. Check existing code for similar patterns
2. Read relevant documentation
3. Ask for clarification if the task is ambiguous
4. Document assumptions in commit messages
5. Prefer explicit over implicit behavior

### Priority Order

When multiple approaches exist, prefer:
1. **Correctness** over speed
2. **Readability** over cleverness
3. **Simplicity** over flexibility
4. **Explicit** over implicit
5. **Tested** over untested

---

## Common Commands Reference

### Development (After Setup)
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Run production build
npm run lint         # Run linter
npm run lint:fix     # Fix linting issues automatically
npm run format       # Format code with Prettier
npm run typecheck    # Run TypeScript type checking
```

### Testing
```bash
npm test             # Run all tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
npm run test:ui      # Open Vitest UI (if configured)
```

### Git Operations
```bash
git status                    # Check working tree status
git diff                      # View unstaged changes
git diff --staged             # View staged changes
git log --oneline -10         # View recent commits
git branch -a                 # List all branches
git fetch origin              # Fetch remote changes
git pull origin <branch>      # Pull specific branch
```

---

## Environment Setup

### Required Tools

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 20.x LTS | JavaScript runtime |
| npm | 10.x | Package manager |
| Git | 2.x | Version control |

### Recommended VS Code Extensions

- `dbaeumer.vscode-eslint` - ESLint integration
- `esbenp.prettier-vscode` - Prettier formatting
- `bradlc.vscode-tailwindcss` - Tailwind CSS (if used)
- `ms-vscode.vscode-typescript-next` - Latest TypeScript features

### Environment Variables

Create a `.env` file for local development (never commit this file):

```env
# Application
NODE_ENV=development
PORT=3000

# Database (if applicable)
DATABASE_URL=postgresql://localhost:5432/tennix

# External APIs (if applicable)
API_KEY=your-api-key-here

# Add project-specific variables as needed
```

Always create a `.env.example` with placeholder values for documentation.

---

## Troubleshooting

### Common Issues

**1. Dependencies not installing**
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**2. TypeScript errors after pulling**
```bash
npm run typecheck
# If persistent:
rm -rf node_modules/.cache
npm run build
```

**3. Tests failing unexpectedly**
```bash
npm run test -- --clearCache
npm run test -- --run  # Run without watch mode
```

**4. Port already in use**
```bash
# Find process using port
lsof -i :3000
# Kill process
kill -9 <PID>
```

**5. ESLint/Prettier conflicts**
```bash
npm run lint:fix
npm run format
```

---

## Project-Specific Notes

*This section will be updated as the project develops:*

### Architecture Decisions
- *To be documented*

### Key Dependencies
- *To be documented*

### Known Issues
- *None yet*

### External Integrations
- *To be documented*

### Deployment
- *To be documented*

---

## Changelog

| Date | Changes |
|------|---------|
| 2025-11-24 | Updated CLAUDE.md with accurate current state, initialization checklist, and expanded guidelines |
| 2025-11-24 | Initial CLAUDE.md creation |

---

*This document should be updated whenever significant changes are made to the project structure, conventions, or workflows.*
