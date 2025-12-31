const Database = require('better-sqlite3');
const path = require('node:path');

// Create database connection
const dbPath = path.join(__dirname, '..', 'data', 'app.db');
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
			'Tropical forests',
			'The Asian unicorn',
			'https://images.unsplash.com/photo-1564509027875-ba1c9b69526d',
			'Central Vietnam',
		],
		[
			'Indochinese Tiger',
			'Panthera tigris corbetti',
			'Endangered',
			350,
			'Forests',
			'Endangered tiger subspecies',
			'https://images.unsplash.com/photo-1574068468668-a05a11f871da',
			'Northern Vietnam',
		],
		[
			'Asian Elephant',
			'Elephas maximus',
			'Endangered',
			150,
			'Forests',
			'Smaller than African elephants',
			'https://images.unsplash.com/photo-1564509027875-ba1c9b69526d',
			'Southern Vietnam',
		],
	];

	for (const s of species) {
		insert.run(...s);
	}

	console.log('Sample data inserted');

	// Verify
	const count = db.prepare('SELECT COUNT(*) as count FROM species').get();
	console.log(`Total species: ${count.count}`);

	db.close();
	console.log('Database seeding completed!');
} catch (error) {
	console.error('Error:', error.message);
}
