/**
 * Create placeholder images for species
 *
 * This script creates placeholder images for species when we can't download
 * images from the IUCN Red List website.
 *
 * Usage: node scripts/create-placeholder-images.js
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Output directory
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
const PLACEHOLDER_DIR = path.join(IMAGES_DIR, 'placeholder');

// Ensure directories exist
if (!fs.existsSync(IMAGES_DIR)) {
	fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

if (!fs.existsSync(PLACEHOLDER_DIR)) {
	fs.mkdirSync(PLACEHOLDER_DIR, { recursive: true });
}

/**
 * Download an image from a URL and save it to a file
 * @param {string} url - URL of the image to download
 * @param {string} filePath - Path to save the image to
 * @returns {Promise<void>}
 */
async function downloadImage(url, filePath) {
	try {
		console.log(`Downloading image from ${url}...`);
		const response = await axios({
			url,
			method: 'GET',
			responseType: 'stream',
			timeout: 30000,
		});

		const writer = fs.createWriteStream(filePath);
		response.data.pipe(writer);

		return new Promise((resolve, reject) => {
			writer.on('finish', () => {
				console.log(`Image saved to ${filePath}`);
				resolve();
			});
			writer.on('error', (err) => {
				console.error(`Error saving image to ${filePath}:`, err.message);
				reject(err);
			});
		});
	} catch (error) {
		console.error(`Error downloading image from ${url}:`, error.message);
		throw error;
	}
}

/**
 * Create placeholder images
 * @returns {Promise<void>}
 */
async function createPlaceholderImages() {
	// Create 5 placeholder images with different colors
	const colors = [
		'E57373', // Red
		'64B5F6', // Blue
		'81C784', // Green
		'FFD54F', // Yellow
		'BA68C8', // Purple
	];

	const placeholderText = 'Endangered Species';

	for (let i = 0; i < colors.length; i++) {
		const color = colors[i];
		const filePath = path.join(PLACEHOLDER_DIR, `placeholder-${i + 1}.jpg`);

		// Skip if the file already exists
		if (fs.existsSync(filePath)) {
			console.log(`Placeholder image ${i + 1} already exists, skipping...`);
			continue;
		}

		// Use placehold.co to generate a placeholder image
		const url = `https://placehold.co/800x600/${color}/FFFFFF?text=${encodeURIComponent(placeholderText)}`;

		try {
			await downloadImage(url, filePath);
			console.log(`Created placeholder image ${i + 1}`);
		} catch (error) {
			console.error(`Error creating placeholder image ${i + 1}:`, error.message);
		}
	}

	// Also create a default placeholder
	const defaultFilePath = path.join(IMAGES_DIR, 'default-image.jpg');
	if (!fs.existsSync(defaultFilePath)) {
		const url = `https://placehold.co/800x600/CCCCCC/666666?text=${encodeURIComponent('No Image Available')}`;
		try {
			await downloadImage(url, defaultFilePath);
			console.log('Created default placeholder image');
		} catch (error) {
			console.error('Error creating default placeholder image:', error.message);
		}
	}

	// Create a fallback image
	const fallbackFilePath = path.join(IMAGES_DIR, 'fallback-image.jpg');
	if (!fs.existsSync(fallbackFilePath)) {
		const url = `https://placehold.co/800x600/EEEEEE/999999?text=${encodeURIComponent('Image Not Found')}`;
		try {
			await downloadImage(url, fallbackFilePath);
			console.log('Created fallback image');
		} catch (error) {
			console.error('Error creating fallback image:', error.message);
		}
	}
}

// Run the script
createPlaceholderImages()
	.then(() => {
		console.log('Placeholder images created successfully');
	})
	.catch((error) => {
		console.error('Error creating placeholder images:', error);
		process.exit(1);
	});
