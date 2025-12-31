'use client';

import type { ThemeProviderProps } from 'next-themes';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

/**
 * ThemeProvider Component
 *
 * A wrapper component that provides theme context to the entire application using next-themes.
 * Enables dark mode support with system preference detection and smooth theme transitions.
 *
 * This component must be placed at the root of the application (typically in the layout)
 * to provide theme context to all child components.
 *
 * @example
 * ```tsx
 * // In app/layout.tsx
 * <ThemeProvider>
 *   <YourApp />
 * </ThemeProvider>
 * ```
 *
 * @param props - ThemeProviderProps from next-themes
 * @param props.children - Child components that will have access to theme context
 * @returns A theme provider wrapper component
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return (
		<NextThemesProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
			{...props}
		>
			{children}
		</NextThemesProvider>
	);
}
