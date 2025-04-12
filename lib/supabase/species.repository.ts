import type {
	Species,
	SpeciesFilters,
	SpeciesRepository,
	SpeciesWithPaginationResult,
} from '../core/domain/entities/species';
import { supabase } from './client';

export class SupabaseSpeciesRepository implements SpeciesRepository {
	async getFeaturedSpecies(limit = 6): Promise<Species[]> {
		try {
			const { data, error } = await supabase.from('species').select('*').limit(limit);

			if (error) throw error;
			return data || [];
		} catch (error) {
			console.error('Error fetching featured species:', error);
			return [];
		}
	}

	async getAllSpecies(): Promise<Species[]> {
		try {
			const { data, error } = await supabase.from('species').select('*').order('name');

			if (error) throw error;
			return data || [];
		} catch (error) {
			console.error('Error fetching all species:', error);
			return [];
		}
	}

	async getSpeciesById(id: number): Promise<Species | null> {
		try {
			const { data, error } = await supabase.from('species').select('*').eq('id', id).single();

			if (error) throw error;
			return data;
		} catch (error) {
			console.error(`Error fetching species with id ${id}:`, error);
			return null;
		}
	}

	async getSpeciesByRegion(region: string): Promise<Species[]> {
		try {
			const { data, error } = await supabase
				.from('species')
				.select('*')
				.eq('region', region)
				.order('name');

			if (error) throw error;
			return data || [];
		} catch (error) {
			console.error(`Error fetching species from region ${region}:`, error);
			return [];
		}
	}

	async getSpeciesByStatus(status: string): Promise<Species[]> {
		try {
			const { data, error } = await supabase
				.from('species')
				.select('*')
				.eq('conservation_status', status)
				.order('name');

			if (error) throw error;
			return data || [];
		} catch (error) {
			console.error(`Error fetching species with status ${status}:`, error);
			return [];
		}
	}

	async searchSpecies(query: string): Promise<Species[]> {
		try {
			const { data, error } = await supabase
				.from('species')
				.select('*')
				.or(`name.ilike.%${query}%,scientific_name.ilike.%${query}%,description.ilike.%${query}%`)
				.order('name');

			if (error) throw error;
			return data || [];
		} catch (error) {
			console.error(`Error searching species with query ${query}:`, error);
			return [];
		}
	}

	async getSpeciesWithFilters(filters: SpeciesFilters): Promise<SpeciesWithPaginationResult> {
		try {
			const page = filters.page || 1;
			const limit = filters.limit || 9;
			const offset = (page - 1) * limit;

			// Start building the query
			let query = supabase.from('species').select('*', { count: 'exact' });

			// Apply filters if provided
			if (filters.region) {
				query = query.eq('region', filters.region);
			}

			if (filters.status) {
				query = query.eq('conservation_status', filters.status);
			}

			// Apply search if provided
			if (filters.search) {
				query = query.or(
					`name.ilike.%${filters.search}%,scientific_name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`,
				);
			}

			// Apply pagination
			query = query.order('name').range(offset, offset + limit - 1);

			// Execute the query
			const { data, count, error } = await query;

			if (error) throw error;

			return {
				species: data || [],
				count: count || 0,
			};
		} catch (error) {
			console.error('Error fetching species with filters:', error);
			return {
				species: [],
				count: 0,
			};
		}
	}

	async getUniqueRegions(): Promise<string[]> {
		try {
			const { data, error } = await supabase.from('species').select('region').order('region');

			if (error) throw error;

			// Extract unique values
			const uniqueRegions = Array.from(new Set(data?.map((item) => item.region).filter(Boolean)));

			return uniqueRegions;
		} catch (error) {
			console.error('Error fetching unique regions:', error);
			return [];
		}
	}

	async getUniqueStatuses(): Promise<string[]> {
		try {
			const { data, error } = await supabase
				.from('species')
				.select('conservation_status')
				.order('conservation_status');

			if (error) throw error;

			// Extract unique values
			const uniqueStatuses = Array.from(
				new Set(data?.map((item) => item.conservation_status).filter(Boolean)),
			);

			return uniqueStatuses;
		} catch (error) {
			console.error('Error fetching unique statuses:', error);
			return [];
		}
	}

	async createSpecies(species: Omit<Species, 'id' | 'created_at'>): Promise<Species> {
		try {
			const { data, error } = await supabase
				.from('species')
				.insert({
					...species,
					created_at: new Date().toISOString(),
				})
				.select()
				.single();

			if (error) throw error;
			return data;
		} catch (error) {
			console.error('Error creating species:', error);
			throw error;
		}
	}

	async updateSpecies(id: number, species: Partial<Species>): Promise<Species> {
		try {
			const { data, error } = await supabase
				.from('species')
				.update(species)
				.eq('id', id)
				.select()
				.single();

			if (error) throw error;
			return data;
		} catch (error) {
			console.error(`Error updating species with id ${id}:`, error);
			throw error;
		}
	}

	async deleteSpecies(id: number): Promise<void> {
		try {
			const { error } = await supabase.from('species').delete().eq('id', id);

			if (error) throw error;
		} catch (error) {
			console.error(`Error deleting species with id ${id}:`, error);
			throw error;
		}
	}
}
