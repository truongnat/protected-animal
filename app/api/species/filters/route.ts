import { SpeciesFactory } from '@/lib/core/factories/species.factory';
import { NextResponse } from 'next/server';

// GET /api/species/filters - Get unique regions and conservation statuses
export async function GET() {
	try {
		// Get use case from factory
		const getFilterOptionsUseCase = SpeciesFactory.createGetFilterOptionsUseCase();

		// Execute use case
		const filterOptions = await getFilterOptionsUseCase.execute();

		return NextResponse.json(filterOptions);
	} catch (error) {
		console.error('Error in GET /api/species/filters:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch filter options' },
			{ status: 500 }
		);
	}
}