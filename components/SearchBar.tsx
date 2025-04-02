'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { type FormEvent, useState } from 'react';

interface SearchBarProps {
	placeholder?: string;
	className?: string;
}

export default function SearchBar({ placeholder = 'Search...', className = '' }: SearchBarProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

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
	};

	return (
		<form onSubmit={handleSubmit} className={`relative ${className}`}>
			<input
				type="text"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder={placeholder}
				className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
			/>
			<button
				type="submit"
				className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-green-700"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</button>
		</form>
	);
}
