import { supabase } from '@/lib/supabase';
import type { Species } from '@/lib/supabase';
import Link from 'next/link';
import ConservationStatusChart from './ConservationStatusChart';
import PopulationChart from './PopulationChart';
import RegionChart from './RegionChart';

// Function to fetch all species data for charts
async function getSpeciesForCharts() {
	const { data, error } = await supabase.from('species').select('*').order('name');

	if (error) {
		console.error('Error fetching species for charts:', error);
		return [];
	}

	return data as Species[];
}

export default async function SpeciesCharts() {
	const species = await getSpeciesForCharts();

	return (
		<section className="py-16 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900">Endangered Species Dashboard</h2>
					<p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
						Explore the current state of endangered species around the world through these
						interactive visualizations
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<ConservationStatusChart species={species} />
					<RegionChart species={species} />
					<PopulationChart species={species} />
				</div>

				<div className="mt-12 text-center">
					<Link
						href="/species"
						className="inline-block bg-green-700 text-white px-6 py-3 rounded-md font-medium hover:bg-green-800 transition"
					>
						Explore All Species Data
					</Link>
				</div>

				<div className="mt-8 text-center text-gray-600 text-sm">
					<p>Data sourced from international conservation organizations and updated regularly.</p>
				</div>
			</div>
		</section>
	);
}
