import { SpeciesRepository } from '../../domain/entities/species';

export interface FilterOptions {
  regions: string[];
  statuses: string[];
}

export class GetFilterOptionsUseCase {
  constructor(private speciesRepository: SpeciesRepository) {}

  async execute(): Promise<FilterOptions> {
    try {
      // Get unique regions and statuses from repository
      const regions = await this.speciesRepository.getUniqueRegions();
      const statuses = await this.speciesRepository.getUniqueStatuses();
      
      return {
        regions,
        statuses
      };
    } catch (error) {
      console.error('Error in GetFilterOptionsUseCase:', error);
      return {
        regions: [],
        statuses: []
      };
    }
  }
}
