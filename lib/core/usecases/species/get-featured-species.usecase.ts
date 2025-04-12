import type { Species, SpeciesRepository } from '../../domain/entities/species';

export class GetFeaturedSpeciesUseCase {
	constructor(private speciesRepository: SpeciesRepository) {}

	async execute(limit = 6): Promise<Species[]> {
		try {
			// Get species from repository
			const species = await this.speciesRepository.getFeaturedSpecies(limit);

			// Define conservation status priority order (most critical first)
			const statusPriority = [
				'Critically Endangered',
				'Endangered',
				'Vulnerable',
				'Near Threatened',
				'Least Concern',
			];

			// Sort species by conservation status priority
			return species.sort((a, b) => {
				const statusA = statusPriority.indexOf(a.conservation_status);
				const statusB = statusPriority.indexOf(b.conservation_status);
				// If status is not in our priority list, put it at the end
				const priorityA = statusA === -1 ? 999 : statusA;
				const priorityB = statusB === -1 ? 999 : statusB;
				return priorityA - priorityB;
			});
		} catch (error) {
			console.error('Error in GetFeaturedSpeciesUseCase:', error);
			return [];
		}
	}
}
