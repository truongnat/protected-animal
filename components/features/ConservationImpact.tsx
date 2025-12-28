'use client';

import { useTranslation } from '@/lib/i18n/useTranslation';
import { useState } from 'react';

interface ConservationImpactProps {
	language?: 'en' | 'vi';
}

export default function ConservationImpact({ language }: ConservationImpactProps) {
	const [activeTab, setActiveTab] = useState('metrics');
	const { t } = useTranslation();

	return (
		<div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-2xl p-8 border border-green-100 dark:border-green-800 shadow-lg">
			{/* Header */}
			<div className="text-center mb-8">
				<h2 className="text-3xl font-bold text-green-800 dark:text-green-200 mb-3">{t('conservation.title')}</h2>
				<p className="text-green-600 dark:text-green-300 text-lg">{t('conservation.subtitle')}</p>
			</div>

			{/* Tab Navigation */}
			<div className="flex justify-center mb-8">
				<div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm border border-green-200 dark:border-green-700">
					<button
						onClick={() => setActiveTab('metrics')}
						className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
							activeTab === 'metrics' 
								? 'bg-green-600 text-white shadow-sm' 
								: 'text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'
						}`}
					>
						📊 Metrics
					</button>
					<button
						onClick={() => setActiveTab('partnerships')}
						className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
							activeTab === 'partnerships' 
								? 'bg-green-600 text-white shadow-sm' 
								: 'text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'
						}`}
					>
						🤝 {t('conservation.partnerships.title')}
					</button>
					<button
						onClick={() => setActiveTab('wins')}
						className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
							activeTab === 'wins' 
								? 'bg-green-600 text-white shadow-sm' 
								: 'text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'
						}`}
					>
						🏆 {t('conservation.recentWins.title')}
					</button>
				</div>
			</div>

			{/* Content */}
			<div className="min-h-[300px]">
				{activeTab === 'metrics' && (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-green-100 dark:border-green-700 hover:shadow-md transition-shadow">
							<div className="text-4xl mb-3">🐅</div>
							<div className="text-3xl font-bold text-green-800 dark:text-green-200 mb-1">23</div>
							<div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('conservation.metrics.tigers')}</div>
							<div className="flex items-center gap-2 mb-3">
								<span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full font-medium">
									+15%
								</span>
							</div>
							<p className="text-xs text-gray-600 dark:text-gray-400">Increased tiger population in protected areas</p>
						</div>
						<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-green-100 dark:border-green-700 hover:shadow-md transition-shadow">
							<div className="text-4xl mb-3">🦏</div>
							<div className="text-3xl font-bold text-green-800 dark:text-green-200 mb-1">8</div>
							<div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('conservation.metrics.saola')}</div>
							<div className="flex items-center gap-2 mb-3">
								<span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full font-medium">
									+2
								</span>
							</div>
							<p className="text-xs text-gray-600 dark:text-gray-400">Rare saola documented this year</p>
						</div>
						<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-green-100 dark:border-green-700 hover:shadow-md transition-shadow">
							<div className="text-4xl mb-3">🌳</div>
							<div className="text-3xl font-bold text-green-800 dark:text-green-200 mb-1">12,500</div>
							<div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('conservation.metrics.hectares')}</div>
							<div className="flex items-center gap-2 mb-3">
								<span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full font-medium">
									+8%
								</span>
							</div>
							<p className="text-xs text-gray-600 dark:text-gray-400">New protected forest areas established</p>
						</div>
						<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-green-100 dark:border-green-700 hover:shadow-md transition-shadow">
							<div className="text-4xl mb-3">👥</div>
							<div className="text-3xl font-bold text-green-800 dark:text-green-200 mb-1">45,000</div>
							<div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('conservation.metrics.educated')}</div>
							<div className="flex items-center gap-2 mb-3">
								<span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full font-medium">
									+25%
								</span>
							</div>
							<p className="text-xs text-gray-600 dark:text-gray-400">Community members reached through programs</p>
						</div>
					</div>
				)}

				{activeTab === 'partnerships' && (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-green-100 dark:border-green-700 hover:shadow-md transition-shadow">
							<div className="flex items-center gap-4 mb-4">
								<div className="text-3xl">🐼</div>
								<div>
									<h3 className="font-bold text-gray-800 dark:text-gray-200">{t('conservation.partnerships.wwf')}</h3>
									<p className="text-sm text-green-600 dark:text-green-400">Species Protection</p>
								</div>
							</div>
							<div className="w-full bg-green-100 dark:bg-green-900/30 rounded-full h-2">
								<div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
							</div>
							<p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Active collaboration</p>
						</div>
						<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-green-100 dark:border-green-700 hover:shadow-md transition-shadow">
							<div className="flex items-center gap-4 mb-4">
								<div className="text-3xl">🦎</div>
								<div>
									<h3 className="font-bold text-gray-800 dark:text-gray-200">{t('conservation.partnerships.svw')}</h3>
									<p className="text-sm text-green-600 dark:text-green-400">Rescue & Rehabilitation</p>
								</div>
							</div>
							<div className="w-full bg-green-100 dark:bg-green-900/30 rounded-full h-2">
								<div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
							</div>
							<p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Active collaboration</p>
						</div>
						<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-green-100 dark:border-green-700 hover:shadow-md transition-shadow">
							<div className="flex items-center gap-4 mb-4">
								<div className="text-3xl">🏛️</div>
								<div>
									<h3 className="font-bold text-gray-800 dark:text-gray-200">{t('conservation.partnerships.fpd')}</h3>
									<p className="text-sm text-green-600 dark:text-green-400">Law Enforcement</p>
								</div>
							</div>
							<div className="w-full bg-green-100 dark:bg-green-900/30 rounded-full h-2">
								<div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
							</div>
							<p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Active collaboration</p>
						</div>
						<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-green-100 dark:border-green-700 hover:shadow-md transition-shadow">
							<div className="flex items-center gap-4 mb-4">
								<div className="text-3xl">🌍</div>
								<div>
									<h3 className="font-bold text-gray-800 dark:text-gray-200">{t('conservation.partnerships.iucn')}</h3>
									<p className="text-sm text-green-600 dark:text-green-400">Research & Data</p>
								</div>
							</div>
							<div className="w-full bg-green-100 dark:bg-green-900/30 rounded-full h-2">
								<div className="bg-green-500 h-2 rounded-full" style={{ width: '88%' }}></div>
							</div>
							<p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Active collaboration</p>
						</div>
					</div>
				)}

				{activeTab === 'wins' && (
					<div className="space-y-4">
						<div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-green-100 dark:border-green-700 shadow-sm">
							<div className="flex items-start gap-4">
								<div className="text-2xl">🦎</div>
								<div>
									<h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{t('conservation.recentWins.pangolin')}</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400">Successful rescue operation saved 15 pangolins from illegal trafficking</p>
								</div>
							</div>
						</div>
						<div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-green-100 dark:border-green-700 shadow-sm">
							<div className="flex items-start gap-4">
								<div className="text-2xl">👮</div>
								<div>
									<h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{t('conservation.recentWins.patrol')}</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400">Enhanced protection measures in Cat Tien National Park</p>
								</div>
							</div>
						</div>
						<div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-green-100 dark:border-green-700 shadow-sm">
							<div className="flex items-start gap-4">
								<div className="text-2xl">🎓</div>
								<div>
									<h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{t('conservation.recentWins.education')}</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400">Building awareness and community engagement in Sapa region</p>
								</div>
							</div>
						</div>
						<div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-green-100 dark:border-green-700 shadow-sm">
							<div className="flex items-start gap-4">
								<div className="text-2xl">🌲</div>
								<div>
									<h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{t('conservation.recentWins.habitat')}</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400">Restoration of critical wildlife corridors in Central Highlands</p>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Call to Action */}
			<div className="mt-8 text-center">
				<div className="bg-green-600 text-white rounded-xl p-6">
					<h3 className="text-xl font-bold mb-2">{t('conservation.cta.title')}</h3>
					<p className="mb-4 opacity-90">{t('conservation.cta.subtitle')}</p>
					<div className="flex flex-wrap justify-center gap-3">
						<button className="bg-white text-green-600 px-6 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors">
							💚 {t('conservation.cta.donate')}
						</button>
						<button className="bg-green-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-800 transition-colors">
							🤝 {t('conservation.cta.volunteer')}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}