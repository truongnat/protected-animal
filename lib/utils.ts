import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines and merges CSS class names efficiently.
 *
 * @param {...ClassValue[]} inputs - Any number of class values to be combined.
 * @returns {string} A string of merged and optimized class names.
 */
export function cn(...inputs: ClassValue[]) {
	// Use clsx to conditionally join classNames, then pass the result to twMerge
	// twMerge efficiently merges Tailwind CSS classes, removing conflicts
	return twMerge(clsx(inputs));
}

/**
 * Utility function to get a fallback image URL if the provided URL is invalid or missing
 * @param imageUrl The original image URL
 * @param name The name to use in the placeholder image
 * @param bgColor Optional background color for the placeholder (default: 668F3C - green)
 * @param textColor Optional text color for the placeholder (default: FFFFFF - white)
 * @returns A valid image URL
 */
export function getImageUrl(
	imageUrl: string | null | undefined,
	name: string,
	bgColor: string = '668F3C',
	textColor: string = 'FFFFFF'
): string {
	// If the image URL is valid, return it
	if (imageUrl && imageUrl.startsWith('http')) {
		return imageUrl;
	}

	// Clean the name for use in the placeholder
	const cleanName = name ? name.trim().substring(0, 20) : 'Image';

	// Create a placeholder image with the provided colors using placehold.co
	return `https://placehold.co/400x300/${bgColor}/${textColor}?text=${encodeURIComponent(cleanName)}`;
}

/**
 * Utility function to check if a URL is an external URL
 * @param url The URL to check
 * @returns True if the URL is external, false otherwise
 */
export function isExternalUrl(url: string): boolean {
	return url.startsWith('http') || url.startsWith('//');
}
