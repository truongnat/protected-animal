'use client';

import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { useTranslation } from '@/lib/i18n/useTranslation';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface HeroSectionProps {
	language?: 'en' | 'vi';
}

export default function VietnamHeroSection({ language }: HeroSectionProps) {
	const [currentSlide, setCurrentSlide] = useState(0);
	const { t } = useTranslation();

	// Auto-slide effect
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % vietnamImages.length);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	const vietnamImages = [
		"https://images.unsplash.com/photo-1574068468668-a05a11f871da?q=80&w=2070", // Tiger
		"https://images.unsplash.com/photo-1564509027875-ba1c9b69526d?q=80&w=2070", // Elephant
		"https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?q=80&w=2070", // Pangolin
	];

	return (
		<section className="relative min-h-screen bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-700 text-white overflow-hidden">
			{/* Background Images Carousel */}
			<div className="absolute inset-0">
				{vietnamImages.map((image, index) => (
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
							className="object-cover brightness-[0.3]"
						/>
					</div>
				))}
			</div>

			{/* Vietnamese Flag Pattern Overlay */}
			<div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-transparent to-yellow-600/20" />

			{/* Content */}
			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex items-center min-h-screen">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
					{/* Left Column - Main Content */}
					<div className="space-y-8">
						{/* Vietnam Badge */}
						<div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
							<span className="text-2xl">🇻🇳</span>
							<span className="text-sm font-medium">
								{t('hero.title')}
							</span>
						</div>

						{/* Main Title */}
						<div>
							<h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
								<span className="bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
									{t('hero.title')}
								</span>
							</h1>
							<p className="text-xl md:text-2xl text-green-100 leading-relaxed max-w-2xl">
								{t('hero.subtitle')}
							</p>
						</div>

						{/* Quote */}
						<blockquote className="border-l-4 border-yellow-400 pl-6 py-4 bg-white/5 backdrop-blur-sm rounded-r-lg">
							<p className="text-lg italic text-green-100">"{t('hero.legal')}"</p>
						</blockquote>

						{/* Action Buttons */}
						<div className="flex flex-wrap gap-4">
							<Link
								href="/species"
								className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-green-900 px-8 py-4 rounded-xl font-bold hover:from-yellow-400 hover:to-yellow-300 transition-all duration-200 transform hover:scale-105 shadow-lg"
							>
								{t('hero.cta.explore')}
							</Link>
							<Link
								href="/report"
								className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 shadow-lg border-2 border-red-500"
							>
								🚨 {t('hero.cta.report')}
							</Link>
							<Link
								href="/donate"
								className="bg-transparent border-2 border-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-green-800 transition-all duration-200 transform hover:scale-105"
							>
								💚 {t('hero.cta.donate')}
							</Link>
						</div>
					</div>

					{/* Right Column - Stats & Info */}
					<div className="space-y-8">
						{/* Vietnam Conservation Stats */}
						<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
							<h3 className="text-2xl font-bold mb-6 text-yellow-300">
								{t('hero.stats.species')}
							</h3>
							<div className="grid grid-cols-1 gap-6">
								<div className="text-center">
									<div className="text-4xl font-bold text-yellow-300 mb-2">300+</div>
									<div className="text-green-100">{t('hero.stats.species')}</div>
								</div>
								<div className="text-center">
									<div className="text-4xl font-bold text-yellow-300 mb-2">1/3</div>
									<div className="text-green-100">{t('hero.stats.endangered')}</div>
								</div>
								<div className="text-center">
									<div className="text-4xl font-bold text-yellow-300 mb-2">15</div>
									<div className="text-green-100">{t('hero.stats.protected')}</div>
								</div>
							</div>
						</div>

						{/* Legal Framework */}
						<div className="bg-red-900/20 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30">
							<h4 className="text-lg font-bold mb-3 text-red-200">
								⚖️ {t('hero.stats.protected')}
							</h4>
							<p className="text-sm text-red-100">
								{t('hero.legal')}
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Slide Indicators */}
			<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
				{vietnamImages.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrentSlide(index)}
						className={`w-3 h-3 rounded-full transition-all duration-200 ${
							index === currentSlide ? 'bg-yellow-400' : 'bg-white/30'
						}`}
					/>
				))}
			</div>

			{/* Auto-slide effect */}
			{/* Auto-slide is handled by useEffect hook */}
		</section>
	);
}