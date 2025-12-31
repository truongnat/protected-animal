'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { type FormEvent, useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/lib/i18n/useTranslation';

/**
 * Props for the SearchBar component
 */
interface SearchBarProps {
	/** Placeholder text for the search input */
	placeholder?: string;
	/** Additional CSS classes to apply to the form */
	className?: string;
	/** Optional callback function when search is submitted */
	onSearch?: (search: string) => void;
	/** Default value for the search input */
	defaultValue?: string;
}

/**
 * Search bar component with form handling and URL parameter management
 *
 * Provides a search input with submit functionality. Can either use a callback
 * function or automatically update URL search parameters. Includes proper ARIA
 * labels and form handling for accessibility.
 *
 * @param {SearchBarProps} props - Component props
 * @returns Search bar component
 *
 * @example
 * ```tsx
 * // With callback
 * <SearchBar
 *   placeholder="Search species..."
 *   onSearch={(term) => console.log(term)}
 * />
 *
 * // With URL parameter management
 * <SearchBar placeholder="Search..." />
 * ```
 */
export default function SearchBar({
	placeholder,
	className = '',
	onSearch,
	defaultValue,
}: SearchBarProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { t } = useTranslation();
	const [searchTerm, setSearchTerm] = useState(defaultValue || searchParams.get('search') || '');

	const handleSubmit = useCallback(
		(e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			// Call onSearch callback if provided
			if (onSearch) {
				onSearch(searchTerm);
				return;
			}

			// Create a new URLSearchParams object from the current search params
			const params = new URLSearchParams(searchParams.toString());

			// Update or remove the search parameter
			if (searchTerm) {
				params.set('search', searchTerm);
			} else {
				params.delete('search');
			}

			// Reset to page 1 when searching
			params.set('page', '1');

			// Navigate to the new URL
			router.push(`/species?${params.toString()}`);
		},
		[searchTerm, onSearch, searchParams, router],
	);

	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	}, []);

	return (
		<form
			onSubmit={handleSubmit}
			className={`relative ${className}`}
			role="search"
			aria-label={t('common.search')}
		>
			<Input
				type="search"
				value={searchTerm}
				onChange={handleInputChange}
				placeholder={placeholder || t('common.search')}
				className="pr-10"
				aria-label={placeholder || t('common.search')}
			/>
			<Button
				type="submit"
				size="icon"
				variant="ghost"
				className="absolute inset-y-0 right-0"
				aria-label={t('common.search')}
			>
				<Search className="h-4 w-4" />
				<span className="sr-only">{t('common.search')}</span>
			</Button>
		</form>
	);
}
