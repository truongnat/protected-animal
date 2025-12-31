import path from 'node:path';
import Database from 'better-sqlite3';

// Create database connection
const dbPath = path.join(process.cwd(), 'data', 'app.db');
const db = new Database(dbPath);

// Create tables
const createSpeciesTable = `
CREATE TABLE IF NOT EXISTS species (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  scientificName TEXT NOT NULL,
  conservationStatus TEXT NOT NULL,
  population INTEGER,
  habitat TEXT,
  description TEXT,
  imageUrl TEXT,
  region TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;

// Sample species data
const speciesData = [
	{
		name: 'Saola',
		scientificName: 'Pseudoryx nghetinhensis',
		conservationStatus: 'Critically Endangered',
		population: 100,
		habitat: 'Tropical forests of Vietnam and Laos',
		description:
			'The saola is one of the world\'s rarest mammals, discovered only in 1992. Known as the "Asian unicorn," it has distinctive white markings on its face and long, straight horns.',
		imageUrl: 'https://images.unsplash.com/photo-1564509027875-ba1c9b69526d?q=80&w=2070',
		region: 'Central Vietnam',
	},
	{
		name: 'Indochinese Tiger',
		scientificName: 'Panthera tigris corbetti',
		conservationStatus: 'Endangered',
		population: 350,
		habitat: 'Tropical forests and grasslands',
		description:
			'The Indochinese tiger is a subspecies of tiger found in Southeast Asia. It is smaller and darker than other tiger subspecies, with narrower stripes.',
		imageUrl: 'https://images.unsplash.com/photo-1574068468668-a05a11f871da?q=80&w=2070',
		region: 'Northern Vietnam',
	},
	{
		name: 'Asian Elephant',
		scientificName: 'Elephas maximus',
		conservationStatus: 'Endangered',
		population: 150,
		habitat: 'Forests and grasslands',
		description:
			'Asian elephants are smaller than their African cousins and have smaller, rounded ears. They play a crucial role in their ecosystem as seed dispersers.',
		imageUrl: 'https://images.unsplash.com/photo-1564509027875-ba1c9b69526d?q=80&w=2070',
		region: 'Southern Vietnam',
	},
	{
		name: 'Red-shanked Douc',
		scientificName: 'Pygathrix nemaeus',
		conservationStatus: 'Endangered',
		population: 1000,
		habitat: 'Primary and secondary forests',
		description:
			'The red-shanked douc is a colorful primate endemic to Vietnam, Laos, and Cambodia. It is known for its striking appearance with red legs and white forearms.',
		imageUrl: 'https://images.unsplash.com/photo-1574068468668-a05a11f871da?q=80&w=2070',
		region: 'Central Vietnam',
	},
	{
		name: 'Pangolin',
		scientificName: 'Manis javanica',
		conservationStatus: 'Critically Endangered',
		population: 500,
		habitat: 'Tropical forests',
		description:
			"Pangolins are the world's only truly scaly mammals. They are heavily trafficked for their scales and meat, making them one of the most endangered species.",
		imageUrl: 'https://images.unsplash.com/photo-1564509027875-ba1c9b69526d?q=80&w=2070',
		region: 'Southern Vietnam',
	},
	{
		name: 'Hawksbill Turtle',
		scientificName: 'Eretmochelys imbricata',
		conservationStatus: 'Critically Endangered',
		population: 200,
		habitat: 'Coral reefs and coastal waters',
		description:
			'Hawksbill turtles are known for their beautiful shell patterns. They play a vital role in maintaining healthy coral reef ecosystems.',
		imageUrl: 'https://images.unsplash.com/photo-1574068468668-a05a11f871da?q=80&w=2070',
		region: 'Coastal Vietnam',
	},
];

try {
	console.log('Creating SQLite database and tables...');

	// Create species table
	db.exec(createSpeciesTable);
	console.log('Species table created successfully');

	// Insert species data
	const insertSpecies = db.prepare(`
    INSERT INTO species (name, scientificName, conservationStatus, population, habitat, description, imageUrl, region)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

	const insertMany = db.transaction((species) => {
		for (const s of species) {
			insertSpecies.run(
				s.name,
				s.scientificName,
				s.conservationStatus,
				s.population,
				s.habitat,
				s.description,
				s.imageUrl,
				s.region,
			);
		}
	});

	insertMany(speciesData);
	console.log(`Inserted ${speciesData.length} species records`);

	// Verify data
	const count = db.prepare('SELECT COUNT(*) as count FROM species').get();
	console.log(`Total species in database: ${count}`);

	console.log('Database seeding completed successfully!');
} catch (error) {
	console.error('Error seeding database:', error);
} finally {
	db.close();
}
