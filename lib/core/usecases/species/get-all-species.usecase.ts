import type { Species, SpeciesRepository } from '../../domain/entities/species';

export class GetAllSpeciesUseCase {
	constructor(private speciesRepository: SpeciesRepository) {}

	async execute(): Promise<Species[]> {
		try {
			return await this.speciesRepository.getAllSpecies();
		} catch (error) {
			console.error('Error in GetAllSpeciesUseCase:', error);
			return [];
		}
	}
}
