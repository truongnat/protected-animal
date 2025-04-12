import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Configure pageExtensions to include md and mdx
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
	// Configure images
	images: {
		domains: [
			'files.worldwildlife.org',
			'images.unsplash.com',
			'via.placeholder.com',
			'placehold.co',
		],
	},
	env: {
		NEXT_PUBLIC_ADMIN_USERNAME: process.env.ADMIN_USERNAME,
		NEXT_PUBLIC_ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
	},
};

// Merge MDX config with Next.js config
const withMDX = createMDX({
	// Add markdown plugins here, as desired
	options: {
		remarkPlugins: [],
		rehypePlugins: [],
	},
});

export default withMDX(nextConfig);
