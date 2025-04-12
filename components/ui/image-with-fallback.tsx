'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
	src: string;
	fallbackSrc: string;
}

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
