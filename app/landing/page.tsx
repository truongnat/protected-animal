import Link from 'next/link';
import SpeciesCharts from '@/components/charts/SpeciesCharts';
import ConservationImpact from '@/components/features/ConservationImpact';
import ReportingWidget from '@/components/features/ReportingWidget';
import SpeciesCard from '@/components/ui/SpeciesCard';
import VietnamHeroSection from '@/components/ui/VietnamHeroSection';
import { SpeciesFactory } from '@/lib/core/factories/species.factory';

export default async function Home() {
	const getFeaturedSpeciesUseCase = SpeciesFactory.createGetFeaturedSpeciesUseCase();

	// Execute use case to get featured species
	const species = await getFeaturedSpeciesUseCase.execute(6);

	return (
		<div className="bg-white dark:bg-gray-900">
			{/* Vietnam-specific Hero Section */}
			<VietnamHeroSection />

			{/* Vietnam Conservation Mission */}
			<section className="py-16 bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-green-950/20 dark:via-emerald-950/20 dark:to-green-950/20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 rounded-full px-4 py-2 mb-4">
							<span className="text-2xl">🇻🇳</span>
							<span className="text-sm font-medium text-green-800 dark:text-green-200">
								Vietnam Wildlife Conservation
							</span>
						</div>
						<h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
							Our Conservation Mission
						</h2>
						<p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
							Protecting Vietnam's rich biodiversity through education, enforcement, and community
							engagement
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Main Mission Cards */}
						<div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-green-100 dark:border-green-800 hover:shadow-xl transition-shadow">
								<div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">
									🛡️
								</div>
								<h3 className="text-xl font-bold mb-3 text-center dark:text-gray-100">
									Protect Wildlife, Preserve Our Future
								</h3>
								<p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
									Every action we take today shapes the world we leave for tomorrow. Vietnam's
									wildlife needs our protection now.
								</p>
							</div>

							<div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-green-100 dark:border-green-800 hover:shadow-xl transition-shadow">
								<div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">
									🌿
								</div>
								<h3 className="text-xl font-bold mb-3 text-center">Every Species Matters</h3>
								<p className="text-gray-600 text-center leading-relaxed">
									Biodiversity is the key to a healthy and resilient ecosystem. Each species plays a
									vital role.
								</p>
							</div>

							<div className="bg-white p-8 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
								<div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">
									📢
								</div>
								<h3 className="text-xl font-bold mb-3 text-center">Be a Voice for the Voiceless</h3>
								<p className="text-gray-600 text-center leading-relaxed">
									Stand up for those who cannot speak for themselves. Your voice can make a
									difference.
								</p>
							</div>

							<div className="bg-white p-8 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
								<div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">
									⏰
								</div>
								<h3 className="text-xl font-bold mb-3 text-center">Extinction is Forever</h3>
								<p className="text-gray-600 text-center leading-relaxed">
									Once a species is gone, it's gone forever. Act now before it's too late.
								</p>
							</div>
						</div>

						{/* Reporting Widget */}
						<div className="lg:col-span-1">
							<ReportingWidget language="en" />
						</div>
					</div>
				</div>
			</section>

			{/* Featured Vietnamese Species */}
			<section className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<div className="inline-flex items-center gap-2 bg-red-100 rounded-full px-4 py-2 mb-4">
							<span className="text-xl">🚨</span>
							<span className="text-sm font-medium text-red-800">Critically Endangered</span>
						</div>
						<h2 className="text-4xl font-bold text-gray-900 mb-4">
							Vietnam's Most Endangered Species
						</h2>
						<p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
							These critically endangered animals face imminent extinction without immediate
							conservation action
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						{species && species.length > 0 ? (
							species.map((animal) => (
								<SpeciesCard
									key={animal.id}
									species={{
										...animal,
										threats: ['Habitat Loss', 'Poaching', 'Climate Change'], // Mock data
										population: Math.floor(Math.random() * 1000) + 50, // Mock data
									}}
									language="en"
									showActions={true}
								/>
							))
						) : (
							<div className="col-span-3 text-center py-12">
								<div className="text-6xl mb-4">🔍</div>
								<p className="text-gray-500 text-lg">Loading species information...</p>
							</div>
						)}
					</div>

					<div className="mt-16 text-center">
						<Link
							href="/species"
							className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
						>
							<span>🐅</span>
							View All Vietnamese Species
							<span>→</span>
						</Link>
					</div>
				</div>
			</section>

			{/* Conservation Impact Section */}
			<section className="py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<ConservationImpact language="en" />
				</div>
			</section>

			{/* Data Visualizations */}
			<section className="py-16 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">Conservation Data & Insights</h2>
						<p className="text-lg text-gray-600">
							Understanding the data behind Vietnam's wildlife conservation efforts
						</p>
					</div>
					<SpeciesCharts />
				</div>
			</section>

			{/* Call to Action */}
			<section className="py-20 bg-gradient-to-br from-green-800 via-emerald-800 to-green-900 text-white relative overflow-hidden">
				{/* Background Pattern */}
				<div className="absolute inset-0 opacity-10">
					<div className="absolute top-10 left-10 text-6xl">🐅</div>
					<div className="absolute top-32 right-20 text-4xl">🦏</div>
					<div className="absolute bottom-20 left-32 text-5xl">🐘</div>
					<div className="absolute bottom-32 right-10 text-3xl">🦎</div>
				</div>

				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<div className="mb-8">
						<div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
							<span className="text-2xl">🇻🇳</span>
							<span className="font-medium">Vietnam Wildlife Conservation</span>
						</div>
						<h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Conservation Efforts</h2>
						<p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
							"<span className="text-yellow-300 font-semibold">Extinction is Forever.</span>
							<span className="text-green-200">
								{' '}
								Conservation Today for Tomorrow's Generations.
							</span>
							"
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
						<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
							<div className="text-4xl mb-4">💚</div>
							<h3 className="text-xl font-bold mb-2">Support Conservation</h3>
							<p className="text-green-100 mb-4">Fund critical wildlife protection programs</p>
							<Link
								href="/donate"
								className="inline-block bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-medium transition-colors"
							>
								Donate Now
							</Link>
						</div>

						<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
							<div className="text-4xl mb-4">🚨</div>
							<h3 className="text-xl font-bold mb-2">Report Wildlife Crime</h3>
							<p className="text-green-100 mb-4">Help enforce Vietnam's wildlife protection laws</p>
							<Link
								href="/report"
								className="inline-block bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-medium transition-colors"
							>
								Report Now
							</Link>
						</div>

						<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
							<div className="text-4xl mb-4">🤝</div>
							<h3 className="text-xl font-bold mb-2">Volunteer</h3>
							<p className="text-green-100 mb-4">Join hands-on conservation efforts</p>
							<Link
								href="/volunteer"
								className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors"
							>
								Get Involved
							</Link>
						</div>
					</div>

					<div className="flex flex-wrap justify-center gap-4">
						<Link
							href="/newsletter"
							className="bg-transparent border-2 border-white px-8 py-4 rounded-xl font-medium hover:bg-white hover:text-green-800 transition-all duration-200 transform hover:scale-105"
						>
							📧 Subscribe to Newsletter
						</Link>
						<Link
							href="/about"
							className="bg-white/10 backdrop-blur-sm border-2 border-white/30 px-8 py-4 rounded-xl font-medium hover:bg-white/20 transition-all duration-200"
						>
							🌿 Learn More About Us
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
