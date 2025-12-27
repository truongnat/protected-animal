'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ReportingWidgetProps {
	language?: 'en' | 'vi';
}

const content = {
	en: {
		title: "Report Wildlife Crime",
		subtitle: "Help protect Vietnam's wildlife by reporting illegal activities",
		quickActions: [
			{ icon: "🚨", label: "Emergency Report", desc: "Immediate wildlife crime in progress", urgent: true },
			{ icon: "📸", label: "Evidence Upload", desc: "Submit photos/videos of violations", urgent: false },
			{ icon: "📍", label: "Location Report", desc: "Report suspicious activities by location", urgent: false },
			{ icon: "🔍", label: "Anonymous Tip", desc: "Share information anonymously", urgent: false },
		],
		stats: {
			reports: "1,247",
			resolved: "892",
			pending: "355"
		},
		emergency: "Emergency Hotline: 1900-1234"
	},
	vi: {
		title: "Báo cáo tội phạm động vật hoang dã",
		subtitle: "Giúp bảo vệ động vật hoang dã Việt Nam bằng cách báo cáo các hoạt động bất hợp pháp",
		quickActions: [
			{ icon: "🚨", label: "Báo cáo khẩn cấp", desc: "Tội phạm động vật đang diễn ra", urgent: true },
			{ icon: "📸", label: "Tải bằng chứng", desc: "Gửi ảnh/video vi phạm", urgent: false },
			{ icon: "📍", label: "Báo cáo vị trí", desc: "Báo cáo hoạt động đáng nghi theo vị trí", urgent: false },
			{ icon: "🔍", label: "Tin ẩn danh", desc: "Chia sẻ thông tin ẩn danh", urgent: false },
		],
		stats: {
			reports: "1,247",
			resolved: "892",
			pending: "355"
		},
		emergency: "Đường dây nóng khẩn cấp: 1900-1234"
	}
};

export default function ReportingWidget({ language = 'en' }: ReportingWidgetProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const text = content[language];

	return (
		<div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-100 shadow-lg">
			<div className="flex items-center justify-between mb-4">
				<div>
					<h3 className="text-2xl font-bold text-red-800 mb-2">{text.title}</h3>
					<p className="text-red-600">{text.subtitle}</p>
				</div>
				<div className="text-4xl animate-pulse">🚨</div>
			</div>

			{/* Emergency Hotline */}
			<div className="bg-red-600 text-white rounded-lg p-4 mb-6">
				<div className="flex items-center gap-3">
					<span className="text-2xl">📞</span>
					<div>
						<p className="font-bold">{text.emergency}</p>
						<p className="text-sm opacity-90">
							{language === 'en' ? '24/7 Available' : 'Hoạt động 24/7'}
						</p>
					</div>
				</div>
			</div>

			{/* Quick Actions */}
			<div className="grid grid-cols-2 gap-3 mb-6">
				{text.quickActions.map((action, index) => (
					<Link
						key={index}
						href={`/report?type=${action.label.toLowerCase().replace(' ', '-')}`}
						className={`p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
							action.urgent 
								? 'bg-red-100 border-red-300 hover:bg-red-200' 
								: 'bg-white border-gray-200 hover:bg-gray-50'
						}`}
					>
						<div className="text-2xl mb-2">{action.icon}</div>
						<h4 className="font-semibold text-sm mb-1">{action.label}</h4>
						<p className="text-xs text-gray-600">{action.desc}</p>
					</Link>
				))}
			</div>

			{/* Statistics */}
			<div className="bg-white rounded-lg p-4 border border-gray-200">
				<h4 className="font-semibold mb-3 text-gray-800">
					{language === 'en' ? 'Reporting Statistics' : 'Thống kê báo cáo'}
				</h4>
				<div className="grid grid-cols-3 gap-4 text-center">
					<div>
						<div className="text-2xl font-bold text-blue-600">{text.stats.reports}</div>
						<div className="text-xs text-gray-600">
							{language === 'en' ? 'Total Reports' : 'Tổng báo cáo'}
						</div>
					</div>
					<div>
						<div className="text-2xl font-bold text-green-600">{text.stats.resolved}</div>
						<div className="text-xs text-gray-600">
							{language === 'en' ? 'Resolved' : 'Đã giải quyết'}
						</div>
					</div>
					<div>
						<div className="text-2xl font-bold text-orange-600">{text.stats.pending}</div>
						<div className="text-xs text-gray-600">
							{language === 'en' ? 'Pending' : 'Đang xử lý'}
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