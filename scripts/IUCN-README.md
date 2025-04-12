# IUCN Red List Data Scripts

This directory contains scripts to crawl data from the IUCN Red List website and update the application with the latest endangered species data.

## Scripts Overview

1. **create-placeholder-images.js**: Creates placeholder images for species when we can't download images from the IUCN Red List website.
2. **crawl-iucn-data.js**: Crawls data from the IUCN Red List website, downloads species images, and saves all data to JSON files.
3. **generate-chart-data.js**: Processes the crawled data and generates chart data for the application.
4. **update-homepage-data.js**: Updates the homepage data with the latest IUCN Red List data.
5. **update-iucn-data.js**: Runs all the above scripts in sequence.

## Prerequisites

Make sure you have the following dependencies installed:

```bash
pnpm add axios cheerio
```

## Usage

### Running All Scripts

To run all scripts in sequence, use the following command:

```bash
pnpm update-iucn
```

This will:
1. Crawl data from the IUCN Red List website
2. Generate chart data
3. Update homepage data

### Running Individual Scripts

You can also run each script individually:

```bash
# Crawl data from the IUCN Red List website
node scripts/crawl-iucn-data.js

# Generate chart data
node scripts/generate-chart-data.js

# Update homepage data
node scripts/update-homepage-data.js
```

## Output Files

The scripts generate the following files:

### Data Files (in `data/` directory)

- `iucn-summary-stats.json`: Summary statistics from the IUCN Red List
- `endangered-species.json`: List of endangered species with image paths
- `featured-species.json`: Detailed information for featured species with additional images

### Chart Data Files (in `public/data/charts/` directory)

- `threat-categories.json`: Chart data for threat categories
- `taxonomic-groups.json`: Chart data for taxonomic groups
- `endangered-by-region.json`: Chart data for endangered species by region
- `threat-types.json`: Chart data for threat types
- `species-images.json`: List of species with image paths for use in charts

### Homepage Data File (in `public/data/` directory)

- `homepage-data.json`: Data for the homepage, including statistics and featured species

### Image Files (in `public/images/` directory)

- `species/`: Downloaded species images from the IUCN Red List
- `placeholder/`: Placeholder images for species without images
- `default-image.jpg`: Default image for when no species image is available
- `fallback-image.jpg`: Fallback image for when image loading fails

### Blog Post

The scripts also generate a blog post in the `content/blog/` directory with the latest IUCN Red List data.

## Notes

- The scripts use web scraping to extract data from the IUCN Red List website. Be respectful of their servers and don't run the scripts too frequently.
- Some of the data (like regional distribution and threat types) is simulated based on general knowledge, as it's not directly available from the basic scraping. In a production environment, you would want to use the official IUCN API or a more sophisticated scraping approach.
- The scripts download images from the IUCN Red List website and save them to the public directory. This ensures that the images are available even if the IUCN website is down or changes its structure.
- If the scripts can't download an image for a species, they use placeholder images instead.
- The scripts are designed to be run periodically (e.g., monthly) to keep the application data up-to-date.

## Customization

You can customize the scripts to extract different data or generate different outputs by modifying the relevant functions in each script.
