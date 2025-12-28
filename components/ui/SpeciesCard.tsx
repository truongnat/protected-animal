'use client';

import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { useTranslation } from '@/lib/i18n/useTranslation';
import type { Species } from '@/lib/core/domain/entities/species';
import Link from 'next/link';

interface SpeciesCardProps {
	species: Species;
	language?: 'en' | 'vi';
	showActions?: boolean;
}

const statusColors = {
	'Critically Endangered': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200', progress: '95%' },
	'Endangered': { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200', progress: '85%' },
	'Vulnerable': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200', progress: '70%' },
	'Near Threatened': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200', progress: '50%' },
	'Least Concern': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200', progress: '20%' },
};

export default function SpeciesCard({ species, language, showActions = false }: SpeciesCardProps) {
	const { t } = useTranslation();
	const statusStyle = statusColors[species.conservation_status as keyof typeof statusColors] || statusColors['Least Concern'];
	
	// Map conservation status to translation keys
	const getStatusTranslation = (status: string) => {
		const statusMap: { [key: string]: string } = {
			'Critically Endangered': 'species.status.criticallyEndangered',
			'Endangered': 'species.status.endangered',
			'Vulnerable': 'species.status.vulnerable',
			'Near Threatened': 'species.status.nearThreatened',
			'Least Concern': 'species.status.leastConcern',
		};
		return t(statusMap[status] || status);
	};

	return (
		<div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
			{/* Image Container */}
			<div className="relative h-48 bg-gradient-to-br from-green-100 to-emerald-100 overflow-hidden">
				<ImageWithFallback
					src={species.image_url || ''}
					alt={species.name}
					altText={species.name}
					fill
					sizes="(max-width: 768px) 100vw, 33vw"
					className="object-cover group-hover:scale-105 transition-transform duration-300"
					unoptimized
				/>
				
				{/* Status Badge */}
				<div className="absolute top-3 right-3">
					<span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border} border backdrop-blur-sm`}>
						{getStatusTranslation(species.conservation_status)}
					</span>
				</div>

				{/* Region Badge */}
				{species.region && (
					<div className="absolute top-3 left-3">
						<span className="px-2 py-1 text-xs font-medium bg-white/90 text-gray-700 rounded-full backdrop-blur-sm">
							📍 {species.region}
						</span>
					</div>
				)}
			</div>

			{/* Content */}
			<div className="p-6">
				{/* Header */}
				<div className="mb-3">
					<h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-green-700 transition-colors">
						{species.name}
					</h3>
					<p className="text-sm text-gray-500 italic">{species.scientific_name}</p>
				</div>

				{/* Conservation Progress Bar */}
				<div className="mb-4">
					<div className="flex justify-between items-center mb-1">
						<span className="text-xs font-medium text-gray-600">
							{language === 'en' ? 'Threat Level' : 'Mức độ đe dọa'}
						</span>
						<span className="text-xs text-gray-500">{statusStyle.progress}</span>
					</div>
					<div className="w-full bg-gray-200 rounded-full h-2">
						<div
							className={`h-2 rounded-full transition-all duration-500 ${
								species.conservation_status.includes('Critical') ? 'bg-red-500' :
								species.conservation_status.includes('Endangered') ? 'bg-orange-500' :
								species.conservation_status.includes('Vulnerable') ? 'bg-yellow-500' :
								'bg-green-500'
							}`}
							style={{ width: statusStyle.progress }}
						/>
					</div>
				</div>

				{/* Population Info */}
				{species.population && (
					<div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
						<span>👥</span>
						<span>
							{language === 'en' ? 'Population:' : 'Quần thể:'} ~{species.population.toLocaleString()}
						</span>
					</div>
				)}

				{/* Description */}
				<p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
					{species.description}
				</p>

				{/* Threats */}
				{species.threats && species.threats.length > 0 && (
					<div className="mb-4">
						<p className="text-xs font-medium text-gray-500 mb-2">
							{language === 'en' ? 'Main Threats:' : 'Mối đe dọa chính:'}
						</p>
						<div className="flex flex-wrap gap-1">
							{species.threats?.slice(0, 3).map((threat: string, index: number) => (
								<span
									key={index}
									className="px-2 py-1 text-xs bg-red-50 text-red-700 rounded-md border border-red-100"
								>
									{threat}
								</span>
							))}
						</div>
					</div>
				)}

				{/* Actions */}
				<div className="flex items-center justify-between pt-4 border-t border-gray-100">
					<Link
						href={`/species/${species.id}`}
						className="text-green-700 hover:text-green-900 font-medium text-sm flex items-center gap-1 group/link"
					>
						{language === 'en' ? 'Learn more' : 'Tìm hiểu thêm'}
						<span className="group-hover/link:translate-x-1 transition-transform">→</span>
					</Link>

					{showActions && (
						<div className="flex gap-2">
							<button className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Report Issue">
								🚨
							</button>
							<button className="p-2 text-gray-400 hover:text-green-500 transition-colors" title="Support">
								💚
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}