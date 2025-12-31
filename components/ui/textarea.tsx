import type * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Textarea component
 *
 * A styled textarea component for multi-line text input.
 * Supports automatic height adjustment based on content.
 *
 * **Accessibility:** Always associate this textarea with a label element using the htmlFor/id pattern
 * or wrap it in a label element. For textareas without visible labels, use aria-label.
 *
 * @example
 * ```tsx
 * // With associated label
 * <div>
 *   <label htmlFor="description">Description</label>
 *   <Textarea
 *     id="description"
 *     placeholder="Enter description..."
 *   />
 * </div>
 *
 * // With aria-label (when no visible label)
 * <Textarea
 *   aria-label="Additional comments"
 *   placeholder="Comments..."
 * />
 *
 * // With custom rows
 * <Textarea rows={5} placeholder="Longer text area" />
 *
 * // Disabled state
 * <Textarea disabled placeholder="Disabled textarea" />
 * ```
 */
function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(
				'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
				className,
			)}
			{...props}
		/>
	);
}

export { Textarea };
