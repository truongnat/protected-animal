'use client';

import { useState } from 'react';
import { useTranslation } from '@/lib/i18n/useTranslation';

/**
 * Props for the ConservationImpact component
 */
interface ConservationImpactProps {
	/** Optional language override (defaults to context language) */
	language?: 'en' | 'vi';
}

/**
 * Available tab types for the conservation impact display
 */
type TabType = 'metrics' | 'partnerships' | 'wins';

/**
 * Props for the MetricCard sub-component
 */
interface MetricCardProps {
	/** Emoji icon representing the metric */
	icon: string;
	/** Numeric or string value of the metric */
	value: string | number;
	/** Label describing the metric */
	label: string;
	/** Change indicator (e.g., "+15%") */
	change: string;
	/** Detailed description of the metric */
	description: string;
}

/**
 * Props for the PartnershipCard sub-component
 */
interface PartnershipCardProps {
	/** Emoji icon representing the partner */
	icon: string;
	/** Name of the partner organization */
	name: string;
	/** Category of partnership */
	category: string;
	/** Progress percentage (0-100) */
	progress: number;
}

/**
 * Props for the WinCard sub-component
 */
interface WinCardProps {
	/** Emoji icon representing the win */
	icon: string;
	/** Title of the conservation win */
	title: string;
	/** Description of the conservation win */
	description: string;
}

/**
 * MetricCard displays a single conservation metric with icon, value, and description
 */
function MetricCard({ icon, value, label, change, description }: MetricCardProps) {
	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-green-100 dark:border-green-700 hover:shadow-md transition-shadow">
			<div className="text-4xl mb-3" role="img" aria-label={label}>
				{icon}
			</div>
			<div className="text-3xl font-bold text-green-800 dark:text-green-200 mb-1">{value}</div>
			<div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</div>
			<div className="flex items-center gap-2 mb-3">
				<span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full font-medium">
					{change}
				</span>
			</div>
			<p className="text-xs text-gray-600 dark:text-gray-400">{description}</p>
		</div>
	);
}

/**
 * PartnershipCard displays information about a conservation partner organization
 */
function PartnershipCard({ icon, name, category, progress }: PartnershipCardProps) {
	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-green-100 dark:border-green-700 hover:shadow-md transition-shadow">
			<div className="flex items-center gap-4 mb-4">
				<div className="text-3xl" role="img" aria-label={name}>
					{icon}
				</div>
				<div>
					<h3 className="font-bold text-gray-800 dark:text-gray-200">{name}</h3>
					<p className="text-sm text-green-600 dark:text-green-400">{category}</p>
				</div>
			</div>
			<div
				className="w-full bg-green-100 dark:bg-green-900/30 rounded-full h-2"
				role="progressbar"
				aria-valuenow={progress}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-label={`${name} progress`}
			>
				<div
					className="bg-green-500 h-2 rounded-full transition-all"
					style={{ width: `${progress}%` }}
				/>
			</div>
			<p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Active collaboration</p>
		</div>
	);
}

/**
 * WinCard displays a recent conservation success story
 */
function WinCard({ icon, title, description }: WinCardProps) {
	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-green-100 dark:border-green-700 shadow-sm">
			<div className="flex items-start gap-4">
				<div className="text-2xl" role="img" aria-label={title}>
					{icon}
				</div>
				<div>
					<h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{title}</h3>
					<p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
				</div>
			</div>
		</div>
	);
}

/**
 * Props for the TabButton sub-component
 */
interface TabButtonProps {
	/** Whether this tab is currently active */
	active: boolean;
	/** Click handler for tab selection */
	onClick: () => void;
	/** Emoji icon for the tab */
	icon: string;
	/** Label text for the tab */
	label: string;
}

/**
 * TabButton renders a single tab navigation button
 */
function TabButton({ active, onClick, icon, label }: TabButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			aria-pressed={active}
			aria-label={`${label} tab`}
			className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
				active
					? 'bg-green-600 text-white shadow-sm'
					: 'text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'
			}`}
		>
			<span role="img" aria-hidden="true">
				{icon}
			</span>{' '}
			{label}
		</button>
	);
}

/**
 * ConservationImpact displays conservation metrics, partnerships, and recent wins
 * in a tabbed interface. Supports internationalization and dark mode.
 *
 * @example
 * ```tsx
 * <ConservationImpact />
 * ```
 */
export default function ConservationImpact({ language }: ConservationImpactProps) {
	const [activeTab, setActiveTab] = useState<TabType>('metrics');
	const { t } = useTranslation();

	// Note: language prop is available for future use but currently
	// the translation hook uses the global language context

	const metricsData: MetricCardProps[] = [
		{
			icon: '🐅',
			value: 23,
			label: t('conservation.metrics.tigers'),
			change: '+15%',
			description:
				t('conservation.metrics.tigersDesc') || 'Increased tiger population in protected areas',
		},
		{
			icon: '🦏',
			value: 8,
			label: t('conservation.metrics.saola'),
			change: '+2',
			description: t('conservation.metrics.saolaDesc') || 'Rare saola documented this year',
		},
		{
			icon: '🌳',
			value: '12,500',
			label: t('conservation.metrics.hectares'),
			change: '+8%',
			description:
				t('conservation.metrics.hectaresDesc') || 'New protected forest areas established',
		},
		{
			icon: '👥',
			value: '45,000',
			label: t('conservation.metrics.educated'),
			change: '+25%',
			description:
				t('conservation.metrics.educatedDesc') || 'Community members reached through programs',
		},
	];

	const partnershipsData: PartnershipCardProps[] = [
		{
			icon: '🐼',
			name: t('conservation.partnerships.wwf'),
			category: t('conservation.partnerships.speciesProtection') || 'Species Protection',
			progress: 85,
		},
		{
			icon: '🦎',
			name: t('conservation.partnerships.svw'),
			category: t('conservation.partnerships.rescue') || 'Rescue & Rehabilitation',
			progress: 92,
		},
		{
			icon: '🏛️',
			name: t('conservation.partnerships.fpd'),
			category: t('conservation.partnerships.lawEnforcement') || 'Law Enforcement',
			progress: 78,
		},
		{
			icon: '🌍',
			name: t('conservation.partnerships.iucn'),
			category: t('conservation.partnerships.research') || 'Research & Data',
			progress: 88,
		},
	];

	const winsData: WinCardProps[] = [
		{
			icon: '🦎',
			title: t('conservation.recentWins.pangolin'),
			description:
				t('conservation.recentWins.pangolinDesc') ||
				'Successful rescue operation saved 15 pangolins from illegal trafficking',
		},
		{
			icon: '👮',
			title: t('conservation.recentWins.patrol'),
			description:
				t('conservation.recentWins.patrolDesc') ||
				'Enhanced protection measures in Cat Tien National Park',
		},
		{
			icon: '🎓',
			title: t('conservation.recentWins.education'),
			description:
				t('conservation.recentWins.educationDesc') ||
				'Building awareness and community engagement in Sapa region',
		},
		{
			icon: '🌲',
			title: t('conservation.recentWins.habitat'),
			description:
				t('conservation.recentWins.habitatDesc') ||
				'Restoration of critical wildlife corridors in Central Highlands',
		},
	];

	return (
		<div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-2xl p-8 border border-green-100 dark:border-green-800 shadow-lg">
			{/* Header */}
			<div className="text-center mb-8">
				<h2 className="text-3xl font-bold text-green-800 dark:text-green-200 mb-3">
					{t('conservation.title')}
				</h2>
				<p className="text-green-600 dark:text-green-300 text-lg">{t('conservation.subtitle')}</p>
			</div>

			{/* Tab Navigation */}
			<nav className="flex justify-center mb-8" aria-label="Conservation impact sections">
				<div
					className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm border border-green-200 dark:border-green-700"
					role="tablist"
				>
					<TabButton
						active={activeTab === 'metrics'}
						onClick={() => setActiveTab('metrics')}
						icon="📊"
						label={t('conservation.metrics.title') || 'Metrics'}
					/>
					<TabButton
						active={activeTab === 'partnerships'}
						onClick={() => setActiveTab('partnerships')}
						icon="🤝"
						label={t('conservation.partnerships.title')}
					/>
					<TabButton
						active={activeTab === 'wins'}
						onClick={() => setActiveTab('wins')}
						icon="🏆"
						label={t('conservation.recentWins.title')}
					/>
				</div>
			</nav>

			{/* Content */}
			<div className="min-h-[300px]" role="tabpanel" aria-label={`${activeTab} content`}>
				{activeTab === 'metrics' && (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{metricsData.map((metric, index) => (
							<MetricCard key={`metric-${index}`} {...metric} />
						))}
					</div>
				)}

				{activeTab === 'partnerships' && (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{partnershipsData.map((partnership, index) => (
							<PartnershipCard key={`partnership-${index}`} {...partnership} />
						))}
					</div>
				)}

				{activeTab === 'wins' && (
					<div className="space-y-4">
						{winsData.map((win, index) => (
							<WinCard key={`win-${index}`} {...win} />
						))}
					</div>
				)}
			</div>

			{/* Call to Action */}
			<div className="mt-8 text-center">
				<div className="bg-green-600 dark:bg-green-700 text-white rounded-xl p-6">
					<h3 className="text-xl font-bold mb-2">{t('conservation.cta.title')}</h3>
					<p className="mb-4 opacity-90">{t('conservation.cta.subtitle')}</p>
					<div className="flex flex-wrap justify-center gap-3">
						<button
							type="button"
							aria-label={t('conservation.cta.donate')}
							className="bg-white text-green-600 px-6 py-2 rounded-lg font-medium hover:bg-green-50 dark:hover:bg-gray-100 transition-colors"
						>
							<span role="img" aria-hidden="true">
								💚
							</span>{' '}
							{t('conservation.cta.donate')}
						</button>
						<button
							type="button"
							aria-label={t('conservation.cta.volunteer')}
							className="bg-green-700 dark:bg-green-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-800 dark:hover:bg-green-900 transition-colors"
						>
							<span role="img" aria-hidden="true">
								🤝
							</span>{' '}
							{t('conservation.cta.volunteer')}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
