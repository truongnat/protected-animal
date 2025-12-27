'use client';

import { useState } from 'react';
import { useSpecies, useFilterOptions } from '@/lib/hooks/useSpecies';
import SpeciesCard from '@/components/ui/SpeciesCard';
import SearchBar from '@/components/SearchBar';
import Link from 'next/link';
import type { SpeciesFilters } from '@/lib/core/domain/entities/species';

interface SpeciesListClientProps {
	initialFilters?: SpeciesFilters;
}

export default function SpeciesListClient({ initialFilters = {} }: SpeciesListClientProps) {
	const [filters, setFilters] = useState<SpeciesFilters>(initialFilters);
	
	const { data: speciesData, isLoading: speciesLoading, error: speciesError } = useSpecies(filters);
	const { data: filterOptions, isLoading: filtersLoading } = useFilterOptions();

	const handleFilterChange = (newFilters: Partial<SpeciesFilters>) => {
		setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
	};

	const handleSearch = (search: string) => {
		setFilters(prev => ({ ...prev, search, page: 1 }));
	};

	const handlePageChange = (page: number) => {
		setFilters(prev => ({ ...prev, page }));
	};

	if (speciesError) {
		return (
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="text-center">
					<p className="text-red-600">Error loading species data. Please try again.</p>
				</div>
			</div>
		);
	}

	return (
		<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<div className="flex flex-col md:flex-row gap-8">
				{/* Filters Sidebar */}
				<div className="w-full md:w-64 bg-gray-50 p-6 rounded-lg shadow-sm">
					<h2 className="text-xl font-semibold mb-4">Filters</h2>

					{filtersLoading ? (
						<div className="space-y-4">
							<div className="animate-pulse bg-gray-200 h-4 rounded"></div>
							<div className="animate-pulse bg-gray-200 h-4 rounded"></div>
						</div>
					) : (
						<>
							{/* Region Filter */}
							<div className="mb-6">
								<h3 className="text-lg font-medium mb-2">Region</h3>
								<div className="space-y-2">
									<button
										onClick={() => handleFilterChange({ region: undefined })}
										className={`block w-full text-left py-1 px-2 rounded ${
											!filters.region ? 'bg-green-100 text-green-800' : 'hover:bg-gray-200'
										}`}
									>
										All Regions
									</button>
									{filterOptions?.regions?.map((region: string) => (
										<button
											key={region}
											onClick={() => handleFilterChange({ region })}
											className={`block w-full text-left py-1 px-2 rounded ${
												filters.region === region ? 'bg-green-100 text-green-800' : 'hover:bg-gray-200'
											}`}
										>
											{region}
										</button>
									))}
								</div>
							</div>

							{/* Conservation Status Filter */}
							<div className="mb-6">
								<h3 className="text-lg font-medium mb-2">Conservation Status</h3>
								<div className="space-y-2">
									<button
										onClick={() => handleFilterChange({ status: undefined })}
										className={`block w-full text-left py-1 px-2 rounded ${
											!filters.status ? 'bg-green-100 text-green-800' : 'hover:bg-gray-200'
										}`}
									>
										All Statuses
									</button>
									{filterOptions?.statuses?.map((status: string) => (
										<button
											key={status}
											onClick={() => handleFilterChange({ status })}
											className={`block w-full text-left py-1 px-2 rounded ${
												filters.status === status ? 'bg-green-100 text-green-800' : 'hover:bg-gray-200'
											}`}
										>
											{status}
										</button>
									))}
								</div>
							</div>
						</>
					)}
				</div>

				{/* Main Content */}
				<div className="flex-1">
					{/* Search and Results Summary */}
					<div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<h2 className="text-2xl font-semibold">
							{speciesLoading ? (
								<div className="animate-pulse bg-gray-200 h-8 w-48 rounded"></div>
							) : (
								<>
									{speciesData?.pagination?.total || 0} Species Found
									{filters.region && <span> in {filters.region}</span>}
									{filters.status && <span> with status "{filters.status}"</span>}
									{filters.search && <span> matching "{filters.search}"</span>}
								</>
							)}
						</h2>
						<div className="w-full md:w-64">
							<SearchBar 
								placeholder="Search species..." 
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
								<div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
									<div className="animate-pulse">
										<div className="h-48 bg-gray-200"></div>
										<div className="p-6 space-y-3">
											<div className="h-4 bg-gray-200 rounded w-3/4"></div>
											<div className="h-3 bg-gray-200 rounded w-1/2"></div>
											<div className="h-2 bg-gray-200 rounded w-full"></div>
											<div className="h-16 bg-gray-200 rounded"></div>
										</div>
									</div>
								</div>
							))
						) : speciesData?.data?.length > 0 ? (
							speciesData.data.map((species: any) => (
								<SpeciesCard key={species.id} species={species} showActions />
							))
						) : (
							<div className="col-span-3 text-center py-8">
								<p className="text-gray-500">No species found matching your criteria.</p>
							</div>
						)}
					</div>

					{/* Pagination */}
					{speciesData?.pagination && speciesData.pagination.totalPages > 1 && (
						<div className="mt-12 flex justify-center">
							<nav className="flex items-center space-x-2">
								<button
									onClick={() => handlePageChange(Math.max(1, speciesData.pagination.page - 1))}
									disabled={!speciesData.pagination.hasPrevPage}
									className={`px-4 py-2 border rounded ${
										!speciesData.pagination.hasPrevPage
											? 'bg-gray-100 text-gray-400 cursor-not-allowed'
											: 'bg-white text-gray-700 hover:bg-gray-50'
									}`}
								>
									Previous
								</button>

								{Array.from({ length: speciesData.pagination.totalPages }, (_, i) => i + 1).map((page) => (
									<button
										key={page}
										onClick={() => handlePageChange(page)}
										className={`px-4 py-2 border rounded ${
											speciesData.pagination.page === page
												? 'bg-green-600 text-white'
												: 'bg-white text-gray-700 hover:bg-gray-50'
										}`}
									>
										{page}
									</button>
								))}

								<button
									onClick={() => handlePageChange(Math.min(speciesData.pagination.totalPages, speciesData.pagination.page + 1))}
									disabled={!speciesData.pagination.hasNextPage}
									className={`px-4 py-2 border rounded ${
										!speciesData.pagination.hasNextPage
											? 'bg-gray-100 text-gray-400 cursor-not-allowed'
											: 'bg-white text-gray-700 hover:bg-gray-50'
									}`}
								>
									Next
								</button>
							</nav>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}