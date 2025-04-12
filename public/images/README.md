# Fallback Images

This directory contains fallback images that are used when the primary images fail to load.

## Recommended Fallback Images

Place the following images in this directory:

- `/images/default-image.png` - Used as a fallback for species images
- `hero-fallback.jpg` - Used as a fallback for hero section images
- `species-hero-fallback.jpg` - Used as a fallback for the species list hero image

## Image Requirements

- Use high-quality images that are relevant to the content
- Optimize images for web (compress them to reduce file size)
- Use appropriate dimensions:
  - Hero images: 1920x1080px (16:9 ratio)
  - Species images: 800x600px (4:3 ratio)

## How Fallbacks Work

The `ImageWithFallback` component (`components/ui/ImageWithFallback.tsx`) automatically handles image loading errors and displays these fallback images when needed.

You can specify a custom fallback image for each instance:

```tsx
<ImageWithFallback
  src={primaryImageUrl}
  alt="Image description"
  fallbackSrc="/images/custom-fallback.jpg"
  // other props...
/>
```

If no fallback is specified, a placeholder image will be generated with the alt text.
