import { and, desc, eq, ilike, or, sql } from 'drizzle-orm';
import { db } from '../db';
import { species } from '../schema';
import type {
	Species,
	SpeciesFilters,
	SpeciesRepository,
	SpeciesWithPaginationResult,
} from '../core/domain/entities/species';

export class SQLiteSpeciesRepository implements SpeciesRepository {
	async getFeaturedSpecies(limit = 6): Promise<Species[]> {
		try {
			const result = await db
				.select()
				.from(species)
				.orderBy(desc(species.createdAt))
				.limit(limit);

			return result.map(this.mapToSpecies);
		} catch (error) {
			console.error('Error fetching featured species:', error);
			return [];
		}
	}

	async getAllSpecies(): Promise<Species[]> {
		try {
			const result = await db
				.select()
				.from(species)
				.orderBy(species.name);

			return result.map(this.mapToSpecies);
		} catch (error) {
			console.error('Error fetching all species:', error);
			return [];
		}
	}

	async getSpeciesById(id: number): Promise<Species | null> {
		try {
			const result = await db
				.select()
				.from(species)
				.where(eq(species.id, id))
				.limit(1);

			return result.length > 0 ? this.mapToSpecies(result[0]) : null;
		} catch (error) {
			console.error(`Error fetching species with id ${id}:`, error);
			return null;
		}
	}

	async getSpeciesByRegion(region: string): Promise<Species[]> {
		try {
			const result = await db
				.select()
				.from(species)
				.where(eq(species.region, region))
				.orderBy(species.name);

			return result.map(this.mapToSpecies);
		} catch (error) {
			console.error(`Error fetching species by region ${region}:`, error);
			return [];
		}
	}

	async getSpeciesByStatus(status: string): Promise<Species[]> {
		try {
			const result = await db
				.select()
				.from(species)
				.where(eq(species.conservationStatus, status))
				.orderBy(species.name);

			return result.map(this.mapToSpecies);
		} catch (error) {
			console.error(`Error fetching species by status ${status}:`, error);
			return [];
		}
	}

	async searchSpecies(query: string): Promise<Species[]> {
		try {
			const searchTerm = `%${query}%`;
			const result = await db
				.select()
				.from(species)
				.where(
					or(
						ilike(species.name, searchTerm),
						ilike(species.scientificName, searchTerm),
						ilike(species.description, searchTerm)
					)
				)
				.orderBy(species.name);

			return result.map(this.mapToSpecies);
		} catch (error) {
			console.error(`Error searching species with query ${query}:`, error);
			return [];
		}
	}

	async getSpeciesWithFilters(filters: SpeciesFilters): Promise<SpeciesWithPaginationResult> {
		try {
			const { region, status, search, page = 1, limit = 10 } = filters;
			const offset = (page - 1) * limit;

			// Build where conditions
			const conditions = [];
			
			if (region) {
				conditions.push(eq(species.region, region));
			}
			
			if (status) {
				conditions.push(eq(species.conservationStatus, status));
			}
			
			if (search) {
				const searchTerm = `%${search}%`;
				conditions.push(
					or(
						ilike(species.name, searchTerm),
						ilike(species.scientificName, searchTerm),
						ilike(species.description, searchTerm)
					)
				);
			}

			const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

			// Get total count
			const countResult = await db
				.select({ count: sql<number>`count(*)` })
				.from(species)
				.where(whereClause);

			const totalCount = countResult[0]?.count || 0;

			// Get paginated results
			const result = await db
				.select()
				.from(species)
				.where(whereClause)
				.orderBy(species.name)
				.limit(limit)
				.offset(offset);

			return {
				species: result.map(this.mapToSpecies),
				count: totalCount,
			};
		} catch (error) {
			console.error('Error fetching species with filters:', error);
			return { species: [], count: 0 };
		}
	}

	async getUniqueRegions(): Promise<string[]> {
		try {
			const result = await db
				.selectDistinct({ region: species.region })
				.from(species)
				.where(sql`${species.region} IS NOT NULL AND ${species.region} != ''`)
				.orderBy(species.region);

			return result.map(row => row.region).filter(Boolean) as string[];
		} catch (error) {
			console.error('Error fetching unique regions:', error);
			return [];
		}
	}

	async getUniqueStatuses(): Promise<string[]> {
		try {
			const result = await db
				.selectDistinct({ status: species.conservationStatus })
				.from(species)
				.where(sql`${species.conservationStatus} IS NOT NULL AND ${species.conservationStatus} != ''`)
				.orderBy(species.conservationStatus);

			return result.map(row => row.status).filter(Boolean);
		} catch (error) {
			console.error('Error fetching unique statuses:', error);
			return [];
		}
	}

	async createSpecies(speciesData: Omit<Species, 'id' | 'created_at'>): Promise<Species> {
		try {
			const result = await db
				.insert(species)
				.values({
					name: speciesData.name,
					scientificName: speciesData.scientific_name,
					conservationStatus: speciesData.conservation_status,
					population: speciesData.population,
					habitat: speciesData.habitat,
					description: speciesData.description,
					imageUrl: speciesData.image_url,
					region: speciesData.region,
				})
				.returning();

			return this.mapToSpecies(result[0]);
		} catch (error) {
			console.error('Error creating species:', error);
			throw error;
		}
	}

	async updateSpecies(id: number, speciesData: Partial<Species>): Promise<Species> {
		try {
			const updateData: any = {};
			
			if (speciesData.name) updateData.name = speciesData.name;
			if (speciesData.scientific_name) updateData.scientificName = speciesData.scientific_name;
			if (speciesData.conservation_status) updateData.conservationStatus = speciesData.conservation_status;
			if (speciesData.population !== undefined) updateData.population = speciesData.population;
			if (speciesData.habitat) updateData.habitat = speciesData.habitat;
			if (speciesData.description) updateData.description = speciesData.description;
			if (speciesData.image_url) updateData.imageUrl = speciesData.image_url;
			if (speciesData.region) updateData.region = speciesData.region;

			const result = await db
				.update(species)
				.set(updateData)
				.where(eq(species.id, id))
				.returning();

			if (result.length === 0) {
				throw new Error(`Species with id ${id} not found`);
			}

			return this.mapToSpecies(result[0]);
		} catch (error) {
			console.error(`Error updating species with id ${id}:`, error);
			throw error;
		}
	}

	async deleteSpecies(id: number): Promise<void> {
		try {
			const result = await db
				.delete(species)
				.where(eq(species.id, id))
				.returning();

			if (result.length === 0) {
				throw new Error(`Species with id ${id} not found`);
			}
		} catch (error) {
			console.error(`Error deleting species with id ${id}:`, error);
			throw error;
		}
	}

	// Helper method to map database row to Species interface
	private mapToSpecies(row: any): Species {
		return {
			id: row.id,
			name: row.name,
			scientific_name: row.scientificName,
			conservation_status: row.conservationStatus,
			population: row.population,
			habitat: row.habitat,
			description: row.description,
			image_url: row.imageUrl,
			region: row.region,
			created_at: row.createdAt,
		};
	}
}