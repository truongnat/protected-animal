export interface Species {
	id: number;
	name: string;
	scientific_name: string;
	conservation_status: string;
	population: number;
	habitat: string;
	description: string;
	image_url: string;
	region: string;
	created_at: string;
	threats?: string[];
}

export interface SpeciesFilters {
	region?: string;
	status?: string;
	search?: string;
	page?: number;
	limit?: number;
}

export interface SpeciesWithPaginationResult {
	species: Species[];
	count: number;
}

export interface SpeciesRepository {
	getFeaturedSpecies(limit?: number): Promise<Species[]>;
	getAllSpecies(): Promise<Species[]>;
	getSpeciesById(id: number): Promise<Species | null>;
	getSpeciesByRegion(region: string): Promise<Species[]>;
	getSpeciesByStatus(status: string): Promise<Species[]>;
	searchSpecies(query: string): Promise<Species[]>;
	getSpeciesWithFilters(filters: SpeciesFilters): Promise<SpeciesWithPaginationResult>;
	getUniqueRegions(): Promise<string[]>;
	getUniqueStatuses(): Promise<string[]>;
	getRelatedSpecies(
		speciesId: number,
		region: string,
		status: string,
		limit?: number,
	): Promise<Species[]>;
	createSpecies(species: Omit<Species, 'id' | 'created_at'>): Promise<Species>;
	updateSpecies(id: number, species: Partial<Species>): Promise<Species>;
	deleteSpecies(id: number): Promise<void>;
}
