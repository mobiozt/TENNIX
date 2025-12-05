# CLAUDE.md - AI Assistant Guide for TENNIX

> This file provides context and guidelines for AI assistants working on the TENNIX project.

## Project Overview

**Repository:** mobiozt/TENNIX
**Status:** Initialization Phase - Empty Repository
**Last Updated:** 2025-12-05
**Current Branch:** `claude/claude-md-mit6njmkopau6u2i-012hEkd7QxtrRFdsmcqxrhKy`

TENNIX is a newly initialized repository currently containing only this CLAUDE.md guidance file. This document establishes foundational guidelines and conventions for AI assistants and developers to follow as the project develops.

### Current State

The repository is in its initial state with:
- ✅ Git repository initialized
- ✅ CLAUDE.md established (this file)
- ⏳ No source code yet
- ⏳ No package.json or dependencies
- ⏳ No README or additional documentation
- ⏳ No test suite or CI/CD pipelines

This is a blank canvas ready for project initialization.

---

## Repository Structure

### Current Structure

```
TENNIX/
├── .git/               # Git repository data
└── CLAUDE.md           # AI assistant guidelines (this file)
```

### Recommended Future Structure

Once development begins, consider this structure:

```
TENNIX/
├── .github/            # GitHub workflows, issue templates, PR templates
│   ├── workflows/      # CI/CD pipelines
│   └── ISSUE_TEMPLATE/ # Issue templates
├── docs/               # Additional documentation
├── src/                # Source code directory
│   ├── index.ts        # Main entry point
│   ├── components/     # UI components (if applicable)
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript type definitions
│   ├── services/       # Business logic and API services
│   └── config/         # Configuration files
├── tests/              # Test files
│   ├── unit/           # Unit tests
│   ├── integration/    # Integration tests
│   └── fixtures/       # Test fixtures and mocks
├── .gitignore          # Git ignore patterns
├── .prettierrc         # Prettier configuration
├── .eslintrc.json      # ESLint configuration
├── CLAUDE.md           # This file
├── LICENSE             # License information
├── package.json        # Node.js dependencies and scripts
├── README.md           # Project documentation
├── tsconfig.json       # TypeScript configuration
└── tsconfig.build.json # Production TypeScript configuration
```

**Note:** Adapt this structure based on actual project requirements (web app, CLI tool, library, etc.).

---

## Development Workflow

### Getting Started

#### For New Contributors

```bash
# Clone the repository
git clone http://local_proxy@127.0.0.1:22811/git/mobiozt/TENNIX
cd TENNIX

# Create a feature branch
git checkout -b feature/your-feature-name

# Once package.json exists, install dependencies
npm install

# Start development server (when implemented)
npm run dev

# Run tests (when test suite exists)
npm test

# Build for production (when build process is configured)
npm run build
```

#### Project Initialization Checklist

When initializing this project, consider creating:

1. **README.md** - Project description, setup instructions, usage examples
2. **package.json** - Dependencies, scripts, project metadata
3. **tsconfig.json** - TypeScript compiler configuration
4. **.gitignore** - Ignore node_modules, dist, .env, etc.
5. **LICENSE** - Choose appropriate license (MIT, Apache 2.0, etc.)
6. **src/** - Source code directory with initial files
7. **.github/workflows/** - CI/CD automation (test, build, deploy)
8. **tests/** - Test suite setup with testing framework
9. **.eslintrc.json** - Linting rules
10. **.prettierrc** - Code formatting rules

### Branch Naming Convention

- `main` - Production-ready code (primary branch)
- `develop` - Integration branch for ongoing development (if using gitflow)
- `feature/<description>` - New features (e.g., `feature/user-authentication`)
- `fix/<description>` - Bug fixes (e.g., `fix/login-validation-error`)
- `refactor/<description>` - Code refactoring without functional changes
- `docs/<description>` - Documentation updates
- `test/<description>` - Test-related changes
- `claude/<session-id>` - AI assistant working branches (auto-generated)

**Current Working Branch:** `claude/claude-md-mit6njmkopau6u2i-012hEkd7QxtrRFdsmcqxrhKy`

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

### Working on TENNIX

When working on this repository as an AI assistant:

#### Essential Practices

1. **Always Read First**
   - Use `Read` tool before modifying any file
   - Understand existing patterns and conventions
   - Never make changes to code you haven't examined

2. **Follow Existing Patterns**
   - Match the coding style already in use
   - Use the same naming conventions
   - Maintain consistent file organization
   - Replicate similar implementations for similar features

3. **Keep Changes Minimal**
   - Only modify what's necessary for the task
   - Avoid refactoring unrelated code
   - Don't add features beyond the request
   - Resist the urge to "improve" working code

4. **Test Thoroughly**
   - Run the test suite after changes
   - Add tests for new functionality
   - Verify builds pass before committing
   - Check for TypeScript/linting errors

5. **Document Your Work**
   - Write clear commit messages
   - Update CLAUDE.md when workflows change
   - Add code comments for complex logic only
   - Keep README.md current with features

6. **Commit Strategy**
   - Make atomic commits (one logical change per commit)
   - Use conventional commit format
   - Commit frequently during development
   - Push to the designated `claude/*` branch

#### Things to Avoid

- ❌ **Over-engineering** - Keep solutions simple and focused
- ❌ **Feature creep** - Stick to what's requested
- ❌ **Ignoring errors** - Address all linting/type errors before committing
- ❌ **Debug artifacts** - Remove console.logs, commented code, and TODOs
- ❌ **Duplicate code** - Check for existing implementations first
- ❌ **Silent assumptions** - Ask for clarification when requirements are unclear
- ❌ **Breaking changes** - Maintain backward compatibility unless explicitly requested
- ❌ **Security issues** - Never introduce vulnerabilities (injection, XSS, auth bypasses)

#### Git Workflow for AI Assistants

```bash
# 1. Always work on the designated claude/* branch
git checkout claude/claude-md-mit6njmkopau6u2i-012hEkd7QxtrRFdsmcqxrhKy

# 2. Make changes and commit with clear messages
git add <files>
git commit -m "feat(scope): clear description of change"

# 3. Push to the claude/* branch (use -u for first push)
git push -u origin claude/claude-md-mit6njmkopau6u2i-012hEkd7QxtrRFdsmcqxrhKy

# 4. Retry up to 4 times with exponential backoff on network errors
# Wait 2s, 4s, 8s, 16s between retries
```

#### When Uncertain

1. **Explore the codebase** - Use Task tool with subagent_type=Explore for discovery
2. **Check existing patterns** - Look for similar implementations
3. **Read documentation** - Check README, docs/, and inline comments
4. **Ask for clarification** - Don't guess requirements
5. **Document assumptions** - Note them in commit messages
6. **Start with minimal solution** - You can always iterate

#### Decision Making Framework

When faced with multiple approaches:

1. **Simplicity first** - Choose the straightforward solution
2. **Consistency** - Follow existing patterns in the codebase
3. **Maintainability** - Prefer readable over clever code
4. **Standards** - Use community best practices
5. **Pragmatism** - Working now beats perfect eventually

---

## Common Commands Reference

### Git Commands

```bash
# Status and inspection
git status                    # Check working tree status
git diff                      # View unstaged changes
git diff --staged             # View staged changes
git log --oneline -10         # View recent 10 commits
git log --graph --oneline     # View commit graph
git branch -a                 # List all branches

# Making changes
git add <file>                # Stage specific file
git add .                     # Stage all changes
git commit -m "message"       # Commit with message
git push origin <branch>      # Push to remote branch
git push -u origin <branch>   # Push and set upstream

# Branch operations
git checkout -b <branch>      # Create and switch to new branch
git checkout <branch>         # Switch to existing branch
git branch -d <branch>        # Delete local branch
git fetch origin              # Fetch from remote
git pull origin <branch>      # Pull and merge changes
```

### Development Commands (When Project is Set Up)

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run linter
npm run lint:fix     # Fix linting issues automatically
npm run format       # Format code with Prettier
npm run type-check   # Run TypeScript type checking

# Testing
npm test             # Run all tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
npm run test:unit    # Run only unit tests
npm run test:e2e     # Run end-to-end tests

# Package management
npm install          # Install all dependencies
npm install <pkg>    # Install specific package
npm uninstall <pkg>  # Remove package
npm update           # Update dependencies
npm outdated         # Check for outdated packages
```

### Useful Shell Commands

```bash
# File exploration
ls -la               # List all files with details
find . -name "*.ts"  # Find TypeScript files
tree -L 2            # Show directory tree (2 levels deep)

# Search and grep
grep -r "searchterm" src/     # Search in source files
grep -rn "TODO" src/          # Find TODOs with line numbers

# File operations
cat <file>           # Display file contents
head -n 20 <file>    # Show first 20 lines
tail -n 20 <file>    # Show last 20 lines
wc -l <file>         # Count lines in file
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

*This section will be populated as the project develops.*

### Key Decisions

Document important architectural and technical decisions here:

- [ ] Project type (web app, CLI tool, library, API, etc.)
- [ ] Programming language(s) and framework(s)
- [ ] Testing strategy and frameworks
- [ ] Build and deployment approach
- [ ] Code style and linting setup
- [ ] Documentation approach

### Dependencies

List major dependencies and their purposes here once package.json is created.

### Known Issues and Limitations

Track issues and workarounds here:

- Currently, repository is empty - no known issues yet

### External Services

Document external service integrations:

- GitHub repository: mobiozt/TENNIX
- Additional services TBD

### Deployment

Deployment procedures will be documented once established.

---

## Quick Reference for AI Assistants

### Before Making Changes

```bash
# 1. Read the files you'll modify
# Use Read tool for each file

# 2. Check current state
git status
git diff

# 3. Ensure you're on the correct branch
git branch --show-current
```

### Making Changes

```bash
# 1. Make your changes using Edit/Write tools

# 2. Verify changes
git diff

# 3. Stage changes
git add <files>

# 4. Commit with conventional commit format
git commit -m "type(scope): description"

# 5. Push to claude/* branch
git push -u origin <branch-name>
```

### Conventional Commit Types Quick Reference

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only
- `style` - Code style (formatting, semicolons, etc)
- `refactor` - Code change that neither fixes a bug nor adds a feature
- `perf` - Performance improvement
- `test` - Adding or updating tests
- `build` - Build system or external dependencies
- `ci` - CI/CD changes
- `chore` - Other changes (tooling, etc)

### Example Commits

```bash
git commit -m "feat(auth): implement user login with JWT"
git commit -m "fix(api): resolve timeout in data fetching"
git commit -m "docs: update CLAUDE.md with current repo state"
git commit -m "test(utils): add unit tests for date formatter"
git commit -m "refactor(components): simplify props interface"
```

---

## Changelog

| Date | Changes | Commit |
|------|---------|--------|
| 2025-11-24 | Initial CLAUDE.md creation | c0065c3 |
| 2025-12-05 | Comprehensive update: Added current state documentation, enhanced AI assistant guidelines, expanded git workflow details, added quick reference sections | TBD |

---

## Additional Resources

### Documentation

- [Conventional Commits](https://www.conventionalcommits.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Git Documentation](https://git-scm.com/doc)

### Best Practices

- Keep CLAUDE.md updated as the project evolves
- Document architectural decisions in dedicated ADR (Architecture Decision Records) if project grows
- Review and update guidelines when patterns change
- Maintain this as a living document

---

*This document should be updated whenever significant changes are made to the project structure, conventions, or workflows. Last reviewed: 2025-12-05*
