import { Species, SpeciesRepository } from '../../domain/entities/species';

export class GetSpeciesByIdUseCase {
  constructor(private speciesRepository: SpeciesRepository) {}

  async execute(id: number): Promise<Species | null> {
    try {
      return await this.speciesRepository.getSpeciesById(id);
    } catch (error) {
      console.error(`Error in GetSpeciesByIdUseCase for id ${id}:`, error);
      return null;
    }
  }
}
