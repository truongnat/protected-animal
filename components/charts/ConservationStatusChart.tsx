'use client';

import type { Species } from '@/lib/core/domain/entities/species';
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

ChartJS.register(ArcElement, Tooltip, Legend);

interface ConservationStatusChartProps {
	species: Species[];
}

export default function ConservationStatusChart({ species }: ConservationStatusChartProps) {
	const [chartData, setChartData] = useState<ChartData<'pie'>>({
		labels: [],
		datasets: [],
	});

	useEffect(() => {
		// Count species by conservation status
		const statusCounts: Record<string, number> = {};

		species.forEach((animal) => {
			const status = animal.conservation_status;
			statusCounts[status] = (statusCounts[status] || 0) + 1;
		});

		// Prepare data for chart
		const labels = Object.keys(statusCounts);
		const data = Object.values(statusCounts);

		// Define colors based on conservation status
		const getStatusColor = (status: string) => {
			if (status.includes('Critically')) return 'rgba(220, 53, 69, 0.8)'; // Red
			if (status.includes('Endangered')) return 'rgba(255, 128, 0, 0.8)'; // Orange
			if (status.includes('Vulnerable')) return 'rgba(255, 193, 7, 0.8)'; // Yellow
			if (status.includes('Near Threatened')) return 'rgba(40, 167, 69, 0.8)'; // Green
			return 'rgba(108, 117, 125, 0.8)'; // Gray for others
		};

		const backgroundColor = labels.map(getStatusColor);
		const borderColor = labels.map((status) => getStatusColor(status).replace('0.8', '1'));

		setChartData({
			labels,
			datasets: [
				{
					label: 'Number of Species',
					data,
					backgroundColor,
					borderColor,
					borderWidth: 1,
				},
			],
		});
	}, [species]);

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
		<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
			<h3 className="text-xl font-semibold mb-4 text-center">Species by Conservation Status</h3>
			<div className="h-64">
				<Pie data={chartData} options={options} />
			</div>
			<div className="mt-4 text-sm text-gray-600">
				<p className="text-center">Distribution of species based on their IUCN Red List status</p>
			</div>
		</div>
	);
}
