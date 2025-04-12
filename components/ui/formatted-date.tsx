'use client';

import { useEffect, useState } from 'react';

interface FormattedDateProps {
	date: string;
	format?: 'short' | 'long';
}

export function FormattedDate({ date, format = 'long' }: FormattedDateProps) {
	const [formattedDate, setFormattedDate] = useState<string>(date);

	useEffect(() => {
		try {
			const dateObj = new Date(date);

			if (format === 'long') {
				setFormattedDate(
					dateObj.toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					}),
				);
			} else {
				setFormattedDate(
					dateObj.toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'short',
						day: 'numeric',
					}),
				);
			}
		} catch (error) {
			// If there's an error parsing the date, just use the original string
			console.error('Error formatting date:', error);
			setFormattedDate(date);
		}
	}, [date, format]);

	return <span>{formattedDate}</span>;
}
