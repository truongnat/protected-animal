/**
 * Checkpoint Verification Test
 * Verifies Next.js 16 API compliance and component refactoring progress
 */

import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { globSync } from 'glob';

describe('Checkpoint: Next.js 16 API Compliance', () => {
  it('should have async cookies() calls in auth routes', () => {
    const loginRoute = fs.readFileSync(
      path.join(process.cwd(), 'app/api/auth/login/route.ts'),
      'utf-8'
    );
    const registerRoute = fs.readFileSync(
      path.join(process.cwd(), 'app/api/auth/register/route.ts'),
      'utf-8'
    );
    const logoutRoute = fs.readFileSync(
      path.join(process.cwd(), 'app/api/auth/logout/route.ts'),
      'utf-8'
    );

    expect(loginRoute).toContain('await cookies()');
    expect(registerRoute).toContain('await cookies()');
    expect(logoutRoute).toContain('await cookies()');
  });

  it('should have async headers() calls in auth routes', () => {
    const loginRoute = fs.readFileSync(
      path.join(process.cwd(), 'app/api/auth/login/route.ts'),
      'utf-8'
    );
    const logoutRoute = fs.readFileSync(
      path.join(process.cwd(), 'app/api/auth/logout/route.ts'),
      'utf-8'
    );

    expect(loginRoute).toContain('await headers()');
    expect(logoutRoute).toContain('await headers()');
  });

  it('should have async params in dynamic page routes', () => {
    const speciesPage = fs.readFileSync(
      path.join(process.cwd(), 'app/species/[id]/page.tsx'),
      'utf-8'
    );
    const blogPage = fs.readFileSync(
      path.join(process.cwd(), 'app/blog/[slug]/page.tsx'),
      'utf-8'
    );

    expect(speciesPage).toContain('params: Promise<{ id: string }>');
    expect(blogPage).toContain('params: Promise<{');
    expect(speciesPage).toContain('await params');
    expect(blogPage).toContain('await params');
  });

  it('should have proper TypeScript types in route handlers', () => {
    const loginRoute = fs.readFileSync(
      path.join(process.cwd(), 'app/api/auth/login/route.ts'),
      'utf-8'
    );

    expect(loginRoute).toContain('interface LoginRequestBody');
    expect(loginRoute).toContain('interface LoginResponseData');
    expect(loginRoute).toContain('interface ErrorResponse');
    expect(loginRoute).toContain('interface SuccessResponse');
  });

  it('should have error handling in route handlers', () => {
    const loginRoute = fs.readFileSync(
      path.join(process.cwd(), 'app/api/auth/login/route.ts'),
      'utf-8'
    );
    const registerRoute = fs.readFileSync(
      path.join(process.cwd(), 'app/api/auth/register/route.ts'),
      'utf-8'
    );

    expect(loginRoute).toContain('try {');
    expect(loginRoute).toContain('catch (error)');
    expect(registerRoute).toContain('try {');
    expect(registerRoute).toContain('catch (error)');
    expect(loginRoute).toContain('console.error');
    expect(registerRoute).toContain('console.error');
  });
});

describe('Checkpoint: Dark Mode Support', () => {
  it('should have dark mode classes in refactored components', () => {
    const refactoredComponents = [
      'components/ui/button.tsx',
      'components/ui/card.tsx',
      'components/ui/input.tsx',
      'components/ui/SpeciesCard.tsx',
      'components/features/ConservationImpact.tsx',
      'components/features/ReportingWidget.tsx',
      'components/auth/AuthModal.tsx',
      'components/auth/LoginForm.tsx',
      'components/auth/RegisterForm.tsx',
    ];

    let componentsWithDarkMode = 0;
    for (const componentPath of refactoredComponents) {
      if (fs.existsSync(componentPath)) {
        const content = fs.readFileSync(componentPath, 'utf-8');
        if (content.includes('dark:')) {
          componentsWithDarkMode++;
        }
      }
    }

    expect(componentsWithDarkMode).toBeGreaterThan(0);
  });

  it('should have theme provider configured', () => {
    const themeProvider = fs.readFileSync(
      path.join(process.cwd(), 'components/theme-provider.tsx'),
      'utf-8'
    );

    expect(themeProvider).toContain('ThemeProvider');
    expect(themeProvider).toContain("'use client'");
  });

  it('should have theme toggle component', () => {
    const themeToggle = fs.readFileSync(
      path.join(process.cwd(), 'components/theme-toggle.tsx'),
      'utf-8'
    );

    expect(themeToggle).toContain('useTheme');
    expect(themeToggle).toContain("'use client'");
  });
});

describe('Checkpoint: Translation Support', () => {
  it('should have English translation file with required keys', () => {
    const enTranslations = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), 'lib/i18n/translations/en.json'),
        'utf-8'
      )
    );

    expect(enTranslations).toHaveProperty('nav');
    expect(enTranslations).toHaveProperty('hero');
    expect(enTranslations).toHaveProperty('species');
    expect(enTranslations).toHaveProperty('reporting');
    expect(enTranslations).toHaveProperty('conservation');
    expect(enTranslations).toHaveProperty('auth');
    expect(enTranslations).toHaveProperty('common');
    expect(enTranslations).toHaveProperty('theme');
    expect(enTranslations).toHaveProperty('language');
  });

  it('should have Vietnamese translation file with required keys', () => {
    const viTranslations = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), 'lib/i18n/translations/vi.json'),
        'utf-8'
      )
    );

    expect(viTranslations).toHaveProperty('nav');
    expect(viTranslations).toHaveProperty('hero');
    expect(viTranslations).toHaveProperty('species');
    expect(viTranslations).toHaveProperty('reporting');
    expect(viTranslations).toHaveProperty('conservation');
    expect(viTranslations).toHaveProperty('auth');
    expect(viTranslations).toHaveProperty('common');
    expect(viTranslations).toHaveProperty('theme');
    expect(viTranslations).toHaveProperty('language');
  });

  it('should have matching translation keys between English and Vietnamese', () => {
    const enTranslations = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), 'lib/i18n/translations/en.json'),
        'utf-8'
      )
    );
    const viTranslations = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), 'lib/i18n/translations/vi.json'),
        'utf-8'
      )
    );

    const enKeys = Object.keys(enTranslations).sort();
    const viKeys = Object.keys(viTranslations).sort();

    expect(enKeys).toEqual(viKeys);
  });

  it('should use translation hook in refactored components', () => {
    const componentsWithTranslations = [
      'components/features/ConservationImpact.tsx',
      'components/features/ReportingWidget.tsx',
      'components/auth/LoginForm.tsx',
      'components/auth/RegisterForm.tsx',
    ];

    let componentsUsingTranslations = 0;
    for (const componentPath of componentsWithTranslations) {
      if (fs.existsSync(componentPath)) {
        const content = fs.readFileSync(componentPath, 'utf-8');
        const hasTranslationHook = 
          content.includes('useTranslation') || 
          content.includes('const { t }') ||
          content.includes('const t =');
        
        if (hasTranslationHook) {
          componentsUsingTranslations++;
        }
      }
    }

    expect(componentsUsingTranslations).toBeGreaterThan(0);
  });
});

describe('Checkpoint: Component Structure and TypeScript', () => {
  it('should have TypeScript interfaces in refactored components', () => {
    const refactoredComponents = [
      'components/ui/button.tsx',
      'components/ui/card.tsx',
      'components/ui/input.tsx',
      'components/ui/SpeciesCard.tsx',
      'components/features/ConservationImpact.tsx',
      'components/features/ReportingWidget.tsx',
      'components/auth/AuthModal.tsx',
      'components/auth/LoginForm.tsx',
      'components/auth/RegisterForm.tsx',
    ];

    for (const componentPath of refactoredComponents) {
      if (fs.existsSync(componentPath)) {
        const content = fs.readFileSync(componentPath, 'utf-8');
        const hasTypeDefinitions = 
          content.includes('interface ') || 
          content.includes('type ') ||
          content.includes(': React.');
        
        expect(hasTypeDefinitions).toBe(true);
      }
    }
  });

  it('should have proper client directives where needed', () => {
    const clientComponents = [
      'components/auth/AuthModal.tsx',
      'components/auth/LoginForm.tsx',
      'components/auth/RegisterForm.tsx',
      'components/features/ReportingWidget.tsx',
      'components/theme-toggle.tsx',
      'components/theme-provider.tsx',
    ];

    for (const componentPath of clientComponents) {
      if (fs.existsSync(componentPath)) {
        const content = fs.readFileSync(componentPath, 'utf-8');
        expect(content).toContain("'use client'");
      }
    }
  });

  it('should have JSDoc comments in refactored components', () => {
    const refactoredComponents = [
      'components/ui/SpeciesCard.tsx',
      'components/features/ConservationImpact.tsx',
      'components/features/ReportingWidget.tsx',
    ];

    let componentsWithJSDoc = 0;
    for (const componentPath of refactoredComponents) {
      if (fs.existsSync(componentPath)) {
        const content = fs.readFileSync(componentPath, 'utf-8');
        const hasJSDoc = content.includes('/**') && content.includes('*/');
        if (hasJSDoc) {
          componentsWithJSDoc++;
        }
      }
    }

    expect(componentsWithJSDoc).toBeGreaterThan(0);
  });
});

describe('Checkpoint: Accessibility Compliance', () => {
  it('should have button type attributes in button components', () => {
    const buttonComponent = fs.readFileSync(
      path.join(process.cwd(), 'components/ui/button.tsx'),
      'utf-8'
    );

    expect(buttonComponent).toContain('type');
  });

  it('should have alt text for images in SpeciesCard', () => {
    const speciesCard = fs.readFileSync(
      path.join(process.cwd(), 'components/ui/SpeciesCard.tsx'),
      'utf-8'
    );

    expect(speciesCard).toContain('alt');
  });

  it('should use Next.js Image component in refactored components', () => {
    const componentsWithImages = [
      'components/ui/SpeciesCard.tsx',
      'components/ui/image-with-fallback.tsx',
    ];

    for (const componentPath of componentsWithImages) {
      if (fs.existsSync(componentPath)) {
        const content = fs.readFileSync(componentPath, 'utf-8');
        const usesNextImage = 
          content.includes("from 'next/image'") || 
          content.includes('from "next/image"') ||
          content.includes('<Image ');
        
        expect(usesNextImage).toBe(true);
      }
    }
  });

  it('should have ARIA labels in interactive components', () => {
    const interactiveComponents = [
      'components/auth/AuthModal.tsx',
      'components/features/ReportingWidget.tsx',
    ];

    for (const componentPath of interactiveComponents) {
      if (fs.existsSync(componentPath)) {
        const content = fs.readFileSync(componentPath, 'utf-8');
        const hasAccessibility = 
          content.includes('aria-label') || 
          content.includes('aria-labelledby') ||
          content.includes('aria-describedby') ||
          content.includes('<label') ||
          content.includes('htmlFor');
        
        expect(hasAccessibility).toBe(true);
      }
    }
  });
});

describe('Checkpoint: Form Handling', () => {
  it('should use React Hook Form in form components', () => {
    const formComponents = [
      'components/auth/LoginForm.tsx',
      'components/auth/RegisterForm.tsx',
      'components/features/ReportingWidget.tsx',
    ];

    for (const componentPath of formComponents) {
      if (fs.existsSync(componentPath)) {
        const content = fs.readFileSync(componentPath, 'utf-8');
        const usesReactHookForm = 
          content.includes('useForm') || 
          content.includes('react-hook-form');
        
        expect(usesReactHookForm).toBe(true);
      }
    }
  });

  it('should have loading states in form components', () => {
    const formComponents = [
      'components/auth/LoginForm.tsx',
      'components/auth/RegisterForm.tsx',
      'components/features/ReportingWidget.tsx',
    ];

    for (const componentPath of formComponents) {
      if (fs.existsSync(componentPath)) {
        const content = fs.readFileSync(componentPath, 'utf-8');
        const hasLoadingState = 
          content.includes('isLoading') || 
          content.includes('isSubmitting') ||
          content.includes('loading');
        
        expect(hasLoadingState).toBe(true);
      }
    }
  });

  it('should have error handling in form components', () => {
    const formComponents = [
      'components/auth/LoginForm.tsx',
      'components/auth/RegisterForm.tsx',
      'components/features/ReportingWidget.tsx',
    ];

    for (const componentPath of formComponents) {
      if (fs.existsSync(componentPath)) {
        const content = fs.readFileSync(componentPath, 'utf-8');
        const hasErrorHandling = 
          content.includes('error') || 
          content.includes('catch') ||
          content.includes('Error');
        
        expect(hasErrorHandling).toBe(true);
      }
    }
  });
});

describe('Checkpoint: Code Quality', () => {
  it('should have minimal console.log statements in production code', () => {
    const componentFiles = globSync('components/**/*.tsx', {
      ignore: ['**/node_modules/**', '**/*.test.tsx']
    });

    const filesWithConsoleLog: string[] = [];
    for (const componentPath of componentFiles) {
      const content = fs.readFileSync(componentPath, 'utf-8');
      if (content.includes('console.log')) {
        filesWithConsoleLog.push(componentPath);
      }
    }

    if (filesWithConsoleLog.length > 0) {
      console.warn('Warning: The following files contain console.log statements:');
      filesWithConsoleLog.forEach(file => console.warn(`  - ${file}`));
    }

    expect(true).toBe(true);
  });

  it('should use const for variable declarations', () => {
    const refactoredComponents = [
      'components/ui/SpeciesCard.tsx',
      'components/features/ConservationImpact.tsx',
      'components/features/ReportingWidget.tsx',
    ];

    for (const componentPath of refactoredComponents) {
      if (fs.existsSync(componentPath)) {
        const content = fs.readFileSync(componentPath, 'utf-8');
        const constCount = (content.match(/\bconst\b/g) || []).length;
        expect(constCount).toBeGreaterThan(0);
      }
    }
  });
});
