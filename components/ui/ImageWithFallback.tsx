'use client';

import { getImageUrl } from '@/lib/utils';
import Image, { type ImageProps, type StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
	fallbackSrc?: string;
	altText?: string;
}

/**
 * A wrapper around Next.js Image component that provides fallback handling
 * when images fail to load.
 *
 * @param props - All standard Next.js Image props plus optional fallbackSrc and altText
 * @returns A Next.js Image component with error handling
 */
export default function ImageWithFallback({
	src,
	alt,
	fallbackSrc,
	altText,
	...props
}: ImageWithFallbackProps) {
	// Initialize with the source or empty string if not a string
	const [imgSrc, setImgSrc] = useState<string | StaticImageData>(
		typeof src === 'string' ? src : '',
	);
	const [error, setError] = useState<boolean>(false);

	// Generate a descriptive alt text if none provided
	const displayAlt = alt || altText || 'Image';

	// Reset error state if src changes
	useEffect(() => {
		setError(false);
	}, [src]);

	// Handle image load error
	const handleError = () => {
		if (error) {
			// If we're already showing a fallback and it failed, use a simple placeholder
			// This prevents infinite loops if both the original and fallback fail
			const placeholderUrl = `https://placehold.co/400x300/668F3C/FFFFFF?text=${encodeURIComponent(displayAlt || 'Image')}`;
			setImgSrc(placeholderUrl);
			return;
		}

		setError(true);

		// Use provided fallback or generate one using the utility function
		if (fallbackSrc) {
			setImgSrc(fallbackSrc);
		} else {
			// Create a placeholder with the name
			const placeholderUrl = getImageUrl(null, displayAlt);
			setImgSrc(placeholderUrl);
		}
	};

	// If src is empty or invalid, use fallback immediately
	useEffect(() => {
		if (!src || (typeof src === 'string' && src.trim() === '')) {
			handleError();
		}
	}, [src]);

	return <Image {...props} src={error ? imgSrc : src} alt={displayAlt} onError={handleError} />;
}
