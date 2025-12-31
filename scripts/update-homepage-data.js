/**
 * Update Homepage Data with IUCN Red List Data
 *
 * This script updates the homepage data with the latest IUCN Red List data.
 *
 * Usage: node scripts/update-homepage-data.js
 */

const fs = require('node:fs');
const path = require('node:path');

// Input file paths
const DATA_DIR = path.join(process.cwd(), 'data');
const SUMMARY_STATS_FILE = path.join(DATA_DIR, 'iucn-summary-stats.json');
const FEATURED_SPECIES_FILE = path.join(DATA_DIR, 'featured-species.json');

// Output file paths
const PUBLIC_DATA_DIR = path.join(process.cwd(), 'public', 'data');
const HOMEPAGE_DATA_FILE = path.join(PUBLIC_DATA_DIR, 'homepage-data.json');

// Ensure public data directory exists
if (!fs.existsSync(PUBLIC_DATA_DIR)) {
	fs.mkdirSync(PUBLIC_DATA_DIR, { recursive: true });
}

/**
 * Load JSON data from a file
 * @param {string} filePath - Path to the JSON file
 * @returns {Object|null} - The parsed JSON data or null if the file doesn't exist
 */
function loadJsonData(filePath) {
	try {
		if (fs.existsSync(filePath)) {
			const data = fs.readFileSync(filePath, 'utf8');
			return JSON.parse(data);
		}
		return null;
	} catch (error) {
		console.error(`Error loading data from ${filePath}:`, error.message);
		return null;
	}
}

/**
 * Save data to a JSON file
 * @param {string} filePath - Path to save the file
 * @param {Object} data - Data to save
 */
function saveToJson(filePath, data) {
	try {
		fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
		console.log(`Homepage data saved to ${filePath}`);
	} catch (error) {
		console.error(`Error saving homepage data to ${filePath}:`, error.message);
	}
}

/**
 * Generate homepage data from IUCN Red List data
 * @param {Object} summaryStats - Summary statistics data
 * @param {Array} featuredSpecies - Featured species data
 * @returns {Object} - Homepage data
 */
function generateHomepageData(summaryStats, featuredSpecies) {
	if (!summaryStats) {
		console.error('Cannot generate homepage data: missing summary statistics');
		return null;
	}

	if (!featuredSpecies || featuredSpecies.length === 0) {
		console.error('Cannot generate homepage data: missing featured species');
		return null;
	}

	// Calculate total threatened species
	const totalThreatened =
		(summaryStats.threatCategories['Critically Endangered'] || 0) +
		(summaryStats.threatCategories.Endangered || 0) +
		(summaryStats.threatCategories.Vulnerable || 0);

	// Calculate percentage of threatened species
	const percentageThreatened = Math.round(
		(totalThreatened / summaryStats.totalSpeciesAssessed) * 100,
	);

	// Select featured species for the homepage
	const homepageFeaturedSpecies = featuredSpecies.slice(0, 4).map((species) => ({
		id: species.scientificName.replace(/\s+/g, '-').toLowerCase(),
		scientificName: species.scientificName,
		commonName: species.commonName,
		status: species.statusCategory,
		imageUrl: species.localImagePath || species.imageUrl || `/images/default-image.jpg`,
		description: `${species.commonName} (${species.scientificName}) is ${species.statusCategory.toLowerCase()} according to the IUCN Red List. ${species.populationTrend !== 'Unknown' ? `Its population trend is ${species.populationTrend.toLowerCase()}.` : ''}`,
		detailUrl: species.detailUrl,
	}));

	// Create homepage data object
	const homepageData = {
		stats: {
			totalSpeciesAssessed: summaryStats.totalSpeciesAssessed,
			totalThreatened: totalThreatened,
			percentageThreatened: percentageThreatened,
			criticallyEndangered: summaryStats.threatCategories['Critically Endangered'] || 0,
			endangered: summaryStats.threatCategories.Endangered || 0,
			vulnerable: summaryStats.threatCategories.Vulnerable || 0,
		},
		featuredSpecies: homepageFeaturedSpecies,
		lastUpdated: new Date().toISOString(),
	};

	return homepageData;
}

/**
 * Main function to update homepage data
 */
async function main() {
	console.log('Starting homepage data update...');

	// Load the crawled data
	const summaryStats = loadJsonData(SUMMARY_STATS_FILE);
	const featuredSpecies = loadJsonData(FEATURED_SPECIES_FILE);

	if (!summaryStats) {
		console.error('Summary statistics data not found. Run the crawler first.');
		return;
	}

	if (!featuredSpecies) {
		console.error('Featured species data not found. Run the crawler first.');
		return;
	}

	// Generate and save homepage data
	console.log('Generating homepage data...');
	const homepageData = generateHomepageData(summaryStats, featuredSpecies);
	if (homepageData) {
		saveToJson(HOMEPAGE_DATA_FILE, homepageData);
	}

	console.log('Homepage data update completed!');
}

// Run the main function
main().catch((error) => {
	console.error('Error updating homepage data:', error);
});
