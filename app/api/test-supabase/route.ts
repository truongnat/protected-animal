import { createServerSupabaseClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		// Create a Supabase client
		const supabase = createServerSupabaseClient();

		// Test a simple query
		const { data, error } = await supabase.from('species').select('count').limit(1);

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		return NextResponse.json({
			message: 'Supabase connection successful',
			data,
		});
	} catch (error: any) {
		return NextResponse.json(
			{
				error: 'Error testing Supabase connection',
				details: error.message,
			},
			{ status: 500 },
		);
	}
}
