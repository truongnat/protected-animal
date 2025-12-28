#!/usr/bin/env bun
/**
 * Database Migration Script
 * Creates all tables and indexes for the Protected Animals platform
 */

import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import * as schema from '../lib/schema';

const DATABASE_PATH = process.env.DATABASE_PATH || './data/protected-animals.db';

console.log('🚀 Starting database migration...');
console.log(`📁 Database path: ${DATABASE_PATH}`);

try {
  // Create database connection
  const sqlite = new Database(DATABASE_PATH);
  const db = drizzle(sqlite, { schema });

  console.log('✅ Database connection established');

  // Run migrations by creating tables directly
  console.log('📝 Creating tables...');

  // Enable foreign keys
  sqlite.exec('PRAGMA foreign_keys = ON;');

  // Create users table
  sqlite.exec(`
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
  sqlite.exec(`
    CREATE INDEX IF NOT EXISTS users_email_idx ON users(email);
    CREATE INDEX IF NOT EXISTS users_role_idx ON users(role);
    CREATE INDEX IF NOT EXISTS users_verification_token_idx ON users(verification_token);
    CREATE INDEX IF NOT EXISTS users_reset_token_idx ON users(reset_token);
  `);

  // Create reports table
  sqlite.exec(`
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
  sqlite.exec(`
    CREATE INDEX IF NOT EXISTS reports_user_id_idx ON reports(user_id);
    CREATE INDEX IF NOT EXISTS reports_species_id_idx ON reports(species_id);
    CREATE INDEX IF NOT EXISTS reports_status_idx ON reports(status);
    CREATE INDEX IF NOT EXISTS reports_priority_idx ON reports(priority);
    CREATE INDEX IF NOT EXISTS reports_created_at_idx ON reports(created_at);
  `);

  // Create projects table
  sqlite.exec(`
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
  sqlite.exec(`
    CREATE INDEX IF NOT EXISTS projects_status_idx ON projects(status);
    CREATE INDEX IF NOT EXISTS projects_created_by_idx ON projects(created_by);
  `);

  // Create donations table
  sqlite.exec(`
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
  sqlite.exec(`
    CREATE INDEX IF NOT EXISTS donations_user_id_idx ON donations(user_id);
    CREATE INDEX IF NOT EXISTS donations_project_id_idx ON donations(project_id);
    CREATE INDEX IF NOT EXISTS donations_status_idx ON donations(payment_status);
    CREATE INDEX IF NOT EXISTS donations_transaction_id_idx ON donations(transaction_id);
  `);

  // Create audit_logs table
  sqlite.exec(`
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
  sqlite.exec(`
    CREATE INDEX IF NOT EXISTS audit_logs_user_id_idx ON audit_logs(user_id);
    CREATE INDEX IF NOT EXISTS audit_logs_action_idx ON audit_logs(action);
    CREATE INDEX IF NOT EXISTS audit_logs_entity_idx ON audit_logs(entity_type, entity_id);
    CREATE INDEX IF NOT EXISTS audit_logs_created_at_idx ON audit_logs(created_at);
  `);

  // Update species table if it exists (add new columns)
  console.log('📝 Updating species table...');
  
  // Check if columns exist before adding
  const tableInfo = sqlite.prepare("PRAGMA table_info(species)").all() as any[];
  const existingColumns = tableInfo.map((col: any) => col.name);

  if (!existingColumns.includes('vietnamese_name')) {
    sqlite.exec('ALTER TABLE species ADD COLUMN vietnamese_name TEXT;');
  }
  if (!existingColumns.includes('category')) {
    sqlite.exec('ALTER TABLE species ADD COLUMN category TEXT;');
  }
  if (!existingColumns.includes('protection_level')) {
    sqlite.exec('ALTER TABLE species ADD COLUMN protection_level TEXT;');
  }
  if (!existingColumns.includes('population_trend')) {
    sqlite.exec('ALTER TABLE species ADD COLUMN population_trend TEXT;');
  }
  if (!existingColumns.includes('distribution')) {
    sqlite.exec('ALTER TABLE species ADD COLUMN distribution TEXT;');
  }
  if (!existingColumns.includes('threats')) {
    sqlite.exec('ALTER TABLE species ADD COLUMN threats TEXT;');
  }
  if (!existingColumns.includes('featured')) {
    sqlite.exec('ALTER TABLE species ADD COLUMN featured INTEGER NOT NULL DEFAULT 0;');
  }
  if (!existingColumns.includes('created_by')) {
    sqlite.exec('ALTER TABLE species ADD COLUMN created_by INTEGER REFERENCES users(id);');
  }
  if (!existingColumns.includes('updated_at')) {
    sqlite.exec('ALTER TABLE species ADD COLUMN updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP;');
  }

  console.log('  ✓ species table updated');

  // Create additional indexes for species
  sqlite.exec(`
    CREATE INDEX IF NOT EXISTS species_category_idx ON species(category);
    CREATE INDEX IF NOT EXISTS species_protection_level_idx ON species(protection_level);
    CREATE INDEX IF NOT EXISTS species_featured_idx ON species(featured);
    CREATE INDEX IF NOT EXISTS species_created_by_idx ON species(created_by);
  `);

  console.log('✅ All tables and indexes created successfully!');
  console.log('');
  console.log('📊 Database schema summary:');
  console.log('  - users: User accounts with roles');
  console.log('  - species: Protected species database');
  console.log('  - reports: Wildlife crime reports');
  console.log('  - projects: Conservation projects');
  console.log('  - donations: User donations');
  console.log('  - audit_logs: Audit trail');
  console.log('  - blog_posts: Blog articles');
  console.log('  - admin_users: Admin accounts');
  console.log('  - settings: Application settings');
  console.log('  - team_members: Team information');
  console.log('');
  console.log('🎉 Migration completed successfully!');

  sqlite.close();
} catch (error) {
  console.error('❌ Migration failed:', error);
  process.exit(1);
}
