# Next.js 16 Migration Guide

A practical guide for migrating components from Next.js 15 to Next.js 16 with before/after examples.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Breaking Changes](#breaking-changes)
3. [Migration Steps](#migration-steps)
4. [Before/After Examples](#beforeafter-examples)
5. [Common Patterns](#common-patterns)
6. [Validation](#validation)

---

## Quick Start

### Prerequisites

- Node.js 18.17 or later
- Next.js 16.0.0 or later
- React 19.0.0 or later
- TypeScript 5.0 or later

### Update Dependencies

```bash
npm install next@16 react@19 react-dom@19
npm install -D @types/react@19 @types/react-dom@19
```

### Enable TypeScript Strict Mode

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

---

## Breaking Changes

### 1. Async APIs

**Impact:** HIGH  
**Affected:** All route handlers and dynamic pages

The following APIs are now asynchronous and must be awaited:
- `params` in page components
- `searchParams` in page components
- `cookies()` in route handlers
- `headers()` in route handlers
- `draftMode()` in route handlers

### 2. Client Directive

**Impact:** MEDIUM  
**Affected:** Components using hooks or browser APIs

Components using React hooks or browser APIs must be marked with `'use client'` directive.

### 3. TypeScript Strict Mode

**Impact:** MEDIUM  
**Affected:** All components

No implicit `any` types allowed. All props, state, and callbacks must be explicitly typed.

---

## Migration Steps

### Step 1: Update Route Handlers

**Files to check:**
- `app/api/**/*.ts`
- Any file using `cookies()` or `headers()`

**Changes needed:**
- Add `await` before `cookies()` and `headers()` calls
- Update TypeScript types if needed

### Step 2: Update Dynamic Pages

**Files to check:**
- `app/**/[param]/page.tsx`
- Any page using `params` or `searchParams`

**Changes needed:**
- Make component `async`
- Add `await` before accessing `params` or `searchParams`
- Update TypeScript interface for props

### Step 3: Add Client Directives

**Files to check:**
- Components using `useState`, `useEffect`, etc.
- Components with event handlers
- Components using browser APIs

**Changes needed:**
- Add `'use client'` at the top of the file
- Ensure all hooks are properly typed

### Step 4: Fix TypeScript Errors

**Files to check:**
- All component files

**Changes needed:**
- Add prop interfaces
- Type all state variables
- Type all callbacks
- Remove implicit `any` types

### Step 5: Test Everything

```bash
# Type check
npm run type-check

# Lint
npm run lint

# Test
npm test

# Build
npm run build
```

---

## Before/After Examples

### Example 1: Dynamic Page with Params

#### Before (Next.js 15)

```tsx
// app/species/[id]/page.tsx
export default function SpeciesPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const speciesId = params.id; // Direct access
  
  return (
    <div>
      <h1>Species {speciesId}</h1>
    </div>
  );
}
```

#### After (Next.js 16)

```tsx
// app/species/[id]/page.tsx
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SpeciesPage({ params }: PageProps) {
  const { id } = await params; // Must await
  
  return (
    <div>
      <h1>Species {id}</h1>
    </div>
  );
}
```

**Key Changes:**
1. ✅ Component is now `async`
2. ✅ `params` is typed as `Promise<{ id: string }>`
3. ✅ `params` is awaited before accessing properties

---

### Example 2: Route Handler with Cookies

#### Before (Next.js 15)

```tsx
// app/api/auth/login/route.ts
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const body = await request.json();
  
  // Synchronous cookie access
  const cookieStore = cookies();
  cookieStore.set('token', body.token);
  
  return Response.json({ success: true });
}
```

#### After (Next.js 16)

```tsx
// app/api/auth/login/route.ts
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const body = await request.json();
  
  // Must await cookies()
  const cookieStore = await cookies();
  cookieStore.set('token', body.token);
  
  return Response.json({ success: true });
}
```

**Key Changes:**
1. ✅ `cookies()` is awaited

---

### Example 3: Component with Implicit Types

#### Before (Next.js 15)

```tsx
// components/SpeciesCard.tsx
export default function SpeciesCard({ species, onSelect }) {
  const [selected, setSelected] = useState(false);
  
  return (
    <div onClick={() => onSelect(species.id)}>
      <h2>{species.name}</h2>
    </div>
  );
}
```

#### After (Next.js 16)

```tsx
// components/SpeciesCard.tsx
import type { Species } from '@/lib/core/domain/entities/species';

interface SpeciesCardProps {
  species: Species;
  onSelect?: (id: number) => void;
}

export default function SpeciesCard({ 
  species, 
  onSelect 
}: SpeciesCardProps) {
  const [selected, setSelected] = useState<boolean>(false);
  
  return (
    <div onClick={() => onSelect?.(species.id)}>
      <h2>{species.name}</h2>
    </div>
  );
}
```

**Key Changes:**
1. ✅ Added `SpeciesCardProps` interface
2. ✅ Typed `species` parameter
3. ✅ Typed optional `onSelect` callback
4. ✅ Explicitly typed `useState<boolean>`
5. ✅ Used optional chaining for `onSelect?.()`

---

### Example 4: Server Component with Client Interactivity

#### Before (Next.js 15)

```tsx
// components/InteractiveCard.tsx
import { useState } from 'react';

export default function InteractiveCard({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        {title}
      </button>
      {isOpen && <div>{content}</div>}
    </div>
  );
}
```

#### After (Next.js 16)

```tsx
// components/InteractiveCard.tsx
'use client'; // Required for hooks

import { useState } from 'react';

interface InteractiveCardProps {
  title: string;
  content: string;
}

export default function InteractiveCard({ 
  title, 
  content 
}: InteractiveCardProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  return (
    <div>
      <button 
        type="button" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
      {isOpen && <div>{content}</div>}
    </div>
  );
}
```

**Key Changes:**
1. ✅ Added `'use client'` directive
2. ✅ Added `InteractiveCardProps` interface
3. ✅ Typed props
4. ✅ Explicitly typed `useState<boolean>`
5. ✅ Added `type="button"` to button

---

### Example 5: Form Component

#### Before (Next.js 15)

```tsx
// components/LoginForm.tsx
import { useState } from 'react';

export default function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Submit</button>
    </form>
  );
}
```

#### After (Next.js 16)

```tsx
// components/LoginForm.tsx
'use client';

import { useState, type FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit({ email, password });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
}
```

**Key Changes:**
1. ✅ Added `'use client'` directive
2. ✅ Added `LoginFormData` and `LoginFormProps` interfaces
3. ✅ Typed all state variables
4. ✅ Typed event handler parameter
5. ✅ Added loading state
6. ✅ Added proper labels with `htmlFor`/`id`
7. ✅ Used UI components (Input, Button)
8. ✅ Added `type="submit"` to button

---

### Example 6: Image Component

#### Before (Next.js 15)

```tsx
// components/SpeciesImage.tsx
export default function SpeciesImage({ src, name }) {
  return (
    <img 
      src={src} 
      alt={name}
      style={{ width: '100%', height: 'auto' }}
    />
  );
}
```

#### After (Next.js 16)

```tsx
// components/SpeciesImage.tsx
import Image from 'next/image';

interface SpeciesImageProps {
  src: string;
  name: string;
  width?: number;
  height?: number;
}

export default function SpeciesImage({ 
  src, 
  name,
  width = 400,
  height = 300
}: SpeciesImageProps) {
  return (
    <Image
      src={src}
      alt={`${name} - endangered species`}
      width={width}
      height={height}
      className="w-full h-auto"
    />
  );
}
```

**Key Changes:**
1. ✅ Using Next.js `Image` component
2. ✅ Added `SpeciesImageProps` interface
3. ✅ Specified width and height
4. ✅ Improved alt text
5. ✅ Using Tailwind classes instead of inline styles

---

### Example 7: Component with Translations

#### Before (Next.js 15)

```tsx
// components/WelcomeMessage.tsx
export default function WelcomeMessage({ userName }) {
  return (
    <div>
      <h1>Welcome, {userName}!</h1>
      <p>Thank you for visiting our site.</p>
    </div>
  );
}
```

#### After (Next.js 16)

```tsx
// components/WelcomeMessage.tsx
'use client';

import { useTranslation } from '@/lib/i18n/useTranslation';

interface WelcomeMessageProps {
  userName: string;
}

export default function WelcomeMessage({ 
  userName 
}: WelcomeMessageProps) {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('welcome.title', { name: userName })}</h1>
      <p>{t('welcome.message')}</p>
    </div>
  );
}
```

**Key Changes:**
1. ✅ Added `'use client'` directive (for useTranslation hook)
2. ✅ Added `WelcomeMessageProps` interface
3. ✅ Using translation hook
4. ✅ Replaced hardcoded strings with translation keys

---

### Example 8: Component with Dark Mode

#### Before (Next.js 15)

```tsx
// components/StatusBadge.tsx
export default function StatusBadge({ status }) {
  const bgColor = status === 'active' ? 'bg-green-500' : 'bg-red-500';
  
  return (
    <span className={`${bgColor} text-white px-2 py-1 rounded`}>
      {status}
    </span>
  );
}
```

#### After (Next.js 16)

```tsx
// components/StatusBadge.tsx
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'active' | 'inactive';
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span 
      className={cn(
        'px-2 py-1 rounded text-white',
        status === 'active' 
          ? 'bg-green-500 dark:bg-green-600' 
          : 'bg-red-500 dark:bg-red-600'
      )}
    >
      {status}
    </span>
  );
}
```

**Key Changes:**
1. ✅ Added `StatusBadgeProps` interface
2. ✅ Typed status as union type
3. ✅ Using `cn()` utility for class names
4. ✅ Added dark mode variants

---

## Common Patterns

### Pattern 1: Async Page Component

```tsx
interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params;
  const search = await searchParams;
  
  // Fetch data
  const data = await fetchData(id);
  
  return <div>{/* Render */}</div>;
}
```

### Pattern 2: Client Component with State

```tsx
'use client';

import { useState } from 'react';

interface ComponentProps {
  initialValue?: string;
}

export default function Component({ initialValue = '' }: ComponentProps) {
  const [value, setValue] = useState<string>(initialValue);
  
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

### Pattern 3: Form with React Hook Form

```tsx
'use client';

import { useForm } from 'react-hook-form';

interface FormData {
  email: string;
  password: string;
}

export default function MyForm() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<FormData>();
  
  const onSubmit = async (data: FormData) => {
    // Handle submission
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('email', { required: true })} />
      {errors.email && <span>Required</span>}
      
      <Button type="submit" disabled={isSubmitting}>
        Submit
      </Button>
    </form>
  );
}
```

### Pattern 4: Component with Sub-components

```tsx
interface MainProps {
  data: Data[];
}

interface SubProps {
  item: Data;
}

function SubComponent({ item }: SubProps) {
  return <div>{item.name}</div>;
}

export default function MainComponent({ data }: MainProps) {
  return (
    <div>
      {data.map(item => (
        <SubComponent key={item.id} item={item} />
      ))}
    </div>
  );
}
```

---

## Validation

### Checklist

After migrating a component, verify:

- [ ] TypeScript compiles without errors
- [ ] ESLint passes without errors
- [ ] Component renders correctly
- [ ] All interactions work
- [ ] Dark mode works
- [ ] Translations work (if applicable)
- [ ] Accessibility is maintained
- [ ] Tests pass

### Commands

```bash
# Type check
npx tsc --noEmit

# Lint
npm run lint

# Test
npm test

# Build
npm run build

# Run dev server
npm run dev
```

### Manual Testing

1. **Visual Testing:**
   - Check component renders correctly
   - Test light and dark modes
   - Test responsive layouts

2. **Interaction Testing:**
   - Test all buttons and links
   - Test form submissions
   - Test keyboard navigation

3. **Accessibility Testing:**
   - Use keyboard only
   - Test with screen reader
   - Check color contrast

---

## Getting Help

### Resources

- [Next.js 16 Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Internal Documentation](./NEXTJS-16-REFACTORING.md)

### Common Questions

**Q: Do I need to make all components async?**  
A: No, only components that use `params` or `searchParams` need to be async.

**Q: When should I use 'use client'?**  
A: Use it when your component uses React hooks, event handlers, or browser APIs.

**Q: Can I mix server and client components?**  
A: Yes! Server components can render client components as children.

**Q: Do I need to type everything?**  
A: Yes, with strict mode enabled, all props, state, and callbacks must be typed.

**Q: What about existing tests?**  
A: Update tests to match new component signatures and async behavior.

---

## Next Steps

After completing the migration:

1. ✅ Run full test suite
2. ✅ Perform accessibility audit
3. ✅ Test in production build
4. ✅ Update documentation
5. ✅ Train team on new patterns

---

## Conclusion

This migration improves:
- **Type Safety:** Catch errors at compile time
- **Performance:** Server components reduce client JS
- **Accessibility:** Better ARIA labels and keyboard support
- **Maintainability:** Consistent patterns and structure
- **Developer Experience:** Better tooling and error messages

For detailed information, see [NEXTJS-16-REFACTORING.md](./NEXTJS-16-REFACTORING.md).
