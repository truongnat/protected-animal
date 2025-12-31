'use client';

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
import type { Species } from '@/lib/core/domain/entities/species';
import { useTranslation } from '@/lib/i18n/useTranslation';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

/**
 * Props for the RegionChart component
 */
interface RegionChartProps {
	/** Array of species to display in the chart */
	species: Species[];
}

/**
 * RegionChart Component
 *
 * Displays a bar chart showing the geographic distribution of endangered species
 * across different regions. Shows the top 8 regions with the most species.
 *
 * @param props - Component props
 * @returns A bar chart visualization of species by region
 *
 * @example
 * ```tsx
 * <RegionChart species={speciesArray} />
 * ```
 */
export default function RegionChart({ species }: RegionChartProps) {
	const { t } = useTranslation();
	const [chartData, setChartData] = useState<ChartData<'bar'>>({
		labels: [],
		datasets: [],
	});

	useEffect(() => {
		// Count species by region
		const regionCounts: Record<string, number> = {};

		for (const animal of species) {
			const region = animal.region || 'Unknown';
			regionCounts[region] = (regionCounts[region] || 0) + 1;
		}

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
					label: t('charts.region.label'),
					data,
					backgroundColor: 'rgba(75, 192, 192, 0.8)',
					borderColor: 'rgba(75, 192, 192, 1)',
					borderWidth: 1,
				},
			],
		});
	}, [species, t]);

	const options: ChartOptions<'bar'> = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: false,
				text: t('charts.region.title'),
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				title: {
					display: true,
					text: t('charts.region.yAxisLabel'),
				},
			},
			x: {
				title: {
					display: true,
					text: t('charts.region.xAxisLabel'),
				},
			},
		},
	};

	return (
		<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
			<h3 className="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">
				{t('charts.region.title')}
			</h3>
			<div className="h-64">
				<Bar data={chartData} options={options} />
			</div>
			<div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
				<p className="text-center">{t('charts.region.description')}</p>
			</div>
		</div>
	);
}
