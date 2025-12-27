import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Report Wildlife Crime | Vietnam Wildlife Conservation',
	description: 'Report illegal wildlife activities and help protect Vietnam\'s endangered species.',
};

export default function ReportPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
			{/* Hero Section */}
			<section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<div className="mb-6">
						<span className="text-6xl mb-4 block">🚨</span>
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							Report Wildlife Crime
						</h1>
						<p className="text-xl max-w-3xl mx-auto">
							Help protect Vietnam's wildlife by reporting illegal activities. Your report can save lives.
						</p>
					</div>
					
					{/* Emergency Contact */}
					<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
						<h3 className="text-xl font-bold mb-2">Emergency Hotline</h3>
						<p className="text-3xl font-bold mb-2">📞 1900-1234</p>
						<p className="text-sm opacity-90">Available 24/7 for urgent reports</p>
					</div>
				</div>
			</section>

			{/* Report Form Section */}
			<section className="py-16">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="bg-white rounded-2xl shadow-xl p-8">
						<h2 className="text-2xl font-bold text-gray-900 mb-6">Submit a Report</h2>
						
						<form className="space-y-6">
							{/* Report Type */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Type of Report *
								</label>
								<select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
									<option value="">Select report type</option>
									<option value="poaching">Poaching Activity</option>
									<option value="trafficking">Wildlife Trafficking</option>
									<option value="habitat">Habitat Destruction</option>
									<option value="captivity">Illegal Captivity</option>
									<option value="other">Other Violation</option>
								</select>
							</div>

							{/* Location */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Province *
									</label>
									<select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
										<option value="">Select province</option>
										<option value="hanoi">Hà Nội</option>
										<option value="hcm">Hồ Chí Minh</option>
										<option value="danang">Đà Nẵng</option>
										<option value="haiphong">Hải Phòng</option>
										<option value="cantho">Cần Thơ</option>
									</select>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Specific Location
									</label>
									<input
										type="text"
										placeholder="Address, landmark, or coordinates"
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
									/>
								</div>
							</div>

							{/* Species Involved */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Species Involved
								</label>
								<input
									type="text"
									placeholder="e.g., Tiger, Pangolin, Elephant"
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
								/>
							</div>

							{/* Description */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Description *
								</label>
								<textarea
									rows={4}
									placeholder="Provide detailed information about what you witnessed..."
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
								></textarea>
							</div>

							{/* Evidence Upload */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Evidence (Photos/Videos)
								</label>
								<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-400 transition-colors">
									<div className="text-4xl mb-2">📸</div>
									<p className="text-gray-600">
										Click to upload or drag and drop files here
									</p>
									<p className="text-sm text-gray-500 mt-1">
										Max file size: 10MB. Supported: JPG, PNG, MP4
									</p>
								</div>
							</div>

							{/* Contact Information */}
							<div className="bg-gray-50 rounded-lg p-6">
								<h3 className="text-lg font-semibold mb-4">Contact Information (Optional)</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Name
										</label>
										<input
											type="text"
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Phone Number
										</label>
										<input
											type="tel"
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
										/>
									</div>
								</div>
								<div className="mt-4">
									<label className="flex items-center">
										<input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
										<span className="ml-2 text-sm text-gray-600">
											I want to remain anonymous
										</span>
									</label>
								</div>
							</div>

							{/* Legal Notice */}
							<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
								<div className="flex items-start">
									<span className="text-yellow-600 text-xl mr-3">⚖️</span>
									<div>
										<h4 className="font-semibold text-yellow-800 mb-1">Legal Notice</h4>
										<p className="text-sm text-yellow-700">
											All reports are handled according to Vietnam's wildlife protection laws. 
											False reports may result in legal consequences. Your information will be 
											shared with relevant authorities for investigation purposes.
										</p>
									</div>
								</div>
							</div>

							{/* Submit Button */}
							<div className="flex gap-4">
								<button
									type="submit"
									className="flex-1 bg-red-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors"
								>
									🚨 Submit Report
								</button>
								<button
									type="button"
									className="px-6 py-4 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
								>
									Save Draft
								</button>
							</div>
						</form>
					</div>
				</div>
			</section>

			{/* Additional Resources */}
			<section className="py-16 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-bold text-center mb-12">Additional Resources</h2>
					
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="text-center p-6 bg-gray-50 rounded-xl">
							<div className="text-4xl mb-4">📋</div>
							<h3 className="text-xl font-semibold mb-2">Reporting Guidelines</h3>
							<p className="text-gray-600 mb-4">
								Learn what information to include in your report for maximum effectiveness.
							</p>
							<button className="text-red-600 font-medium hover:text-red-700">
								View Guidelines →
							</button>
						</div>
						
						<div className="text-center p-6 bg-gray-50 rounded-xl">
							<div className="text-4xl mb-4">🏛️</div>
							<h3 className="text-xl font-semibold mb-2">Legal Framework</h3>
							<p className="text-gray-600 mb-4">
								Understand Vietnam's wildlife protection laws and penalties.
							</p>
							<button className="text-red-600 font-medium hover:text-red-700">
								Learn More →
							</button>
						</div>
						
						<div className="text-center p-6 bg-gray-50 rounded-xl">
							<div className="text-4xl mb-4">🤝</div>
							<h3 className="text-xl font-semibold mb-2">Partner Organizations</h3>
							<p className="text-gray-600 mb-4">
								Connect with local conservation groups and authorities.
							</p>
							<button className="text-red-600 font-medium hover:text-red-700">
								Find Partners →
							</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}