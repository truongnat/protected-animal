# Remove All Custom Styling - Implementation Plan

## Date: 2025-12-28
## Status: 🔄 In Progress

---

## Goal

Remove ALL custom color styling (green, yellow, emerald, red, blue, orange) and replace with default shadcn UI semantic tokens.

---

## Shadcn Color Tokens to Use

### Text Colors
- `text-foreground` - Primary text
- `text-muted-foreground` - Secondary/muted text  
- `text-primary` - Links, accents
- `text-destructive` - Errors, warnings, critical actions
- `text-secondary-foreground` - Secondary elements

### Background Colors
- `bg-background` - Page/component background
- `bg-card` - Card backgrounds
- `bg-muted` - Muted sections
- `bg-primary` - Primary actions
- `bg-destructive` - Destructive actions
- `bg-secondary` - Secondary actions

### Border Colors
- `border` - Default borders
- `border-destructive` - Error borders
- `border-muted` - Muted borders

---

## Files Completed

1. ✅ `components/Navbar.tsx` - Using default shadcn
2. ✅ `components/Footer.tsx` - Using `bg-background`, `text-muted-foreground`
3. ✅ `components/auth/AuthModal.tsx` - Using default shadcn
4. ✅ `components/auth/LoginForm.tsx` - Using `text-destructive`
5. ✅ `components/auth/RegisterForm.tsx` - Using `text-destructive`
6. ✅ `components/ui/dialog.tsx` - Official shadcn
7. ✅ `components/ui/dropdown-menu.tsx` - Official shadcn
8. ✅ `components/ui/button.tsx` - Official shadcn
9. ✅ `components/ui/badge.tsx` - Official shadcn
10. ✅ `components/ui/tabs.tsx` - Official shadcn
11. ✅ `app/globals.css` - HSL color variables

---

## Files Needing Updates

### High Priority (Core UI)
- [ ] `components/ui/SpeciesCard.tsx` - Remove custom green/red/yellow
- [ ] `components/ui/VietnamHeroSection.tsx` - Remove emerald/green/yellow gradients
- [ ] `components/SearchBar.tsx` - Remove green hover
- [ ] `components/features/ReportingWidget.tsx` - Remove red/yellow/green
- [ ] `components/features/ConservationImpact.tsx` - Remove green colors

### Medium Priority (Pages)
- [ ] `app/landing/page.tsx` - Remove green/red/blue buttons
- [ ] `app/species/page.tsx` - Remove green hero
- [ ] `app/species/[id]/page.tsx` - Remove green hero, red badge
- [ ] `app/report/page.tsx` - Remove yellow/red
- [ ] `app/about/page.tsx` - Remove green colors

### Low Priority (Other)
- [ ] `components/charts/SpeciesCharts.tsx` - Remove green button
- [ ] `components/features/blog/mdx-content.tsx` - Remove red error styling
- [ ] `app/species/[id]/not-found.tsx` - Remove green button

---

## Replacement Strategy

### Conservation Status Colors (KEEP SEMANTIC)
These should stay because they have meaning:
```tsx
// Keep these - they're semantic
'CR' (Critically Endangered): bg-destructive
'EN' (Endangered): bg-orange-500 (or create custom token)
'VU' (Vulnerable): bg-yellow-500 (or create custom token)
'NT' (Near Threatened): bg-blue-500 (or create custom token)
'LC' (Least Concern): bg-green-500 (or create custom token)
```

### Buttons
```tsx
// Before
className="bg-green-600 hover:bg-green-700"

// After
<Button>Default</Button>
<Button variant="destructive">Critical Action</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
```

### Hero Sections
```tsx
// Before
className="bg-gradient-to-r from-emerald-800 via-green-800 to-emerald-900"

// After
className="bg-card border-b"
// Or use an image background with overlay
```

### Alerts/Notices
```tsx
// Before
className="bg-yellow-50 border border-yellow-200 text-yellow-800"

// After
// Use shadcn Alert component
<Alert>
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>Message</AlertDescription>
</Alert>
```

### Stats/Metrics
```tsx
// Before
className="bg-green-100 text-green-700"

// After
className="bg-muted text-foreground"
// Or use Badge component
<Badge>+15%</Badge>
```

---

## Components to Install

Need to install these shadcn components:
```bash
npx shadcn@latest add alert
npx shadcn@latest add card
npx shadcn@latest add separator
```

---

## Next Steps

1. Install missing shadcn components (Alert, Card, Separator)
2. Update SpeciesCard to use Card component
3. Update VietnamHeroSection to use Card/default styling
4. Update all feature components
5. Update all page components
6. Test in both light and dark modes
7. Verify accessibility

---

## Benefits

1. **Consistency** - All components look cohesive
2. **Maintainability** - Easy to update theme
3. **Accessibility** - Proper contrast ratios
4. **Dark Mode** - Automatic support
5. **Professional** - Modern, clean design

---

## Status: 🔄 IN PROGRESS

Core navigation and auth components complete. Working on feature components next.

---

#styling #shadcn #cleanup #refactor
