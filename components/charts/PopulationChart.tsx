'use client';

import {
	CategoryScale,
	type ChartData,
	Chart as ChartJS,
	type ChartOptions,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import type { Species } from '@/lib/core/domain/entities/species';
import { useTranslation } from '@/lib/i18n/useTranslation';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

/**
 * Props for the PopulationChart component
 */
interface PopulationChartProps {
	/** Array of species to display in the chart */
	species: Species[];
}

/**
 * Gets the color for a conservation status
 *
 * @param status - The conservation status string
 * @returns RGBA color string for the status
 */
function getStatusColor(status: string): string {
	if (status.includes('Critically')) return 'rgba(220, 53, 69, 0.8)'; // Red
	if (status.includes('Endangered')) return 'rgba(255, 128, 0, 0.8)'; // Orange
	if (status.includes('Vulnerable')) return 'rgba(255, 193, 7, 0.8)'; // Yellow
	return 'rgba(40, 167, 69, 0.8)'; // Green for others
}

/**
 * PopulationChart Component
 *
 * Displays a line chart showing the 10 species with the lowest populations.
 * This helps visualize which species are most critically endangered based on
 * remaining population counts.
 *
 * @param props - Component props
 * @returns A line chart visualization of species populations
 *
 * @example
 * ```tsx
 * <PopulationChart species={speciesArray} />
 * ```
 */
export default function PopulationChart({ species }: PopulationChartProps) {
	const { t } = useTranslation();
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

		const backgroundColor = speciesWithPopulation.map((animal) =>
			getStatusColor(animal.conservation_status),
		);

		setChartData({
			labels,
			datasets: [
				{
					label: t('charts.population.label'),
					data,
					backgroundColor,
					borderColor: 'rgba(75, 192, 192, 1)',
					borderWidth: 1,
					tension: 0.1,
				},
			],
		});
	}, [species, t]);

	const options: ChartOptions<'line'> = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: false,
				text: t('charts.population.title'),
			},
			tooltip: {
				callbacks: {
					label: (context) => {
						const value = context.raw as number;
						return `${t('charts.population.label')}: ${value.toLocaleString()}`;
					},
				},
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				title: {
					display: true,
					text: t('charts.population.label'),
				},
				ticks: {
					callback: (value) => Number(value).toLocaleString(),
				},
			},
			x: {
				title: {
					display: true,
					text: t('species.featured'),
				},
				ticks: {
					maxRotation: 45,
					minRotation: 45,
				},
			},
		},
	};

	return (
		<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
			<h3 className="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">
				{t('charts.population.title')}
			</h3>
			<div className="h-64">
				<Line data={chartData} options={options} />
			</div>
			<div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
				<p className="text-center">{t('charts.population.description')}</p>
			</div>
		</div>
	);
}
