# Testing Infrastructure Setup

This document describes the testing infrastructure setup for the Next.js 16 component refactoring project.

## Overview

The testing infrastructure has been configured to support both unit tests and property-based tests using modern tools and best practices.

## Tools and Libraries

### Testing Framework
- **Vitest**: Fast unit test framework with native ESM support
- **@testing-library/react**: React component testing utilities
- **@testing-library/jest-dom**: Custom matchers for DOM assertions
- **@testing-library/user-event**: User interaction simulation
- **jsdom**: DOM implementation for Node.js

### Property-Based Testing
- **ts-morph**: TypeScript compiler API wrapper for AST analysis
- **glob**: File pattern matching for analyzing multiple files

### Code Quality
- **TypeScript**: Strict mode enabled for maximum type safety
- **ESLint**: Configured with Next.js 16 best practices

## Configuration Files

### vitest.config.ts
Configures Vitest with:
- jsdom environment for React component testing
- Global test utilities
- Path aliases matching tsconfig.json
- Coverage reporting
- Test file patterns

### vitest.setup.ts
Sets up:
- @testing-library/jest-dom matchers
- Automatic cleanup after each test

### tsconfig.json
Enhanced with strict mode options:
- `strict: true` (base strict mode)
- `noUncheckedIndexedAccess: true` (safer array/object access)
- `noImplicitReturns: true` (all code paths must return)
- `noFallthroughCasesInSwitch: true` (safer switch statements)
- `forceConsistentCasingInFileNames: true` (cross-platform compatibility)

### eslint.config.mjs
Configured with:
- Next.js 16 core web vitals rules
- TypeScript-specific rules
- Custom rules for code quality:
  - No implicit any types
  - Unused variable detection
  - React hooks rules
  - Prefer const over let
  - Console.log warnings

## NPM Scripts

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Directory Structure

```
__tests__/
├── SETUP.md                     # This file
├── setup.test.ts                # Basic setup verification test
├── properties/                  # Property-based tests
│   ├── README.md               # Property testing documentation
│   └── utils/
│       └── ast-helpers.ts      # AST analysis utilities
└── components/                  # Unit tests (to be added)
    ├── auth/
    ├── features/
    └── ui/
```

## Writing Tests

### Unit Tests

Create test files next to components with `.test.tsx` extension:

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Property-Based Tests

Create property tests in `__tests__/properties/`:

```typescript
import { describe, it, expect } from 'vitest';
import { initProject, getComponentFiles } from './utils/ast-helpers';

describe('Property: Component Type Safety', () => {
  it('all components have proper TypeScript interfaces', async () => {
    const project = initProject();
    const files = await getComponentFiles('components/**/*.tsx');
    
    const violations: string[] = [];
    
    for (const file of files) {
      const sourceFile = project.addSourceFileAtPath(file);
      // Check property...
      if (!meetsProperty(sourceFile)) {
        violations.push(file);
      }
    }
    
    expect(violations).toEqual([]);
  });
});
```

## Verification

To verify the setup is working:

1. Run the basic setup test:
   ```bash
   npm test __tests__/setup.test.ts
   ```

2. Check TypeScript compilation:
   ```bash
   bunx tsc --noEmit
   ```

3. Run ESLint:
   ```bash
   bunx next lint
   ```

## Next Steps

1. Write property-based tests for Next.js 16 compliance
2. Write unit tests for refactored components
3. Set up CI/CD integration
4. Configure coverage thresholds

## References

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Documentation](https://testing-library.com/)
- [ts-morph Documentation](https://ts-morph.com/)
- [Next.js Testing Documentation](https://nextjs.org/docs/app/building-your-application/testing)
