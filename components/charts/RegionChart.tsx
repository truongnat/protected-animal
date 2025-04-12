'use client';

import type { Species } from '@/lib/core/domain/entities/species';
import {
	BarElement,
	CategoryScale,
	type ChartData,
	Chart as ChartJS,
	type ChartOptions,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface RegionChartProps {
	species: Species[];
}

export default function RegionChart({ species }: RegionChartProps) {
	const [chartData, setChartData] = useState<ChartData<'bar'>>({
		labels: [],
		datasets: [],
	});

	useEffect(() => {
		// Count species by region
		const regionCounts: Record<string, number> = {};

		species.forEach((animal) => {
			const region = animal.region || 'Unknown';
			regionCounts[region] = (regionCounts[region] || 0) + 1;
		});

		// Sort regions by count (descending)
		const sortedRegions = Object.entries(regionCounts)
			.sort((a, b) => b[1] - a[1])
			.slice(0, 8); // Limit to top 8 regions for better visualization

		const labels = sortedRegions.map(([region]) => region);
		const data = sortedRegions.map(([, count]) => count);

		setChartData({
			labels,
			datasets: [
				{
					label: 'Number of Species',
					data,
					backgroundColor: 'rgba(75, 192, 192, 0.8)',
					borderColor: 'rgba(75, 192, 192, 1)',
					borderWidth: 1,
				},
			],
		});
	}, [species]);

	const options: ChartOptions<'bar'> = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: false,
				text: 'Species by Region',
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				title: {
					display: true,
					text: 'Number of Species',
				},
			},
			x: {
				title: {
					display: true,
					text: 'Region',
				},
			},
		},
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
			<h3 className="text-xl font-semibold mb-4 text-center">Species by Region</h3>
			<div className="h-64">
				<Bar data={chartData} options={options} />
			</div>
			<div className="mt-4 text-sm text-gray-600">
				<p className="text-center">Geographic distribution of endangered species across regions</p>
			</div>
		</div>
	);
}
