import { sqlite } from '../lib/db';

async function initDb() {
  console.log('Initializing database...');

  // Create species table
  sqlite.exec(`
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
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create indexes for species
  sqlite.exec(`CREATE INDEX IF NOT EXISTS idx_species_region ON species(region)`);
  sqlite.exec(`CREATE INDEX IF NOT EXISTS idx_species_status ON species(conservation_status)`);
  sqlite.exec(`CREATE INDEX IF NOT EXISTS idx_species_name ON species(name)`);
  sqlite.exec(`CREATE INDEX IF NOT EXISTS idx_species_scientific_name ON species(scientific_name)`);

  // Create blog_posts table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      content TEXT,
      excerpt TEXT,
      cover_image TEXT,
      published_at TEXT,
      author TEXT,
      description TEXT,
      image TEXT,
      date TEXT,
      reading_time INTEGER,
      tags TEXT
    )
  `);

  // Create indexes for blog_posts
  sqlite.exec(`CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug)`);
  sqlite.exec(`CREATE INDEX IF NOT EXISTS idx_blog_posts_date ON blog_posts(date)`);

  // Create admin_users table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create indexes for admin_users
  sqlite.exec(`CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email)`);

  // Create settings table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT NOT NULL UNIQUE,
      value TEXT
    )
  `);

  // Create indexes for settings
  sqlite.exec(`CREATE INDEX IF NOT EXISTS idx_settings_key ON settings(key)`);

  // Create team_members table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS team_members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      role TEXT,
      bio TEXT,
      image_url TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create indexes for team_members
  sqlite.exec(`CREATE INDEX IF NOT EXISTS idx_team_members_name ON team_members(name)`);

  console.log('Database initialized successfully.');
}

initDb().catch(console.error);












