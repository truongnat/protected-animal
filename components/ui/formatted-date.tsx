'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

/**
 * Props for the FormattedDate component
 */
interface FormattedDateProps {
	/** The date string to format (ISO 8601 format recommended) */
	date: string;
	/** The format style for the date display */
	format?: 'short' | 'long';
}

/**
 * FormattedDate Component
 *
 * A client component that formats dates according to the user's selected locale.
 * Supports both English (en-US) and Vietnamese (vi-VN) locales with automatic
 * locale detection from the language context.
 *
 * The component uses the Intl.DateTimeFormat API for proper internationalization
 * and handles date parsing errors gracefully by falling back to the original string.
 *
 * @example
 * ```tsx
 * // Long format: "January 15, 2024" (en) or "15 tháng 1, 2024" (vi)
 * <FormattedDate date="2024-01-15" format="long" />
 *
 * // Short format: "Jan 15, 2024" (en) or "15 thg 1, 2024" (vi)
 * <FormattedDate date="2024-01-15" format="short" />
 * ```
 *
 * @param props - Component props
 * @returns Formatted date string wrapped in a span element
 */
export function FormattedDate({ date, format = 'long' }: FormattedDateProps) {
	const { language } = useLanguage();
	const [formattedDate, setFormattedDate] = useState<string>(date);

	useEffect(() => {
		try {
			const dateObj = new Date(date);

			// Check if date is valid
			if (Number.isNaN(dateObj.getTime())) {
				throw new Error('Invalid date');
			}

			// Map language to locale
			const locale = language === 'vi' ? 'vi-VN' : 'en-US';

			// Format options based on format prop
			const formatOptions: Intl.DateTimeFormatOptions =
				format === 'long'
					? {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						}
					: {
							year: 'numeric',
							month: 'short',
							day: 'numeric',
						};

			// Use Intl.DateTimeFormat for locale-aware formatting
			const formatter = new Intl.DateTimeFormat(locale, formatOptions);
			setFormattedDate(formatter.format(dateObj));
		} catch (error) {
			// If there's an error parsing the date, just use the original string
			console.error('Error formatting date:', error);
			setFormattedDate(date);
		}
	}, [date, format, language]);

	return <time dateTime={date}>{formattedDate}</time>;
}
