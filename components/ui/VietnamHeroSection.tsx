'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from '@/lib/i18n/useTranslation';

/**
 * Props for the VietnamHeroSection component
 */
interface VietnamHeroSectionProps {
	/** Optional language override (defaults to current locale) */
	language?: 'en' | 'vi';
}

/**
 * Props for the BackgroundCarousel sub-component
 */
interface BackgroundCarouselProps {
	/** Array of image URLs to display in the carousel */
	images: string[];
	/** Current active slide index */
	currentSlide: number;
}

/**
 * Props for the HeroContent sub-component
 */
interface HeroContentProps {
	/** Translation function from useTranslation hook */
	t: (key: string) => string;
}

/**
 * Props for the StatsSection sub-component
 */
interface StatsSectionProps {
	/** Translation function from useTranslation hook */
	t: (key: string) => string;
}

/**
 * Props for the SlideIndicators sub-component
 */
interface SlideIndicatorsProps {
	/** Total number of slides */
	slideCount: number;
	/** Current active slide index */
	currentSlide: number;
	/** Callback when a slide indicator is clicked */
	onSlideChange: (index: number) => void;
}

/**
 * Background image carousel with fade transitions
 * Displays wildlife images with dark overlay for readability
 */
function BackgroundCarousel({ images, currentSlide }: BackgroundCarouselProps) {
	return (
		<div className="absolute inset-0">
			{images.map((image, index) => (
				<div
					key={index}
					className={`absolute inset-0 transition-opacity duration-1000 ${
						index === currentSlide ? 'opacity-100' : 'opacity-0'
					}`}
				>
					<ImageWithFallback
						src={image}
						alt="Vietnam Wildlife"
						fill
						priority={index === 0}
						unoptimized
						className="object-cover brightness-[0.4] dark:brightness-[0.3]"
					/>
				</div>
			))}
		</div>
	);
}

/**
 * Main hero content including title, subtitle, quote, and action buttons
 */
function HeroContent({ t }: HeroContentProps) {
	return (
		<div className="space-y-8">
			{/* Vietnam Badge */}
			<Badge variant="secondary" className="text-base px-4 py-2">
				<span className="text-2xl mr-2">🇻🇳</span>
				{t('hero.title')}
			</Badge>

			{/* Main Title */}
			<div>
				<h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-foreground">
					{t('hero.title')}
				</h1>
				<p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
					{t('hero.subtitle')}
				</p>
			</div>

			{/* Quote */}
			<Card>
				<CardContent className="pt-6">
					<p className="text-lg italic text-muted-foreground border-l-4 border-primary pl-4">
						"{t('hero.legal')}"
					</p>
				</CardContent>
			</Card>

			{/* Action Buttons */}
			<div className="flex flex-wrap gap-4">
				<Button asChild size="lg">
					<Link href="/species">{t('hero.cta.explore')}</Link>
				</Button>
				<Button asChild size="lg" variant="destructive">
					<Link href="/report">🚨 {t('hero.cta.report')}</Link>
				</Button>
				<Button asChild size="lg" variant="outline">
					<Link href="/donate">💚 {t('hero.cta.donate')}</Link>
				</Button>
			</div>
		</div>
	);
}

/**
 * Statistics and legal information cards
 * Displays conservation stats and legal framework information
 */
function StatsSection({ t }: StatsSectionProps) {
	return (
		<div className="space-y-6">
			{/* Vietnam Conservation Stats */}
			<Card>
				<CardHeader>
					<CardTitle>{t('hero.stats.species')}</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-1 gap-6">
					<div className="text-center">
						<div className="text-4xl font-bold text-primary mb-2">300+</div>
						<div className="text-sm text-muted-foreground">{t('hero.stats.species')}</div>
					</div>
					<Separator />
					<div className="text-center">
						<div className="text-4xl font-bold text-primary mb-2">1/3</div>
						<div className="text-sm text-muted-foreground">{t('hero.stats.endangered')}</div>
					</div>
					<Separator />
					<div className="text-center">
						<div className="text-4xl font-bold text-primary mb-2">15</div>
						<div className="text-sm text-muted-foreground">{t('hero.stats.protected')}</div>
					</div>
				</CardContent>
			</Card>

			{/* Legal Framework */}
			<Card className="border-destructive">
				<CardHeader>
					<CardTitle className="text-destructive">⚖️ {t('hero.stats.protected')}</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">{t('hero.legal')}</p>
				</CardContent>
			</Card>
		</div>
	);
}

/**
 * Slide navigation indicators
 * Allows users to manually navigate between carousel slides
 */
function SlideIndicators({ slideCount, currentSlide, onSlideChange }: SlideIndicatorsProps) {
	return (
		<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
			{Array.from({ length: slideCount }).map((_, index) => (
				<button
					key={index}
					type="button"
					onClick={() => onSlideChange(index)}
					className={`w-3 h-3 rounded-full transition-all duration-200 ${
						index === currentSlide ? 'bg-primary' : 'bg-muted dark:bg-muted-foreground/30'
					}`}
					aria-label={`Go to slide ${index + 1}`}
					aria-current={index === currentSlide ? 'true' : 'false'}
				/>
			))}
		</div>
	);
}

/**
 * Vietnam Hero Section Component
 *
 * Full-screen hero section featuring:
 * - Auto-rotating background image carousel of Vietnamese wildlife
 * - Main title and call-to-action buttons
 * - Conservation statistics
 * - Legal framework information
 * - Manual slide navigation
 *
 * @example
 * ```tsx
 * <VietnamHeroSection />
 * ```
 *
 * @example
 * ```tsx
 * <VietnamHeroSection language="vi" />
 * ```
 */
export default function VietnamHeroSection({ language }: VietnamHeroSectionProps) {
	const [currentSlide, setCurrentSlide] = useState(0);
	const { t } = useTranslation();

	const vietnamImages = [
		'https://images.unsplash.com/photo-1574068468668-a05a11f871da?q=80&w=2070', // Tiger
		'https://images.unsplash.com/photo-1564509027875-ba1c9b69526d?q=80&w=2070', // Elephant
		'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?q=80&w=2070', // Pangolin
	];

	// Auto-slide effect: rotates through images every 5 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % vietnamImages.length);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<section className="relative min-h-screen bg-background overflow-hidden">
			{/* Background Images Carousel */}
			<BackgroundCarousel images={vietnamImages} currentSlide={currentSlide} />

			{/* Gradient Overlay */}
			<div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80 dark:from-background/70 dark:via-background/50 dark:to-background/90" />

			{/* Content */}
			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex items-center min-h-screen">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
					{/* Left Column - Main Content */}
					<HeroContent t={t} />

					{/* Right Column - Stats & Info */}
					<StatsSection t={t} />
				</div>
			</div>

			{/* Slide Indicators */}
			<SlideIndicators
				slideCount={vietnamImages.length}
				currentSlide={currentSlide}
				onSlideChange={setCurrentSlide}
			/>
		</section>
	);
}
