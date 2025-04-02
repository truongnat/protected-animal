import Link from 'next/link';

export default function SpeciesNotFound() {
	return (
		<div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-16">
			<div className="text-center max-w-md">
				<h1 className="text-6xl font-bold text-green-800 mb-4">404</h1>
				<h2 className="text-2xl font-semibold mb-4">Species Not Found</h2>
				<p className="text-gray-600 mb-8">
					The species you're looking for might be endangered, but it doesn't exist in our database.
				</p>
				<Link
					href="/species"
					className="inline-block bg-green-700 text-white px-6 py-3 rounded-md font-medium hover:bg-green-800 transition"
				>
					View All Species
				</Link>
			</div>
		</div>
	);
}
