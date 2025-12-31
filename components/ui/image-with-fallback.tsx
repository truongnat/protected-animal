'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

/**
 * ImageWithFallback component props interface
 *
 * @property {string} src - Primary image source URL
 * @property {string} fallbackSrc - Fallback image source URL to use if primary fails to load
 * @property {string} alt - Alternative text describing the image content (required for accessibility)
 */
export interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
	src: string;
	fallbackSrc: string;
	alt: string;
}

/**
 * ImageWithFallback component
 *
 * An enhanced Next.js Image component that automatically falls back to an alternative image
 * if the primary image fails to load. Uses Next.js Image component for automatic optimization,
 * lazy loading, and responsive sizing.
 *
 * **Accessibility:** The alt prop is required and must provide meaningful description for content images.
 * Use empty string (alt="") only for purely decorative images.
 *
 * @example
 * ```tsx
 * // Content image with descriptive alt text
 * <ImageWithFallback
 *   src="/species/tiger.jpg"
 *   fallbackSrc="/images/default-image.jpg"
 *   alt="Bengal tiger in natural habitat"
 *   width={400}
 *   height={300}
 * />
 *
 * // Decorative image (use sparingly)
 * <ImageWithFallback
 *   src="/decorations/pattern.jpg"
 *   fallbackSrc="/decorations/default-pattern.jpg"
 *   alt=""
 *   width={100}
 *   height={100}
 * />
 *
 * // With fill layout
 * <div className="relative w-full h-64">
 *   <ImageWithFallback
 *     src="/hero-image.jpg"
 *     fallbackSrc="/default-hero.jpg"
 *     alt="Wildlife conservation hero image"
 *     fill
 *     className="object-cover"
 *   />
 * </div>
 * ```
 */
export default function ImageWithFallback({
	src,
	fallbackSrc,
	alt,
	...rest
}: ImageWithFallbackProps) {
	const [imgSrc, setImgSrc] = useState(src);

	return (
		<Image
			{...rest}
			src={imgSrc}
			alt={alt}
			onError={() => {
				setImgSrc(fallbackSrc);
			}}
		/>
	);
}
