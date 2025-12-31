import { Database } from 'bun:sqlite';
import path from 'node:path';

// Create database connection
const dbPath = path.join(process.cwd(), 'data', 'app.db');
console.log('Database path:', dbPath);

try {
	const db = new Database(dbPath);
	console.log('Database connected successfully');

	// Create species table
	db.exec(`
    CREATE TABLE IF NOT EXISTS species (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      scientific_name TEXT NOT NULL,
      conservation_status TEXT NOT NULL,
      population INTEGER,
      habitat TEXT,
      description TEXT,
      image_url TEXT,
      region TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

	console.log('Species table created');

	// Insert sample data
	const insert = db.prepare(`
    INSERT INTO species (name, scientific_name, conservation_status, population, habitat, description, image_url, region)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

	const species = [
		[
			'Saola',
			'Pseudoryx nghetinhensis',
			'Critically Endangered',
			100,
			'Tropical forests of Vietnam and Laos',
			'The saola is one of the world\'s rarest mammals, discovered only in 1992. Known as the "Asian unicorn," it has distinctive white markings on its face and long, straight horns.',
			'https://images.unsplash.com/photo-1564509027875-ba1c9b69526d?q=80&w=2070',
			'Central Vietnam',
		],
		[
			'Indochinese Tiger',
			'Panthera tigris corbetti',
			'Endangered',
			350,
			'Tropical forests and grasslands',
			'The Indochinese tiger is a subspecies of tiger found in Southeast Asia. It is smaller and darker than other tiger subspecies, with narrower stripes.',
			'https://images.unsplash.com/photo-1574068468668-a05a11f871da?q=80&w=2070',
			'Northern Vietnam',
		],
		[
			'Asian Elephant',
			'Elephas maximus',
			'Endangered',
			150,
			'Forests and grasslands',
			'Asian elephants are smaller than their African cousins and have smaller, rounded ears. They play a crucial role in their ecosystem as seed dispersers.',
			'https://images.unsplash.com/photo-1564509027875-ba1c9b69526d?q=80&w=2070',
			'Southern Vietnam',
		],
		[
			'Red-shanked Douc',
			'Pygathrix nemaeus',
			'Endangered',
			1000,
			'Primary and secondary forests',
			'The red-shanked douc is a colorful primate endemic to Vietnam, Laos, and Cambodia. It is known for its striking appearance with red legs and white forearms.',
			'https://images.unsplash.com/photo-1574068468668-a05a11f871da?q=80&w=2070',
			'Central Vietnam',
		],
		[
			'Pangolin',
			'Manis javanica',
			'Critically Endangered',
			500,
			'Tropical forests',
			"Pangolins are the world's only truly scaly mammals. They are heavily trafficked for their scales and meat, making them one of the most endangered species.",
			'https://images.unsplash.com/photo-1564509027875-ba1c9b69526d?q=80&w=2070',
			'Southern Vietnam',
		],
		[
			'Hawksbill Turtle',
			'Eretmochelys imbricata',
			'Critically Endangered',
			200,
			'Coral reefs and coastal waters',
			'Hawksbill turtles are known for their beautiful shell patterns. They play a vital role in maintaining healthy coral reef ecosystems.',
			'https://images.unsplash.com/photo-1574068468668-a05a11f871da?q=80&w=2070',
			'Coastal Vietnam',
		],
	];

	for (const s of species) {
		insert.run(...s);
	}

	console.log(`Inserted ${species.length} species records`);

	// Verify data
	const count = db.query('SELECT COUNT(*) as count FROM species').get() as { count: number };
	console.log(`Total species in database: ${count.count}`);

	db.close();
	console.log('Database seeding completed successfully!');
} catch (error) {
	console.error('Error seeding database:', error);
}
