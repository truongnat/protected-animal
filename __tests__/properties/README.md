# Property-Based Testing Infrastructure

This directory contains property-based tests for the Next.js 16 component refactoring project. These tests verify universal properties that should hold true across all components in the codebase.

## Overview

Property-based testing validates that certain properties hold true for all valid inputs, rather than testing specific examples. In this project, we use property-based tests to ensure:

- All components comply with Next.js 16 async API requirements
- TypeScript strict mode compliance across all files
- Consistent code quality and patterns
- Accessibility requirements are met
- Styling patterns are consistent

## Structure

```
__tests__/properties/
├── README.md                    # This file
├── utils/
│   └── ast-helpers.ts          # AST analysis utilities using ts-morph
└── [property-test-files].test.ts  # Individual property tests
```

## Tools

- **ts-morph**: TypeScript compiler API wrapper for AST analysis
- **vitest**: Test runner
- **glob**: File pattern matching

## Running Tests

```bash
# Run all tests
npm test

# Run property tests only
npm test -- __tests__/properties

# Run with UI
npm run test:ui

# Run in watch mode
npm run test:watch
```

## Writing Property Tests

Each property test should:

1. Use ts-morph to analyze component files
2. Check for specific patterns or violations
3. Report violations with file name and line number
4. Run against all relevant component files
5. Reference the design document property it validates

Example:

```typescript
import { describe, it, expect } from 'vitest';
import { initProject, getComponentFiles } from './utils/ast-helpers';

describe('Property: Example Property', () => {
  it('validates property across all components', async () => {
    const project = initProject();
    const files = await getComponentFiles('components/**/*.tsx');
    
    const violations: string[] = [];
    
    for (const file of files) {
      const sourceFile = project.addSourceFileAtPath(file);
      
      // Check property
      if (!meetsProperty(sourceFile)) {
        violations.push(file);
      }
    }
    
    expect(violations).toEqual([]);
  });
});
```

## Configuration

Property tests are configured to:
- Run with minimum 100 iterations for randomized tests
- Tag each test with the design property it validates
- Report clear violation messages
- Integrate with CI/CD pipeline

## References

- Design Document: `.kiro/specs/nextjs16-component-refactor/design.md`
- Requirements: `.kiro/specs/nextjs16-component-refactor/requirements.md`
- Tasks: `.kiro/specs/nextjs16-component-refactor/tasks.md`
