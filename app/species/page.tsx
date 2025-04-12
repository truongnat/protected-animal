import SearchBar from '@/components/SearchBar';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { Species } from '@/lib/core/domain/entities/species';
import { SpeciesFactory } from '@/lib/core/factories/species.factory';
import Link from 'next/link';

// Define the types for the search params
type SearchParams = {
	region?: string;
	status?: string;
	page?: string;
	search?: string;
};

/**
 * Fetches species data with filters and pagination
 */
async function getSpeciesData(searchParams: SearchParams) {
	try {
		// Get use case from factory
		const getSpeciesWithFiltersUseCase = SpeciesFactory.createGetSpeciesWithFiltersUseCase();

		// Parse search params
		const page = Number.parseInt(searchParams.page || '1');

		// Execute use case to get species with filters
		const result = await getSpeciesWithFiltersUseCase.execute({
			region: searchParams.region,
			status: searchParams.status,
			search: searchParams.search,
			page,
			limit: 9, // Number of species per page
		});

		return {
			species: result.species,
			count: result.count,
			totalPages: result.totalPages,
			currentPage: result.currentPage,
		};
	} catch (error) {
		console.error('Error fetching species data:', error);
		return { species: [], count: 0, totalPages: 0, currentPage: 1 };
	}
}

/**
 * Fetches filter options (unique regions and statuses)
 */
async function getFilterOptions() {
	try {
		// Get use case from factory
		const getFilterOptionsUseCase = SpeciesFactory.createGetFilterOptionsUseCase();

		// Execute use case to get filter options
		return await getFilterOptionsUseCase.execute();
	} catch (error) {
		console.error('Error fetching filter options:', error);
		return { regions: [], statuses: [] };
	}
}

export default async function SpeciesPage({
	searchParams,
}: {
	searchParams: SearchParams;
}) {
	// Create a serializable version of searchParams
	const serializedParams: SearchParams = {
		region: searchParams.region,
		status: searchParams.status,
		page: searchParams.page,
		search: searchParams.search,
	};

	const { species, count, totalPages, currentPage } = await getSpeciesData(serializedParams);
	const { regions, statuses } = await getFilterOptions();

	return (
		<div className="bg-white min-h-screen">
			{/* Hero Section */}
			<section className="relative bg-green-800 text-white py-16">
				<div className="absolute inset-0 overflow-hidden">
					<ImageWithFallback
						src="https://images.unsplash.com/photo-1564509027875-ba1c9b69526d?q=80&w=2070"
						alt="Endangered Species"
						fallbackSrc="/images/species-hero-fallback.jpg"
						fill
						priority
						unoptimized
						className="object-cover brightness-[0.4]"
					/>
				</div>
				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h1 className="text-4xl md:text-5xl font-bold mb-6">Endangered Species</h1>
					<p className="text-xl max-w-3xl mx-auto">
						Learn about the world's most vulnerable animals and the conservation efforts to protect
						them.
					</p>
				</div>
			</section>

			{/* Filters and Content */}
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="flex flex-col md:flex-row gap-8">
					{/* Filters Sidebar */}
					<div className="w-full md:w-64 bg-gray-50 p-6 rounded-lg shadow-sm">
						<h2 className="text-xl font-semibold mb-4">Filters</h2>

						{/* Region Filter */}
						<div className="mb-6">
							<h3 className="text-lg font-medium mb-2">Region</h3>
							<div className="space-y-2">
								<div className="flex items-center">
									<Link
										href={{
											pathname: '/species',
											query: {
												...serializedParams,
												region: undefined,
												page: '1',
											},
										}}
										className={`block w-full py-1 px-2 rounded ${!serializedParams.region ? 'bg-green-100 text-green-800' : 'hover:bg-gray-200'}`}
									>
										All Regions
									</Link>
								</div>
								{regions.map((region) => (
									<div key={region} className="flex items-center">
										<Link
											href={{
												pathname: '/species',
												query: {
													...serializedParams,
													region: region,
													page: '1',
												},
											}}
											className={`block w-full py-1 px-2 rounded ${serializedParams.region === region ? 'bg-green-100 text-green-800' : 'hover:bg-gray-200'}`}
										>
											{region}
										</Link>
									</div>
								))}
							</div>
						</div>

						{/* Conservation Status Filter */}
						<div className="mb-6">
							<h3 className="text-lg font-medium mb-2">Conservation Status</h3>
							<div className="space-y-2">
								<div className="flex items-center">
									<Link
										href={{
											pathname: '/species',
											query: {
												...serializedParams,
												status: undefined,
												page: '1',
											},
										}}
										className={`block w-full py-1 px-2 rounded ${!serializedParams.status ? 'bg-green-100 text-green-800' : 'hover:bg-gray-200'}`}
									>
										All Statuses
									</Link>
								</div>
								{statuses.map((status) => (
									<div key={status} className="flex items-center">
										<Link
											href={{
												pathname: '/species',
												query: {
													...serializedParams,
													status: status,
													page: '1',
												},
											}}
											className={`block w-full py-1 px-2 rounded ${serializedParams.status === status ? 'bg-green-100 text-green-800' : 'hover:bg-gray-200'}`}
										>
											{status}
										</Link>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Main Content */}
					<div className="flex-1">
						{/* Search and Results Summary */}
						<div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
							<h2 className="text-2xl font-semibold">
								{count} {count === 1 ? 'Species' : 'Species'} Found
								{serializedParams.region && <span> in {serializedParams.region}</span>}
								{serializedParams.status && <span> with status "{serializedParams.status}"</span>}
								{serializedParams.search && <span> matching "{serializedParams.search}"</span>}
							</h2>
							<div className="w-full md:w-64">
								<SearchBar placeholder="Search species..." />
							</div>
						</div>

						{/* Species Grid */}
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
							{species.length > 0 ? (
								species.map((animal) => (
									<div
										key={animal.id}
										className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105"
									>
										<div className="h-48 bg-gray-200 relative overflow-hidden">
											<ImageWithFallback
												src={animal.image_url || ''}
												alt={animal.name}
												altText={animal.name}
												fill
												sizes="(max-width: 768px) 100vw, 33vw"
												className="object-cover"
												unoptimized
											/>
										</div>
										<div className="p-6">
											<div className="flex justify-between items-start mb-2">
												<h3 className="text-xl font-semibold text-gray-900">{animal.name}</h3>
												<span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
													{animal.conservation_status}
												</span>
											</div>
											<p className="text-sm text-gray-500 italic mb-3">{animal.scientific_name}</p>
											<div className="flex items-center mb-3">
												<div className="w-full bg-gray-200 rounded-full h-2.5">
													<div
														className="bg-red-600 h-2.5 rounded-full"
														style={{
															width: animal.conservation_status.includes('Critical')
																? '95%'
																: animal.conservation_status.includes('Endangered')
																	? '85%'
																	: animal.conservation_status.includes('Vulnerable')
																		? '70%'
																		: '50%',
														}}
													/>
												</div>
											</div>
											<p className="text-gray-600 mb-4 line-clamp-3">{animal.description}</p>
											<Link
												href={`/species/${animal.id}`}
												className="text-green-700 hover:text-green-900 font-medium"
											>
												Learn more →
											</Link>
										</div>
									</div>
								))
							) : (
								<div className="col-span-3 text-center py-8">
									<p className="text-gray-500">No species found matching your criteria.</p>
								</div>
							)}
						</div>

						{/* Pagination */}
						{totalPages > 1 && (
							<div className="mt-12 flex justify-center">
								<nav className="flex items-center space-x-2">
									<Link
										href={{
											pathname: '/species',
											query: {
												...serializedParams,
												page: Math.max(1, (currentPage ?? 1) - 1).toString(),
											},
										}}
										className={`px-4 py-2 border rounded ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
										aria-disabled={currentPage === 1}
									>
										Previous
									</Link>

									{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
										<Link
											key={page}
											href={{
												pathname: '/species',
												query: {
													...serializedParams,
													page: page.toString(),
												},
											}}
											className={`px-4 py-2 border rounded ${currentPage === page ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
										>
											{page}
										</Link>
									))}

									<Link
										href={{
											pathname: '/species',
											query: {
												...serializedParams,
												page: Math.min(totalPages, (currentPage ?? 1) + 1).toString(),
											},
										}}
										className={`px-4 py-2 border rounded ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
										aria-disabled={currentPage === totalPages}
									>
										Next
									</Link>
								</nav>
							</div>
						)}
					</div>
				</div>
			</section>
		</div>
	);
}
