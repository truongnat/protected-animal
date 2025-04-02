'use client';

import { supabase } from '@/lib/supabase';
import type { Species } from '@/lib/supabase';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminSpeciesPage() {
	const [species, setSpecies] = useState<Species[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const itemsPerPage = 10;

	useEffect(() => {
		fetchSpecies();
	}, [currentPage, searchTerm]);

	async function fetchSpecies() {
		setLoading(true);
		try {
			let query = supabase.from('species').select('*', { count: 'exact' });

			// Apply search if provided
			if (searchTerm) {
				query = query.or(`name.ilike.%${searchTerm}%,scientific_name.ilike.%${searchTerm}%`);
			}

			// Apply pagination
			const from = (currentPage - 1) * itemsPerPage;
			const to = from + itemsPerPage - 1;
			query = query.range(from, to).order('name');

			const { data, count, error } = await query;

			if (error) {
				throw error;
			}

			setSpecies(data || []);
			setTotalPages(Math.ceil((count || 0) / itemsPerPage));
		} catch (error) {
			console.error('Error fetching species:', error);
		} finally {
			setLoading(false);
		}
	}

	async function deleteSpecies(id: number) {
		if (!confirm('Are you sure you want to delete this species? This action cannot be undone.')) {
			return;
		}

		try {
			const { error } = await supabase.from('species').delete().eq('id', id);

			if (error) {
				throw error;
			}

			// Refresh the species list
			fetchSpecies();
		} catch (error) {
			console.error('Error deleting species:', error);
			alert('Failed to delete species. Please try again.');
		}
	}

	return (
		<div>
			<div className="sm:flex sm:items-center sm:justify-between">
				<h1 className="text-2xl font-semibold text-gray-900">Species Management</h1>
				<div className="mt-4 sm:mt-0">
					<Link
						href="/admin/species/new"
						className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
					>
						Add New Species
					</Link>
				</div>
			</div>

			{/* Search and filters */}
			<div className="mt-6 sm:flex sm:items-center">
				<div className="sm:flex-1">
					<div className="max-w-lg w-full lg:max-w-xs">
						<label htmlFor="search" className="sr-only">
							Search
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<svg
									className="h-5 w-5 text-gray-400"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<input
								id="search"
								name="search"
								className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
								placeholder="Search by name or scientific name"
								type="search"
								value={searchTerm}
								onChange={(e) => {
									setSearchTerm(e.target.value);
									setCurrentPage(1); // Reset to first page on search
								}}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Species table */}
			<div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
				{loading ? (
					<div className="flex justify-center items-center h-64">
						<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
					</div>
				) : species.length > 0 ? (
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Species
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Scientific Name
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Status
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Region
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Population
								</th>
								<th scope="col" className="relative px-6 py-3">
									<span className="sr-only">Actions</span>
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{species.map((animal) => (
								<tr key={animal.id}>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center">
											<div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-100">
												{animal.image_url ? (
													<img
														src={animal.image_url}
														alt={animal.name}
														className="h-10 w-10 object-cover"
													/>
												) : (
													<div className="h-10 w-10 flex items-center justify-center bg-green-100 text-green-800">
														{animal.name.charAt(0)}
													</div>
												)}
											</div>
											<div className="ml-4">
												<div className="text-sm font-medium text-gray-900">{animal.name}</div>
											</div>
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm text-gray-900 italic">{animal.scientific_name}</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span
											className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
												animal.conservation_status.includes('Critically')
													? 'bg-red-100 text-red-800'
													: animal.conservation_status.includes('Endangered')
														? 'bg-orange-100 text-orange-800'
														: 'bg-yellow-100 text-yellow-800'
											}`}
										>
											{animal.conservation_status}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{animal.region}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{animal.population?.toLocaleString() || 'Unknown'}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
										<div className="flex justify-end space-x-2">
											<Link
												href={`/admin/species/${animal.id}`}
												className="text-green-600 hover:text-green-900"
											>
												Edit
											</Link>
											<button
												onClick={() => deleteSpecies(animal.id)}
												className="text-red-600 hover:text-red-900"
											>
												Delete
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<div className="py-12 text-center text-gray-500">
						No species found. {searchTerm && 'Try a different search term or '}
						<Link href="/admin/species/new" className="text-green-600 hover:text-green-500">
							add a new species
						</Link>
						.
					</div>
				)}
			</div>

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="mt-6 flex justify-between items-center">
					<div className="text-sm text-gray-700">
						Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
						<span className="font-medium">
							{Math.min(
								currentPage * itemsPerPage,
								(species.length || 0) + (currentPage - 1) * itemsPerPage,
							)}
						</span>{' '}
						of <span className="font-medium">{totalPages * itemsPerPage}</span> results
					</div>
					<nav
						className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
						aria-label="Pagination"
					>
						<button
							onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
							disabled={currentPage === 1}
							className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
								currentPage === 1
									? 'text-gray-300 cursor-not-allowed'
									: 'text-gray-500 hover:bg-gray-50'
							}`}
						>
							<span className="sr-only">Previous</span>
							<svg
								className="h-5 w-5"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fillRule="evenodd"
									d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
						{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
							<button
								key={page}
								onClick={() => setCurrentPage(page)}
								className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
									currentPage === page
										? 'z-10 bg-green-50 border-green-500 text-green-600'
										: 'text-gray-500 hover:bg-gray-50'
								}`}
							>
								{page}
							</button>
						))}
						<button
							onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
							disabled={currentPage === totalPages}
							className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
								currentPage === totalPages
									? 'text-gray-300 cursor-not-allowed'
									: 'text-gray-500 hover:bg-gray-50'
							}`}
						>
							<span className="sr-only">Next</span>
							<svg
								className="h-5 w-5"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fillRule="evenodd"
									d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					</nav>
				</div>
			)}
		</div>
	);
}
