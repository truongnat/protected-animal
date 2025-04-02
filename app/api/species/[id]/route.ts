import { supabase } from '@/lib/supabase';
import { type NextRequest, NextResponse } from 'next/server';

// GET /api/species/[id] - Get a specific species by ID with related species
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = params.id;
		const { searchParams } = new URL(request.url);
		const includeRelated = searchParams.get('includeRelated') === 'true';

		// Fetch the species
		const { data, error } = await supabase.from('species').select('*').eq('id', id).single();

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		if (!data) {
			return NextResponse.json({ error: 'Species not found' }, { status: 404 });
		}

		// If includeRelated is true, fetch related species
		if (includeRelated && data) {
			const { data: relatedSpecies, error: relatedError } = await supabase
				.from('species')
				.select('*')
				.or(`region.eq.${data.region},conservation_status.eq.${data.conservation_status}`)
				.neq('id', id)
				.limit(3);

			if (!relatedError && relatedSpecies) {
				return NextResponse.json({
					species: data,
					relatedSpecies,
				});
			}
		}

		return NextResponse.json({ species: data });
	} catch (error) {
		console.error('Error fetching species:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

// PATCH /api/species/[id] - Update a specific species (for admin use)
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = params.id;
		const updates = await request.json();

		// Remove any fields that shouldn't be updated
		delete updates.id;
		delete updates.created_at;

		// Update the species
		const { data, error } = await supabase
			.from('species')
			.update(updates)
			.eq('id', id)
			.select()
			.single();

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		if (!data) {
			return NextResponse.json({ error: 'Species not found' }, { status: 404 });
		}

		return NextResponse.json(data);
	} catch (error) {
		console.error('Error updating species:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

// DELETE /api/species/[id] - Delete a specific species (for admin use)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = params.id;

		// Delete the species
		const { error } = await supabase.from('species').delete().eq('id', id);

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		return NextResponse.json({ message: 'Species deleted successfully' });
	} catch (error) {
		console.error('Error deleting species:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
