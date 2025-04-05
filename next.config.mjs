/** @type {import('next').NextConfig} */
const nextConfig = {
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

export default nextConfig;
