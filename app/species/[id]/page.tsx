import Link from 'next/link';
import { notFound } from 'next/navigation';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import type { Species } from '@/lib/core/domain/entities/species';
import { SpeciesFactory } from '@/lib/core/factories/species.factory';
import { getImageUrl } from '@/lib/utils';

/**
 * Fetches a specific species by ID
 */
async function getSpeciesById(id: string): Promise<Species | null> {
	try {
		// Get use case from factory
		const getSpeciesByIdUseCase = SpeciesFactory.createGetSpeciesByIdUseCase();

		// Execute use case to get species by ID
		return await getSpeciesByIdUseCase.execute(Number(id));
	} catch (error) {
		console.error(`Error fetching species with id ${id}:`, error);
		return null;
	}
}

/**
 * Fetches related species (same region or conservation status)
 */
async function getRelatedSpecies(species: Species, limit = 3): Promise<Species[]> {
	try {
		// Get use case from factory
		const getRelatedSpeciesUseCase = SpeciesFactory.createGetRelatedSpeciesUseCase();

		// Execute use case to get related species
		return await getRelatedSpeciesUseCase.execute(species, limit);
	} catch (error) {
		console.error(`Error fetching related species for ${species.name}:`, error);
		return [];
	}
}

export default async function SpeciesDetailPage({ params }: { params: Promise<{ id: string }> }) {
	// Next.js 16: params must be awaited
	const { id } = await params;
	const species = await getSpeciesById(id);

	if (!species) {
		notFound();
	}

	const relatedSpecies = await getRelatedSpecies(species);

	// Format population with commas
	const formattedPopulation = species.population?.toLocaleString() || 'Unknown';

	// Determine the threat level color
	const getThreatLevelColor = (status: string) => {
		if (status.includes('Critically')) return 'bg-red-600';
		if (status.includes('Endangered')) return 'bg-orange-500';
		if (status.includes('Vulnerable')) return 'bg-yellow-500';
		return 'bg-green-500';
	};

	const threatLevelColor = getThreatLevelColor(species.conservation_status);

	return (
		<div className="bg-white min-h-screen">
			{/* Hero Section */}
			<section className="relative bg-green-800 text-white py-16">
				<div className="absolute inset-0 overflow-hidden">
					<ImageWithFallback
						src={species.image_url || ''}
						alt={species.name}
						altText={species.name}
						fill
						priority
						unoptimized
						className="object-cover brightness-[0.4]"
					/>
				</div>
				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col items-center text-center">
						<h1 className="text-4xl md:text-5xl font-bold mb-2">{species.name}</h1>
						<p className="text-xl italic mb-4">{species.scientific_name}</p>
						<div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-500 bg-opacity-80">
							{species.conservation_status}
						</div>
					</div>
				</div>
			</section>

			{/* Main Content */}
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
					{/* Left Column - Image and Key Facts */}
					<div className="lg:col-span-1">
						<div className="sticky top-8">
							<div className="bg-white rounded-lg overflow-hidden shadow-md mb-8">
								<div className="h-80 relative">
									<ImageWithFallback
										src={species.image_url || ''}
										alt={species.name}
										altText={species.name}
										fill
										sizes="(max-width: 768px) 100vw, 33vw"
										className="object-cover"
										unoptimized
									/>
								</div>
							</div>

							<div className="bg-white rounded-lg shadow-md p-6">
								<h2 className="text-xl font-semibold mb-4">Key Facts</h2>
								<ul className="space-y-4">
									<li className="flex justify-between">
										<span className="text-gray-600">Conservation Status:</span>
										<span className="font-medium">{species.conservation_status}</span>
									</li>
									<li className="flex justify-between">
										<span className="text-gray-600">Population:</span>
										<span className="font-medium">{formattedPopulation}</span>
									</li>
									<li className="flex justify-between">
										<span className="text-gray-600">Region:</span>
										<span className="font-medium">{species.region}</span>
									</li>
									<li className="flex justify-between">
										<span className="text-gray-600">Habitat:</span>
										<span className="font-medium">{species.habitat}</span>
									</li>
								</ul>

								<div className="mt-6">
									<h3 className="text-sm font-medium text-gray-500 mb-2">Threat Level</h3>
									<div className="w-full bg-gray-200 rounded-full h-2.5">
										<div
											className={`${threatLevelColor} h-2.5 rounded-full`}
											style={{
												width: species.conservation_status.includes('Critical')
													? '95%'
													: species.conservation_status.includes('Endangered')
														? '85%'
														: species.conservation_status.includes('Vulnerable')
															? '70%'
															: '50%',
											}}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Right Column - Description and Details */}
					<div className="lg:col-span-2">
						<div className="bg-white rounded-lg shadow-md p-8">
							<h2 className="text-2xl font-semibold mb-6">About the {species.name}</h2>

							<div className="prose max-w-none">
								<p className="text-gray-700 mb-6 text-lg leading-relaxed">{species.description}</p>

								<h3 className="text-xl font-semibold mt-8 mb-4">Habitat</h3>
								<p className="text-gray-700 mb-6">{species.habitat}</p>

								<h3 className="text-xl font-semibold mt-8 mb-4">Conservation Efforts</h3>
								<p className="text-gray-700 mb-6">
									Conservation efforts for the {species.name} include habitat protection,
									anti-poaching measures, captive breeding programs, and public awareness campaigns.
									International cooperation is essential for protecting this species across its
									range.
								</p>

								<h3 className="text-xl font-semibold mt-8 mb-4">How You Can Help</h3>
								<ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
									<li>
										Support conservation organizations working to protect the {species.name} and its
										habitat
									</li>
									<li>Spread awareness about the threats facing this species</li>
									<li>Reduce your environmental footprint to help combat climate change</li>
									<li>Avoid products that contribute to habitat destruction</li>
									<li>Participate in citizen science projects to monitor wildlife</li>
								</ul>
							</div>

							<div className="mt-12 border-t pt-8">
								<h3 className="text-xl font-semibold mb-6">Related Species</h3>
								<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
									{relatedSpecies.map((related) => (
										<Link key={related.id} href={`/species/${related.id}`} className="group">
											<div className="bg-white rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
												<div className="h-40 relative">
													<ImageWithFallback
														src={getImageUrl(related.image_url, related.name)}
														alt={related.name}
														fill
														sizes="(max-width: 768px) 100vw, 33vw"
														className="object-cover"
														unoptimized
													/>
												</div>
												<div className="p-4">
													<h4 className="font-medium group-hover:text-green-700 transition-colors">
														{related.name}
													</h4>
													<p className="text-sm text-gray-500">{related.conservation_status}</p>
												</div>
											</div>
										</Link>
									))}
								</div>
							</div>
						</div>

						<div className="mt-8 text-center">
							<Link
								href="/species"
								className="inline-flex items-center text-green-700 hover:text-green-900"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 mr-2"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
										clipRule="evenodd"
									/>
								</svg>
								Back to All Species
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
