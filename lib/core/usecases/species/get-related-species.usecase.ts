import { Species, SpeciesRepository } from '../../domain/entities/species';

export class GetRelatedSpeciesUseCase {
  constructor(private speciesRepository: SpeciesRepository) {}

  async execute(species: Species, limit: number = 3): Promise<Species[]> {
    try {
      // Get species with the same region
      const sameRegionSpecies = await this.speciesRepository.getSpeciesByRegion(species.region);
      
      // Get species with the same conservation status
      const sameStatusSpecies = await this.speciesRepository.getSpeciesByStatus(species.conservation_status);
      
      // Combine and filter out the original species
      const relatedSpecies = [...sameRegionSpecies, ...sameStatusSpecies]
        .filter(related => related.id !== species.id)
        // Remove duplicates
        .filter((related, index, self) => 
          index === self.findIndex(s => s.id === related.id)
        )
        // Limit the number of results
        .slice(0, limit);
      
      return relatedSpecies;
    } catch (error) {
      console.error(`Error in GetRelatedSpeciesUseCase for species ${species.id}:`, error);
      return [];
    }
  }
}
