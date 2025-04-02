import { supabase } from '@/lib/supabase';
import { type NextRequest, NextResponse } from 'next/server';

// GET /api/blog/[slug] - Get a specific blog post by slug
export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
	try {
		const slug = params.slug;

		const { data, error } = await supabase.from('blog_posts').select('*').eq('slug', slug).single();

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		if (!data) {
			return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
		}

		return NextResponse.json(data);
	} catch (error) {
		console.error('Error fetching blog post:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
