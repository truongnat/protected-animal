import { describe, it, expect } from 'vitest';
import path from 'node:path';
import { getComponentFiles } from './utils/ast-helpers';

/**
 * Property 4: Directory Organization
 * Validates: Requirements 2.5
 * 
 * For any component file, it must be located in the appropriate directory 
 * based on its feature category (auth, charts, features, ui, etc.).
 */
describe('Property 4: Directory Organization', () => {
	it('components should be in appropriate directories', async () => {
		const files = await getComponentFiles('components/**/*.{tsx,ts}');
		
		const validDirectories = [
			'auth',
			'charts',
			'features',
			'providers',
			'species',
			'ui',
		];
		
		const violations: string[] = [];
		
		for (const file of files) {
			const relativePath = path.relative('components', file);
			const parts = relativePath.split(path.sep);
			
			// Skip root-level components (Navbar, Footer, etc.)
			if (parts.length === 1) continue;
			
			// Check if first directory is valid
			const directory = parts[0];
			if (!validDirectories.includes(directory)) {
				violations.push(`${file}: Invalid directory '${directory}'`);
			}
		}
		
		if (violations.length > 0) {
			const message = violations.join('\n');
			expect.fail(`Components in invalid directories:\n${message}`);
		}
		
		expect(violations).toEqual([]);
	});
});
