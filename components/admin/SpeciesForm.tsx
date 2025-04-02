'use client';

import { supabase } from '@/lib/supabase';
import type { Species } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface SpeciesFormProps {
	species?: Species;
	isEditing?: boolean;
}

export default function SpeciesForm({ species, isEditing = false }: SpeciesFormProps) {
	const router = useRouter();
	const [formData, setFormData] = useState<Partial<Species>>({
		name: '',
		scientific_name: '',
		conservation_status: 'Critically Endangered',
		population: 0,
		habitat: '',
		description: '',
		image_url: '',
		region: '',
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	// Conservation status options
	const statusOptions = [
		'Critically Endangered',
		'Endangered',
		'Vulnerable',
		'Near Threatened',
		'Least Concern',
	];

	// Region options
	const regionOptions = [
		'Africa',
		'Asia',
		'Europe',
		'North America',
		'South America',
		'Australia',
		'Antarctica',
		'Global',
	];

	useEffect(() => {
		if (species) {
			setFormData({
				name: species.name || '',
				scientific_name: species.scientific_name || '',
				conservation_status: species.conservation_status || 'Critically Endangered',
				population: species.population || 0,
				habitat: species.habitat || '',
				description: species.description || '',
				image_url: species.image_url || '',
				region: species.region || '',
			});
		}
	}, [species]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: name === 'population' ? Number.parseInt(value) || 0 : value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setSuccess('');

		try {
			// Validate required fields
			if (!formData.name || !formData.scientific_name || !formData.conservation_status) {
				throw new Error('Name, scientific name, and conservation status are required');
			}

			if (isEditing && species) {
				// Update existing species
				const { error: updateError } = await supabase
					.from('species')
					.update({
						...formData,
						updated_at: new Date().toISOString(),
					})
					.eq('id', species.id);

				if (updateError) throw updateError;
				setSuccess('Species updated successfully!');
			} else {
				// Create new species
				const { error: insertError } = await supabase.from('species').insert({
					...formData,
					created_at: new Date().toISOString(),
				});

				if (insertError) throw insertError;
				setSuccess('Species created successfully!');

				// Reset form after successful creation
				if (!isEditing) {
					setFormData({
						name: '',
						scientific_name: '',
						conservation_status: 'Critically Endangered',
						population: 0,
						habitat: '',
						description: '',
						image_url: '',
						region: '',
					});
				}
			}

			// Redirect after a short delay to show success message
			setTimeout(() => {
				router.push('/admin/species');
				router.refresh();
			}, 1500);
		} catch (err: any) {
			setError(err.message || 'An error occurred');
			console.error('Error saving species:', err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{error && (
				<div className="bg-red-50 border-l-4 border-red-400 p-4">
					<div className="flex">
						<div className="flex-shrink-0">
							<svg
								className="h-5 w-5 text-red-400"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<div className="ml-3">
							<p className="text-sm text-red-700">{error}</p>
						</div>
					</div>
				</div>
			)}

			{success && (
				<div className="bg-green-50 border-l-4 border-green-400 p-4">
					<div className="flex">
						<div className="flex-shrink-0">
							<svg
								className="h-5 w-5 text-green-400"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<div className="ml-3">
							<p className="text-sm text-green-700">{success}</p>
						</div>
					</div>
				</div>
			)}

			<div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
				<div className="sm:col-span-3">
					<label htmlFor="name" className="block text-sm font-medium text-gray-700">
						Name *
					</label>
					<div className="mt-1">
						<input
							type="text"
							name="name"
							id="name"
							value={formData.name}
							onChange={handleChange}
							required
							className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
						/>
					</div>
				</div>

				<div className="sm:col-span-3">
					<label htmlFor="scientific_name" className="block text-sm font-medium text-gray-700">
						Scientific Name *
					</label>
					<div className="mt-1">
						<input
							type="text"
							name="scientific_name"
							id="scientific_name"
							value={formData.scientific_name}
							onChange={handleChange}
							required
							className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
						/>
					</div>
				</div>

				<div className="sm:col-span-3">
					<label htmlFor="conservation_status" className="block text-sm font-medium text-gray-700">
						Conservation Status *
					</label>
					<div className="mt-1">
						<select
							id="conservation_status"
							name="conservation_status"
							value={formData.conservation_status}
							onChange={handleChange}
							required
							className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
						>
							{statusOptions.map((status) => (
								<option key={status} value={status}>
									{status}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className="sm:col-span-3">
					<label htmlFor="region" className="block text-sm font-medium text-gray-700">
						Region
					</label>
					<div className="mt-1">
						<select
							id="region"
							name="region"
							value={formData.region}
							onChange={handleChange}
							className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
						>
							<option value="">Select a region</option>
							{regionOptions.map((region) => (
								<option key={region} value={region}>
									{region}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className="sm:col-span-3">
					<label htmlFor="population" className="block text-sm font-medium text-gray-700">
						Population
					</label>
					<div className="mt-1">
						<input
							type="number"
							name="population"
							id="population"
							value={formData.population}
							onChange={handleChange}
							min="0"
							className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
						/>
					</div>
				</div>

				<div className="sm:col-span-3">
					<label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
						Image URL
					</label>
					<div className="mt-1">
						<input
							type="url"
							name="image_url"
							id="image_url"
							value={formData.image_url}
							onChange={handleChange}
							className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
							placeholder="https://example.com/image.jpg"
						/>
					</div>
				</div>

				<div className="sm:col-span-6">
					<label htmlFor="habitat" className="block text-sm font-medium text-gray-700">
						Habitat
					</label>
					<div className="mt-1">
						<input
							type="text"
							name="habitat"
							id="habitat"
							value={formData.habitat}
							onChange={handleChange}
							className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
						/>
					</div>
				</div>

				<div className="sm:col-span-6">
					<label htmlFor="description" className="block text-sm font-medium text-gray-700">
						Description
					</label>
					<div className="mt-1">
						<textarea
							id="description"
							name="description"
							rows={5}
							value={formData.description}
							onChange={handleChange}
							className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
						/>
					</div>
					<p className="mt-2 text-sm text-gray-500">
						Detailed description of the species, including threats and conservation efforts.
					</p>
				</div>
			</div>

			<div className="flex justify-end space-x-3">
				<button
					type="button"
					onClick={() => router.push('/admin/species')}
					className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
				>
					Cancel
				</button>
				<button
					type="submit"
					disabled={loading}
					className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
				>
					{loading ? 'Saving...' : isEditing ? 'Update Species' : 'Create Species'}
				</button>
			</div>
		</form>
	);
}
