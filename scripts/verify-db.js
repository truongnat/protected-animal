/**
 * Database Verification Script
 * Checks if database is properly set up
 */

const Database = require('better-sqlite3');

const DATABASE_PATH = process.env.DATABASE_PATH || './data/protected-animals.db';

console.log('🔍 Verifying database...\n');
console.log(`📁 Database path: ${DATABASE_PATH}\n`);

try {
	const db = new Database(DATABASE_PATH);

	// Check tables
	const tables = db
		.prepare(`
    SELECT name FROM sqlite_master 
    WHERE type='table' 
    ORDER BY name
  `)
		.all();

	console.log('📊 Tables:');
	tables.forEach((table) => {
		const count = db.prepare(`SELECT COUNT(*) as count FROM ${table.name}`).get();
		console.log(`  ✓ ${table.name}: ${count.count} records`);
	});

	console.log('\n👥 Users:');
	const users = db.prepare('SELECT id, email, role FROM users').all();
	users.forEach((user) => {
		console.log(`  - ${user.email} (${user.role})`);
	});

	console.log('\n🐅 Species:');
	const species = db.prepare('SELECT id, name, conservation_status FROM species LIMIT 5').all();
	species.forEach((s) => {
		console.log(`  - ${s.name} (${s.conservation_status})`);
	});

	console.log('\n✅ Database verification complete!');
	console.log('\n🔐 Test Credentials:');
	console.log('  Admin:  admin@protected-animals.vn / admin123');
	console.log('  Expert: expert@protected-animals.vn / expert123');
	console.log('  User:   user@protected-animals.vn / user123');

	db.close();
} catch (error) {
	console.error('❌ Database verification failed:', error.message);
	process.exit(1);
}
