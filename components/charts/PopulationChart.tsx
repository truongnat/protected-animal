'use client';

import type { Species } from '@/lib/core/domain/entities/species';
import {
	CategoryScale,
	type ChartData,
	Chart as ChartJS,
	type ChartOptions,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	Title,
	Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface PopulationChartProps {
	species: Species[];
}

export default function PopulationChart({ species }: PopulationChartProps) {
	const [chartData, setChartData] = useState<ChartData<'line'>>({
		labels: [],
		datasets: [],
	});

	useEffect(() => {
		// Filter species with population data and sort by population (ascending)
		const speciesWithPopulation = species
			.filter((animal) => animal.population && animal.population > 0)
			.sort((a, b) => (a.population || 0) - (b.population || 0))
			.slice(0, 10); // Limit to 10 species for better visualization

		const labels = speciesWithPopulation.map((animal) => animal.name);
		const data = speciesWithPopulation.map((animal) => animal.population || 0);

		// Define colors based on conservation status
		const getStatusColor = (status: string) => {
			if (status.includes('Critically')) return 'rgba(220, 53, 69, 0.8)'; // Red
			if (status.includes('Endangered')) return 'rgba(255, 128, 0, 0.8)'; // Orange
			if (status.includes('Vulnerable')) return 'rgba(255, 193, 7, 0.8)'; // Yellow
			return 'rgba(40, 167, 69, 0.8)'; // Green for others
		};

		const backgroundColor = speciesWithPopulation.map((animal) =>
			getStatusColor(animal.conservation_status),
		);

		setChartData({
			labels,
			datasets: [
				{
					label: 'Population',
					data,
					backgroundColor,
					borderColor: 'rgba(75, 192, 192, 1)',
					borderWidth: 1,
					tension: 0.1,
				},
			],
		});
	}, [species]);

	const options: ChartOptions<'line'> = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: false,
				text: 'Species Population',
			},
			tooltip: {
				callbacks: {
					label: (context) => {
						const value = context.raw as number;
						return `Population: ${value.toLocaleString()}`;
					},
				},
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				title: {
					display: true,
					text: 'Population',
				},
				ticks: {
					callback: (value) => Number(value).toLocaleString(),
				},
			},
			x: {
				title: {
					display: true,
					text: 'Species',
				},
				ticks: {
					maxRotation: 45,
					minRotation: 45,
				},
			},
		},
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
			<h3 className="text-xl font-semibold mb-4 text-center">Species with Lowest Populations</h3>
			<div className="h-64">
				<Line data={chartData} options={options} />
			</div>
			<div className="mt-4 text-sm text-gray-600">
				<p className="text-center">
					Remaining population counts of the most critically endangered species
				</p>
			</div>
		</div>
	);
}
