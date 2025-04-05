# UI Components

This directory contains reusable UI components for the Protected Animals website.

## ImageWithFallback

`ImageWithFallback` is a wrapper around Next.js Image component that provides fallback handling when images fail to load.

### Usage

```tsx
import ImageWithFallback from '@/components/ui/ImageWithFallback';

// Basic usage
<ImageWithFallback
  src={animal.image_url}
  alt={animal.name}
  fill
  className="object-cover"
/>

// With custom fallback image
<ImageWithFallback
  src={animal.image_url}
  alt={animal.name}
  fallbackSrc="/images/default-animal.jpg"
  fill
  className="object-cover"
/>
```

### Props

The component accepts all standard Next.js Image props plus:

- `fallbackSrc` (optional): A custom fallback image URL to use when the primary image fails to load
- `altText` (optional): Alternative text to use for the alt attribute and fallback image text if the alt prop is not provided

### How it works

1. The component attempts to load the image from the provided `src`
2. If the image fails to load, it will:
   - Use the provided `fallbackSrc` if available
   - Otherwise, generate a placeholder image using the `getImageUrl` utility function
3. The placeholder will display the alt text on a green background

### Benefits

- Prevents broken image icons from appearing on the site
- Maintains consistent layout even when images fail to load
- Provides visual feedback with descriptive text
- Fully compatible with Next.js Image optimization
