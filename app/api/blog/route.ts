import { supabase } from '@/lib/supabase';
import { type NextRequest, NextResponse } from 'next/server';

// GET /api/blog - Get all blog posts
export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const category = searchParams.get('category');
		const tag = searchParams.get('tag');
		const limit = searchParams.get('limit')
			? Number.parseInt(searchParams.get('limit') as string)
			: 10;

		let query = supabase.from('blog_posts').select('*');

		// Apply filters if provided
		if (category) {
			query = query.eq('category', category);
		}

		if (tag) {
			query = query.contains('tags', [tag]);
		}

		// Apply limit and order by published_at (newest first)
		query = query.order('published_at', { ascending: false }).limit(limit);

		const { data, error } = await query;

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		return NextResponse.json(data);
	} catch (error) {
		console.error('Error fetching blog posts:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
