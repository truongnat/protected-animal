'use client';
import { ThemeToggle } from '@/components/theme-toggle';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useTranslation } from '@/lib/i18n/useTranslation';
import Link from 'next/link';
import { useState } from 'react';

interface Nav {
	label: string;
	labelVi: string;
	href: string;
	icon?: string;
}

const navs: Nav[] = [
	{ label: 'Home', labelVi: 'Trang chủ', href: '/landing', icon: '🏠' },
	{ label: 'Species', labelVi: 'Loài động vật', href: '/species', icon: '🐅' },
	{ label: 'Report', labelVi: 'Báo cáo', href: '/report', icon: '📋' },
	{ label: 'Donate', labelVi: 'Quyên góp', href: '/donate', icon: '💚' },
	{ label: 'Blog', labelVi: 'Tin tức', href: '/blog', icon: '📰' },
	{ label: 'About', labelVi: 'Giới thiệu', href: '/about', icon: 'ℹ️' },
];

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { language, setLanguage } = useLanguage();
	const { t } = useTranslation();

	const toggleLanguage = () => {
		setLanguage(language === 'en' ? 'vi' : 'en');
	};

	return (
		<nav className="bg-gradient-to-r from-emerald-800 via-green-800 to-emerald-900 text-white shadow-lg border-b-2 border-yellow-400 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-18">
					<div className="flex items-center">
						<Link href="/landing" className="flex-shrink-0 flex items-center group">
							<div className="bg-white rounded-full p-2 mr-3 group-hover:scale-110 transition-transform">
								<span className="text-2xl">🐅</span>
							</div>
							<div className="flex flex-col">
								<span className="text-xl font-bold text-yellow-300">
									{language === 'en' ? 'Vietnam Wildlife' : 'Động vật Việt Nam'}
								</span>
								<span className="text-xs text-green-200">
									{language === 'en' ? 'Conservation Platform' : 'Nền tảng bảo tồn'}
								</span>
							</div>
						</Link>
					</div>
					
					<div className="hidden md:flex items-center space-x-6">
						<div className="flex items-baseline space-x-1">
							{navs.map((nav) => (
								<Link
									key={nav.href}
									href={nav.href}
									className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/10 hover:text-yellow-300 transition-all duration-200 flex items-center gap-2 group"
								>
									<span className="group-hover:scale-125 transition-transform">{nav.icon}</span>
									{language === 'en' ? nav.label : nav.labelVi}
								</Link>
							))}
						</div>
						
						<div className="flex items-center space-x-3 border-l border-white/20 pl-4">
							<button
								onClick={toggleLanguage}
								className="px-3 py-1 rounded-md text-sm font-medium bg-white/10 hover:bg-white/20 transition-colors"
							>
								{language === 'en' ? '🇻🇳 VI' : '🇺🇸 EN'}
							</button>
							<ThemeToggle />
						</div>
					</div>
					
					<div className="md:hidden flex items-center space-x-2">
						<button
							onClick={toggleLanguage}
							className="px-2 py-1 rounded text-xs bg-white/10"
						>
							{language === 'en' ? 'VI' : 'EN'}
						</button>
						<ThemeToggle />
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 focus:outline-none transition-colors"
						>
							<svg
								className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
							</svg>
							<svg
								className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			<div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-green-900/95 backdrop-blur-sm`}>
				<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
					{navs.map((nav) => (
						<Link
							key={nav.href}
							href={nav.href}
							className="flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-white hover:bg-white/10 transition-colors"
							onClick={() => setIsMenuOpen(false)}
						>
							<span className="text-lg">{nav.icon}</span>
							{language === 'en' ? nav.label : nav.labelVi}
						</Link>
					))}
				</div>
			</div>
		</nav>
	);
}
