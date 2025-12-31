#!/usr/bin/env bun

/**
 * Seed Script - Create initial users
 * Creates admin, expert, and test users
 */

import { hash } from 'bcryptjs';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from '../lib/schema';

const DATABASE_PATH = process.env.DATABASE_PATH || './data/protected-animals.db';

console.log('🌱 Seeding users...');

async function seedUsers() {
	try {
		const sqlite = new Database(DATABASE_PATH);
		const _db = drizzle(sqlite, { schema });

		// Hash passwords
		const adminPassword = await hash('admin123', 12);
		const expertPassword = await hash('expert123', 12);
		const userPassword = await hash('user123', 12);

		// Check if users already exist
		const existingUsers = sqlite.prepare('SELECT COUNT(*) as count FROM users').get() as {
			count: number;
		};

		if (existingUsers.count > 0) {
			console.log('⚠️  Users already exist. Skipping seed.');
			sqlite.close();
			return;
		}

		// Insert admin user
		sqlite
			.prepare(`
      INSERT INTO users (email, password_hash, full_name, role, email_verified, is_active)
      VALUES (?, ?, ?, ?, ?, ?)
    `)
			.run('admin@protected-animals.vn', adminPassword, 'System Administrator', 'admin', 1, 1);
		console.log('  ✓ Admin user created: admin@protected-animals.vn / admin123');

		// Insert expert user
		sqlite
			.prepare(`
      INSERT INTO users (email, password_hash, full_name, role, email_verified, is_active)
      VALUES (?, ?, ?, ?, ?, ?)
    `)
			.run('expert@protected-animals.vn', expertPassword, 'Wildlife Expert', 'expert', 1, 1);
		console.log('  ✓ Expert user created: expert@protected-animals.vn / expert123');

		// Insert regular user
		sqlite
			.prepare(`
      INSERT INTO users (email, password_hash, full_name, role, email_verified, is_active)
      VALUES (?, ?, ?, ?, ?, ?)
    `)
			.run('user@protected-animals.vn', userPassword, 'Test User', 'user', 1, 1);
		console.log('  ✓ Regular user created: user@protected-animals.vn / user123');

		// Create a sample conservation project
		sqlite
			.prepare(`
      INSERT INTO projects (name, description, goal_amount, current_amount, status, created_by)
      VALUES (?, ?, ?, ?, ?, ?)
    `)
			.run(
				'Save the Saola',
				"Critical conservation efforts to protect the endangered Saola (Asian Unicorn) in Vietnam's Annamite Mountains.",
				100000000, // 100 million VND
				25000000, // 25 million VND raised
				'active',
				1, // Created by admin
			);
		console.log('  ✓ Sample project created: Save the Saola');

		console.log('');
		console.log('✅ Seeding completed successfully!');
		console.log('');
		console.log('🔐 Test Credentials:');
		console.log('  Admin:  admin@protected-animals.vn / admin123');
		console.log('  Expert: expert@protected-animals.vn / expert123');
		console.log('  User:   user@protected-animals.vn / user123');
		console.log('');

		sqlite.close();
	} catch (error) {
		console.error('❌ Seeding failed:', error);
		process.exit(1);
	}
}

seedUsers();
