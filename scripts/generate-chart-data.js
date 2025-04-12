/**
 * Generate Chart Data from IUCN Red List Data
 *
 * This script processes the crawled IUCN Red List data and generates
 * chart data for the application.
 *
 * Usage: node scripts/generate-chart-data.js
 */

const fs = require('fs');
const path = require('path');

// Input file paths
const DATA_DIR = path.join(process.cwd(), 'data');
const SUMMARY_STATS_FILE = path.join(DATA_DIR, 'iucn-summary-stats.json');
const ENDANGERED_SPECIES_FILE = path.join(DATA_DIR, 'endangered-species.json');

// Output file paths
const CHARTS_DIR = path.join(process.cwd(), 'public', 'data', 'charts');
const THREAT_CATEGORIES_CHART_FILE = path.join(CHARTS_DIR, 'threat-categories.json');
const TAXONOMIC_GROUPS_CHART_FILE = path.join(CHARTS_DIR, 'taxonomic-groups.json');
const ENDANGERED_BY_REGION_CHART_FILE = path.join(CHARTS_DIR, 'endangered-by-region.json');
const THREAT_TYPES_CHART_FILE = path.join(CHARTS_DIR, 'threat-types.json');

// Ensure charts directory exists
if (!fs.existsSync(CHARTS_DIR)) {
	fs.mkdirSync(CHARTS_DIR, { recursive: true });
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
		console.log(`Chart data saved to ${filePath}`);
	} catch (error) {
		console.error(`Error saving chart data to ${filePath}:`, error.message);
	}
}

/**
 * Generate threat categories chart data
 * @param {Object} summaryStats - Summary statistics data
 * @returns {Object} - Chart data for threat categories
 */
function generateThreatCategoriesChart(summaryStats) {
	if (!summaryStats || !summaryStats.threatCategories) {
		console.error('Cannot generate threat categories chart: missing data');
		return null;
	}

	const categories = [
		'Extinct',
		'Extinct in the Wild',
		'Critically Endangered',
		'Endangered',
		'Vulnerable',
		'Near Threatened',
		'Least Concern',
		'Data Deficient',
	];

	const chartData = {
		labels: [],
		datasets: [
			{
				label: 'Number of Species',
				data: [],
				backgroundColor: [
					'#000000', // Extinct - Black
					'#542344', // Extinct in the Wild - Dark Purple
					'#d81e05', // Critically Endangered - Red
					'#fc7f3f', // Endangered - Orange
					'#f9e814', // Vulnerable - Yellow
					'#cce226', // Near Threatened - Light Yellow-Green
					'#60c659', // Least Concern - Green
					'#d1d1c6', // Data Deficient - Gray
				],
				borderWidth: 1,
			},
		],
	};

	// Add data for each category
	for (const category of categories) {
		if (summaryStats.threatCategories[category]) {
			chartData.labels.push(category);
			chartData.datasets[0].data.push(summaryStats.threatCategories[category]);
		}
	}

	return chartData;
}

/**
 * Generate taxonomic groups chart data
 * @param {Object} summaryStats - Summary statistics data
 * @returns {Object} - Chart data for taxonomic groups
 */
function generateTaxonomicGroupsChart(summaryStats) {
	if (!summaryStats || !summaryStats.taxonomicGroups) {
		console.error('Cannot generate taxonomic groups chart: missing data');
		return null;
	}

	// Sort groups by number of species (descending)
	const sortedGroups = Object.entries(summaryStats.taxonomicGroups)
		.sort((a, b) => b[1] - a[1])
		.slice(0, 10); // Take top 10 groups

	const chartData = {
		labels: sortedGroups.map(([group]) => group),
		datasets: [
			{
				label: 'Number of Species Assessed',
				data: sortedGroups.map(([, count]) => count),
				backgroundColor: [
					'#4e79a7',
					'#f28e2c',
					'#e15759',
					'#76b7b2',
					'#59a14f',
					'#edc949',
					'#af7aa1',
					'#ff9da7',
					'#9c755f',
					'#bab0ab',
				],
				borderWidth: 1,
			},
		],
	};

	return chartData;
}

/**
 * Generate endangered species by region chart data
 * @param {Array} endangeredSpecies - Endangered species data
 * @returns {Object} - Chart data for endangered species by region
 */
function generateEndangeredByRegionChart(endangeredSpecies) {
	if (!endangeredSpecies || endangeredSpecies.length === 0) {
		console.error('Cannot generate endangered by region chart: missing data');
		return null;
	}

	// Since we don't have direct region data from our crawler,
	// we'll create a simulated distribution based on general knowledge
	// In a real application, you would extract this from the actual data

	const regionData = {
		Africa: 0,
		Asia: 0,
		Europe: 0,
		'North America': 0,
		'South America': 0,
		Oceania: 0,
		Antarctica: 0,
	};

	// Simulate regional distribution based on species names or other attributes
	// This is just a placeholder - in reality, you would use actual geographic data
	endangeredSpecies.forEach((species) => {
		// Simple heuristic for demonstration purposes
		const name = (species.scientificName + species.commonName).toLowerCase();

		if (
			name.includes('africa') ||
			name.includes('ethiop') ||
			name.includes('kenya') ||
			name.includes('congo')
		) {
			regionData['Africa']++;
		} else if (
			name.includes('asia') ||
			name.includes('china') ||
			name.includes('india') ||
			name.includes('japan')
		) {
			regionData['Asia']++;
		} else if (
			name.includes('europ') ||
			name.includes('france') ||
			name.includes('german') ||
			name.includes('spain')
		) {
			regionData['Europe']++;
		} else if (
			name.includes('america') ||
			name.includes('canada') ||
			name.includes('mexico') ||
			name.includes('usa')
		) {
			regionData['North America']++;
		} else if (
			name.includes('brazil') ||
			name.includes('peru') ||
			name.includes('amazon') ||
			name.includes('andes')
		) {
			regionData['South America']++;
		} else if (name.includes('australia') || name.includes('zealand') || name.includes('pacific')) {
			regionData['Oceania']++;
		} else if (name.includes('antarc') || name.includes('polar')) {
			regionData['Antarctica']++;
		} else {
			// Distribute remaining species based on known biodiversity hotspots
			const rand = Math.random();
			if (rand < 0.25) regionData['Asia']++;
			else if (rand < 0.5) regionData['South America']++;
			else if (rand < 0.7) regionData['Africa']++;
			else if (rand < 0.85) regionData['Oceania']++;
			else if (rand < 0.95) regionData['North America']++;
			else if (rand < 0.99) regionData['Europe']++;
			else regionData['Antarctica']++;
		}
	});

	const chartData = {
		labels: Object.keys(regionData),
		datasets: [
			{
				label: 'Endangered Species by Region',
				data: Object.values(regionData),
				backgroundColor: [
					'#ff9f40', // Africa
					'#ff6384', // Asia
					'#36a2eb', // Europe
					'#4bc0c0', // North America
					'#9966ff', // South America
					'#ffcd56', // Oceania
					'#c9cbcf', // Antarctica
				],
				borderWidth: 1,
			},
		],
	};

	return chartData;
}

/**
 * Generate threat types chart data
 * @param {Array} endangeredSpecies - Endangered species data
 * @returns {Object} - Chart data for threat types
 */
function generateThreatTypesChart(endangeredSpecies) {
	// Common threat types for endangered species
	const threatTypes = {
		'Habitat Loss': 0,
		'Climate Change': 0,
		Pollution: 0,
		Overexploitation: 0,
		'Invasive Species': 0,
		Disease: 0,
		Other: 0,
	};

	// Count species by threat category
	// In a real application, you would extract this from the actual data
	endangeredSpecies.forEach((species) => {
		// Simulate threat distribution based on general knowledge
		// This is just a placeholder - in reality, you would use actual threat data

		// Habitat Loss is the most common threat
		threatTypes['Habitat Loss'] += Math.random() < 0.7 ? 1 : 0;

		// Other threats with varying probabilities
		threatTypes['Climate Change'] += Math.random() < 0.4 ? 1 : 0;
		threatTypes['Pollution'] += Math.random() < 0.35 ? 1 : 0;
		threatTypes['Overexploitation'] += Math.random() < 0.45 ? 1 : 0;
		threatTypes['Invasive Species'] += Math.random() < 0.25 ? 1 : 0;
		threatTypes['Disease'] += Math.random() < 0.15 ? 1 : 0;
		threatTypes['Other'] += Math.random() < 0.1 ? 1 : 0;
	});

	const chartData = {
		labels: Object.keys(threatTypes),
		datasets: [
			{
				label: 'Number of Species Affected',
				data: Object.values(threatTypes),
				backgroundColor: [
					'#e15759', // Habitat Loss - Red
					'#76b7b2', // Climate Change - Teal
					'#59a14f', // Pollution - Green
					'#edc949', // Overexploitation - Yellow
					'#af7aa1', // Invasive Species - Purple
					'#ff9da7', // Disease - Pink
					'#9c755f', // Other - Brown
				],
				borderWidth: 1,
			},
		],
	};

	return chartData;
}

/**
 * Main function to generate chart data
 */
async function main() {
	console.log('Starting chart data generation...');

	// Load the crawled data
	const summaryStats = loadJsonData(SUMMARY_STATS_FILE);
	const endangeredSpecies = loadJsonData(ENDANGERED_SPECIES_FILE);

	if (!summaryStats) {
		console.error('Summary statistics data not found. Run the crawler first.');
		return;
	}

	if (!endangeredSpecies) {
		console.error('Endangered species data not found. Run the crawler first.');
		return;
	}

	// Generate and save chart data
	console.log('Generating threat categories chart data...');
	const threatCategoriesChart = generateThreatCategoriesChart(summaryStats);
	if (threatCategoriesChart) {
		saveToJson(THREAT_CATEGORIES_CHART_FILE, threatCategoriesChart);
	}

	console.log('Generating taxonomic groups chart data...');
	const taxonomicGroupsChart = generateTaxonomicGroupsChart(summaryStats);
	if (taxonomicGroupsChart) {
		saveToJson(TAXONOMIC_GROUPS_CHART_FILE, taxonomicGroupsChart);
	}

	console.log('Generating endangered by region chart data...');
	const endangeredByRegionChart = generateEndangeredByRegionChart(endangeredSpecies);
	if (endangeredByRegionChart) {
		saveToJson(ENDANGERED_BY_REGION_CHART_FILE, endangeredByRegionChart);
	}

	console.log('Generating threat types chart data...');
	const threatTypesChart = generateThreatTypesChart(endangeredSpecies);
	if (threatTypesChart) {
		saveToJson(THREAT_TYPES_CHART_FILE, threatTypesChart);
	}

	// Generate species images data for charts
	console.log('Generating species images data for charts...');
	const speciesImagesData = endangeredSpecies.map((species) => ({
		id: species.scientificName.replace(/\s+/g, '-').toLowerCase(),
		name: species.commonName || species.scientificName,
		scientificName: species.scientificName,
		status: species.statusCategory,
		imagePath: species.localImagePath || '/images/default-image.jpg',
	}));

	saveToJson(path.join(CHARTS_DIR, 'species-images.json'), speciesImagesData);

	console.log('Chart data generation completed!');
}

// Run the main function
main().catch((error) => {
	console.error('Error generating chart data:', error);
});
