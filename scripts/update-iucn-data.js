/**
 * Update IUCN Red List Data
 *
 * This script runs all the IUCN data update scripts in sequence:
 * 1. Create placeholder images
 * 2. Crawl data from the IUCN Red List website
 * 3. Generate chart data
 * 4. Update homepage data
 *
 * Usage: node scripts/update-iucn-data.js
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Create necessary directories
const DATA_DIR = path.join(process.cwd(), 'data');
const PUBLIC_DATA_DIR = path.join(process.cwd(), 'public', 'data');
const CHARTS_DIR = path.join(PUBLIC_DATA_DIR, 'charts');
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
const SPECIES_IMAGES_DIR = path.join(IMAGES_DIR, 'species');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
	fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(PUBLIC_DATA_DIR)) {
	fs.mkdirSync(PUBLIC_DATA_DIR, { recursive: true });
}

if (!fs.existsSync(CHARTS_DIR)) {
	fs.mkdirSync(CHARTS_DIR, { recursive: true });
}

if (!fs.existsSync(SPECIES_IMAGES_DIR)) {
	fs.mkdirSync(SPECIES_IMAGES_DIR, { recursive: true });
}

/**
 * Run a script and log the output
 * @param {string} scriptPath - Path to the script to run
 * @param {string} description - Description of the script
 */
function runScript(scriptPath, description) {
	console.log(`\n=== ${description} ===\n`);
	try {
		execSync(`node ${scriptPath}`, { stdio: 'inherit' });
		console.log(`\n✅ ${description} completed successfully.\n`);
	} catch (error) {
		console.error(`\n❌ Error running ${description}:`, error.message);
		process.exit(1);
	}
}

/**
 * Main function to run all scripts
 */
async function main() {
	console.log('\n🔄 Starting IUCN Red List data update process...\n');

	// 1. Create placeholder images
	runScript(path.join(__dirname, 'create-placeholder-images.js'), 'Creating placeholder images');

	// 2. Crawl data from the IUCN Red List website
	runScript(path.join(__dirname, 'crawl-iucn-data.js'), 'Crawling data from IUCN Red List website');

	// 3. Generate chart data
	runScript(path.join(__dirname, 'generate-chart-data.js'), 'Generating chart data');

	// 4. Update homepage data
	runScript(path.join(__dirname, 'update-homepage-data.js'), 'Updating homepage data');

	console.log('\n🎉 IUCN Red List data update process completed successfully!\n');
}

// Run the main function
main().catch((error) => {
	console.error('\n❌ Error updating IUCN data:', error);
	process.exit(1);
});
