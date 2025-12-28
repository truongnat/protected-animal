/**
 * Database Setup Script (Node.js compatible)
 * Creates all tables and indexes for the Protected Animals platform
 */

const Database = require('better-sqlite3');
const { hash } = require('bcryptjs');
const path = require('path');
const fs = require('fs');

const DATABASE_PATH = process.env.DATABASE_PATH || './data/protected-animals.db';

// Ensure data directory exists
const dataDir = path.dirname(DATABASE_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

console.log('🚀 Starting database setup...');
console.log(`📁 Database path: ${DATABASE_PATH}`);

async function setupDatabase() {
  try {
    const db = new Database(DATABASE_PATH);
    
    console.log('✅ Database connection established');
    console.log('📝 Creating tables...');

    // Enable foreign keys
    db.exec('PRAGMA foreign_keys = ON;');

    // Create users table
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        full_name TEXT,
        role TEXT NOT NULL DEFAULT 'user' CHECK(role IN ('user', 'expert', 'admin')),
        email_verified INTEGER NOT NULL DEFAULT 0,
        verification_token TEXT,
        reset_token TEXT,
        reset_token_expires TEXT,
        is_active INTEGER NOT NULL DEFAULT 1,
        last_login TEXT,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('  ✓ users table created');

    // Create indexes for users
    db.exec(`
      CREATE INDEX IF NOT EXISTS users_email_idx ON users(email);
      CREATE INDEX IF NOT EXISTS users_role_idx ON users(role);
      CREATE INDEX IF NOT EXISTS users_verification_token_idx ON users(verification_token);
      CREATE INDEX IF NOT EXISTS users_reset_token_idx ON users(reset_token);
    `);

    // Create reports table
    db.exec(`
      CREATE TABLE IF NOT EXISTS reports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER REFERENCES users(id),
        species_id INTEGER REFERENCES species(id),
        report_type TEXT NOT NULL CHECK(report_type IN ('sighting', 'illegal_activity', 'injured_animal', 'habitat_destruction', 'trafficking', 'other')),
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        location_name TEXT,
        latitude REAL,
        longitude REAL,
        incident_date TEXT,
        evidence_urls TEXT,
        is_anonymous INTEGER NOT NULL DEFAULT 0,
        status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'reviewing', 'verified', 'resolved', 'rejected')),
        priority TEXT NOT NULL DEFAULT 'medium' CHECK(priority IN ('low', 'medium', 'high', 'critical')),
        reviewed_by INTEGER REFERENCES users(id),
        reviewed_at TEXT,
        review_notes TEXT,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('  ✓ reports table created');

    // Create indexes for reports
    db.exec(`
      CREATE INDEX IF NOT EXISTS reports_user_id_idx ON reports(user_id);
      CREATE INDEX IF NOT EXISTS reports_species_id_idx ON reports(species_id);
      CREATE INDEX IF NOT EXISTS reports_status_idx ON reports(status);
      CREATE INDEX IF NOT EXISTS reports_priority_idx ON reports(priority);
      CREATE INDEX IF NOT EXISTS reports_created_at_idx ON reports(created_at);
    `);

    // Create projects table
    db.exec(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        goal_amount REAL NOT NULL,
        current_amount REAL NOT NULL DEFAULT 0,
        start_date TEXT,
        end_date TEXT,
        status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active', 'completed', 'cancelled')),
        image_url TEXT,
        created_by INTEGER REFERENCES users(id),
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('  ✓ projects table created');

    // Create indexes for projects
    db.exec(`
      CREATE INDEX IF NOT EXISTS projects_status_idx ON projects(status);
      CREATE INDEX IF NOT EXISTS projects_created_by_idx ON projects(created_by);
    `);

    // Create donations table
    db.exec(`
      CREATE TABLE IF NOT EXISTS donations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER REFERENCES users(id),
        project_id INTEGER REFERENCES projects(id),
        amount REAL NOT NULL,
        currency TEXT NOT NULL DEFAULT 'VND',
        payment_method TEXT CHECK(payment_method IN ('card', 'bank_transfer', 'momo', 'zalopay', 'vnpay')),
        payment_status TEXT NOT NULL DEFAULT 'pending' CHECK(payment_status IN ('pending', 'completed', 'failed', 'refunded')),
        transaction_id TEXT UNIQUE,
        receipt_url TEXT,
        donor_name TEXT,
        donor_email TEXT,
        is_anonymous INTEGER NOT NULL DEFAULT 0,
        message TEXT,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('  ✓ donations table created');

    // Create indexes for donations
    db.exec(`
      CREATE INDEX IF NOT EXISTS donations_user_id_idx ON donations(user_id);
      CREATE INDEX IF NOT EXISTS donations_project_id_idx ON donations(project_id);
      CREATE INDEX IF NOT EXISTS donations_status_idx ON donations(payment_status);
      CREATE INDEX IF NOT EXISTS donations_transaction_id_idx ON donations(transaction_id);
    `);

    // Create audit_logs table
    db.exec(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER REFERENCES users(id),
        action TEXT NOT NULL,
        entity_type TEXT,
        entity_id INTEGER,
        changes TEXT,
        ip_address TEXT,
        user_agent TEXT,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('  ✓ audit_logs table created');

    // Create indexes for audit_logs
    db.exec(`
      CREATE INDEX IF NOT EXISTS audit_logs_user_id_idx ON audit_logs(user_id);
      CREATE INDEX IF NOT EXISTS audit_logs_action_idx ON audit_logs(action);
      CREATE INDEX IF NOT EXISTS audit_logs_entity_idx ON audit_logs(entity_type, entity_id);
      CREATE INDEX IF NOT EXISTS audit_logs_created_at_idx ON audit_logs(created_at);
    `);

    // Create species table
    db.exec(`
      CREATE TABLE IF NOT EXISTS species (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        scientific_name TEXT NOT NULL,
        vietnamese_name TEXT,
        category TEXT,
        conservation_status TEXT NOT NULL,
        protection_level TEXT,
        population INTEGER,
        population_trend TEXT,
        habitat TEXT,
        distribution TEXT,
        threats TEXT,
        description TEXT,
        image_url TEXT,
        region TEXT,
        featured INTEGER NOT NULL DEFAULT 0,
        created_by INTEGER REFERENCES users(id),
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('  ✓ species table created');

    // Create indexes for species
    db.exec(`
      CREATE INDEX IF NOT EXISTS species_region_idx ON species(region);
      CREATE INDEX IF NOT EXISTS species_status_idx ON species(conservation_status);
      CREATE INDEX IF NOT EXISTS species_name_idx ON species(name);
      CREATE INDEX IF NOT EXISTS species_scientific_name_idx ON species(scientific_name);
      CREATE INDEX IF NOT EXISTS species_category_idx ON species(category);
      CREATE INDEX IF NOT EXISTS species_protection_level_idx ON species(protection_level);
      CREATE INDEX IF NOT EXISTS species_featured_idx ON species(featured);
      CREATE INDEX IF NOT EXISTS species_created_by_idx ON species(created_by);
    `);

    // Update species table if it exists
    console.log('📝 Checking species table...');
    
    const tableInfo = db.prepare("PRAGMA table_info(species)").all();
    const existingColumns = tableInfo.map(col => col.name);

    // Only add columns if they don't exist (for existing databases)
    if (existingColumns.length > 0 && !existingColumns.includes('vietnamese_name')) {
      db.exec('ALTER TABLE species ADD COLUMN vietnamese_name TEXT;');
      db.exec('ALTER TABLE species ADD COLUMN category TEXT;');
      db.exec('ALTER TABLE species ADD COLUMN protection_level TEXT;');
      db.exec('ALTER TABLE species ADD COLUMN population_trend TEXT;');
      db.exec('ALTER TABLE species ADD COLUMN distribution TEXT;');
      db.exec('ALTER TABLE species ADD COLUMN threats TEXT;');
      db.exec('ALTER TABLE species ADD COLUMN featured INTEGER NOT NULL DEFAULT 0;');
      db.exec('ALTER TABLE species ADD COLUMN created_by INTEGER REFERENCES users(id);');
      db.exec('ALTER TABLE species ADD COLUMN updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP;');
      console.log('  ✓ species table updated with new columns');
    } else {
      console.log('  ✓ species table is up to date');
    }

    // Ensure indexes exist
    db.exec(`
      CREATE INDEX IF NOT EXISTS species_category_idx ON species(category);
      CREATE INDEX IF NOT EXISTS species_protection_level_idx ON species(protection_level);
      CREATE INDEX IF NOT EXISTS species_featured_idx ON species(featured);
      CREATE INDEX IF NOT EXISTS species_created_by_idx ON species(created_by);
    `);

    console.log('✅ All tables and indexes created successfully!');
    console.log('');
    console.log('🌱 Seeding initial data...');

    // Check if users already exist
    const existingUsers = db.prepare('SELECT COUNT(*) as count FROM users').get();
    
    if (existingUsers.count === 0) {
      // Hash passwords
      const adminPassword = await hash('admin123', 12);
      const expertPassword = await hash('expert123', 12);
      const userPassword = await hash('user123', 12);

      // Insert users
      db.prepare(`
        INSERT INTO users (email, password_hash, full_name, role, email_verified, is_active)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(
        'admin@protected-animals.vn',
        adminPassword,
        'System Administrator',
        'admin',
        1,
        1
      );
      console.log('  ✓ Admin user created');

      db.prepare(`
        INSERT INTO users (email, password_hash, full_name, role, email_verified, is_active)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(
        'expert@protected-animals.vn',
        expertPassword,
        'Wildlife Expert',
        'expert',
        1,
        1
      );
      console.log('  ✓ Expert user created');

      db.prepare(`
        INSERT INTO users (email, password_hash, full_name, role, email_verified, is_active)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(
        'user@protected-animals.vn',
        userPassword,
        'Test User',
        'user',
        1,
        1
      );
      console.log('  ✓ Regular user created');

      // Create sample project
      db.prepare(`
        INSERT INTO projects (name, description, goal_amount, current_amount, status, created_by)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(
        'Save the Saola',
        'Critical conservation efforts to protect the endangered Saola (Asian Unicorn) in Vietnam\'s Annamite Mountains.',
        100000000,
        25000000,
        'active',
        1
      );
      console.log('  ✓ Sample project created');
    } else {
      console.log('  ⚠️  Users already exist. Skipping seed.');
    }

    console.log('');
    console.log('🎉 Database setup completed successfully!');
    console.log('');
    console.log('🔐 Test Credentials:');
    console.log('  Admin:  admin@protected-animals.vn / admin123');
    console.log('  Expert: expert@protected-animals.vn / expert123');
    console.log('  User:   user@protected-animals.vn / user123');
    console.log('');

    db.close();
  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
}

setupDatabase();
