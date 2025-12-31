'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import type { Species } from '@/lib/core/domain/entities/species';
import { useTranslation } from '@/lib/i18n/useTranslation';

/**
 * Props for the SpeciesCard component
 */
interface SpeciesCardProps {
	/** The species data to display */
	species: Species;
	/** Optional language override (defaults to current translation context) */
	language?: 'en' | 'vi';
	/** Whether to show action buttons (report, support) */
	showActions?: boolean;
	/** Optional CSS class name for styling */
	className?: string;
}

/**
 * Props for the SpeciesImage sub-component
 */
interface SpeciesImageProps {
	/** Image URL */
	imageUrl: string;
	/** Species name for alt text */
	name: string;
	/** Conservation status for badge */
	conservationStatus: string;
	/** Region for badge */
	region: string;
	/** Translated status text */
	statusText: string;
}

/**
 * Props for the SpeciesInfo sub-component
 */
interface SpeciesInfoProps {
	/** Species name */
	name: string;
	/** Scientific name */
	scientificName: string;
	/** Description text */
	description: string;
	/** Population count */
	population: number | null;
	/** List of threats */
	threats: string[] | undefined;
	/** Threat level percentage */
	threatLevel: string;
	/** Translation function */
	t: (key: string) => string;
}

/**
 * Props for the SpeciesActions sub-component
 */
interface SpeciesActionsProps {
	/** Species ID for navigation */
	speciesId: number;
	/** Whether to show action buttons */
	showActions: boolean;
	/** Translation function */
	t: (key: string) => string;
}

/**
 * Conservation status configuration with badge variants and threat levels
 */
interface StatusConfig {
	variant: 'destructive' | 'default' | 'secondary' | 'outline';
	progress: string;
}

// Conservation status colors - KEEP these as they have semantic meaning
const statusColors: Record<string, StatusConfig> = {
	'Critically Endangered': { variant: 'destructive', progress: '95%' },
	Endangered: { variant: 'default', progress: '85%' },
	Vulnerable: { variant: 'secondary', progress: '70%' },
	'Near Threatened': { variant: 'outline', progress: '50%' },
	'Least Concern': { variant: 'default', progress: '20%' },
};

/**
 * Default status configuration for unknown statuses
 */
const defaultStatusConfig: StatusConfig = { variant: 'default', progress: '20%' };

/**
 * Map conservation status to translation keys
 */
const statusTranslationMap: Record<string, string> = {
	'Critically Endangered': 'species.status.criticallyEndangered',
	Endangered: 'species.status.endangered',
	Vulnerable: 'species.status.vulnerable',
	'Near Threatened': 'species.status.nearThreatened',
	'Least Concern': 'species.status.leastConcern',
};

/**
 * SpeciesImage - Displays the species image with status and region badges
 */
function SpeciesImage({
	imageUrl,
	name,
	conservationStatus,
	region,
	statusText,
}: SpeciesImageProps) {
	const statusStyle: StatusConfig = statusColors[conservationStatus] ?? defaultStatusConfig;

	return (
		<div className="relative h-48 bg-muted dark:bg-muted/50 overflow-hidden">
			<ImageWithFallback
				src={imageUrl || ''}
				alt={`${name} - endangered species`}
				altText={name}
				fill
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				className="object-cover group-hover:scale-105 transition-transform duration-300"
				unoptimized
				aria-label={`Image of ${name}`}
			/>

			{/* Status Badge */}
			<div className="absolute top-3 right-3">
				<Badge
					variant={statusStyle.variant}
					className="backdrop-blur-sm dark:backdrop-blur-md"
					aria-label={`Conservation status: ${statusText}`}
				>
					{statusText}
				</Badge>
			</div>

			{/* Region Badge */}
			{region && (
				<div className="absolute top-3 left-3">
					<Badge
						variant="secondary"
						className="backdrop-blur-sm dark:backdrop-blur-md"
						aria-label={`Region: ${region}`}
					>
						📍 {region}
					</Badge>
				</div>
			)}
		</div>
	);
}

/**
 * SpeciesInfo - Displays the species information including name, description, population, and threats
 */
function SpeciesInfo({
	name,
	scientificName,
	description,
	population,
	threats,
	threatLevel,
	t,
}: SpeciesInfoProps) {
	return (
		<>
			<CardHeader>
				<h3 className="text-xl font-bold mb-1 dark:text-foreground">{name}</h3>
				<p className="text-sm text-muted-foreground dark:text-muted-foreground italic">
					{scientificName}
				</p>
			</CardHeader>

			<CardContent className="space-y-4">
				{/* Conservation Progress Bar */}
				<div>
					<div className="flex justify-between items-center mb-1">
						<span className="text-xs font-medium text-muted-foreground dark:text-muted-foreground">
							{t('species.threatLevel')}
						</span>
						<span className="text-xs text-muted-foreground dark:text-muted-foreground">
							{threatLevel}
						</span>
					</div>
					<div className="w-full bg-muted dark:bg-muted/50 rounded-full h-2">
						<div
							className="bg-primary dark:bg-primary h-2 rounded-full transition-all duration-500"
							style={{ width: threatLevel }}
							role="progressbar"
							aria-valuenow={parseInt(threatLevel, 10)}
							aria-valuemin={0}
							aria-valuemax={100}
							aria-label={`Threat level: ${threatLevel}`}
						/>
					</div>
				</div>

				{/* Population Info */}
				{population && (
					<div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-muted-foreground">
						<span aria-hidden="true">👥</span>
						<span>
							{t('species.population')}: ~{population.toLocaleString()}
						</span>
					</div>
				)}

				{/* Description */}
				<p className="text-sm text-muted-foreground dark:text-muted-foreground line-clamp-3 leading-relaxed">
					{description}
				</p>

				{/* Threats */}
				{threats && threats.length > 0 && (
					<div>
						<p className="text-xs font-medium text-muted-foreground dark:text-muted-foreground mb-2">
							{t('species.mainThreats')}:
						</p>
						<div className="flex flex-wrap gap-1">
							{threats.slice(0, 3).map((threat: string, index: number) => (
								<Badge
									key={`threat-${index}`}
									variant="destructive"
									className="dark:bg-destructive dark:text-destructive-foreground"
								>
									{threat}
								</Badge>
							))}
						</div>
					</div>
				)}
			</CardContent>
		</>
	);
}

/**
 * SpeciesActions - Displays action buttons for the species card
 */
function SpeciesActions({ speciesId, showActions, t }: SpeciesActionsProps) {
	return (
		<CardFooter className="flex items-center justify-between border-t dark:border-border pt-4">
			<Button
				variant="link"
				asChild
				className="p-0 dark:text-primary"
				aria-label={`${t('species.actions.learn')} about species`}
			>
				<Link href={`/species/${speciesId}`}>{t('species.actions.learn')} →</Link>
			</Button>

			{showActions && (
				<div className="flex gap-2" role="group" aria-label="Species actions">
					<Button
						variant="ghost"
						size="icon"
						type="button"
						aria-label={t('species.actions.report')}
						title={t('species.actions.report')}
						className="dark:hover:bg-accent"
					>
						🚨
					</Button>
					<Button
						variant="ghost"
						size="icon"
						type="button"
						aria-label={t('species.actions.support')}
						title={t('species.actions.support')}
						className="dark:hover:bg-accent"
					>
						💚
					</Button>
				</div>
			)}
		</CardFooter>
	);
}

/**
 * SpeciesCard - A card component displaying information about an endangered species
 *
 * This component shows species details including image, conservation status, population,
 * threats, and action buttons. It supports internationalization and dark mode.
 *
 * @example
 * ```tsx
 * <SpeciesCard
 *   species={speciesData}
 *   showActions={true}
 * />
 * ```
 *
 * @param props - Component props
 * @returns A card displaying species information
 */
export default function SpeciesCard({
	species,
	language,
	showActions = false,
	className = '',
}: SpeciesCardProps) {
	const { t } = useTranslation();
	const statusStyle: StatusConfig =
		statusColors[species.conservation_status] ?? defaultStatusConfig;

	// Get translated status text
	const statusTranslationKey =
		statusTranslationMap[species.conservation_status] || species.conservation_status;
	const statusText = t(statusTranslationKey);

	return (
		<Card
			className={`group overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-card dark:border-border ${className}`}
			role="article"
			aria-label={`Species card for ${species.name}`}
		>
			<SpeciesImage
				imageUrl={species.image_url}
				name={species.name}
				conservationStatus={species.conservation_status}
				region={species.region}
				statusText={statusText}
			/>

			<SpeciesInfo
				name={species.name}
				scientificName={species.scientific_name}
				description={species.description}
				population={species.population}
				threats={species.threats}
				threatLevel={statusStyle.progress}
				t={t}
			/>

			<SpeciesActions speciesId={species.id} showActions={showActions} t={t} />
		</Card>
	);
}
