'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Species, SpeciesFilters } from '../core/domain/entities/species';

// API functions
const speciesApi = {
	// Get all species with filters
	getSpecies: async (filters: SpeciesFilters = {}) => {
		const params = new URLSearchParams();

		if (filters.region) params.append('region', filters.region);
		if (filters.status) params.append('status', filters.status);
		if (filters.search) params.append('search', filters.search);
		if (filters.page) params.append('page', filters.page.toString());
		if (filters.limit) params.append('limit', filters.limit.toString());

		const response = await fetch(`/api/species?${params.toString()}`);
		if (!response.ok) {
			throw new Error('Failed to fetch species');
		}
		return response.json();
	},

	// Get species by ID
	getSpeciesById: async (id: number) => {
		const response = await fetch(`/api/species/${id}`);
		if (!response.ok) {
			throw new Error('Failed to fetch species');
		}
		return response.json();
	},

	// Get filter options
	getFilterOptions: async () => {
		const response = await fetch('/api/species/filters');
		if (!response.ok) {
			throw new Error('Failed to fetch filter options');
		}
		return response.json();
	},

	// Create species
	createSpecies: async (species: Omit<Species, 'id' | 'created_at'>) => {
		const response = await fetch('/api/species', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(species),
		});
		if (!response.ok) {
			throw new Error('Failed to create species');
		}
		return response.json();
	},

	// Update species
	updateSpecies: async ({ id, ...species }: Partial<Species> & { id: number }) => {
		const response = await fetch(`/api/species/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(species),
		});
		if (!response.ok) {
			throw new Error('Failed to update species');
		}
		return response.json();
	},

	// Delete species
	deleteSpecies: async (id: number) => {
		const response = await fetch(`/api/species/${id}`, {
			method: 'DELETE',
		});
		if (!response.ok) {
			throw new Error('Failed to delete species');
		}
		return response.json();
	},
};

// Query keys
export const speciesKeys = {
	all: ['species'] as const,
	lists: () => [...speciesKeys.all, 'list'] as const,
	list: (filters: SpeciesFilters) => [...speciesKeys.lists(), filters] as const,
	details: () => [...speciesKeys.all, 'detail'] as const,
	detail: (id: number) => [...speciesKeys.details(), id] as const,
	filters: () => [...speciesKeys.all, 'filters'] as const,
};

// Hooks
export function useSpecies(filters: SpeciesFilters = {}) {
	return useQuery({
		queryKey: speciesKeys.list(filters),
		queryFn: () => speciesApi.getSpecies(filters),
		enabled: true,
	});
}

export function useSpeciesById(id: number) {
	return useQuery({
		queryKey: speciesKeys.detail(id),
		queryFn: () => speciesApi.getSpeciesById(id),
		enabled: !!id,
	});
}

export function useFilterOptions() {
	return useQuery({
		queryKey: speciesKeys.filters(),
		queryFn: speciesApi.getFilterOptions,
		staleTime: 5 * 60 * 1000, // 5 minutes - filter options don't change often
	});
}

export function useCreateSpecies() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: speciesApi.createSpecies,
		onSuccess: () => {
			// Invalidate and refetch species lists
			queryClient.invalidateQueries({ queryKey: speciesKeys.lists() });
		},
	});
}

export function useUpdateSpecies() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: speciesApi.updateSpecies,
		onSuccess: (data, variables) => {
			// Update the specific species in cache
			queryClient.setQueryData(speciesKeys.detail(variables.id), data);
			// Invalidate lists to ensure they're updated
			queryClient.invalidateQueries({ queryKey: speciesKeys.lists() });
		},
	});
}

export function useDeleteSpecies() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: speciesApi.deleteSpecies,
		onSuccess: (_, deletedId) => {
			// Remove from cache
			queryClient.removeQueries({ queryKey: speciesKeys.detail(deletedId) });
			// Invalidate lists
			queryClient.invalidateQueries({ queryKey: speciesKeys.lists() });
		},
	});
}

// Prefetch functions for better UX
export function usePrefetchSpecies() {
	const queryClient = useQueryClient();

	const prefetchSpecies = (filters: SpeciesFilters) => {
		queryClient.prefetchQuery({
			queryKey: speciesKeys.list(filters),
			queryFn: () => speciesApi.getSpecies(filters),
			staleTime: 60 * 1000, // 1 minute
		});
	};

	const prefetchSpeciesById = (id: number) => {
		queryClient.prefetchQuery({
			queryKey: speciesKeys.detail(id),
			queryFn: () => speciesApi.getSpeciesById(id),
			staleTime: 60 * 1000, // 1 minute
		});
	};

	return { prefetchSpecies, prefetchSpeciesById };
}
