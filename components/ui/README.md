# UI Components

This directory contains reusable UI components built with React, TypeScript, and Tailwind CSS. All components follow Next.js 16 best practices and are fully typed with comprehensive JSDoc documentation.

## Table of Contents

- [Core Components](#core-components)
  - [Button](#button)
  - [Card](#card)
  - [Input](#input)
  - [Image with Fallback](#image-with-fallback)
- [Specialized Components](#specialized-components)
  - [SpeciesCard](#speciescard)
- [Component Patterns](#component-patterns)
- [Accessibility Guidelines](#accessibility-guidelines)
- [Dark Mode Support](#dark-mode-support)

## Core Components

### Button

A versatile button component with multiple variants and sizes.

**Import:**
```tsx
import { Button } from '@/components/ui/button';
```

**Basic Usage:**
```tsx
// Default button
<Button>Click me</Button>

// With variant
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// With size
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon" aria-label="Close">
  <X className="h-4 w-4" />
</Button>

// Submit button (explicitly set type)
<Button type="submit">Submit Form</Button>

// Disabled state
<Button disabled>Disabled</Button>

// As child (composition pattern)
<Button asChild>
  <Link href="/about">About</Link>
</Button>
```

**Props:**
- `variant`: `'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'`
- `size`: `'default' | 'sm' | 'lg' | 'icon'`
- `asChild`: `boolean` - Renders as Slot for composition
- `type`: `'button' | 'submit' | 'reset'` - Defaults to 'button'

**Accessibility:**
- Always include `aria-label` for icon-only buttons
- Use `type="button"` for non-submit buttons (default)
- Ensure sufficient color contrast for all variants

---

### Card

A container component for grouping related content with consistent styling.

**Import:**
```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
```

**Basic Usage:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Optional description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

**Advanced Examples:**
```tsx
// Simple card without header/footer
<Card>
  <CardContent className="pt-6">
    <p>Simple content</p>
  </CardContent>
</Card>

// Card with custom styling
<Card className="hover:shadow-lg transition-shadow">
  <CardHeader>
    <CardTitle>
      <h2>Semantic Heading</h2>
    </CardTitle>
  </CardHeader>
  <CardContent>
    <p>Content with semantic HTML</p>
  </CardContent>
</Card>

// Card with multiple actions
<Card>
  <CardHeader>
    <CardTitle>Actions Card</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Content here</p>
  </CardContent>
  <CardFooter className="justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Confirm</Button>
  </CardFooter>
</Card>
```

**Accessibility:**
- Use semantic HTML within CardTitle (h2, h3, etc.)
- Ensure proper heading hierarchy
- Consider using `role="article"` for standalone cards

---

### Input

A styled input field component with consistent theming.

**Import:**
```tsx
import { Input } from '@/components/ui/input';
```

**Basic Usage:**
```tsx
// With associated label
<div>
  <label htmlFor="email">Email</label>
  <Input id="email" type="email" placeholder="Enter your email" />
</div>

// With aria-label (when no visible label)
<Input
  type="search"
  aria-label="Search species"
  placeholder="Search..."
/>

// Different input types
<Input type="text" placeholder="Text input" />
<Input type="password" placeholder="Password" />
<Input type="number" placeholder="Number" />
<Input type="date" />

// Disabled state
<Input disabled placeholder="Disabled input" />

// With custom styling
<Input className="max-w-sm" placeholder="Custom width" />
```

**Form Integration:**
```tsx
// With React Hook Form
import { useForm } from 'react-hook-form';

function MyForm() {
  const { register, handleSubmit } = useForm();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username">Username</label>
        <Input
          id="username"
          {...register('username', { required: true })}
          placeholder="Enter username"
        />
      </div>
    </form>
  );
}
```

**Accessibility:**
- **Always** associate inputs with labels using `htmlFor`/`id`
- Use `aria-label` only when no visible label exists
- Provide clear placeholder text as hints, not labels
- Use appropriate input types for better mobile keyboards

---

### Image with Fallback

An enhanced Next.js Image component with automatic fallback support.

**Import:**
```tsx
import ImageWithFallback from '@/components/ui/image-with-fallback';
```

**Basic Usage:**
```tsx
// Fixed dimensions
<ImageWithFallback
  src="/species/tiger.jpg"
  fallbackSrc="/images/default-image.jpg"
  alt="Bengal tiger in natural habitat"
  width={400}
  height={300}
/>

// Responsive with fill
<div className="relative w-full h-64">
  <ImageWithFallback
    src="/hero-image.jpg"
    fallbackSrc="/default-hero.jpg"
    alt="Wildlife conservation hero image"
    fill
    className="object-cover"
  />
</div>

// With sizes for responsive optimization
<ImageWithFallback
  src="/species/elephant.jpg"
  fallbackSrc="/images/default-image.jpg"
  alt="Asian elephant"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>

// Decorative image (use sparingly)
<ImageWithFallback
  src="/decorations/pattern.jpg"
  fallbackSrc="/decorations/default-pattern.jpg"
  alt=""
  width={100}
  height={100}
/>
```

**Props:**
- `src`: Primary image URL
- `fallbackSrc`: Fallback image URL if primary fails
- `alt`: **Required** - Descriptive text for accessibility
- All other Next.js Image props are supported

**Accessibility:**
- Provide meaningful `alt` text for content images
- Use `alt=""` only for purely decorative images
- Consider image context when writing alt text

---

## Specialized Components

### SpeciesCard

A comprehensive card component for displaying endangered species information.

**Import:**
```tsx
import SpeciesCard from '@/components/ui/SpeciesCard';
```

**Basic Usage:**
```tsx
<SpeciesCard
  species={speciesData}
  showActions={true}
/>
```

**Props:**
- `species`: Species object with required fields
- `showActions`: `boolean` - Show report/support buttons
- `language`: `'en' | 'vi'` - Language override (optional)
- `className`: Additional CSS classes

**Species Data Structure:**
```typescript
interface Species {
  id: number;
  name: string;
  scientific_name: string;
  conservation_status: string;
  description: string;
  image_url: string;
  region: string;
  population: number | null;
  threats?: string[];
}
```

**Features:**
- Automatic image fallback
- Conservation status badges
- Population display
- Threat indicators
- Internationalization support
- Dark mode compatible
- Hover effects and animations

---

## Component Patterns

### Server vs Client Components

By default, components in this directory are **server components** unless they:
- Use React hooks (useState, useEffect, etc.)
- Handle browser events
- Use browser APIs

Client components are marked with `'use client'` directive at the top of the file.

**Server Component Example:**
```tsx
// No 'use client' directive needed
export default function StaticCard({ title, content }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
}
```

**Client Component Example:**
```tsx
'use client';

import { useState } from 'react';

export default function InteractiveCard() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Card>
      <Button onClick={() => setIsOpen(!isOpen)}>
        Toggle
      </Button>
    </Card>
  );
}
```

### Composition Pattern

Use the `asChild` prop for flexible composition:

```tsx
// Button as a Link
<Button asChild>
  <Link href="/about">About</Link>
</Button>

// Button as a custom element
<Button asChild>
  <a href="https://example.com" target="_blank">
    External Link
  </a>
</Button>
```

### Conditional Styling

Use the `cn()` utility for conditional classes:

```tsx
import { cn } from '@/lib/utils';

<Card className={cn(
  'base-classes',
  isActive && 'active-classes',
  isError && 'error-classes'
)}>
  {/* content */}
</Card>
```

---

## Accessibility Guidelines

All components follow WCAG 2.1 AA standards:

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Focus indicators are visible
- Tab order is logical

### Screen Readers
- Semantic HTML elements used where appropriate
- ARIA labels provided for icon-only buttons
- Form inputs associated with labels
- Images have descriptive alt text

### Color Contrast
- All text meets minimum contrast ratios
- Color is not the only means of conveying information
- Dark mode maintains accessibility standards

### Best Practices
```tsx
// ✅ Good: Accessible button
<Button aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>

// ❌ Bad: No accessible label
<Button>
  <X className="h-4 w-4" />
</Button>

// ✅ Good: Associated label
<label htmlFor="email">Email</label>
<Input id="email" type="email" />

// ❌ Bad: No label association
<label>Email</label>
<Input type="email" />

// ✅ Good: Descriptive alt text
<ImageWithFallback
  src="/tiger.jpg"
  fallbackSrc="/default.jpg"
  alt="Bengal tiger resting in grassland"
  width={400}
  height={300}
/>

// ❌ Bad: Generic alt text
<ImageWithFallback
  src="/tiger.jpg"
  fallbackSrc="/default.jpg"
  alt="image"
  width={400}
  height={300}
/>
```

---

## Dark Mode Support

All components support dark mode through Tailwind's dark mode classes:

### Automatic Dark Mode
Components automatically adapt to the user's theme preference:

```tsx
// Colors automatically adjust
<Card className="bg-card text-card-foreground">
  <CardContent>
    <p className="text-muted-foreground">
      This text adapts to dark mode
    </p>
  </CardContent>
</Card>
```

### Custom Dark Mode Styling
Add dark mode variants when needed:

```tsx
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  Custom dark mode styling
</div>
```

### Theme-Aware Colors
Use semantic color classes that adapt to theme:

- `bg-background` / `text-foreground`
- `bg-card` / `text-card-foreground`
- `bg-primary` / `text-primary-foreground`
- `text-muted-foreground`
- `border-border`

---

## TypeScript Support

All components are fully typed with TypeScript:

```tsx
// Props are type-checked
<Button variant="invalid" /> // ❌ Type error

<Button variant="destructive" /> // ✅ Valid

// Ref forwarding works
const buttonRef = useRef<HTMLButtonElement>(null);
<Button ref={buttonRef}>Click</Button>

// Event handlers are typed
<Button onClick={(e) => {
  // e is typed as React.MouseEvent<HTMLButtonElement>
  console.log(e.currentTarget);
}}>
  Click
</Button>
```

---

## Contributing

When adding new components to this directory:

1. **TypeScript**: Define explicit prop interfaces
2. **JSDoc**: Add comprehensive documentation with examples
3. **Accessibility**: Ensure WCAG 2.1 AA compliance
4. **Dark Mode**: Support theme switching
5. **Server First**: Default to server components
6. **Testing**: Add unit tests for interactive components
7. **Examples**: Include usage examples in JSDoc

---

## Related Documentation

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
