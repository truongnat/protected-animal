'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Species } from '@/lib/core/domain/entities/species';
import { SpeciesFactory } from '@/lib/core/factories/species.factory';
import { useTranslation } from '@/lib/i18n/useTranslation';
import ConservationStatusChart from './ConservationStatusChart';
import PopulationChart from './PopulationChart';
import RegionChart from './RegionChart';

/**
 * Props for the SpeciesCharts component
 */
interface SpeciesChartsProps {
	/** Optional initial species data to avoid fetching */
	initialSpecies?: Species[];
}

/**
 * SpeciesCharts Component
 *
 * Displays a dashboard of interactive charts showing endangered species data
 * including conservation status distribution, regional distribution, and population data.
 *
 * @param props - Component props
 * @returns The species charts dashboard section
 *
 * @example
 * ```tsx
 * <SpeciesCharts />
 * ```
 */
export default function SpeciesCharts({ initialSpecies }: SpeciesChartsProps) {
	const { t } = useTranslation();
	const [species, setSpecies] = useState<Species[]>(initialSpecies || []);
	const [isLoading, setIsLoading] = useState<boolean>(!initialSpecies);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		// Skip fetching if we have initial data
		if (initialSpecies) {
			return;
		}

		/**
		 * Fetches all species data for charts
		 */
		async function fetchSpeciesData(): Promise<void> {
			try {
				setIsLoading(true);
				setError(null);

				// Get use case from factory
				const getAllSpeciesUseCase = SpeciesFactory.createGetAllSpeciesUseCase();

				// Execute use case to get all species
				const data = await getAllSpeciesUseCase.execute();
				setSpecies(data);
			} catch (err) {
				const error = err instanceof Error ? err : new Error('Failed to fetch species data');
				console.error('Error fetching species for charts:', error);
				setError(error);
			} finally {
				setIsLoading(false);
			}
		}

		fetchSpeciesData();
	}, [initialSpecies]);

	// Loading state
	if (isLoading) {
		return (
			<section className="py-16 bg-gray-50 dark:bg-gray-900">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<p className="text-lg text-gray-600 dark:text-gray-400">{t('charts.loading')}</p>
					</div>
				</div>
			</section>
		);
	}

	// Error state
	if (error) {
		return (
			<section className="py-16 bg-gray-50 dark:bg-gray-900">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<p className="text-lg text-red-600 dark:text-red-400">{t('charts.error')}</p>
						<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{error.message}</p>
					</div>
				</div>
			</section>
		);
	}

	// No data state
	if (species.length === 0) {
		return (
			<section className="py-16 bg-gray-50 dark:bg-gray-900">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<p className="text-lg text-gray-600 dark:text-gray-400">{t('charts.noData')}</p>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="py-16 bg-gray-50 dark:bg-gray-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
						{t('charts.dashboard.title')}
					</h2>
					<p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
						{t('charts.dashboard.subtitle')}
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<ConservationStatusChart species={species} />
					<RegionChart species={species} />
					<PopulationChart species={species} />
				</div>

				<div className="mt-12 text-center">
					<Link
						href="/landing/species"
						className="inline-block bg-green-700 dark:bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-800 dark:hover:bg-green-700 transition"
					>
						{t('charts.dashboard.exploreButton')}
					</Link>
				</div>

				<div className="mt-8 text-center text-gray-600 dark:text-gray-400 text-sm">
					<p>{t('charts.dashboard.dataSource')}</p>
				</div>
			</div>
		</section>
	);
}
