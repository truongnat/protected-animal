import { SpeciesRepository } from '../domain/entities/species';
import { GetAllSpeciesUseCase } from '../usecases/species/get-all-species.usecase';
import { GetFeaturedSpeciesUseCase } from '../usecases/species/get-featured-species.usecase';
import { GetFilterOptionsUseCase } from '../usecases/species/get-filter-options.usecase';
import { GetRelatedSpeciesUseCase } from '../usecases/species/get-related-species.usecase';
import { GetSpeciesByIdUseCase } from '../usecases/species/get-species-by-id.usecase';
import { GetSpeciesWithFiltersUseCase } from '../usecases/species/get-species-with-filters.usecase';
import { SupabaseSpeciesRepository } from '../../supabase/species.repository';

/**
 * Factory for creating species-related use cases and repositories
 */
export class SpeciesFactory {
  private static repository: SpeciesRepository | null = null;

  /**
   * Get the species repository instance (singleton)
   */
  static getRepository(): SpeciesRepository {
    if (!this.repository) {
      this.repository = new SupabaseSpeciesRepository();
    }
    return this.repository;
  }

  /**
   * Create a GetFeaturedSpeciesUseCase instance
   */
  static createGetFeaturedSpeciesUseCase(): GetFeaturedSpeciesUseCase {
    return new GetFeaturedSpeciesUseCase(this.getRepository());
  }

  /**
   * Create a GetAllSpeciesUseCase instance
   */
  static createGetAllSpeciesUseCase(): GetAllSpeciesUseCase {
    return new GetAllSpeciesUseCase(this.getRepository());
  }

  /**
   * Create a GetSpeciesWithFiltersUseCase instance
   */
  static createGetSpeciesWithFiltersUseCase(): GetSpeciesWithFiltersUseCase {
    return new GetSpeciesWithFiltersUseCase(this.getRepository());
  }

  /**
   * Create a GetFilterOptionsUseCase instance
   */
  static createGetFilterOptionsUseCase(): GetFilterOptionsUseCase {
    return new GetFilterOptionsUseCase(this.getRepository());
  }

  /**
   * Create a GetSpeciesByIdUseCase instance
   */
  static createGetSpeciesByIdUseCase(): GetSpeciesByIdUseCase {
    return new GetSpeciesByIdUseCase(this.getRepository());
  }

  /**
   * Create a GetRelatedSpeciesUseCase instance
   */
  static createGetRelatedSpeciesUseCase(): GetRelatedSpeciesUseCase {
    return new GetRelatedSpeciesUseCase(this.getRepository());
  }
}
