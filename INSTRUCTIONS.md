# Instructions for Fixing Fallback Images

## 1. Update All Pages

The easiest way to update all pages is to run the provided batch script:

```bash
scripts\update-all-images.bat
```

This will update the following pages to use the `ImageWithFallback` component:
- Species detail page (`app/species/[id]/page.tsx`) - Fixed related species images
- About page (`app/about/page.tsx`)

Alternatively, you can update each page individually:

```bash
copy app\species\[id]\page.tsx.fixed app\species\[id]\page.tsx
copy app\about\page.tsx.updated app\about\page.tsx
```

## 2. Update Next.js Config

Make sure your `next.config.mjs` file includes 'placehold.co' in the list of allowed image domains:

```javascript
domains: ['files.worldwildlife.org', 'images.unsplash.com', 'via.placeholder.com', 'placehold.co'],
```

## 3. Test the Fallback Functionality

You can test the fallback functionality by:

1. Intentionally using an invalid image URL
2. Temporarily disabling your internet connection
3. Using a URL that points to a non-existent image

## What Was Fixed

1. Updated the `ImageWithFallback` component to be more robust:
   - Added checks for empty or invalid source URLs
   - Added protection against infinite loops if fallback also fails
   - Reset error state when source changes
   - Added proper type handling for Next.js images

2. Updated the `getImageUrl` utility function to use placehold.co instead of via.placeholder.com:
   - placehold.co is a more reliable service for placeholder images
   - Added to the list of allowed domains in Next.js config

3. Updated all image instances across multiple pages to use the `ImageWithFallback` component:
   - Species detail page (hero image, main species image, related species images)
   - About page (hero image, team member images, partner logos)
   - Home page (already updated)
   - Species list page (already updated)

## Additional Improvements

1. The fallback system now works in three layers:
   - First tries the provided image URL
   - If that fails, it uses placehold.co to generate a placeholder with the species name
   - If that also fails, it uses a simpler fallback mechanism

2. Added proper TypeScript types for all components

3. Improved error handling to prevent common issues
