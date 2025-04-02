import { supabase } from '@/lib/supabase';
import { type NextRequest, NextResponse } from 'next/server';

// GET /api/species - Get all species with filtering, pagination, and search
export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);

		// Extract query parameters
		const region = searchParams.get('region');
		const status = searchParams.get('status');
		const search = searchParams.get('search');
		const page = searchParams.get('page') ? Number.parseInt(searchParams.get('page') as string) : 1;
		const limit = searchParams.get('limit')
			? Number.parseInt(searchParams.get('limit') as string)
			: 10;
		const sortBy = searchParams.get('sortBy') || 'name';
		const sortOrder = searchParams.get('sortOrder') || 'asc';

		// Calculate offset for pagination
		const offset = (page - 1) * limit;

		// Start building the query with count
		let query = supabase.from('species').select('*', { count: 'exact' });

		// Apply filters if provided
		if (region) {
			query = query.eq('region', region);
		}

		if (status) {
			query = query.eq('conservation_status', status);
		}

		// Apply search if provided
		if (search) {
			query = query.or(
				`name.ilike.%${search}%,scientific_name.ilike.%${search}%,description.ilike.%${search}%`,
			);
		}

		// Apply sorting
		query = query.order(sortBy, { ascending: sortOrder === 'asc' });

		// Apply pagination
		query = query.range(offset, offset + limit - 1);

		// Execute the query
		const { data, error, count } = await query;

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		// Calculate total pages
		const totalPages = Math.ceil((count || 0) / limit);

		// Return data with pagination info
		return NextResponse.json({
			data,
			pagination: {
				page,
				limit,
				totalItems: count,
				totalPages,
			},
			filters: {
				region,
				status,
				search,
				sortBy,
				sortOrder,
			},
		});
	} catch (error) {
		console.error('Error fetching species:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

// POST /api/species - Create a new species (for admin use)
export async function POST(request: NextRequest) {
	try {
		const data = await request.json();

		// Validate required fields
		const requiredFields = ['name', 'scientific_name', 'conservation_status'];
		for (const field of requiredFields) {
			if (!data[field]) {
				return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
			}
		}

		// Insert the new species
		const { data: newSpecies, error } = await supabase
			.from('species')
			.insert([
				{
					...data,
					created_at: new Date().toISOString(),
				},
			])
			.select()
			.single();

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		return NextResponse.json(newSpecies, { status: 201 });
	} catch (error) {
		console.error('Error creating species:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
