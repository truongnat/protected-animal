import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
	'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
	{
		variants: {
			variant: {
				default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
				secondary:
					'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
				destructive:
					'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
				outline: 'text-foreground',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

/**
 * Badge component props interface
 *
 * @property {string} variant - Visual style variant of the badge
 */
export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

/**
 * Badge component
 *
 * A small label component for displaying status, categories, or tags.
 * Supports multiple variants for different semantic meanings.
 *
 * @example
 * ```tsx
 * // Default badge
 * <Badge>New</Badge>
 *
 * // Status badges
 * <Badge variant="destructive">Endangered</Badge>
 * <Badge variant="secondary">Protected</Badge>
 * <Badge variant="outline">Verified</Badge>
 *
 * // With custom styling
 * <Badge className="text-xs">Small Badge</Badge>
 *
 * // With aria-label for accessibility
 * <Badge variant="destructive" aria-label="Conservation status: Endangered">
 *   Endangered
 * </Badge>
 * ```
 */
function Badge({ className, variant, ...props }: BadgeProps) {
	return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
