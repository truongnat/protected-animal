'use client';

import { useState } from 'react';

interface ConservationImpactProps {
	language?: 'en' | 'vi';
}

const content = {
	en: {
		title: "Conservation Impact in Vietnam",
		subtitle: "Real progress in protecting Vietnam's biodiversity",
		metrics: [
			{
				icon: "🐅",
				value: "23",
				label: "Tigers Protected",
				trend: "+15%",
				description: "Increased tiger population in protected areas"
			},
			{
				icon: "🦏",
				value: "8",
				label: "Saola Sightings",
				trend: "+2",
				description: "Rare saola documented this year"
			},
			{
				icon: "🌳",
				value: "12,500",
				label: "Hectares Protected",
				trend: "+8%",
				description: "New protected forest areas established"
			},
			{
				icon: "👥",
				value: "45,000",
				label: "People Educated",
				trend: "+25%",
				description: "Community members reached through programs"
			}
		],
		partnerships: [
			{ name: "WWF Vietnam", logo: "🐼", focus: "Species Protection" },
			{ name: "Save Vietnam's Wildlife", logo: "🦎", focus: "Rescue & Rehabilitation" },
			{ name: "Forest Protection Dept", logo: "🏛️", focus: "Law Enforcement" },
			{ name: "IUCN Vietnam", logo: "🌍", focus: "Research & Data" }
		],
		recentWins: [
			"Successful pangolin rescue operation in Ha Long Bay",
			"New anti-poaching patrol established in Cat Tien National Park",
			"Community-based conservation program launched in Sapa region"
		]
	},
	vi: {
		title: "Tác động bảo tồn tại Việt Nam",
		subtitle: "Tiến bộ thực sự trong việc bảo vệ đa dạng sinh học Việt Nam",
		metrics: [
			{
				icon: "🐅",
				value: "23",
				label: "Hổ được bảo vệ",
				trend: "+15%",
				description: "Tăng số lượng hổ trong khu bảo tồn"
			},
			{
				icon: "🦏",
				value: "8",
				label: "Phát hiện Sao la",
				trend: "+2",
				description: "Sao la hiếm được ghi nhận năm nay"
			},
			{
				icon: "🌳",
				value: "12,500",
				label: "Hecta được bảo vệ",
				trend: "+8%",
				description: "Khu rừng bảo tồn mới được thành lập"
			},
			{
				icon: "👥",
				value: "45,000",
				label: "Người được giáo dục",
				trend: "+25%",
				description: "Thành viên cộng đồng tiếp cận qua chương trình"
			}
		],
		partnerships: [
			{ name: "WWF Việt Nam", logo: "🐼", focus: "Bảo vệ loài" },
			{ name: "Cứu hộ động vật VN", logo: "🦎", focus: "Cứu hộ & Phục hồi" },
			{ name: "Cục Kiểm lâm", logo: "🏛️", focus: "Thực thi pháp luật" },
			{ name: "IUCN Việt Nam", logo: "🌍", focus: "Nghiên cứu & Dữ liệu" }
		],
		recentWins: [
			"Chiến dịch cứu hộ tê tê thành công tại Vịnh Hạ Long",
			"Tuần tra chống săn bắt mới được thành lập tại Vườn quốc gia Cát Tiên",
			"Chương trình bảo tồn dựa vào cộng đồng khởi động tại vùng Sapa"
		]
	}
};

export default function ConservationImpact({ language = 'en' }: ConservationImpactProps) {
	const [activeTab, setActiveTab] = useState<'metrics' | 'partnerships' | 'wins'>('metrics');
	const text = content[language];

	return (
		<div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100 shadow-lg">
			{/* Header */}
			<div className="text-center mb-8">
				<h2 className="text-3xl font-bold text-green-800 mb-3">{text.title}</h2>
				<p className="text-green-600 text-lg">{text.subtitle}</p>
			</div>

			{/* Tab Navigation */}
			<div className="flex justify-center mb-8">
				<div className="bg-white rounded-lg p-1 shadow-sm border border-green-200">
					<button
						onClick={() => setActiveTab('metrics')}
						className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
							activeTab === 'metrics' 
								? 'bg-green-600 text-white shadow-sm' 
								: 'text-green-600 hover:bg-green-50'
						}`}
					>
						📊 {language === 'en' ? 'Metrics' : 'Số liệu'}
					</button>
					<button
						onClick={() => setActiveTab('partnerships')}
						className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
							activeTab === 'partnerships' 
								? 'bg-green-600 text-white shadow-sm' 
								: 'text-green-600 hover:bg-green-50'
						}`}
					>
						🤝 {language === 'en' ? 'Partners' : 'Đối tác'}
					</button>
					<button
						onClick={() => setActiveTab('wins')}
						className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
							activeTab === 'wins' 
								? 'bg-green-600 text-white shadow-sm' 
								: 'text-green-600 hover:bg-green-50'
						}`}
					>
						🏆 {language === 'en' ? 'Recent Wins' : 'Thành tựu gần đây'}
					</button>
				</div>
			</div>

			{/* Content */}
			<div className="min-h-[300px]">
				{activeTab === 'metrics' && (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{text.metrics.map((metric, index) => (
							<div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-green-100 hover:shadow-md transition-shadow">
								<div className="text-4xl mb-3">{metric.icon}</div>
								<div className="text-3xl font-bold text-green-800 mb-1">{metric.value}</div>
								<div className="text-sm font-medium text-gray-700 mb-2">{metric.label}</div>
								<div className="flex items-center gap-2 mb-3">
									<span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
										{metric.trend}
									</span>
								</div>
								<p className="text-xs text-gray-600">{metric.description}</p>
							</div>
						))}
					</div>
				)}

				{activeTab === 'partnerships' && (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{text.partnerships.map((partner, index) => (
							<div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-green-100 hover:shadow-md transition-shadow">
								<div className="flex items-center gap-4 mb-4">
									<div className="text-3xl">{partner.logo}</div>
									<div>
										<h3 className="font-bold text-gray-800">{partner.name}</h3>
										<p className="text-sm text-green-600">{partner.focus}</p>
									</div>
								</div>
								<div className="w-full bg-green-100 rounded-full h-2">
									<div className="bg-green-500 h-2 rounded-full" style={{ width: `${Math.random() * 40 + 60}%` }}></div>
								</div>
								<p className="text-xs text-gray-500 mt-2">
									{language === 'en' ? 'Active collaboration' : 'Hợp tác tích cực'}
								</p>
							</div>
						))}
					</div>
				)}

				{activeTab === 'wins' && (
					<div className="space-y-4">
						{text.recentWins.map((win, index) => (
							<div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-green-100 hover:shadow-md transition-shadow">
								<div className="flex items-start gap-4">
									<div className="text-2xl">🏆</div>
									<div className="flex-1">
										<p className="text-gray-800 font-medium">{win}</p>
										<div className="flex items-center gap-2 mt-2">
											<span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
												{language === 'en' ? 'Recent' : 'Gần đây'}
											</span>
											<span className="text-xs text-gray-500">
												{new Date().toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US')}
											</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Call to Action */}
			<div className="mt-8 text-center">
				<div className="bg-green-600 text-white rounded-xl p-6">
					<h3 className="text-xl font-bold mb-2">
						{language === 'en' ? 'Join Our Conservation Efforts' : 'Tham gia nỗ lực bảo tồn'}
					</h3>
					<p className="mb-4 opacity-90">
						{language === 'en' 
							? 'Every action counts in protecting Vietnam\'s precious wildlife'
							: 'Mọi hành động đều có ý nghĩa trong việc bảo vệ động vật quý hiếm Việt Nam'
						}
					</p>
					<div className="flex flex-wrap justify-center gap-3">
						<button className="bg-white text-green-600 px-6 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors">
							💚 {language === 'en' ? 'Donate' : 'Quyên góp'}
						</button>
						<button className="bg-green-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-800 transition-colors">
							🤝 {language === 'en' ? 'Volunteer' : 'Tình nguyện'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}