# Implementation Plan: Next.js 16 Component Refactoring

## Overview

This implementation plan breaks down the systematic refactoring of all React components to comply with Next.js 16 best practices. The tasks are organized by priority and component category, with each task building incrementally on previous work. Testing tasks are marked as optional (*) to allow for faster MVP delivery while maintaining the option for comprehensive testing.

## Tasks

- [x] 1. Setup and Infrastructure
  - Update package.json scripts to remove --turbopack flags (default in Next.js 16)
  - Configure TypeScript strict mode in tsconfig.json
  - Set up property-based testing infrastructure with ts-morph
  - Configure ESLint for Next.js 16 best practices
  - _Requirements: 15.1, 15.2_

- [ ]* 1.1 Write property test for TypeScript strict mode compliance
  - **Property 45: TypeScript Strict Mode**
  - **Validates: Requirements 15.2**

- [ ]* 1.2 Write property test for ESLint compliance
  - **Property 44: ESLint Compliance**
  - **Validates: Requirements 15.1**

- [x] 2. Update Route Handlers for Async APIs
  - [x] 2.1 Refactor app/api/auth/login/route.ts
    - Make cookies() and headers() calls async with await
    - Add proper TypeScript types for request/response
    - Add error handling and logging
    - _Requirements: 1.3, 1.4, 7.3, 7.5_

  - [x] 2.2 Refactor app/api/auth/register/route.ts
    - Make cookies() and headers() calls async with await
    - Add proper TypeScript types
    - Add error handling
    - _Requirements: 1.3, 1.4, 7.3_

  - [x] 2.3 Refactor app/api/auth/logout/route.ts
    - Make cookies() call async with await
    - Add proper TypeScript types
    - _Requirements: 1.3, 7.3_

  - [x] 2.4 Refactor app/api/auth/me/route.ts
    - Make cookies() call async with await
    - Add proper TypeScript types
    - _Requirements: 1.3, 7.3_

- [ ]* 2.5 Write property test for async API compliance
  - **Property 1: Async API Compliance**
  - **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5**

- [ ]* 2.6 Write unit tests for auth route handlers
  - Test successful authentication flows
  - Test error cases
  - _Requirements: 1.3, 1.4_

- [x] 3. Update Page Components with Async Params
  - [x] 3.1 Refactor app/species/[id]/page.tsx
    - Make component async
    - Await params before accessing id property
    - Add proper TypeScript interface for PageProps
    - _Requirements: 1.1, 3.1_

  - [x] 3.2 Check and update other dynamic route pages
    - Search for all [param] directories
    - Update any other pages using params
    - _Requirements: 1.1_

- [ ]* 3.3 Write unit tests for dynamic page components
  - Test page rendering with different params
  - Test error states
  - _Requirements: 1.1_

- [x] 4. Checkpoint - Verify Next.js 16 API Compliance
  - Run development server and test all routes
  - Verify no async API errors in console
  - Test authentication flows
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Refactor Core UI Components
  - [x] 5.1 Refactor components/ui/button.tsx
    - Add type="button" to non-submit buttons
    - Ensure proper TypeScript types
    - Add JSDoc documentation
    - Verify accessibility (ARIA labels)
    - _Requirements: 3.1, 5.1, 5.2, 10.1_

  - [x] 5.2 Refactor components/ui/card.tsx
    - Add proper TypeScript interfaces
    - Add JSDoc documentation
    - Ensure semantic HTML
    - _Requirements: 3.1, 10.1_

  - [x] 5.3 Refactor components/ui/input.tsx
    - Add proper TypeScript types
    - Ensure label associations
    - Add JSDoc documentation
    - _Requirements: 3.1, 5.3, 10.1_

  - [x] 5.4 Refactor components/ui/image-with-fallback.tsx
    - Use Next.js Image component
    - Add proper alt text handling
    - Add error fallback handling
    - Add TypeScript interfaces
    - _Requirements: 5.4, 13.1, 13.2, 13.3, 13.4_

- [ ]* 5.5 Write property test for button type attributes
  - **Property 13: Button Type Attribute**
  - **Validates: Requirements 5.1**

- [ ]* 5.6 Write property test for image alt text
  - **Property 16: Image Alt Text**
  - **Validates: Requirements 5.4**

- [ ]* 5.7 Write unit tests for core UI components
  - Test button variants and states
  - Test card rendering
  - Test input validation
  - Test image fallback behavior
  - _Requirements: 5.1, 5.3, 13.2_

- [x] 6. Refactor SpeciesCard Component
  - [x] 6.1 Update components/ui/SpeciesCard.tsx
    - Add comprehensive TypeScript interface for props
    - Extract sub-components if needed (image section, info section, actions)
    - Use Next.js Image component with proper sizing
    - Add translation hook for all text
    - Add dark mode support to all colors
    - Add proper ARIA labels
    - Add JSDoc documentation
    - _Requirements: 3.1, 5.2, 6.4, 8.3, 9.1, 10.1, 13.1_

- [ ]* 6.2 Write unit tests for SpeciesCard
  - Test rendering with different species data
  - Test interactive elements
  - Test accessibility
  - _Requirements: 3.1, 5.2_

- [x] 7. Refactor ConservationImpact Component (Already Partially Done)
  - [x] 7.1 Review and enhance components/features/ConservationImpact.tsx
    - Verify all sub-components have proper TypeScript interfaces
    - Ensure translation hook is used for all text
    - Add dark mode support verification
    - Add JSDoc documentation
    - Verify accessibility of tab navigation
    - _Requirements: 3.1, 5.2, 8.3, 9.1, 10.1_

- [ ]* 7.2 Write property test for translation usage
  - **Property 27: Translation Hook Usage**
  - **Validates: Requirements 9.1, 9.4**

- [ ]* 7.3 Write unit tests for ConservationImpact
  - Test tab switching
  - Test data rendering
  - Test responsive layouts
  - _Requirements: 3.1, 9.1_

- [x] 8. Refactor ReportingWidget Component
  - [x] 8.1 Update components/features/ReportingWidget.tsx
    - Add proper TypeScript interfaces
    - Extract sub-components if file is large
    - Use React Hook Form for form handling
    - Add form validation and error display
    - Add loading states for submission
    - Add translation hook for all text
    - Add JSDoc documentation
    - _Requirements: 3.1, 7.4, 9.1, 10.1, 12.1, 12.2_

- [ ]* 8.2 Write property test for form validation
  - **Property 36: React Hook Form Usage**
  - **Validates: Requirements 12.1**

- [ ]* 8.3 Write unit tests for ReportingWidget
  - Test form submission
  - Test validation errors
  - Test loading states
  - _Requirements: 12.1, 12.2_

- [x] 9. Refactor Authentication Components
  - [x] 9.1 Update components/auth/AuthModal.tsx
    - Add proper TypeScript interfaces
    - Ensure 'use client' directive is present
    - Add proper ARIA labels for modal
    - Add keyboard navigation support
    - Add JSDoc documentation
    - _Requirements: 3.1, 4.2, 5.2, 10.1_

  - [x] 9.2 Update components/auth/LoginForm.tsx
    - Use React Hook Form
    - Add proper TypeScript interfaces
    - Add form validation with error messages
    - Add loading states
    - Add translation hook
    - _Requirements: 3.1, 9.1, 12.1, 12.2_

  - [x] 9.3 Update components/auth/RegisterForm.tsx
    - Use React Hook Form
    - Add proper TypeScript interfaces
    - Add form validation with error messages
    - Add loading states
    - Add translation hook
    - _Requirements: 3.1, 9.1, 12.1, 12.2_

- [ ]* 9.4 Write unit tests for authentication components
  - Test modal open/close
  - Test form submissions
  - Test validation
  - _Requirements: 4.2, 12.1_

- [x] 10. Checkpoint - Review Component Refactoring Progress
  - Test all refactored components in browser
  - Verify dark mode works correctly
  - Verify translations work for both languages
  - Run accessibility audit with axe-core
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Refactor Chart Components
  - [x] 11.1 Update components/charts/SpeciesCharts.tsx
    - Add proper TypeScript interfaces
    - Determine if should be client or server component
    - Add 'use client' if needed for chart library
    - Add loading and error states
    - Add translation hook for labels
    - Add JSDoc documentation
    - _Requirements: 3.1, 4.2, 6.5, 7.1, 9.1, 10.1_

  - [x] 11.2 Update components/charts/ConservationStatusChart.tsx
    - Add proper TypeScript interfaces
    - Add 'use client' if needed
    - Add translation hook
    - _Requirements: 3.1, 4.2, 9.1_

  - [x] 11.3 Update components/charts/PopulationChart.tsx
    - Add proper TypeScript interfaces
    - Add 'use client' if needed
    - Add translation hook
    - _Requirements: 3.1, 4.2, 9.1_

  - [x] 11.4 Update components/charts/RegionChart.tsx
    - Add proper TypeScript interfaces
    - Add 'use client' if needed
    - Add translation hook
    - _Requirements: 3.1, 4.2, 9.1_

- [ ]* 11.5 Write property test for client directive usage
  - **Property 11: Client Directive for Interactivity**
  - **Validates: Requirements 4.2**

- [ ]* 11.6 Write unit tests for chart components
  - Test chart rendering with data
  - Test empty states
  - Test error states
  - _Requirements: 6.5, 7.1_

- [x] 12. Refactor Navigation Components
  - [x] 12.1 Update components/Navbar.tsx
    - Add proper TypeScript interfaces
    - Ensure 'use client' directive
    - Extract sub-components (UserMenu, LanguageSelector, etc.)
    - Add proper ARIA labels for navigation
    - Add keyboard navigation support
    - Add translation hook
    - Add JSDoc documentation
    - _Requirements: 2.1, 3.1, 4.2, 5.2, 9.1, 10.1_

  - [x] 12.2 Update components/Footer.tsx
    - Add proper TypeScript interfaces
    - Determine if can be server component
    - Add translation hook
    - Add JSDoc documentation
    - _Requirements: 3.1, 4.1, 9.1, 10.1_

  - [x] 12.3 Update components/SearchBar.tsx
    - Add proper TypeScript interfaces
    - Ensure 'use client' directive
    - Add proper form handling
    - Add ARIA labels
    - Add translation hook
    - _Requirements: 3.1, 4.2, 5.2, 5.3, 9.1_

- [ ]* 12.4 Write unit tests for navigation components
  - Test navbar interactions
  - Test search functionality
  - Test responsive behavior
  - _Requirements: 4.2, 5.2_

- [x] 13. Refactor Theme Components
  - [x] 13.1 Update components/theme-toggle.tsx
    - Add proper TypeScript interfaces
    - Ensure 'use client' directive
    - Add ARIA labels
    - Add translation hook
    - Add JSDoc documentation
    - _Requirements: 3.1, 4.2, 5.2, 9.1, 10.1_

  - [x] 13.2 Update components/theme-provider.tsx
    - Add proper TypeScript interfaces
    - Ensure 'use client' directive
    - Add JSDoc documentation
    - _Requirements: 3.1, 4.2, 10.1_

- [ ]* 13.3 Write unit tests for theme components
  - Test theme switching
  - Test theme persistence
  - _Requirements: 4.2_

- [x] 14. Refactor Provider Components
  - [x] 14.1 Update components/providers/QueryProvider.tsx
    - Add proper TypeScript interfaces
    - Ensure 'use client' directive
    - Add error boundary
    - Add JSDoc documentation
    - _Requirements: 3.1, 4.2, 7.2, 10.1_

- [ ]* 14.2 Write unit tests for provider components
  - Test provider wrapping
  - Test error boundaries
  - _Requirements: 4.2, 7.2_

- [x] 15. Refactor Species List Component
  - [x] 15.1 Update components/species/SpeciesListClient.tsx
    - Add proper TypeScript interfaces
    - Ensure 'use client' directive
    - Use React Query for data fetching
    - Add loading and error states
    - Add proper list keys
    - Add translation hook
    - Add JSDoc documentation
    - _Requirements: 3.1, 4.2, 6.1, 6.5, 7.1, 9.1, 10.1, 11.2_

- [ ]* 15.2 Write property test for list key props
  - **Property 17: List Key Props**
  - **Validates: Requirements 6.1**

- [ ]* 15.3 Write unit tests for species list
  - Test list rendering
  - Test filtering
  - Test loading states
  - _Requirements: 6.1, 6.5, 11.2_

- [x] 16. Refactor VietnamHeroSection Component
  - [x] 16.1 Update components/ui/VietnamHeroSection.tsx
    - Add proper TypeScript interfaces
    - Ensure 'use client' directive if needed
    - Extract sub-components if large
    - Use Next.js Image component
    - Add translation hook
    - Add dark mode support
    - Add JSDoc documentation
    - _Requirements: 2.1, 3.1, 4.2, 8.3, 9.1, 10.1, 13.1_

- [ ]* 16.2 Write unit tests for VietnamHeroSection
  - Test rendering
  - Test responsive behavior
  - Test dark mode
  - _Requirements: 8.3, 13.1_

- [x] 17. Refactor Blog Components
  - [x] 17.1 Update components/features/blog/mdx-content.tsx
    - Add proper TypeScript interfaces
    - Ensure 'use client' directive if needed
    - Add error handling
    - Add JSDoc documentation
    - _Requirements: 3.1, 7.1, 10.1_

  - [x] 17.2 Update components/ui/formatted-date.tsx
    - Add proper TypeScript interfaces
    - Use locale-aware date formatting
    - Add JSDoc documentation
    - _Requirements: 3.1, 9.2, 10.1_

- [ ]* 17.3 Write property test for locale-aware formatting
  - **Property 28: Locale-Aware Date Formatting**
  - **Validates: Requirements 9.2**

- [ ]* 17.4 Write unit tests for blog components
  - Test MDX rendering
  - Test date formatting
  - _Requirements: 9.2_

- [x] 18. Checkpoint - Final Component Review
  - Review all refactored components
  - Run full test suite
  - Run accessibility audit
  - Test all user flows
  - Ensure all tests pass, ask the user if questions arise.

- [x] 19. Write Comprehensive Property-Based Tests
  - [x]* 19.1 Write property test for component size constraint
    - **Property 2: Component Size Constraint**
    - **Validates: Requirements 2.1**

  - [x]* 19.2 Write property test for JSX reusability
    - **Property 3: JSX Reusability**
    - **Validates: Requirements 2.2**

  - [x]* 19.3 Write property test for directory organization
    - **Property 4: Directory Organization**
    - **Validates: Requirements 2.5**

  - [x]* 19.4 Write property test for props interface definition
    - **Property 5: Props Interface Definition**
    - **Validates: Requirements 3.1**

  - [x]* 19.5 Write property test for state type annotation
    - **Property 6: State Type Annotation**
    - **Validates: Requirements 3.2**

  - [x]* 19.6 Write property test for no implicit any
    - **Property 9: No Implicit Any**
    - **Validates: Requirements 3.5**

  - [x]* 19.7 Write property test for server component default
    - **Property 10: Server Component Default**
    - **Validates: Requirements 4.1**

  - [x]* 19.8 Write property test for interactive ARIA labels
    - **Property 14: Interactive ARIA Labels**
    - **Validates: Requirements 5.2**

  - [x]* 19.9 Write property test for form input labels
    - **Property 15: Form Input Labels**
    - **Validates: Requirements 5.3**

  - [x]* 19.10 Write property test for Next.js Image usage
    - **Property 18: Next.js Image Usage**
    - **Validates: Requirements 6.4**

  - [x]* 19.11 Write property test for Tailwind CSS styling
    - **Property 23: Tailwind CSS Styling**
    - **Validates: Requirements 8.1, 8.5**

  - [x]* 19.12 Write property test for dark mode support
    - **Property 25: Dark Mode Support**
    - **Validates: Requirements 8.3**

  - [x]* 19.13 Write property test for const variable declaration
    - **Property 46: Const Variable Declaration**
    - **Validates: Requirements 15.3**

  - [x]* 19.14 Write property test for import organization
    - **Property 47: Import Organization**
    - **Validates: Requirements 15.4**

  - [x]* 19.15 Write property test for no unused code
    - **Property 48: No Unused Code**
    - **Validates: Requirements 15.5**

- [ ] 20. Documentation and Examples
  - [x] 20.1 Create component usage examples
    - Add examples to JSDoc for reusable UI components
    - Create README for ui/ directory with examples
    - _Requirements: 10.5_

  - [x] 20.2 Update project documentation
    - Document Next.js 16 migration changes
    - Document component patterns and best practices
    - Document testing approach
    - _Requirements: 10.1, 10.2, 10.3_

  - [x] 20.3 Create migration guide
    - Document breaking changes
    - Document new patterns
    - Provide before/after examples
    - _Requirements: 10.1_

- [x] 21. Final Checkpoint - Production Readiness
  - Run full test suite (unit + property tests)
  - Run TypeScript compilation with strict mode
  - Run ESLint on entire codebase
  - Run accessibility audit with axe-core
  - Test all pages in development mode
  - Build production bundle and test
  - Verify no console errors or warnings
  - Test dark mode across all pages
  - Test both English and Vietnamese languages
  - Test responsive layouts on mobile/tablet/desktop
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation and allow for user feedback
- Property tests validate universal correctness properties across all components
- Unit tests validate specific examples and edge cases
- The refactoring is organized by component category for logical progression
- Each component refactoring follows the same pattern for consistency
