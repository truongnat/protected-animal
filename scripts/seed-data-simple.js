// Simple seed data script for Supabase
// Run this script with: node scripts/seed-data-simple.js

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Log connection info (without exposing the full key)
console.log('Supabase URL:', supabaseUrl);
console.log(
	'Supabase Key (first 5 chars):',
	supabaseKey ? `${supabaseKey.substring(0, 5)}...` : 'undefined',
);

if (!supabaseUrl || !supabaseKey) {
	console.error(
		'Error: Supabase URL or key is missing. Make sure you have a .env.local file with the correct values.',
	);
	process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Simplified species data (just 3 entries for testing)
const speciesData = [
	{
		name: 'Amur Leopard',
		scientific_name: 'Panthera pardus orientalis',
		conservation_status: 'Critically Endangered',
		population: 84,
		habitat: 'Temperate forests of Far Eastern Russia and Northeast China',
		description: "The Amur leopard is one of the world's most endangered big cats.",
		image_url:
			'https://files.worldwildlife.org/wwfcmsprod/images/Amur_Leopard_/hero_small/6u7hbvqxr0_amur_leopard_wwf_1366889.jpg',
		region: 'Asia',
	},
	{
		name: 'Javan Rhino',
		scientific_name: 'Rhinoceros sondaicus',
		conservation_status: 'Critically Endangered',
		population: 75,
		habitat: 'Tropical rainforests of Indonesia',
		description: 'The Javan rhino is the most threatened of the five rhino species.',
		image_url:
			'https://files.worldwildlife.org/wwfcmsprod/images/Javan_Rhino_/hero_small/1yqcmb6w4c_Javan_Rhino_8.6.2012_Hero_and_Circle_image_XL_257678.jpg',
		region: 'Asia',
	},
	{
		name: 'Vaquita',
		scientific_name: 'Phocoena sinus',
		conservation_status: 'Critically Endangered',
		population: 10,
		habitat: 'Northern Gulf of California, Mexico',
		description: "The vaquita is the world's smallest cetacean and most endangered marine mammal.",
		image_url:
			'https://files.worldwildlife.org/wwfcmsprod/images/Vaquita_/hero_small/2ujrh2vgbk_Vaquita_Hero_image_260214.jpg',
		region: 'North America',
	},
];

// Simplified blog post data (just 1 entry for testing)
const blogPostData = [
	{
		title: 'The Silent Crisis: Understanding Biodiversity Loss',
		content: 'Biodiversity loss is one of the most pressing environmental challenges of our time.',
		author: 'Dr. Emma Wilson',
		image_url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5',
		published_at: new Date().toISOString(),
		category: 'Conservation',
		tags: ['biodiversity', 'conservation'],
		slug: 'the-silent-crisis-understanding-biodiversity-loss',
	},
];

// Function to seed the database
async function seedDatabase() {
	console.log('Starting database seeding...');

	try {
		// Check if tables exist
		console.log('Checking if tables exist...');

		const { data: speciesExists, error: speciesError } = await supabase
			.from('species')
			.select('count')
			.limit(1);

		if (speciesError) {
			console.error('Error checking species table:', speciesError.message);
			console.error('Make sure you have run the SQL setup script in the Supabase dashboard first!');
			return;
		}

		console.log('Species table exists, proceeding with data insertion...');

		// Insert species data
		console.log('Inserting species data...');
		for (const species of speciesData) {
			try {
				const { error: insertError } = await supabase.from('species').upsert(
					{
						...species,
						created_at: new Date().toISOString(),
					},
					{ onConflict: 'name' },
				);

				if (insertError) {
					console.error(`Error inserting species ${species.name}:`, insertError.message);
				} else {
					console.log(`Inserted/updated species: ${species.name}`);
				}
			} catch (err) {
				console.error(`Exception when inserting species ${species.name}:`, err.message);
			}
		}

		// Insert blog post data
		console.log('Inserting blog post data...');
		for (const post of blogPostData) {
			try {
				const { error: insertError } = await supabase.from('blog_posts').upsert(
					{
						...post,
						created_at: new Date().toISOString(),
					},
					{ onConflict: 'slug' },
				);

				if (insertError) {
					console.error(`Error inserting blog post ${post.title}:`, insertError.message);
				} else {
					console.log(`Inserted/updated blog post: ${post.title}`);
				}
			} catch (err) {
				console.error(`Exception when inserting blog post ${post.title}:`, err.message);
			}
		}

		console.log('Database seeding completed!');
	} catch (error) {
		console.error('Unexpected error during seeding:', error.message);
	}
}

// Run the seed function
seedDatabase().catch((error) => {
	console.error('Error seeding database:', error.message);
	process.exit(1);
});
