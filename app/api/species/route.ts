import { type NextRequest, NextResponse } from 'next/server';
import { SpeciesFactory } from '@/lib/core/factories/species.factory';

// GET /api/species - Get all species with filtering, pagination, and search
export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);

		// Extract query parameters
		const region = searchParams.get('region');
		const status = searchParams.get('status');
		const search = searchParams.get('search');
		const page = searchParams.get('page')
			? Number.parseInt(searchParams.get('page') as string, 10)
			: 1;
		const limit = searchParams.get('limit')
			? Number.parseInt(searchParams.get('limit') as string, 10)
			: 10;

		// Get use case from factory
		const getSpeciesWithFiltersUseCase = SpeciesFactory.createGetSpeciesWithFiltersUseCase();

		// Execute use case
		const result = await getSpeciesWithFiltersUseCase.execute({
			region: region || undefined,
			status: status || undefined,
			search: search || undefined,
			page,
			limit,
		});

		// Calculate pagination metadata
		const totalPages = Math.ceil(result.count / limit);
		const hasNextPage = page < totalPages;
		const hasPrevPage = page > 1;

		return NextResponse.json({
			data: result.species,
			pagination: {
				page,
				limit,
				total: result.count,
				totalPages,
				hasNextPage,
				hasPrevPage,
			},
		});
	} catch (error) {
		console.error('Error in GET /api/species:', error);
		return NextResponse.json({ error: 'Failed to fetch species' }, { status: 500 });
	}
}

// POST /api/species - Create a new species (admin only)
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		// Get repository from factory
		const repository = SpeciesFactory.getRepository();

		// Create species
		const newSpecies = await repository.createSpecies(body);

		return NextResponse.json(newSpecies, { status: 201 });
	} catch (error) {
		console.error('Error in POST /api/species:', error);
		return NextResponse.json({ error: 'Failed to create species' }, { status: 500 });
	}
}
