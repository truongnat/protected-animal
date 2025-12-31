'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from '@/lib/i18n/useTranslation';

/**
 * Props for the ReportingWidget component
 */
interface ReportingWidgetProps {
	/** Optional language override (defaults to context language) */
	language?: 'en' | 'vi';
	/** Optional callback when form is submitted successfully */
	onSubmitSuccess?: () => void;
	/** Optional callback when form submission fails */
	onSubmitError?: (error: Error) => void;
}

/**
 * Form data structure for wildlife crime reports
 */
interface ReportFormData {
	/** Type of wildlife crime being reported */
	type: string;
	/** Location where the incident occurred */
	location: string;
	/** Detailed description of the incident */
	description: string;
	/** Optional contact information for follow-up */
	contact?: string;
}

/**
 * Statistics data for the reporting widget
 */
interface ReportingStats {
	/** Total number of reports submitted */
	totalReports: number;
	/** Number of resolved cases */
	resolvedCases: number;
	/** Number of pending investigations */
	pendingCases: number;
}

/**
 * ReportingWidget - A comprehensive widget for reporting wildlife crimes
 *
 * This component provides quick access to report wildlife crimes with:
 * - Emergency hotline information
 * - Quick action buttons for different report types
 * - Inline report form with validation
 * - Statistics display
 * - Legal notice
 *
 * @example
 * ```tsx
 * <ReportingWidget
 *   onSubmitSuccess={() => console.log('Report submitted')}
 *   onSubmitError={(error) => console.error(error)}
 * />
 * ```
 */
export default function ReportingWidget({
	language,
	onSubmitSuccess,
	onSubmitError,
}: ReportingWidgetProps) {
	const [isFormExpanded, setIsFormExpanded] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [submitSuccess, setSubmitSuccess] = useState(false);
	const { t } = useTranslation();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
		watch,
	} = useForm<ReportFormData>({
		defaultValues: {
			type: '',
			location: '',
			description: '',
			contact: '',
		},
	});

	const selectedType = watch('type');

	/**
	 * Handles form submission
	 * @param data - The validated form data
	 */
	const onSubmit = async (data: ReportFormData) => {
		setIsSubmitting(true);
		setSubmitError(null);
		setSubmitSuccess(false);

		try {
			// Simulate API call - replace with actual API endpoint
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Log the submission for debugging
			console.log('Report submitted:', data);

			setSubmitSuccess(true);
			reset();
			setIsFormExpanded(false);

			if (onSubmitSuccess) {
				onSubmitSuccess();
			}
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : t('common.error');
			setSubmitError(errorMessage);
			console.error('Report submission error:', error);

			if (onSubmitError && error instanceof Error) {
				onSubmitError(error);
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	// Mock statistics - replace with actual data fetching
	const stats: ReportingStats = {
		totalReports: 1247,
		resolvedCases: 892,
		pendingCases: 355,
	};

	return (
		<Card className="border-destructive dark:border-destructive">
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>
						<CardTitle className="text-2xl">{t('reporting.title')}</CardTitle>
						<CardDescription>{t('reporting.subtitle')}</CardDescription>
					</div>
					<div className="text-4xl animate-pulse">🚨</div>
				</div>
			</CardHeader>

			<CardContent className="space-y-6">
				<EmergencyHotline />
				<QuickActions />

				{/* Inline Report Form Toggle */}
				<div>
					<Button
						type="button"
						onClick={() => setIsFormExpanded(!isFormExpanded)}
						variant={isFormExpanded ? 'outline' : 'default'}
						className="w-full"
					>
						{isFormExpanded ? t('common.close') : t('reporting.form.title')}
					</Button>
				</div>

				{/* Expandable Report Form */}
				{isFormExpanded && (
					<Card className="dark:bg-card">
						<CardContent className="pt-6">
							<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
								{/* Report Type */}
								<div className="space-y-2">
									<Label htmlFor="type">{t('reporting.form.typeRequired')}</Label>
									<Select value={selectedType} onValueChange={(value) => setValue('type', value)}>
										<SelectTrigger id="type" aria-label={t('reporting.form.type')}>
											<SelectValue placeholder={t('reporting.form.selectType')} />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="poaching">{t('reporting.form.types.poaching')}</SelectItem>
											<SelectItem value="trafficking">
												{t('reporting.form.types.trafficking')}
											</SelectItem>
											<SelectItem value="habitat">{t('reporting.form.types.habitat')}</SelectItem>
											<SelectItem value="captivity">
												{t('reporting.form.types.captivity')}
											</SelectItem>
											<SelectItem value="trade">{t('reporting.form.types.trade')}</SelectItem>
											<SelectItem value="other">{t('reporting.form.types.other')}</SelectItem>
										</SelectContent>
									</Select>
									{errors.type && <p className="text-sm text-destructive">{errors.type.message}</p>}
								</div>

								{/* Location */}
								<div className="space-y-2">
									<Label htmlFor="location">{t('reporting.form.location')}</Label>
									<Input
										id="location"
										type="text"
										placeholder={t('reporting.form.locationPlaceholder')}
										{...register('location', {
											required: `${t('reporting.form.location')} is required`,
											minLength: {
												value: 3,
												message: 'Location must be at least 3 characters',
											},
										})}
										aria-invalid={errors.location ? 'true' : 'false'}
									/>
									{errors.location && (
										<p className="text-sm text-destructive">{errors.location.message}</p>
									)}
								</div>

								{/* Description */}
								<div className="space-y-2">
									<Label htmlFor="description">{t('reporting.form.description')}</Label>
									<Textarea
										id="description"
										placeholder={t('reporting.form.descriptionPlaceholder')}
										rows={4}
										{...register('description', {
											required: `${t('reporting.form.description')} is required`,
											minLength: {
												value: 10,
												message: 'Description must be at least 10 characters',
											},
										})}
										aria-invalid={errors.description ? 'true' : 'false'}
									/>
									{errors.description && (
										<p className="text-sm text-destructive">{errors.description.message}</p>
									)}
								</div>

								{/* Contact Information */}
								<div className="space-y-2">
									<Label htmlFor="contact">{t('reporting.form.contact')}</Label>
									<Input
										id="contact"
										type="text"
										placeholder={t('reporting.form.contactPlaceholder')}
										{...register('contact')}
									/>
								</div>

								{/* Error Display */}
								{submitError && (
									<Alert variant="destructive">
										<AlertDescription>{submitError}</AlertDescription>
									</Alert>
								)}

								{/* Success Display */}
								{submitSuccess && (
									<Alert className="bg-green-50 text-green-900 border-green-200 dark:bg-green-950 dark:text-green-100 dark:border-green-800">
										<AlertDescription>
											Report submitted successfully! Authorities will be notified.
										</AlertDescription>
									</Alert>
								)}

								{/* Submit Button */}
								<Button
									type="submit"
									disabled={isSubmitting}
									className="w-full"
									variant="destructive"
								>
									{isSubmitting ? t('reporting.form.submitting') : t('reporting.form.submit')}
								</Button>
							</form>
						</CardContent>
					</Card>
				)}

				<ReportingStatistics stats={stats} />
				<LegalNotice language={language} />
			</CardContent>
		</Card>
	);
}

/**
 * EmergencyHotline - Displays emergency contact information
 */
function EmergencyHotline() {
	const { t } = useTranslation();

	return (
		<Card className="bg-destructive text-destructive-foreground dark:bg-destructive dark:text-destructive-foreground">
			<CardContent className="pt-6">
				<div className="flex items-center gap-3">
					<span className="text-2xl" role="img" aria-label="Phone">
						📞
					</span>
					<div>
						<p className="font-bold">{t('reporting.emergency')}</p>
						<p className="text-sm opacity-90">
							{t('reporting.emergency').includes('24/7') ? '' : '24/7 Available'}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

/**
 * QuickActions - Displays quick action buttons for different report types
 */
function QuickActions() {
	const { t } = useTranslation();

	return (
		<div className="grid grid-cols-2 gap-3">
			<Button variant="destructive" asChild className="h-auto p-4 flex-col items-start">
				<Link href="/report?type=emergency">
					<div className="text-2xl mb-2" role="img" aria-label="Emergency">
						🚨
					</div>
					<h4 className="font-semibold text-sm mb-1">{t('reporting.actions.emergency.label')}</h4>
					<p className="text-xs opacity-90">{t('reporting.actions.emergency.desc')}</p>
				</Link>
			</Button>
			<Button variant="outline" asChild className="h-auto p-4 flex-col items-start">
				<Link href="/report?type=evidence">
					<div className="text-2xl mb-2" role="img" aria-label="Camera">
						📸
					</div>
					<h4 className="font-semibold text-sm mb-1">{t('reporting.actions.evidence.label')}</h4>
					<p className="text-xs text-muted-foreground">{t('reporting.actions.evidence.desc')}</p>
				</Link>
			</Button>
			<Button variant="outline" asChild className="h-auto p-4 flex-col items-start">
				<Link href="/report?type=location">
					<div className="text-2xl mb-2" role="img" aria-label="Location">
						📍
					</div>
					<h4 className="font-semibold text-sm mb-1">{t('reporting.actions.location.label')}</h4>
					<p className="text-xs text-muted-foreground">{t('reporting.actions.location.desc')}</p>
				</Link>
			</Button>
			<Button variant="outline" asChild className="h-auto p-4 flex-col items-start">
				<Link href="/report?type=anonymous">
					<div className="text-2xl mb-2" role="img" aria-label="Anonymous">
						🔍
					</div>
					<h4 className="font-semibold text-sm mb-1">{t('reporting.actions.anonymous.label')}</h4>
					<p className="text-xs text-muted-foreground">{t('reporting.actions.anonymous.desc')}</p>
				</Link>
			</Button>
		</div>
	);
}

/**
 * ReportingStatistics - Displays statistics about reports
 * @param stats - The statistics data to display
 */
function ReportingStatistics({ stats }: { stats: ReportingStats }) {
	const { t } = useTranslation();

	return (
		<Card className="dark:bg-card">
			<CardHeader>
				<CardTitle className="text-base">{t('reporting.stats.reports')}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-3 gap-4 text-center">
					<div>
						<div className="text-2xl font-bold">{stats.totalReports.toLocaleString()}</div>
						<div className="text-xs text-muted-foreground">{t('reporting.stats.reports')}</div>
					</div>
					<div>
						<div className="text-2xl font-bold">{stats.resolvedCases.toLocaleString()}</div>
						<div className="text-xs text-muted-foreground">{t('reporting.stats.resolved')}</div>
					</div>
					<div>
						<div className="text-2xl font-bold">{stats.pendingCases.toLocaleString()}</div>
						<div className="text-xs text-muted-foreground">{t('reporting.stats.pending')}</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

/**
 * LegalNotice - Displays legal information about reporting
 * @param language - Optional language override
 */
function LegalNotice({ language }: { language?: 'en' | 'vi' }) {
	const { t } = useTranslation();

	return (
		<Alert className="dark:bg-card">
			<AlertDescription className="text-xs">
				<span role="img" aria-label="Legal">
					⚖️
				</span>{' '}
				{t('reporting.form.legal')}
			</AlertDescription>
		</Alert>
	);
}
