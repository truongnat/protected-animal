'use client';

import { useTranslation } from '@/lib/i18n/useTranslation';
import { useState } from 'react';
import Link from 'next/link';

interface ReportingWidgetProps {
	language?: 'en' | 'vi';
}

export default function ReportingWidget({ language }: ReportingWidgetProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const { t } = useTranslation();

	return (
		<div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-2xl p-6 border border-red-100 dark:border-red-800 shadow-lg">
			<div className="flex items-center justify-between mb-4">
				<div>
					<h3 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-2">{t('reporting.title')}</h3>
					<p className="text-red-600 dark:text-red-300">{t('reporting.subtitle')}</p>
				</div>
				<div className="text-4xl animate-pulse">🚨</div>
			</div>

			{/* Emergency Hotline */}
			<div className="bg-red-600 dark:bg-red-700 text-white rounded-lg p-4 mb-6">
				<div className="flex items-center gap-3">
					<span className="text-2xl">📞</span>
					<div>
						<p className="font-bold">{t('reporting.emergency')}</p>
						<p className="text-sm opacity-90">
							{t('reporting.emergency').includes('24/7') ? '' : '24/7 Available'}
						</p>
					</div>
				</div>
			</div>

			{/* Quick Actions */}
			<div className="grid grid-cols-2 gap-3 mb-6">
				<Link
					href="/report?type=emergency"
					className="p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700 hover:bg-red-200 dark:hover:bg-red-900/50"
				>
					<div className="text-2xl mb-2">🚨</div>
					<h4 className="font-semibold text-sm mb-1">{t('reporting.actions.emergency.label')}</h4>
					<p className="text-xs text-gray-600 dark:text-gray-300">{t('reporting.actions.emergency.desc')}</p>
				</Link>
				<Link
					href="/report?type=evidence"
					className="p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
				>
					<div className="text-2xl mb-2">📸</div>
					<h4 className="font-semibold text-sm mb-1">{t('reporting.actions.evidence.label')}</h4>
					<p className="text-xs text-gray-600 dark:text-gray-300">{t('reporting.actions.evidence.desc')}</p>
				</Link>
				<Link
					href="/report?type=location"
					className="p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
				>
					<div className="text-2xl mb-2">📍</div>
					<h4 className="font-semibold text-sm mb-1">{t('reporting.actions.location.label')}</h4>
					<p className="text-xs text-gray-600 dark:text-gray-300">{t('reporting.actions.location.desc')}</p>
				</Link>
				<Link
					href="/report?type=anonymous"
					className="p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
				>
					<div className="text-2xl mb-2">🔍</div>
					<h4 className="font-semibold text-sm mb-1">{t('reporting.actions.anonymous.label')}</h4>
					<p className="text-xs text-gray-600 dark:text-gray-300">{t('reporting.actions.anonymous.desc')}</p>
				</Link>
			</div>

			{/* Statistics */}
			<div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
				<h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">
					{t('reporting.stats.reports')}
				</h4>
				<div className="grid grid-cols-3 gap-4 text-center">
					<div>
						<div className="text-2xl font-bold text-blue-600 dark:text-blue-400">1,247</div>
						<div className="text-xs text-gray-600 dark:text-gray-400">
							{t('reporting.stats.reports')}
						</div>
					</div>
					<div>
						<div className="text-2xl font-bold text-green-600 dark:text-green-400">892</div>
						<div className="text-xs text-gray-600 dark:text-gray-400">
							{t('reporting.stats.resolved')}
						</div>
					</div>
					<div>
						<div className="text-2xl font-bold text-orange-600 dark:text-orange-400">355</div>
						<div className="text-xs text-gray-600 dark:text-gray-400">
							{t('reporting.stats.pending')}
						</div>
					</div>
				</div>
			</div>

			{/* Legal Notice */}
			<div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
				<p className="text-xs text-yellow-800">
					⚖️ {language === 'en' 
						? 'All reports are handled according to Vietnam\'s wildlife protection laws. False reports may result in legal consequences.'
						: 'Tất cả báo cáo được xử lý theo luật bảo vệ động vật hoang dã Việt Nam. Báo cáo sai có thể dẫn đến hậu quả pháp lý.'
					}
				</p>
			</div>
		</div>
	);
}