# Tailwind CSS v4 PostCSS Configuration Fix

## Issue

The error message indicated that Tailwind CSS v4 has moved its PostCSS plugin to a separate package:

```
Error: It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin. The PostCSS plugin has moved to a separate package, so to continue using Tailwind CSS with PostCSS you'll need to install `@tailwindcss/postcss` and update your PostCSS configuration.
```

## Solution

### 1. Install the required packages

```bash
pnpm add -D @tailwindcss/postcss autoprefixer
```

### 2. Update PostCSS configuration

Create or update `postcss.config.js` with the following content:

```javascript
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
```

### 3. Remove the old PostCSS configuration (if it exists)

If you have a `postcss.config.mjs` file, you can either:
- Delete it
- Or rename it to `postcss.config.js.bak` to keep it as a backup

### 4. Restart your development server

```bash
pnpm dev
```

## Why This Works

In Tailwind CSS v4, the PostCSS plugin has been moved to a separate package called `@tailwindcss/postcss`. This change was made to improve the modularity of the codebase and to allow for better maintenance of the PostCSS integration.

The new configuration format uses the object syntax for plugins, which is the recommended approach in the official Tailwind CSS documentation.

## Additional Information

- Tailwind CSS v4 documentation: https://tailwindcss.com/docs/installation
- PostCSS documentation: https://github.com/postcss/postcss

If you encounter any other issues with Tailwind CSS v4, refer to the official migration guide: https://tailwindcss.com/docs/upgrade-guide
