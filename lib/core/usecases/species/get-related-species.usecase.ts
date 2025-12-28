import type { Species, SpeciesRepository } from '../../domain/entities/species';

export class GetRelatedSpeciesUseCase {
	constructor(private speciesRepository: SpeciesRepository) {}

	async execute(species: Species, limit = 3): Promise<Species[]> {
		try {
			// Use the optimized repository method for better performance
			return await this.speciesRepository.getRelatedSpecies(
				species.id,
				species.region,
				species.conservation_status,
				limit
			);
		} catch (error) {
			console.error(`Error in GetRelatedSpeciesUseCase for species ${species.id}:`, error);
			return [];
		}
	}
}
