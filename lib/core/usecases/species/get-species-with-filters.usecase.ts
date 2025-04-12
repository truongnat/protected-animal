import type { Species, SpeciesRepository } from '../../domain/entities/species';

export interface SpeciesFilters {
	region?: string;
	status?: string;
	search?: string;
	page?: number;
	limit?: number;
}

export interface SpeciesWithPagination {
	species: Species[];
	count: number;
	totalPages: number;
	currentPage: number;
}

export class GetSpeciesWithFiltersUseCase {
	constructor(private speciesRepository: SpeciesRepository) {}

	async execute(filters: SpeciesFilters): Promise<SpeciesWithPagination> {
		try {
			const page = filters.page || 1;
			const limit = filters.limit || 9;

			// Get filtered species from repository
			const result = await this.speciesRepository.getSpeciesWithFilters({
				region: filters.region,
				status: filters.status,
				search: filters.search,
				page,
				limit,
			});

			return {
				species: result.species,
				count: result.count,
				totalPages: Math.ceil(result.count / limit),
				currentPage: page,
			};
		} catch (error) {
			console.error('Error in GetSpeciesWithFiltersUseCase:', error);
			return {
				species: [],
				count: 0,
				totalPages: 0,
				currentPage: 1,
			};
		}
	}
}
