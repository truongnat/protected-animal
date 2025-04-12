// Final seed data script for Supabase
// Run this script with: node scripts/seed-data-final.js

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

// Endangered species data
const speciesData = [
	{
		name: 'Amur Leopard',
		scientific_name: 'Panthera pardus orientalis',
		conservation_status: 'Critically Endangered',
		population: 84,
		habitat: 'Temperate forests of Far Eastern Russia and Northeast China',
		description:
			"The Amur leopard is one of the world's most endangered big cats. It is known for its beautiful spotted fur and ability to adapt to cold, snowy environments. Poaching, habitat loss, and fragmentation of its habitat are the main threats to this subspecies.",
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
		description:
			'The Javan rhino is the most threatened of the five rhino species, with only one known population in the wild. They are primarily threatened by poaching for their horns, which are highly valued in traditional Chinese medicine, despite the fact that the horns are made of keratin, the same protein that makes up human hair and fingernails.',
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
		description:
			"The vaquita is the world's smallest cetacean and most endangered marine mammal. The primary threat to vaquitas is entanglement in illegal gillnets set for totoaba, a large fish whose swim bladder is highly valued in Chinese traditional medicine.",
		image_url:
			'https://files.worldwildlife.org/wwfcmsprod/images/Vaquita_/hero_small/2ujrh2vgbk_Vaquita_Hero_image_260214.jpg',
		region: 'North America',
	},
	{
		name: 'Mountain Gorilla',
		scientific_name: 'Gorilla beringei beringei',
		conservation_status: 'Endangered',
		population: 1063,
		habitat: 'Mountainous forests of East Africa',
		description:
			'Mountain gorillas are one of the two subspecies of the eastern gorilla. They are primarily threatened by habitat loss, disease, poaching, and human conflict. Conservation efforts have helped increase their population in recent years.',
		image_url:
			'https://files.worldwildlife.org/wwfcmsprod/images/Mountain_Gorilla_Silverback_WW22557/hero_small/4vprg0qf0h_Mountain_Gorilla_Silverback_WW22557.jpg',
		region: 'Africa',
	},
	{
		name: 'Sumatran Orangutan',
		scientific_name: 'Pongo abelii',
		conservation_status: 'Critically Endangered',
		population: 14000,
		habitat: 'Tropical rainforests of Sumatra, Indonesia',
		description:
			'The Sumatran orangutan is one of three species of orangutan. They are primarily threatened by habitat loss due to palm oil plantations, logging, and mining. They are also threatened by the illegal pet trade.',
		image_url:
			'https://files.worldwildlife.org/wwfcmsprod/images/Sumatran_Orangutan_New_Hero_Image/hero_small/6u2oqc9ung_Medium_WW226365.jpg',
		region: 'Asia',
	},
];

// Blog post data
const blogPostData = [
	{
		title: 'The Silent Crisis: Understanding Biodiversity Loss',
		content: `
# The Silent Crisis: Understanding Biodiversity Loss

Biodiversity loss is one of the most pressing environmental challenges of our time, yet it often goes unnoticed compared to more visible issues like climate change. This "silent crisis" is occurring at an alarming rate, with far-reaching consequences for our planet and future generations.

## What is Biodiversity?

Biodiversity refers to the variety of life on Earth at all levels, from genes to ecosystems. It encompasses the diversity within species, between species, and of ecosystems. This rich tapestry of life provides essential services that sustain our existence, from clean air and water to food security and medicine.

## The Alarming Rate of Loss

According to the latest reports from the Intergovernmental Science-Policy Platform on Biodiversity and Ecosystem Services (IPBES), around 1 million animal and plant species are now threatened with extinction, many within decades. This rate is tens to hundreds of times higher than the average over the past 10 million years.
    `,
		author: 'Dr. Emma Wilson',
		image_url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5',
		published_at: new Date().toISOString(),
		category: 'Conservation',
		tags: ['biodiversity', 'conservation', 'ecosystems', 'extinction'],
		slug: 'the-silent-crisis-understanding-biodiversity-loss',
	},
	{
		title: 'How Climate Change Affects Endangered Species',
		content: `
# How Climate Change Affects Endangered Species

Climate change is one of the most significant threats facing wildlife today, particularly for species that are already endangered. As global temperatures rise and weather patterns become more extreme, many animals and plants are struggling to adapt to rapidly changing conditions.

## Direct Impacts on Habitats

### Melting Ice and Rising Seas

For polar species like the polar bear, Arctic fox, and emperor penguin, melting sea ice means losing hunting grounds, breeding sites, and shelter. The Arctic is warming at more than twice the global average rate, with sea ice declining by about 13% per decade.
    `,
		author: 'Dr. Michael Chen',
		image_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
		published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
		category: 'Climate',
		tags: ['climate change', 'endangered species', 'conservation', 'adaptation'],
		slug: 'how-climate-change-affects-endangered-species',
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
				// First try to delete any existing record with the same name to avoid conflicts
				await supabase.from('species').delete().eq('name', species.name);

				// Then insert the new record
				const { error: insertError } = await supabase.from('species').insert({
					...species,
					created_at: new Date().toISOString(),
				});

				if (insertError) {
					console.error(`Error inserting species ${species.name}:`, insertError.message);
				} else {
					console.log(`Inserted species: ${species.name}`);
				}
			} catch (err) {
				console.error(`Exception when inserting species ${species.name}:`, err.message);
			}
		}

		// Insert blog post data
		console.log('Inserting blog post data...');
		for (const post of blogPostData) {
			try {
				// First try to delete any existing record with the same slug to avoid conflicts
				await supabase.from('blog_posts').delete().eq('slug', post.slug);

				// Then insert the new record
				const { error: insertError } = await supabase.from('blog_posts').insert({
					...post,
					created_at: new Date().toISOString(),
				});

				if (insertError) {
					console.error(`Error inserting blog post ${post.title}:`, insertError.message);

					// If we're still having RLS issues, suggest disabling RLS temporarily
					if (insertError.message.includes('row-level security policy')) {
						console.error('\nROW LEVEL SECURITY ISSUE DETECTED!');
						console.error('You have two options:');
						console.error('1. Add a policy for the service_role in the Supabase dashboard');
						console.error('2. Temporarily disable RLS for seeding by running these SQL commands:');
						console.error('   ALTER TABLE public.species DISABLE ROW LEVEL SECURITY;');
						console.error('   ALTER TABLE public.blog_posts DISABLE ROW LEVEL SECURITY;');
						console.error('   (Remember to enable it back after seeding)\n');
					}
				} else {
					console.log(`Inserted blog post: ${post.title}`);
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
