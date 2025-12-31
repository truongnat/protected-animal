'use client';

import {
	ArcElement,
	type ChartData,
	Chart as ChartJS,
	type ChartOptions,
	Legend,
	Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import type { Species } from '@/lib/core/domain/entities/species';
import { useTranslation } from '@/lib/i18n/useTranslation';

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * Props for the ConservationStatusChart component
 */
interface ConservationStatusChartProps {
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
	if (status.includes('Near Threatened')) return 'rgba(40, 167, 69, 0.8)'; // Green
	return 'rgba(108, 117, 125, 0.8)'; // Gray for others
}

/**
 * ConservationStatusChart Component
 *
 * Displays a pie chart showing the distribution of species by their IUCN Red List
 * conservation status. The chart uses color coding to indicate severity levels.
 *
 * @param props - Component props
 * @returns A pie chart visualization of conservation status distribution
 *
 * @example
 * ```tsx
 * <ConservationStatusChart species={speciesArray} />
 * ```
 */
export default function ConservationStatusChart({ species }: ConservationStatusChartProps) {
	const { t } = useTranslation();
	const [chartData, setChartData] = useState<ChartData<'pie'>>({
		labels: [],
		datasets: [],
	});

	useEffect(() => {
		// Count species by conservation status
		const statusCounts: Record<string, number> = {};

		for (const animal of species) {
			const status = animal.conservation_status;
			statusCounts[status] = (statusCounts[status] || 0) + 1;
		}

		// Prepare data for chart
		const labels = Object.keys(statusCounts);
		const data = Object.values(statusCounts);

		const backgroundColor = labels.map(getStatusColor);
		const borderColor = labels.map((status) => getStatusColor(status).replace('0.8', '1'));

		setChartData({
			labels,
			datasets: [
				{
					label: t('charts.conservationStatus.label'),
					data,
					backgroundColor,
					borderColor,
					borderWidth: 1,
				},
			],
		});
	}, [species, t]);

	const options: ChartOptions<'pie'> = {
		responsive: true,
		plugins: {
			legend: {
				position: 'right',
			},
			tooltip: {
				callbacks: {
					label: (context) => {
						const label = context.label || '';
						const value = context.raw as number;
						const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
						const percentage = Math.round((value / total) * 100);
						return `${label}: ${value} (${percentage}%)`;
					},
				},
			},
		},
	};

	return (
		<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
			<h3 className="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">
				{t('charts.conservationStatus.title')}
			</h3>
			<div className="h-64">
				<Pie data={chartData} options={options} />
			</div>
			<div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
				<p className="text-center">{t('charts.conservationStatus.description')}</p>
			</div>
		</div>
	);
}
