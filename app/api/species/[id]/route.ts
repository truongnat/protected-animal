import { SpeciesFactory } from '@/lib/core/factories/species.factory';
import { type NextRequest, NextResponse } from 'next/server';

// GET /api/species/[id] - Get species by ID with optional related species
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id: idParam } = await params;
		const id = Number.parseInt(idParam);
		
		if (isNaN(id)) {
			return NextResponse.json(
				{ error: 'Invalid species ID' },
				{ status: 400 }
			);
		}

		// Get use case from factory
		const getSpeciesByIdUseCase = SpeciesFactory.createGetSpeciesByIdUseCase();
		const getRelatedSpeciesUseCase = SpeciesFactory.createGetRelatedSpeciesUseCase();

		// Execute use cases
		const species = await getSpeciesByIdUseCase.execute(id);
		
		if (!species) {
			return NextResponse.json(
				{ error: 'Species not found' },
				{ status: 404 }
			);
		}

		// Get related species (same region or conservation status)
		const relatedSpecies = await getRelatedSpeciesUseCase.execute(species, 4);

		return NextResponse.json({
			species,
			relatedSpecies,
		});
	} catch (error) {
		console.error(`Error in GET /api/species/${(await params).id}:`, error);
		return NextResponse.json(
			{ error: 'Failed to fetch species' },
			{ status: 500 }
		);
	}
}

// PATCH /api/species/[id] - Update species (admin only)
export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id: idParam } = await params;
		const id = Number.parseInt(idParam);
		
		if (isNaN(id)) {
			return NextResponse.json(
				{ error: 'Invalid species ID' },
				{ status: 400 }
			);
		}

		const body = await request.json();
		
		// Get repository from factory
		const repository = SpeciesFactory.getRepository();
		
		// Update species
		const updatedSpecies = await repository.updateSpecies(id, body);
		
		return NextResponse.json(updatedSpecies);
	} catch (error) {
		console.error(`Error in PATCH /api/species/${(await params).id}:`, error);
		return NextResponse.json(
			{ error: 'Failed to update species' },
			{ status: 500 }
		);
	}
}

// DELETE /api/species/[id] - Delete species (admin only)
export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id: idParam } = await params;
		const id = Number.parseInt(idParam);
		
		if (isNaN(id)) {
			return NextResponse.json(
				{ error: 'Invalid species ID' },
				{ status: 400 }
			);
		}

		// Get repository from factory
		const repository = SpeciesFactory.getRepository();
		
		// Delete species
		await repository.deleteSpecies(id);
		
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error(`Error in DELETE /api/species/${(await params).id}:`, error);
		return NextResponse.json(
			{ error: 'Failed to delete species' },
			{ status: 500 }
		);
	}
}