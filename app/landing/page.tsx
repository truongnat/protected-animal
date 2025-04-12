import SpeciesCharts from '@/components/charts/SpeciesCharts';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { SpeciesFactory } from '@/lib/core/factories/species.factory';
import Link from 'next/link';

export default async function Home() {
	const getFeaturedSpeciesUseCase = SpeciesFactory.createGetFeaturedSpeciesUseCase();

	// Execute use case to get featured species
	const species = await getFeaturedSpeciesUseCase.execute(6);

	return (
		<div className="bg-white">
			{/* Hero Section */}
			<section className="relative bg-green-800 text-white">
				<div className="absolute inset-0 overflow-hidden">
					<ImageWithFallback
						src="https://images.unsplash.com/photo-1574068468668-a05a11f871da?q=80&w=2070"
						alt="Wildlife Conservation"
						fallbackSrc="/images/hero-fallback.jpg"
						fill
						priority
						unoptimized
						className="object-cover brightness-[0.4]"
					/>
				</div>
				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
					<div className="max-w-3xl">
						<h1 className="text-4xl md:text-5xl font-bold mb-6">
							Protecting Our Planet's Most Vulnerable Species
						</h1>
						<p className="text-xl mb-8">
							Join our mission to save endangered animals and preserve biodiversity for future
							generations.
						</p>
						<div className="flex flex-wrap gap-4">
							<Link
								href="/landing/species"
								className="bg-white text-green-800 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition"
							>
								Explore Endangered Species
							</Link>
							<Link
								href="/donate"
								className="bg-transparent border-2 border-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-green-800 transition"
							>
								Support Our Cause
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Conservation Slogans */}
			<section className="py-12 bg-green-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-900">Our Conservation Mission</h2>
						<p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
							Inspiring action through awareness and education
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="bg-white p-6 rounded-lg shadow-md text-center">
							<div className="w-12 h-12 bg-green-100 text-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-semibold mb-2">Protect Wildlife, Preserve Our Future</h3>
							<p className="text-gray-600">
								Every action we take today shapes the world we leave for tomorrow.
							</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md text-center">
							<div className="w-12 h-12 bg-green-100 text-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 6v6m0 0v6m0-6h6m-6 0H6"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-semibold mb-2">Every Species Matters</h3>
							<p className="text-gray-600">
								Biodiversity is the key to a healthy and resilient planet.
							</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md text-center">
							<div className="w-12 h-12 bg-green-100 text-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-semibold mb-2">Be a Voice for the Voiceless</h3>
							<p className="text-gray-600">Stand up for those who cannot speak for themselves.</p>
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
						<div className="bg-white p-6 rounded-lg shadow-md text-center">
							<div className="w-12 h-12 bg-green-100 text-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-semibold mb-2">
								Conservation Today for Tomorrow's Generations
							</h3>
							<p className="text-gray-600">
								What we preserve now will determine the world our children inherit.
							</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md text-center">
							<div className="w-12 h-12 bg-green-100 text-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-semibold mb-2">Extinction is Forever</h3>
							<p className="text-gray-600">
								Once a species is gone, it's gone forever. Act now before it's too late.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Top Endangered Species */}
			<section className="py-16 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-900">Most Endangered Species</h2>
						<p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
							These critically endangered animals face imminent extinction without our help
						</p>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						{species && species.length > 0 ? (
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
											href={`/landing/species/${animal.id}`}
											className="text-green-700 hover:text-green-900 font-medium"
										>
											Learn more →
										</Link>
									</div>
								</div>
							))
						) : (
							// Fallback content if no species data is available
							<div className="col-span-3 text-center py-8">
								<p className="text-gray-500">Loading species information...</p>
							</div>
						)}
					</div>
					<div className="mt-12 text-center">
						<Link
							href="/landing/species"
							className="inline-block bg-green-700 text-white px-6 py-3 rounded-md font-medium hover:bg-green-800 transition"
						>
							View All Endangered Species
						</Link>
					</div>
				</div>
			</section>

			{/* Data Visualizations */}
			<SpeciesCharts />

			{/* Call to Action */}
			<section className="py-16 bg-green-800 text-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl font-bold mb-6">Join Our Conservation Efforts</h2>
					<p className="text-xl mb-8 max-w-3xl mx-auto">
						"Extinction is Forever. Conservation Today for Tomorrow's Generations."
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<Link
							href="/donate"
							className="bg-white text-green-800 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition"
						>
							Donate Now
						</Link>
						<Link
							href="/volunteer"
							className="bg-transparent border-2 border-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-green-800 transition"
						>
							Volunteer
						</Link>
						<Link
							href="/newsletter"
							className="bg-transparent border-2 border-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-green-800 transition"
						>
							Subscribe to Newsletter
						</Link>
					</div>
				</div>
			</section>

			{/* Conservation Stats */}
			<section className="py-16 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-900">The State of Wildlife Conservation</h2>
						<p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
							Understanding the challenges we face in protecting endangered species
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						<div className="text-center">
							<div className="text-4xl font-bold text-green-700 mb-2">41,415</div>
							<p className="text-gray-600">Species on the IUCN Red List</p>
						</div>
						<div className="text-center">
							<div className="text-4xl font-bold text-red-600 mb-2">16,306</div>
							<p className="text-gray-600">Endangered Species Worldwide</p>
						</div>
						<div className="text-center">
							<div className="text-4xl font-bold text-green-700 mb-2">1,000,000+</div>
							<p className="text-gray-600">Species Threatened with Extinction</p>
						</div>
						<div className="text-center">
							<div className="text-4xl font-bold text-green-700 mb-2">60%</div>
							<p className="text-gray-600">Decline in Wildlife Populations Since 1970</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
