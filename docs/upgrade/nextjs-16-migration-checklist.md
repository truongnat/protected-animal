# Next.js 16 Migration Checklist

## Current Status
- ✅ Next.js: 16.1.1
- ✅ React: 19.2.3
- ✅ TypeScript: 5+
- ✅ Node.js: 20.9+ (assumed)

---

## Required Changes

### 1. ✅ Turbopack Configuration (Already Done)
Your `package.json` already uses Turbopack:
```json
"dev": "next dev --turbopack",
"build": "next build --turbopack"
```

**Action:** Remove `--turbopack` flags (Turbopack is default in v16)
```json
"dev": "next dev",
"build": "next build"
```

---

### 2. ⚠️ Async Request APIs (CRITICAL - Breaking Change)

These APIs MUST be accessed asynchronously:
- `cookies()`
- `headers()`
- `draftMode()`
- `params` in layouts, pages, routes
- `searchParams` in pages

**Files to Check:**
- [ ] `app/api/auth/*/route.ts` - Check for `cookies()`, `headers()`
- [ ] `app/species/[id]/page.tsx` - Check for `params`
- [ ] Any other dynamic routes

**Example Migration:**
```tsx
// ❌ Before (Next.js 15)
export default function Page({ params }) {
  const { id } = params
}

// ✅ After (Next.js 16)
export default async function Page({ params }) {
  const { id } = await params
}
```

---

### 3. ⚠️ Image Configuration Changes

#### a. `minimumCacheTTL` Default Changed
- Old default: 60 seconds
- New default: 4 hours (14400 seconds)

**Action:** If you need the old behavior, add to `next.config.mjs`:
```js
images: {
  minimumCacheTTL: 60,
}
```

#### b. `imageSizes` Default Changed
- Removed: `16` from default array
- New default: `[32, 48, 64, 96, 128, 256, 384]`

**Action:** If you use 16px images, add to config:
```js
images: {
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

#### c. `qualities` Default Changed
- Old: All qualities allowed
- New: Only `[75]`

**Action:** If you need multiple qualities:
```js
images: {
  qualities: [50, 75, 100],
}
```

---

### 4. ⚠️ Middleware → Proxy Rename

**Action:** Rename `middleware.ts` to `proxy.ts` (if exists)
```bash
mv middleware.ts proxy.ts
```

Update function name:
```ts
// ❌ Before
export function middleware(request) {}

// ✅ After
export function proxy(request) {}
```

---

### 5. ✅ Caching APIs (Stable)

Remove `unstable_` prefix:
```ts
// ❌ Before
import { unstable_cacheLife, unstable_cacheTag } from 'next/cache'

// ✅ After
import { cacheLife, cacheTag } from 'next/cache'
```

**New APIs Available:**
- `updateTag()` - For immediate cache updates
- `refresh()` - Refresh client router from Server Actions

---

### 6. ⚠️ Parallel Routes

All parallel route slots now require `default.js` files.

**Action:** Check for parallel routes and add `default.js`:
```tsx
// app/@modal/default.tsx
import { notFound } from 'next/navigation'

export default function Default() {
  notFound()
}
```

---

### 7. ✅ React Compiler (Optional)

Enable React Compiler for automatic memoization:
```js
// next.config.mjs
const nextConfig = {
  reactCompiler: true,
}
```

**Note:** Requires `babel-plugin-react-compiler`:
```bash
npm install -D babel-plugin-react-compiler
```

---

### 8. ⚠️ ESLint Changes

`next lint` command removed. Use ESLint directly.

**Action:** Update scripts in `package.json`:
```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

---

### 9. ✅ Concurrent Dev and Build

`next dev` now outputs to `.next/dev` instead of `.next`.

**Action:** Update any scripts that reference `.next` for dev:
```bash
# Old
npx next internal trace .next/trace-turbopack

# New
npx next internal trace .next/dev/trace-turbopack
```

---

### 10. ⚠️ Scroll Behavior

Next.js no longer overrides `scroll-behavior: smooth` by default.

**Action:** If you want the old behavior, add to `<html>`:
```tsx
<html data-scroll-behavior="smooth">
```

---

## Files to Update

### High Priority
1. [ ] `package.json` - Remove `--turbopack` flags
2. [ ] `app/api/auth/login/route.ts` - Make `cookies()` async
3. [ ] `app/api/auth/register/route.ts` - Make `cookies()` async
4. [ ] `app/api/auth/logout/route.ts` - Make `cookies()` async
5. [ ] `app/api/auth/me/route.ts` - Make `cookies()` async
6. [ ] `app/species/[id]/page.tsx` - Make `params` async
7. [ ] `middleware.ts` - Rename to `proxy.ts` (if exists)

### Medium Priority
8. [ ] `next.config.mjs` - Review image settings
9. [ ] `app/layout.tsx` - Add `data-scroll-behavior` if needed
10. [ ] Check for any `unstable_` imports

### Low Priority
11. [ ] Consider enabling React Compiler
12. [ ] Update ESLint configuration
13. [ ] Review caching strategies with new APIs

---

## Testing Checklist

After migration:
- [ ] `npm run dev` starts without errors
- [ ] `npm run build` completes successfully
- [ ] Authentication works (login/logout)
- [ ] Dynamic routes work (species/[id])
- [ ] Images load correctly
- [ ] No console errors in browser
- [ ] Dark mode works
- [ ] Mobile responsive

---

## Next Steps

1. Update `package.json` scripts
2. Run codemod for async APIs
3. Test authentication flows
4. Test dynamic routes
5. Review and update image configuration
6. Full application testing

---

## Resources

- [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [Async Request APIs](https://nextjs.org/docs/app/api-reference/functions/cookies)
- [Turbopack Configuration](https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack)
- [React 19.2 Features](https://react.dev/blog/2025/10/01/react-19-2)

---

#nextjs16 #migration #upgrade
