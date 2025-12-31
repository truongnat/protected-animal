import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Input component props interface
 *
 * Extends native HTML input element props with additional styling support.
 */
export interface InputProps extends React.ComponentProps<'input'> {}

/**
 * Input component
 *
 * A styled input field component with consistent theming and accessibility support.
 * Supports all native HTML input attributes and types.
 *
 * **Accessibility:** Always associate this input with a label element using the htmlFor/id pattern
 * or wrap it in a label element. For inputs without visible labels, use aria-label.
 *
 * @example
 * ```tsx
 * // With associated label
 * <div>
 *   <label htmlFor="email">Email</label>
 *   <Input id="email" type="email" placeholder="Enter your email" />
 * </div>
 *
 * // With aria-label (when no visible label)
 * <Input type="search" aria-label="Search species" placeholder="Search..." />
 *
 * // Disabled state
 * <Input disabled placeholder="Disabled input" />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = 'Input';

export { Input };
