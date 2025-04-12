import ImageWithFallback from '@/components/ui/ImageWithFallback';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
	title: 'About Us | Protected Animals',
	description:
		'Learn about our mission to protect endangered species and preserve biodiversity for future generations.',
};

export default function AboutPage() {
	return (
		<div className="bg-white min-h-screen">
			{/* Hero Section */}
			<section className="relative bg-green-800 text-white py-16">
				<div className="absolute inset-0 overflow-hidden">
					<ImageWithFallback
						src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074"
						alt="Nature Conservation"
						fill
						priority
						unoptimized
						className="object-cover brightness-[0.4]"
					/>
				</div>
				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h1 className="text-4xl md:text-5xl font-bold mb-6">About Protected Animals</h1>
					<p className="text-xl max-w-3xl mx-auto">
						Dedicated to raising awareness about endangered species and promoting conservation
						efforts worldwide
					</p>
				</div>
			</section>

			{/* Our Mission */}
			<section className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="lg:flex lg:items-center lg:gap-16">
						<div className="lg:w-1/2 mb-10 lg:mb-0">
							<div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
								<ImageWithFallback
									src="https://images.unsplash.com/photo-1564509027875-ba1c9b69526d?q=80&w=2070"
									alt="Conservation Efforts"
									fill
									unoptimized
									className="object-cover"
								/>
							</div>
						</div>
						<div className="lg:w-1/2">
							<h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
							<p className="text-lg text-gray-700 mb-6">
								At Protected Animals, our mission is to protect endangered species and preserve
								biodiversity through education, awareness, and conservation initiatives. We believe
								that every species plays a vital role in our ecosystem, and the loss of even one can
								have far-reaching consequences for our planet.
							</p>
							<p className="text-lg text-gray-700 mb-6">
								We are committed to providing accurate, up-to-date information about endangered
								species and their habitats, as well as the threats they face and the conservation
								efforts underway to protect them.
							</p>
							<div className="flex items-center text-green-700 font-medium">
								<Link href="/landing/species" className="inline-flex items-center hover:text-green-800">
									Explore Endangered Species
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 ml-2"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
											clipRule="evenodd"
										/>
									</svg>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* What We Do */}
			<section className="py-16 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-900">What We Do</h2>
						<p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
							Our work focuses on several key areas to help protect endangered species and their
							habitats
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="bg-white p-8 rounded-lg shadow-md">
							<div className="w-12 h-12 bg-green-100 text-green-800 rounded-full flex items-center justify-center mb-4">
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
										d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-semibold mb-3">Education & Awareness</h3>
							<p className="text-gray-600">
								We provide comprehensive information about endangered species, their habitats, and
								the threats they face. By raising awareness, we hope to inspire action and promote
								conservation efforts.
							</p>
						</div>
						<div className="bg-white p-8 rounded-lg shadow-md">
							<div className="w-12 h-12 bg-green-100 text-green-800 rounded-full flex items-center justify-center mb-4">
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
										d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-semibold mb-3">Data Visualization</h3>
							<p className="text-gray-600">
								We use interactive charts and maps to visualize data about endangered species,
								making complex information accessible and engaging for everyone, from students to
								researchers.
							</p>
						</div>
						<div className="bg-white p-8 rounded-lg shadow-md">
							<div className="w-12 h-12 bg-green-100 text-green-800 rounded-full flex items-center justify-center mb-4">
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
										d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-semibold mb-3">Community Engagement</h3>
							<p className="text-gray-600">
								We connect individuals, organizations, and communities who share our passion for
								wildlife conservation, creating a network of advocates for endangered species
								protection.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Our Team */}
			<section className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-900">Our Team</h2>
						<p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
							Dedicated professionals committed to wildlife conservation and biodiversity protection
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="bg-white rounded-lg overflow-hidden shadow-md">
							<div className="h-64 bg-gray-200 relative">
								<ImageWithFallback
									src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961"
									alt="Team Member"
									fill
									unoptimized
									className="object-cover"
								/>
							</div>
							<div className="p-6">
								<h3 className="text-xl font-semibold mb-1">Dr. Emma Wilson</h3>
								<p className="text-green-700 mb-3">Conservation Biologist</p>
								<p className="text-gray-600 mb-4">
									With over 15 years of experience in wildlife conservation, Dr. Wilson leads our
									research initiatives and ensures the accuracy of our species information.
								</p>
							</div>
						</div>
						<div className="bg-white rounded-lg overflow-hidden shadow-md">
							<div className="h-64 bg-gray-200 relative">
								<ImageWithFallback
									src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974"
									alt="Team Member"
									fill
									unoptimized
									className="object-cover"
								/>
							</div>
							<div className="p-6">
								<h3 className="text-xl font-semibold mb-1">Dr. Michael Chen</h3>
								<p className="text-green-700 mb-3">Environmental Scientist</p>
								<p className="text-gray-600 mb-4">
									Dr. Chen specializes in habitat conservation and climate change impacts on
									endangered species, bringing valuable insights to our conservation strategies.
								</p>
							</div>
						</div>
						<div className="bg-white rounded-lg overflow-hidden shadow-md">
							<div className="h-64 bg-gray-200 relative">
								<ImageWithFallback
									src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974"
									alt="Team Member"
									fill
									unoptimized
									className="object-cover"
								/>
							</div>
							<div className="p-6">
								<h3 className="text-xl font-semibold mb-1">Sarah Johnson</h3>
								<p className="text-green-700 mb-3">Conservation Educator</p>
								<p className="text-gray-600 mb-4">
									With a background in environmental education, Sarah develops our educational
									content and outreach programs to engage communities in conservation efforts.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Partners */}
			<section className="py-16 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-900">Our Partners</h2>
						<p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
							We collaborate with leading organizations in wildlife conservation to maximize our
							impact
						</p>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
						<div className="flex justify-center">
							<div className="h-16 w-48 relative grayscale hover:grayscale-0 transition-all">
								<ImageWithFallback
									src="https://upload.wikimedia.org/wikipedia/en/thumb/2/24/WWF_logo.svg/1200px-WWF_logo.svg.png"
									alt="World Wildlife Fund"
									fill
									unoptimized
									className="object-contain"
								/>
							</div>
						</div>
						<div className="flex justify-center">
							<div className="h-16 w-48 relative grayscale hover:grayscale-0 transition-all">
								<ImageWithFallback
									src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/IUCN_logo.svg/1200px-IUCN_logo.svg.png"
									alt="IUCN"
									fill
									unoptimized
									className="object-contain"
								/>
							</div>
						</div>
						<div className="flex justify-center">
							<div className="h-16 w-48 relative grayscale hover:grayscale-0 transition-all">
								<ImageWithFallback
									src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/National_Geographic_Logo.svg/1024px-National_Geographic_Logo.svg.png"
									alt="National Geographic"
									fill
									unoptimized
									className="object-contain"
								/>
							</div>
						</div>
						<div className="flex justify-center">
							<div className="h-16 w-48 relative grayscale hover:grayscale-0 transition-all">
								<ImageWithFallback
									src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/WCS_logo_2015.svg/2560px-WCS_logo_2015.svg.png"
									alt="Wildlife Conservation Society"
									fill
									unoptimized
									className="object-contain"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Contact Us */}
			<section className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="bg-green-800 rounded-lg shadow-xl overflow-hidden">
						<div className="lg:flex">
							<div className="lg:w-1/2 p-10 lg:p-16 text-white">
								<h2 className="text-3xl font-bold mb-6">Get Involved</h2>
								<p className="text-lg mb-8">
									Want to join our mission to protect endangered species? There are many ways to get
									involved and make a difference.
								</p>
								<div className="space-y-4">
									<div className="flex items-start">
										<div className="flex-shrink-0 mt-1">
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
													d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
												/>
											</svg>
										</div>
										<div className="ml-3">
											<p className="text-lg font-medium">Email Us</p>
											<p className="text-green-200">contact@protectedanimals.org</p>
										</div>
									</div>
									<div className="flex items-start">
										<div className="flex-shrink-0 mt-1">
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
													d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
												/>
											</svg>
										</div>
										<div className="ml-3">
											<p className="text-lg font-medium">Follow Us</p>
											<div className="flex space-x-4 mt-2">
												<a href="#" className="text-green-200 hover:text-white">
													<svg
														className="h-6 w-6"
														fill="currentColor"
														viewBox="0 0 24 24"
														aria-hidden="true"
													>
														<path
															fillRule="evenodd"
															d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
															clipRule="evenodd"
														/>
													</svg>
												</a>
												<a href="#" className="text-green-200 hover:text-white">
													<svg
														className="h-6 w-6"
														fill="currentColor"
														viewBox="0 0 24 24"
														aria-hidden="true"
													>
														<path
															fillRule="evenodd"
															d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
															clipRule="evenodd"
														/>
													</svg>
												</a>
												<a href="#" className="text-green-200 hover:text-white">
													<svg
														className="h-6 w-6"
														fill="currentColor"
														viewBox="0 0 24 24"
														aria-hidden="true"
													>
														<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
													</svg>
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="lg:w-1/2 bg-white p-10 lg:p-16">
								<h3 className="text-2xl font-bold text-gray-900 mb-6">Join Our Newsletter</h3>
								<p className="text-gray-600 mb-6">
									Stay updated on endangered species news, conservation efforts, and ways to get
									involved.
								</p>
								<form className="space-y-4">
									<div>
										<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
											Name
										</label>
										<input
											type="text"
											id="name"
											className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
											placeholder="Your name"
										/>
									</div>
									<div>
										<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
											Email
										</label>
										<input
											type="email"
											id="email"
											className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
											placeholder="Your email address"
										/>
									</div>
									<button
										type="submit"
										className="w-full bg-green-700 text-white px-6 py-3 rounded-md font-medium hover:bg-green-800 transition"
									>
										Subscribe
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
