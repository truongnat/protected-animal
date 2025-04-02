// Seed data script for Supabase
// Run this script with: node scripts/seed-data-fixed.js

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
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
	{
		name: 'Hawksbill Turtle',
		scientific_name: 'Eretmochelys imbricata',
		conservation_status: 'Critically Endangered',
		population: 8000,
		habitat: 'Tropical and subtropical waters of the Atlantic, Pacific, and Indian Oceans',
		description:
			'The hawksbill turtle is a critically endangered sea turtle with an important role in marine ecosystems. They are primarily threatened by wildlife trade, poaching, and habitat loss. Their beautiful shells are often used to make jewelry and other decorative items.',
		image_url:
			'https://files.worldwildlife.org/wwfcmsprod/images/Hawksbill_Turtle_/hero_small/6rjbkl2yli_Hawksbill_Turtle_Hero_image_260214.jpg',
		region: 'Global',
	},
	{
		name: 'Saola',
		scientific_name: 'Pseudoryx nghetinhensis',
		conservation_status: 'Critically Endangered',
		population: 100,
		habitat: 'Forests of the Annamite Mountains of Vietnam and Laos',
		description:
			"The saola, also called the Asian unicorn, is one of the world's rarest mammals. First discovered in 1992, they are rarely seen in the wild. They are primarily threatened by hunting and habitat loss.",
		image_url:
			'https://files.worldwildlife.org/wwfcmsprod/images/Saola_/hero_small/8pqk3t0yle_Saola_hero_image.jpg',
		region: 'Asia',
	},
	{
		name: 'Black Rhino',
		scientific_name: 'Diceros bicornis',
		conservation_status: 'Critically Endangered',
		population: 5630,
		habitat: 'Semi-desert savanna, woodlands, forests, and wetlands of eastern and southern Africa',
		description:
			'The black rhino is a species of rhinoceros native to eastern and southern Africa. They are primarily threatened by poaching for their horns, which are used in traditional Chinese medicine and as status symbols in some Asian countries.',
		image_url:
			'https://files.worldwildlife.org/wwfcmsprod/images/Black_Rhino_/hero_small/3fww1npyyk_black_rhino_42993643.jpg',
		region: 'Africa',
	},
	{
		name: 'Sumatran Elephant',
		scientific_name: 'Elephas maximus sumatranus',
		conservation_status: 'Critically Endangered',
		population: 2400,
		habitat: 'Lowland forests of Sumatra, Indonesia',
		description:
			'The Sumatran elephant is a subspecies of the Asian elephant. They are primarily threatened by habitat loss due to palm oil plantations, logging, and human-elephant conflict. They play a crucial role in maintaining the ecosystem of the Sumatran forests.',
		image_url:
			'https://files.worldwildlife.org/wwfcmsprod/images/Sumatran_Elephant_/hero_small/3unhbxnkam_Sumatran_Elephant_Hero_image_260214.jpg',
		region: 'Asia',
	},
	{
		name: 'Cross River Gorilla',
		scientific_name: 'Gorilla gorilla diehli',
		conservation_status: 'Critically Endangered',
		population: 300,
		habitat: 'Forested hills and mountains of the Cross River region between Nigeria and Cameroon',
		description:
			'The Cross River gorilla is the most endangered of the gorilla subspecies, with only about 300 individuals remaining in the wild. They are primarily threatened by habitat loss, poaching, and disease.',
		image_url:
			'https://files.worldwildlife.org/wwfcmsprod/images/Cross_River_Gorilla_8.6.2012_Hero_and_Circle_XL_257678/hero_small/6u7hbvqxr0_Cross_River_Gorilla_8.6.2012_Hero_and_Circle_XL_257678.jpg',
		region: 'Africa',
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

## Main Drivers of Biodiversity Loss

1. **Habitat Destruction**: Deforestation, urbanization, and agricultural expansion are destroying natural habitats at an unprecedented rate.
2. **Overexploitation**: Unsustainable hunting, fishing, and harvesting are depleting populations faster than they can recover.
3. **Climate Change**: Shifting temperature and precipitation patterns are altering habitats and disrupting ecological relationships.
4. **Pollution**: Chemical contaminants, plastic waste, and excess nutrients are degrading ecosystems worldwide.
5. **Invasive Species**: Non-native species introduced to new areas can outcompete native species and disrupt ecological balance.

## Why Biodiversity Matters

Biodiversity is not just about saving charismatic species like pandas or tigers. It's about maintaining the delicate balance of ecosystems that provide us with:

- **Food Security**: 75% of food crops rely on animal pollinators
- **Medicine**: 70% of cancer drugs are natural or synthetic products inspired by nature
- **Clean Water**: Healthy ecosystems filter pollutants and regulate water flow
- **Climate Regulation**: Forests, oceans, and other ecosystems absorb carbon dioxide
- **Economic Benefits**: Nature-based tourism, sustainable forestry, and fisheries support millions of jobs

## Hope for the Future

Despite the grim statistics, there is hope. Conservation efforts have brought species like the black rhino, mountain gorilla, and giant panda back from the brink of extinction. Protected areas are expanding, and sustainable practices are gaining traction.

What we need now is a transformative change in how we value and protect biodiversity. This includes:

- Expanding and strengthening protected areas
- Restoring degraded ecosystems
- Adopting sustainable production and consumption patterns
- Addressing climate change
- Engaging communities in conservation efforts

By understanding the silent crisis of biodiversity loss and taking action, we can ensure that the rich tapestry of life on Earth continues to thrive for generations to come.
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

In coastal areas, rising sea levels threaten nesting beaches for sea turtles and habitats for species like the Florida Key deer and Bengal tiger in the Sundarbans mangrove forests.

### Changing Forests and Grasslands

Shifting temperature and precipitation patterns are altering the composition of forests and grasslands. The mountain gorilla, which lives in high-altitude forests in East Africa, faces a shrinking habitat as warming temperatures push its forest ecosystem higher up mountains with nowhere to go at the summit.

### Coral Reef Degradation

Warming oceans and acidification are causing widespread coral bleaching and death. Coral reefs support about 25% of all marine species, including the critically endangered hawksbill turtle, which depends on healthy reefs for food and shelter.

## Disruption of Ecological Relationships

### Phenological Mismatches

Many species time their life cycles (breeding, migration, hibernation) based on seasonal cues. Climate change is disrupting these patterns, creating mismatches between predators and prey or pollinators and plants.

For example, migratory birds may arrive at breeding grounds after their insect food sources have peaked, reducing breeding success and survival rates.

### Range Shifts and New Competitors

As species move to track suitable climate conditions, they may encounter new competitors, predators, or diseases. The endangered Iberian lynx in Spain, for instance, may face competition from the more adaptable common lynx as climate change alters their ranges.

## Compounding Existing Threats

For many endangered species, climate change acts as a "threat multiplier," exacerbating existing pressures from:

- Habitat loss and fragmentation
- Poaching and overexploitation
- Pollution
- Invasive species

The critically endangered vaquita porpoise, with fewer than 10 individuals remaining, faces not only illegal fishing but also changing ocean conditions that may affect its prey and habitat quality.

## Conservation in a Changing Climate

To help endangered species survive in a warming world, conservation strategies must evolve:

1. **Climate-Smart Conservation**: Designing protected areas and corridors that account for future climate conditions and species movements.

2. **Assisted Migration**: In some cases, helping species move to new suitable habitats when natural migration is impossible.

3. **Reducing Non-Climate Stressors**: Minimizing habitat loss, pollution, and overexploitation to increase species' resilience to climate impacts.

4. **Ex-Situ Conservation**: Maintaining captive populations and seed banks as insurance against extinction.

5. **Addressing Root Causes**: Most importantly, reducing greenhouse gas emissions to limit the extent of future warming.

## Conclusion

Climate change presents an unprecedented challenge for endangered species conservation. By understanding these complex impacts and implementing adaptive strategies, we can help vulnerable species navigate an uncertain future. However, the most effective action remains addressing the root cause by rapidly transitioning to a low-carbon economy and limiting global warming.
    `,
		author: 'Dr. Michael Chen',
		image_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
		published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
		category: 'Climate',
		tags: ['climate change', 'endangered species', 'conservation', 'adaptation'],
		slug: 'how-climate-change-affects-endangered-species',
	},
	{
		title: 'Success Stories: Species Brought Back from the Brink',
		content: `
# Success Stories: Species Brought Back from the Brink

In the face of the ongoing biodiversity crisis, conservation success stories provide hope and valuable lessons. These remarkable recoveries demonstrate that with dedication, resources, and science-based approaches, we can reverse the decline of endangered species.

## The California Condor

### The Crisis

In 1982, the California condor population had plummeted to just 22 individuals, making it one of the most endangered species in the world. Lead poisoning from ammunition in carcasses, habitat loss, and poaching had driven North America's largest land bird to the edge of extinction.

### The Comeback

In a controversial but ultimately successful decision, all remaining wild condors were captured for a captive breeding program. Through careful management, the population grew, and reintroduction began in 1992. Today, there are over 500 California condors, with more than half flying free in the wild across California, Arizona, Utah, and Baja California.

### Keys to Success

- Captive breeding and reintroduction
- Addressing the primary threat (lead ammunition)
- Public education and engagement
- Collaboration between government agencies, NGOs, and local communities

## The Southern White Rhinoceros

### The Crisis

In the late 19th century, the southern white rhinoceros was thought to be extinct until a small population of fewer than 50 individuals was discovered in South Africa in 1895.

### The Comeback

Through strict protection and managed breeding, the population has increased to around 20,000 today, making it the most numerous of all rhino species. While still threatened by poaching, the southern white rhino represents one of Africa's greatest conservation success stories.

### Keys to Success

- Protected areas and anti-poaching efforts
- Translocation to establish new populations
- Sustainable ecotourism creating economic incentives
- International cooperation

## The Humpback Whale

### The Crisis

Commercial whaling in the 19th and 20th centuries decimated humpback whale populations worldwide, with some regional populations reduced by more than 95%.

### The Comeback

Following the 1982 moratorium on commercial whaling, humpback whales have made a remarkable recovery. Most populations have rebounded to the point where the species was removed from the U.S. endangered species list in 2016 (except for a few vulnerable subpopulations).

### Keys to Success

- International policy (whaling moratorium)
- Marine protected areas
- Reducing entanglement in fishing gear
- Global cooperation

## The American Bald Eagle

### The Crisis

The bald eagle, America's national symbol, declined dramatically in the mid-20th century due to hunting, habitat destruction, and the pesticide DDT, which caused eggshell thinning. By 1963, only 417 nesting pairs remained in the lower 48 states.

### The Comeback

Following the ban of DDT in 1972 and protection under the Endangered Species Act, bald eagles have made an astounding recovery. Today, there are more than 300,000 bald eagles in the United States, and the species was removed from the endangered species list in 2007.

### Keys to Success

- Banning harmful chemicals (DDT)
- Habitat protection
- Legal protection against hunting
- Captive breeding and reintroduction

## Lessons Learned

These success stories share common elements that can guide future conservation efforts:

1. **Address Direct Threats**: Identifying and eliminating the primary causes of decline is essential.

2. **Legal Protection**: Strong laws and enforcement provide a foundation for recovery.

3. **Habitat Conservation**: Protecting and restoring critical habitat is fundamental.

4. **Science-Based Management**: Using the best available science to guide decisions.

5. **Partnerships**: Collaboration between governments, NGOs, scientists, and local communities.

6. **Sustained Commitment**: Recovery takes time, often decades, requiring long-term dedication.

7. **Public Support**: Building awareness and engagement with the public.

## Conclusion

While the biodiversity crisis remains urgent, these success stories demonstrate that extinction is not inevitable. With the right approaches and sufficient resources, we can bring species back from the brink and restore ecological balance. Each recovery not only saves a unique species but also maintains the integrity of ecosystems and the services they provide to humanity.
    `,
		author: 'Sarah Johnson',
		image_url: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0',
		published_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
		category: 'Conservation',
		tags: ['conservation success', 'endangered species', 'recovery', 'wildlife management'],
		slug: 'success-stories-species-brought-back-from-the-brink',
	},
];

// Function to seed the database
async function seedDatabase() {
	console.log('Starting database seeding...');

	// Note: We're skipping table creation since it should be done via the SQL Editor in Supabase dashboard
	// using the scripts/supabase-setup.sql file
	console.log('Assuming tables already exist (created via SQL Editor)...');

	// Insert species data
	console.log('Inserting species data...');
	for (const species of speciesData) {
		const { error: insertError } = await supabase.from('species').upsert(
			{
				...species,
				created_at: new Date().toISOString(),
			},
			{ onConflict: 'name' },
		);

		if (insertError) {
			console.error(`Error inserting species ${species.name}:`, insertError);
		} else {
			console.log(`Inserted/updated species: ${species.name}`);
		}
	}

	// Insert blog post data
	console.log('Inserting blog post data...');
	for (const post of blogPostData) {
		const { error: insertError } = await supabase.from('blog_posts').upsert(
			{
				...post,
				created_at: new Date().toISOString(),
			},
			{ onConflict: 'slug' },
		);

		if (insertError) {
			console.error(`Error inserting blog post ${post.title}:`, insertError);
		} else {
			console.log(`Inserted/updated blog post: ${post.title}`);
		}
	}

	console.log('Database seeding completed!');
}

// Run the seed function
seedDatabase().catch((error) => {
	console.error('Error seeding database:', error);
	process.exit(1);
});
