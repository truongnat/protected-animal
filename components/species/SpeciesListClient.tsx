'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import SpeciesCard from '@/components/ui/SpeciesCard';
import type { Species, SpeciesFilters } from '@/lib/core/domain/entities/species';
import { useFilterOptions, useSpecies } from '@/lib/hooks/useSpecies';
import { useTranslation } from '@/lib/i18n/useTranslation';

/**
 * SpeciesListClient Component
 *
 * A client-side component that displays a filterable and searchable list of species.
 * Uses React Query for data fetching and provides loading/error states.
 * Supports filtering by region and conservation status, with pagination.
 *
 * @component
 * @example
 * ```tsx
 * <SpeciesListClient initialFilters={{ region: 'Southeast Asia' }} />
 * ```
 */

/**
 * Props for the SpeciesListClient component
 */
interface SpeciesListClientProps {
	/** Initial filter values to apply on component mount */
	initialFilters?: SpeciesFilters;
}

/**
 * Response structure from the species API
 */
interface SpeciesApiResponse {
	data: Species[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
		hasPrevPage: boolean;
		hasNextPage: boolean;
	};
}

/**
 * Response structure from the filter options API
 */
interface FilterOptionsResponse {
	regions: string[];
	statuses: string[];
}

/**
 * Main component for displaying and filtering species list
 */
export default function SpeciesListClient({ initialFilters = {} }: SpeciesListClientProps) {
	const { t } = useTranslation();
	const [filters, setFilters] = useState<SpeciesFilters>(initialFilters);

	// Use React Query hooks for data fetching
	const { data: speciesData, isLoading: speciesLoading, error: speciesError } = useSpecies(filters);

	const {
		data: filterOptions,
		isLoading: filtersLoading,
		error: filtersError,
	} = useFilterOptions();

	// Type-safe data with proper casting
	const typedSpeciesData = speciesData as SpeciesApiResponse | undefined;
	const typedFilterOptions = filterOptions as FilterOptionsResponse | undefined;

	/**
	 * Updates filters with new values and resets to page 1
	 */
	const handleFilterChange = (newFilters: Partial<SpeciesFilters>): void => {
		setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
	};

	/**
	 * Updates search filter and resets to page 1
	 */
	const handleSearch = (search: string): void => {
		setFilters((prev) => ({ ...prev, search, page: 1 }));
	};

	/**
	 * Changes the current page
	 */
	const handlePageChange = (page: number): void => {
		setFilters((prev) => ({ ...prev, page }));
	};

	// Error state for species data
	if (speciesError) {
		return (
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="text-center">
					<p className="text-red-600 dark:text-red-400">
						{t('common.error')}: {t('species.errorLoading')}
					</p>
					<button
						type="button"
						onClick={() => window.location.reload()}
						className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
					>
						{t('common.retry')}
					</button>
				</div>
			</div>
		);
	}

	return (
		<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<div className="flex flex-col md:flex-row gap-8">
				{/* Filters Sidebar */}
				<aside className="w-full md:w-64 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
					<h2 className="text-xl font-semibold mb-4 dark:text-white">{t('common.filter')}</h2>

					{filtersLoading ? (
						<div className="space-y-4" role="status" aria-label={t('common.loading')}>
							<div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 rounded" />
							<div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 rounded" />
						</div>
					) : filtersError ? (
						<div className="text-red-600 dark:text-red-400 text-sm">{t('common.error')}</div>
					) : (
						<>
							{/* Region Filter */}
							<div className="mb-6">
								<h3 className="text-lg font-medium mb-2 dark:text-gray-200">
									{t('species.filters.region')}
								</h3>
								<div className="space-y-2" role="group" aria-label={t('species.filters.region')}>
									<button
										type="button"
										onClick={() => handleFilterChange({ region: undefined })}
										className={`block w-full text-left py-1 px-2 rounded transition-colors ${
											!filters.region
												? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
												: 'hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-gray-300'
										}`}
										aria-pressed={!filters.region}
									>
										{t('species.filters.allRegions')}
									</button>
									{typedFilterOptions?.regions?.map((region: string) => (
										<button
											key={region}
											type="button"
											onClick={() => handleFilterChange({ region })}
											className={`block w-full text-left py-1 px-2 rounded transition-colors ${
												filters.region === region
													? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
													: 'hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-gray-300'
											}`}
											aria-pressed={filters.region === region}
										>
											{region}
										</button>
									))}
								</div>
							</div>

							{/* Conservation Status Filter */}
							<div className="mb-6">
								<h3 className="text-lg font-medium mb-2 dark:text-gray-200">
									{t('species.filters.status')}
								</h3>
								<div className="space-y-2" role="group" aria-label={t('species.filters.status')}>
									<button
										type="button"
										onClick={() => handleFilterChange({ status: undefined })}
										className={`block w-full text-left py-1 px-2 rounded transition-colors ${
											!filters.status
												? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
												: 'hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-gray-300'
										}`}
										aria-pressed={!filters.status}
									>
										{t('species.filters.allStatuses')}
									</button>
									{typedFilterOptions?.statuses?.map((status: string) => (
										<button
											key={status}
											type="button"
											onClick={() => handleFilterChange({ status })}
											className={`block w-full text-left py-1 px-2 rounded transition-colors ${
												filters.status === status
													? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
													: 'hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-gray-300'
											}`}
											aria-pressed={filters.status === status}
										>
											{status}
										</button>
									))}
								</div>
							</div>
						</>
					)}
				</aside>

				{/* Main Content */}
				<div className="flex-1">
					{/* Search and Results Summary */}
					<div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<h2 className="text-2xl font-semibold dark:text-white">
							{speciesLoading ? (
								<div
									className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-48 rounded"
									role="status"
									aria-label={t('common.loading')}
								/>
							) : (
								<>
									{typedSpeciesData?.pagination?.total || 0} {t('species.found')}
									{filters.region && (
										<span>
											{' '}
											{t('species.inRegion')} {filters.region}
										</span>
									)}
									{filters.status && (
										<span>
											{' '}
											{t('species.withStatus')} "{filters.status}"
										</span>
									)}
									{filters.search && (
										<span>
											{' '}
											{t('species.matching')} "{filters.search}"
										</span>
									)}
								</>
							)}
						</h2>
						<div className="w-full md:w-64">
							<SearchBar
								placeholder={t('species.searchPlaceholder')}
								onSearch={handleSearch}
								defaultValue={filters.search}
							/>
						</div>
					</div>

					{/* Species Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						{speciesLoading ? (
							// Loading skeletons
							Array.from({ length: 6 }).map((_, index) => (
								<div
									key={`skeleton-${index}`}
									className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md"
									role="status"
									aria-label={t('common.loading')}
								>
									<div className="animate-pulse">
										<div className="h-48 bg-gray-200 dark:bg-gray-700" />
										<div className="p-6 space-y-3">
											<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
											<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
											<div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full" />
											<div className="h-16 bg-gray-200 dark:bg-gray-700 rounded" />
										</div>
									</div>
								</div>
							))
						) : typedSpeciesData?.data && typedSpeciesData.data.length > 0 ? (
							typedSpeciesData.data.map((species: Species) => (
								<SpeciesCard key={species.id} species={species} showActions />
							))
						) : (
							<div className="col-span-3 text-center py-8">
								<p className="text-gray-500 dark:text-gray-400">{t('common.noResults')}</p>
							</div>
						)}
					</div>

					{/* Pagination */}
					{typedSpeciesData?.pagination && typedSpeciesData.pagination.totalPages > 1 && (
						<nav className="mt-12 flex justify-center" aria-label={t('species.pagination')}>
							<div className="flex items-center space-x-2">
								<button
									type="button"
									onClick={() =>
										handlePageChange(Math.max(1, typedSpeciesData.pagination.page - 1))
									}
									disabled={!typedSpeciesData.pagination.hasPrevPage}
									className={`px-4 py-2 border rounded transition-colors ${
										!typedSpeciesData.pagination.hasPrevPage
											? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
											: 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
									}`}
									aria-label={t('common.previous')}
								>
									{t('common.previous')}
								</button>

								{Array.from(
									{ length: typedSpeciesData.pagination.totalPages },
									(_, i) => i + 1,
								).map((page) => (
									<button
										key={page}
										type="button"
										onClick={() => handlePageChange(page)}
										className={`px-4 py-2 border rounded transition-colors ${
											typedSpeciesData.pagination.page === page
												? 'bg-green-600 dark:bg-green-700 text-white'
												: 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
										}`}
										aria-label={`${t('common.page')} ${page}`}
										aria-current={typedSpeciesData.pagination.page === page ? 'page' : undefined}
									>
										{page}
									</button>
								))}

								<button
									type="button"
									onClick={() =>
										handlePageChange(
											Math.min(
												typedSpeciesData.pagination.totalPages,
												typedSpeciesData.pagination.page + 1,
											),
										)
									}
									disabled={!typedSpeciesData.pagination.hasNextPage}
									className={`px-4 py-2 border rounded transition-colors ${
										!typedSpeciesData.pagination.hasNextPage
											? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
											: 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
									}`}
									aria-label={t('common.next')}
								>
									{t('common.next')}
								</button>
							</div>
						</nav>
					)}
				</div>
			</div>
		</section>
	);
}
