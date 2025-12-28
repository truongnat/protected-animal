/**
 * Seed Species Data
 * Populates the species table with sample Vietnamese wildlife
 */

const Database = require('better-sqlite3');

const DATABASE_PATH = process.env.DATABASE_PATH || './data/protected-animals.db';

console.log('🌱 Seeding species data...');

const speciesData = [
  {
    name: 'Saola',
    scientificName: 'Pseudoryx nghetinhensis',
    vietnameseName: 'Sao la',
    category: 'mammal',
    conservationStatus: 'CR',
    protectionLevel: 'IB',
    population: 100,
    populationTrend: 'decreasing',
    habitat: 'Tropical forests of Annamite Mountains',
    distribution: 'Central Vietnam (Quang Nam, Thua Thien Hue)',
    threats: JSON.stringify(['Habitat loss', 'Hunting', 'Snare traps']),
    description: 'The saola is one of the world\'s rarest mammals, discovered only in 1992. Known as the "Asian unicorn," it has distinctive white markings on its face and long, straight horns.',
    imageUrl: '/images/species/saola.jpg',
    region: 'Central Vietnam',
    featured: 1,
  },
  {
    name: 'Indochinese Tiger',
    scientificName: 'Panthera tigris corbetti',
    vietnameseName: 'Hổ Đông Dương',
    category: 'mammal',
    conservationStatus: 'EN',
    protectionLevel: 'IB',
    population: 350,
    populationTrend: 'decreasing',
    habitat: 'Tropical forests and grasslands',
    distribution: 'Northern and Central Vietnam',
    threats: JSON.stringify(['Poaching', 'Habitat loss', 'Human-wildlife conflict']),
    description: 'The Indochinese tiger is a subspecies of tiger found in Southeast Asia. It is smaller and darker than other tiger subspecies, with narrower stripes.',
    imageUrl: '/images/species/tiger.jpg',
    region: 'Northern Vietnam',
    featured: 1,
  },
  {
    name: 'Asian Elephant',
    scientificName: 'Elephas maximus',
    vietnameseName: 'Voi châu Á',
    category: 'mammal',
    conservationStatus: 'EN',
    protectionLevel: 'IB',
    population: 150,
    populationTrend: 'decreasing',
    habitat: 'Forests and grasslands',
    distribution: 'Southern and Central Highlands',
    threats: JSON.stringify(['Habitat loss', 'Human-elephant conflict', 'Poaching']),
    description: 'Asian elephants are smaller than their African cousins and have smaller, rounded ears. They play a crucial role in their ecosystem as seed dispersers.',
    imageUrl: '/images/species/elephant.jpg',
    region: 'Southern Vietnam',
    featured: 1,
  },
  {
    name: 'Red-shanked Douc',
    scientificName: 'Pygathrix nemaeus',
    vietnameseName: 'Voọc chà vá chân nâu',
    category: 'mammal',
    conservationStatus: 'EN',
    protectionLevel: 'IB',
    population: 1000,
    populationTrend: 'decreasing',
    habitat: 'Primary and secondary forests',
    distribution: 'Central Vietnam and Central Highlands',
    threats: JSON.stringify(['Habitat loss', 'Hunting', 'Pet trade']),
    description: 'The red-shanked douc is a colorful primate endemic to Vietnam, Laos, and Cambodia. It is known for its striking appearance with red legs and white forearms.',
    imageUrl: '/images/species/douc.jpg',
    region: 'Central Vietnam',
    featured: 1,
  },
  {
    name: 'Sunda Pangolin',
    scientificName: 'Manis javanica',
    vietnameseName: 'Tê tê Java',
    category: 'mammal',
    conservationStatus: 'CR',
    protectionLevel: 'IB',
    population: 500,
    populationTrend: 'decreasing',
    habitat: 'Tropical forests',
    distribution: 'Southern and Central Vietnam',
    threats: JSON.stringify(['Illegal wildlife trade', 'Poaching', 'Habitat loss']),
    description: 'Pangolins are the world\'s only truly scaly mammals. They are heavily trafficked for their scales and meat, making them one of the most endangered species.',
    imageUrl: '/images/species/pangolin.jpg',
    region: 'Southern Vietnam',
    featured: 1,
  },
  {
    name: 'Hawksbill Turtle',
    scientificName: 'Eretmochelys imbricata',
    vietnameseName: 'Rùa biển',
    category: 'reptile',
    conservationStatus: 'CR',
    protectionLevel: 'IB',
    population: 200,
    populationTrend: 'decreasing',
    habitat: 'Coral reefs and coastal waters',
    distribution: 'Coastal areas of Vietnam',
    threats: JSON.stringify(['Illegal trade', 'Bycatch', 'Habitat degradation']),
    description: 'Hawksbill turtles are known for their beautiful shell patterns. They play a vital role in maintaining healthy coral reef ecosystems.',
    imageUrl: '/images/species/turtle.jpg',
    region: 'Coastal Vietnam',
    featured: 1,
  },
  {
    name: 'Tonkin Snub-nosed Monkey',
    scientificName: 'Rhinopithecus avunculus',
    vietnameseName: 'Voọc mũi hếch Tonkin',
    category: 'mammal',
    conservationStatus: 'CR',
    protectionLevel: 'IB',
    population: 250,
    populationTrend: 'stable',
    habitat: 'Limestone forests',
    distribution: 'Northern Vietnam (Ha Giang, Tuyen Quang)',
    threats: JSON.stringify(['Habitat loss', 'Hunting', 'Small population']),
    description: 'One of the world\'s rarest primates, found only in northern Vietnam. They have distinctive upturned noses and live in small family groups.',
    imageUrl: '/images/species/monkey.jpg',
    region: 'Northern Vietnam',
    featured: 0,
  },
  {
    name: 'Sun Bear',
    scientificName: 'Helarctos malayanus',
    vietnameseName: 'Gấu chó',
    category: 'mammal',
    conservationStatus: 'VU',
    protectionLevel: 'IB',
    population: 300,
    populationTrend: 'decreasing',
    habitat: 'Tropical forests',
    distribution: 'Southern and Central Vietnam',
    threats: JSON.stringify(['Habitat loss', 'Poaching for bile', 'Pet trade']),
    description: 'The smallest bear species, sun bears are excellent climbers and play an important role in seed dispersal.',
    imageUrl: '/images/species/sunbear.jpg',
    region: 'Southern Vietnam',
    featured: 0,
  },
];

try {
  const db = new Database(DATABASE_PATH);
  
  // Check if species already exist
  const existingSpecies = db.prepare('SELECT COUNT(*) as count FROM species').get();
  
  if (existingSpecies.count > 0) {
    console.log(`⚠️  ${existingSpecies.count} species already exist. Skipping seed.`);
    db.close();
    return;
  }

  const insertSpecies = db.prepare(`
    INSERT INTO species (
      name, scientific_name, vietnamese_name, category, conservation_status,
      protection_level, population, population_trend, habitat, distribution,
      threats, description, image_url, region, featured
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertMany = db.transaction((species) => {
    for (const s of species) {
      insertSpecies.run(
        s.name,
        s.scientificName,
        s.vietnameseName,
        s.category,
        s.conservationStatus,
        s.protectionLevel,
        s.population,
        s.populationTrend,
        s.habitat,
        s.distribution,
        s.threats,
        s.description,
        s.imageUrl,
        s.region,
        s.featured
      );
    }
  });

  insertMany(speciesData);
  console.log(`  ✓ Inserted ${speciesData.length} species`);
  
  const count = db.prepare('SELECT COUNT(*) as count FROM species').get();
  console.log(`  ✓ Total species in database: ${count.count}`);
  
  console.log('\n✅ Species seeding completed successfully!');
  
  db.close();
} catch (error) {
  console.error('❌ Species seeding failed:', error);
  process.exit(1);
}
