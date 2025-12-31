import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./vitest.setup.ts'],
		include: ['**/*.{test,spec}.{ts,tsx}'],
		exclude: ['node_modules', '.next', 'out', 'build'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			exclude: [
				'node_modules/',
				'.next/',
				'out/',
				'build/',
				'**/*.config.*',
				'**/types/**',
				'**/*.d.ts',
			],
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './'),
		},
	},
});
