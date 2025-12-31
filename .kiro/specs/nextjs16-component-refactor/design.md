# Design Document: Next.js 16 Component Refactoring

## Overview

This design outlines the systematic refactoring of all React components in the wildlife conservation application to comply with Next.js 16 best practices, React 19 patterns, and modern TypeScript standards. The refactoring will be performed component-by-component, ensuring each component is properly typed, structured, accessible, and optimized.

## Architecture

### Component Classification

Components will be classified into three categories:

1. **Server Components** (default)
   - No client-side interactivity
   - Data fetching at component level
   - No hooks or browser APIs
   - Examples: Static cards, layouts, data displays

2. **Client Components** ('use client')
   - Interactive elements (forms, buttons with handlers)
   - Uses React hooks (useState, useEffect, etc.)
   - Browser API access
   - Examples: Forms, modals, interactive widgets

3. **Hybrid Components**
   - Server component wrapper
   - Client component children for interactivity
   - Minimizes client-side JavaScript
   - Examples: Page layouts with interactive sections

### Directory Structure

```
components/
├── auth/              # Authentication components
├── charts/            # Data visualization components
├── features/          # Feature-specific components
│   └── blog/         # Blog-related components
├── providers/         # Context providers
├── species/           # Species-related components
├── ui/               # Reusable UI components
├── Footer.tsx        # Global footer
├── Navbar.tsx        # Global navigation
├── SearchBar.tsx     # Search functionality
├── theme-provider.tsx
└── theme-toggle.tsx
```

## Components and Interfaces

### Component Refactoring Pattern

Each component refactoring will follow this pattern:

```typescript
// 1. Type Definitions
interface ComponentProps {
  // Explicit prop types
  requiredProp: string;
  optionalProp?: number;
  children?: React.ReactNode;
}

// 2. Sub-component Extraction (if needed)
function SubComponent({ data }: SubComponentProps) {
  return (
    // Focused, reusable component
  );
}

// 3. Main Component
export default function MainComponent({ 
  requiredProp, 
  optionalProp = defaultValue 
}: ComponentProps) {
  // Component logic
  
  return (
    // JSX using sub-components
  );
}
```

### Async API Pattern (Next.js 16)

For components using Next.js async APIs:

```typescript
// Page components with params
interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params;
  const search = await searchParams;
  
  // Use awaited values
}

// Route handlers with cookies/headers
export async function POST(request: Request) {
  const cookieStore = await cookies();
  const headersList = await headers();
  
  // Use awaited APIs
}
```

### Client Component Pattern

```typescript
'use client';

import { useState, useCallback } from 'react';

interface ClientComponentProps {
  initialData?: Data;
  onAction?: (data: Data) => void;
}

export default function ClientComponent({ 
  initialData, 
  onAction 
}: ClientComponentProps) {
  const [state, setState] = useState<Data | null>(initialData ?? null);
  
  const handleAction = useCallback((data: Data) => {
    setState(data);
    onAction?.(data);
  }, [onAction]);
  
  return (
    <div>
      {/* Interactive UI */}
    </div>
  );
}
```

## Data Models

### Component Prop Interfaces

All components will have explicit TypeScript interfaces:

```typescript
// Base props that many components share
interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Specific component props
interface SpeciesCardProps extends BaseComponentProps {
  species: Species;
  showDetails?: boolean;
  onSelect?: (id: string) => void;
}

// Form component props
interface FormComponentProps<T> {
  initialValues?: Partial<T>;
  onSubmit: (values: T) => Promise<void>;
  validationSchema?: ValidationSchema<T>;
}

// List component props
interface ListComponentProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string;
  emptyMessage?: string;
}
```

### State Type Definitions

```typescript
// UI State
interface UIState {
  isLoading: boolean;
  error: Error | null;
  isOpen: boolean;
}

// Form State
interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
}

// Data State
interface DataState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  lastUpdated: Date | null;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Async API Compliance
*For any* component or route handler that uses Next.js async APIs (params, searchParams, cookies, headers, draftMode), those APIs must be properly awaited before accessing their values.
**Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5**

### Property 2: Component Size Constraint
*For any* component file, if it exceeds 200 lines, it must have extracted sub-components as separate functions within the file or separate files.
**Validates: Requirements 2.1**

### Property 3: JSX Reusability
*For any* JSX pattern that appears more than twice in a component, it must be extracted into a reusable sub-component.
**Validates: Requirements 2.2**

### Property 4: Directory Organization
*For any* component file, it must be located in the appropriate directory based on its feature category (auth, charts, features, ui, etc.).
**Validates: Requirements 2.5**

### Property 5: Props Interface Definition
*For any* component that accepts props, it must have an explicitly defined TypeScript interface for those props.
**Validates: Requirements 3.1**

### Property 6: State Type Annotation
*For any* useState hook call, it must have an explicit type parameter or type inference from initial value.
**Validates: Requirements 3.2**

### Property 7: Callback Type Safety
*For any* callback prop in a component interface, it must have explicit parameter types and return type.
**Validates: Requirements 3.3**

### Property 8: Ref Type Safety
*For any* useRef hook call, it must have an explicit type parameter matching the element or value type.
**Validates: Requirements 3.4**

### Property 9: No Implicit Any
*For any* component file, TypeScript compilation with strict mode must produce no implicit any errors.
**Validates: Requirements 3.5**

### Property 10: Server Component Default
*For any* component that does not use hooks, event handlers, or browser APIs, it must not have the 'use client' directive.
**Validates: Requirements 4.1**

### Property 11: Client Directive for Interactivity
*For any* component that uses useState, useEffect, useCallback, useMemo, or event handlers, it must have the 'use client' directive.
**Validates: Requirements 4.2**

### Property 12: Children Pattern for Composition
*For any* client component that wraps server components, it must accept and render children prop.
**Validates: Requirements 4.4**

### Property 13: Button Type Attribute
*For any* button element that is not a form submit button, it must have type="button" attribute.
**Validates: Requirements 5.1**

### Property 14: Interactive ARIA Labels
*For any* interactive element (button, link, input), it must have an accessible label via aria-label, aria-labelledby, or associated label element.
**Validates: Requirements 5.2**

### Property 15: Form Input Labels
*For any* form input element, it must have an associated label element with matching htmlFor/id or aria-label attribute.
**Validates: Requirements 5.3**

### Property 16: Image Alt Text
*For any* image element (img or Image component), it must have an alt attribute (empty string for decorative, descriptive text for content).
**Validates: Requirements 5.4**

### Property 17: List Key Props
*For any* array map operation that returns JSX elements, each element must have a unique key prop.
**Validates: Requirements 6.1**

### Property 18: Next.js Image Usage
*For any* image rendering, it must use the Next.js Image component with width and height or fill prop specified.
**Validates: Requirements 6.4**

### Property 19: Data Fetching Loading States
*For any* component that fetches data, it must implement and render loading state UI.
**Validates: Requirements 6.5**

### Property 20: Error State Handling
*For any* component that performs async operations, it must handle and display error states.
**Validates: Requirements 7.1, 7.3**

### Property 21: Default Prop Values
*For any* optional prop in a component interface, the component must provide a default value or handle undefined gracefully.
**Validates: Requirements 7.2**

### Property 22: Error Logging
*For any* error catch block, it must include appropriate error logging for debugging.
**Validates: Requirements 7.5**

### Property 23: Tailwind CSS Styling
*For any* component styling, it must use Tailwind CSS utility classes in className prop rather than inline styles (except for truly dynamic values).
**Validates: Requirements 8.1, 8.5**

### Property 24: Dynamic Class Names
*For any* conditional styling, it must use the cn() utility function to combine class names.
**Validates: Requirements 8.2**

### Property 25: Dark Mode Support
*For any* component that uses color classes, it must include dark mode variants (dark:) for theme support.
**Validates: Requirements 8.3**

### Property 26: Tailwind Transitions
*For any* animation or transition effect, it must use Tailwind transition utility classes.
**Validates: Requirements 8.4**

### Property 27: Translation Hook Usage
*For any* user-facing text string in a component, it must use the t() function from useTranslation hook rather than hardcoded strings.
**Validates: Requirements 9.1, 9.4**

### Property 28: Locale-Aware Date Formatting
*For any* date display, it must use locale-aware formatting (FormattedDate component or Intl.DateTimeFormat).
**Validates: Requirements 9.2**

### Property 29: Locale-Aware Number Formatting
*For any* number display, it must use locale-aware formatting (Intl.NumberFormat or similar).
**Validates: Requirements 9.3**

### Property 30: Component JSDoc
*For any* exported component, it must have a JSDoc comment describing its purpose and usage.
**Validates: Requirements 10.1**

### Property 31: Props Documentation
*For any* component with complex props (more than 3 props or non-primitive types), the prop interface must have JSDoc comments for each property.
**Validates: Requirements 10.2**

### Property 32: Side Effect Documentation
*For any* component with useEffect or other side effects, the side effect must have a comment explaining its purpose.
**Validates: Requirements 10.3**

### Property 33: Usage Examples
*For any* reusable component in the ui/ directory, it must include usage examples in JSDoc or README.
**Validates: Requirements 10.5**

### Property 34: Server Component Async Data Fetching
*For any* server component that fetches data, the component function must be declared as async.
**Validates: Requirements 11.1**

### Property 35: Client Component React Query
*For any* client component that fetches data, it must use React Query hooks (useQuery, useMutation).
**Validates: Requirements 11.2**

### Property 36: React Hook Form Usage
*For any* form component, it must use React Hook Form (useForm hook) for form state and validation.
**Validates: Requirements 12.1**

### Property 37: Form Loading States
*For any* form component, it must display loading state during form submission.
**Validates: Requirements 12.2**

### Property 38: Image Fallback Handling
*For any* Image component, it must have error handling (onError prop or fallback mechanism) for failed image loads.
**Validates: Requirements 13.2**

### Property 39: Decorative Image Alt
*For any* decorative image, it must have alt="" (empty string) to indicate it's decorative.
**Validates: Requirements 13.3**

### Property 40: Content Image Alt
*For any* content image, it must have descriptive alt text that conveys the image meaning.
**Validates: Requirements 13.4**

### Property 41: Responsive Image Sizing
*For any* Image component, it must specify sizes prop for responsive layouts or use fill with proper container.
**Validates: Requirements 13.5**

### Property 42: Local State with useState
*For any* component-local UI state, it must use useState hook rather than external state management.
**Validates: Requirements 14.1**

### Property 43: Shared State with Context
*For any* state shared across multiple components, it must use React Context API rather than prop drilling.
**Validates: Requirements 14.2**

### Property 44: ESLint Compliance
*For any* component file, running ESLint must produce zero errors.
**Validates: Requirements 15.1**

### Property 45: TypeScript Strict Mode
*For any* component file, TypeScript compilation with strict mode must produce zero errors.
**Validates: Requirements 15.2**

### Property 46: Const Variable Declaration
*For any* variable declaration that is not reassigned, it must use const rather than let.
**Validates: Requirements 15.3**

### Property 47: Import Organization
*For any* component file, imports must be organized in consistent order: React imports, third-party imports, local imports, type imports.
**Validates: Requirements 15.4**

### Property 48: No Unused Code
*For any* component file, there must be no unused variables, imports, or functions.
**Validates: Requirements 15.5**

## Error Handling

### Error Boundaries

Implement error boundaries at strategic levels:

```typescript
// app/error.tsx - Global error boundary
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### Async Error Handling

```typescript
// Server component error handling
async function fetchData() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    console.error('Data fetch error:', error);
    throw error; // Let error boundary handle it
  }
}

// Client component error handling
function ClientComponent() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
    retry: 3,
  });
  
  if (error) {
    return <ErrorDisplay error={error} />;
  }
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  return <DataDisplay data={data} />;
}
```

### Form Validation Errors

```typescript
interface FormErrors {
  field?: string;
  message: string;
}

function FormComponent() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: 'Email is required' })} />
      {errors.email && (
        <span className="text-red-500 text-sm">{errors.email.message}</span>
      )}
    </form>
  );
}
```

## Testing Strategy

### Dual Testing Approach

We will use both unit tests and property-based tests to ensure comprehensive coverage:

**Unit Tests:**
- Test specific component rendering scenarios
- Test user interactions and event handlers
- Test edge cases and error conditions
- Test integration between components
- Use React Testing Library for component tests

**Property-Based Tests:**
- Test that all components pass TypeScript strict mode
- Test that all components pass ESLint without errors
- Test that async APIs are properly awaited
- Test that accessibility requirements are met
- Test that styling patterns are consistent
- Use custom property test framework for code analysis

### Testing Tools

- **React Testing Library**: Component rendering and interaction tests
- **Vitest**: Test runner and assertion library
- **TypeScript Compiler API**: For property-based type checking
- **ESLint API**: For property-based linting checks
- **axe-core**: For accessibility testing

### Property Test Configuration

Each property test will:
- Run against all component files in the codebase
- Use AST parsing to analyze code structure
- Report violations with file name and line number
- Run as part of CI/CD pipeline
- Minimum 100 iterations for randomized tests

### Test Organization

```
__tests__/
├── components/
│   ├── auth/
│   │   └── AuthModal.test.tsx
│   ├── features/
│   │   └── ConservationImpact.test.tsx
│   └── ui/
│       └── SpeciesCard.test.tsx
├── properties/
│   ├── async-api-compliance.test.ts
│   ├── typescript-safety.test.ts
│   ├── accessibility.test.ts
│   └── styling-patterns.test.ts
└── integration/
    └── user-flows.test.tsx
```

### Example Unit Test

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SpeciesCard from '@/components/ui/SpeciesCard';

describe('SpeciesCard', () => {
  it('renders species information correctly', () => {
    const species = {
      id: '1',
      name: 'Tiger',
      scientificName: 'Panthera tigris',
      status: 'endangered',
    };
    
    render(<SpeciesCard species={species} />);
    
    expect(screen.getByText('Tiger')).toBeInTheDocument();
    expect(screen.getByText('Panthera tigris')).toBeInTheDocument();
  });
  
  it('has accessible image with alt text', () => {
    const species = { id: '1', name: 'Tiger', image: '/tiger.jpg' };
    
    render(<SpeciesCard species={species} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', expect.stringContaining('Tiger'));
  });
});
```

### Example Property Test

```typescript
import { describe, it, expect } from 'vitest';
import { Project } from 'ts-morph';
import glob from 'glob';

describe('Property: Async API Compliance', () => {
  it('all components await params before accessing properties', () => {
    const project = new Project({ tsConfigFilePath: 'tsconfig.json' });
    const componentFiles = glob.sync('app/**/page.tsx');
    
    for (const file of componentFiles) {
      const sourceFile = project.getSourceFile(file);
      const functions = sourceFile?.getFunctions() ?? [];
      
      for (const func of functions) {
        const paramsUsage = func.getDescendantsOfKind(SyntaxKind.PropertyAccessExpression)
          .filter(prop => prop.getExpression().getText() === 'params');
        
        if (paramsUsage.length > 0) {
          const hasAwait = func.getDescendantsOfKind(SyntaxKind.AwaitExpression)
            .some(await => await.getText().includes('params'));
          
          expect(hasAwait).toBe(true);
        }
      }
    }
  });
});
```

## Implementation Phases

### Phase 1: Foundation (Priority Components)
1. Update route handlers for async APIs (auth routes)
2. Update page components with params/searchParams
3. Refactor core UI components (Button, Card, Input)
4. Set up testing infrastructure

### Phase 2: Feature Components
1. Refactor authentication components
2. Refactor species components
3. Refactor chart components
4. Refactor feature components (ConservationImpact, ReportingWidget)

### Phase 3: Layout and Navigation
1. Refactor Navbar component
2. Refactor Footer component
3. Refactor theme components
4. Refactor provider components

### Phase 4: Specialized Components
1. Refactor blog components
2. Refactor form components
3. Refactor image components
4. Refactor utility components

### Phase 5: Testing and Documentation
1. Write unit tests for all refactored components
2. Write property-based tests
3. Update component documentation
4. Create component usage examples

## Migration Checklist

For each component refactoring:

- [ ] Add TypeScript interfaces for all props
- [ ] Extract sub-components if file > 200 lines
- [ ] Add 'use client' directive if needed
- [ ] Ensure all async APIs are awaited
- [ ] Add type="button" to non-submit buttons
- [ ] Add ARIA labels to interactive elements
- [ ] Use Next.js Image component for images
- [ ] Add alt text to all images
- [ ] Use translation hook for all text
- [ ] Add dark mode classes for colors
- [ ] Use cn() for conditional classes
- [ ] Add error handling for async operations
- [ ] Add loading states for data fetching
- [ ] Add JSDoc comments
- [ ] Write unit tests
- [ ] Run ESLint and fix errors
- [ ] Run TypeScript and fix errors
- [ ] Test accessibility with keyboard
- [ ] Test dark mode
- [ ] Test responsive layouts

## Success Criteria

The refactoring will be considered successful when:

1. All components pass TypeScript strict mode compilation
2. All components pass ESLint without errors
3. All property-based tests pass
4. Unit test coverage is maintained or improved
5. No console errors in development or production
6. All pages render correctly
7. All interactive features work as expected
8. Accessibility audit passes (axe-core)
9. Performance metrics are maintained or improved
10. Documentation is complete and accurate
