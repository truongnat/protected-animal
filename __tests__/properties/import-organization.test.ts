import { describe, it, expect } from 'vitest';
import { SyntaxKind } from 'ts-morph';
import { getComponentFiles, initProject } from './utils/ast-helpers';

/**
 * Property 47: Import Organization
 * Validates: Requirements 15.4
 * 
 * For any component file, imports must be organized in consistent order: 
 * React imports, third-party imports, local imports, type imports.
 */
describe('Property 47: Import Organization', () => {
	it('imports should be organized in consistent order', async () => {
		const project = initProject();
		const files = await getComponentFiles('components/**/*.{tsx,ts}');
		
		const violations: Array<{ file: string; issue: string }> = [];
		
		for (const file of files) {
			const sourceFile = project.addSourceFileAtPath(file);
			
			// Get all import declarations
			const imports = sourceFile.getImportDeclarations();
			
			if (imports.length === 0) continue;
			
			// Categorize imports
			const categories: Array<{ type: string; line: number }> = [];
			
			for (const imp of imports) {
				const moduleSpecifier = imp.getModuleSpecifierValue();
				let category = '';
				
				if (moduleSpecifier.startsWith('react')) {
					category = 'react';
				} else if (moduleSpecifier.startsWith('.') || moduleSpecifier.startsWith('@/')) {
					category = 'local';
				} else if (imp.isTypeOnly()) {
					category = 'type';
				} else {
					category = 'third-party';
				}
				
				categories.push({
					type: category,
					line: imp.getStartLineNumber()
				});
			}
			
			// Check order: react -> third-party -> local -> type
			const expectedOrder = ['react', 'third-party', 'local', 'type'];
			let currentIndex = 0;
			
			for (const cat of categories) {
				const catIndex = expectedOrder.indexOf(cat.type);
				
				if (catIndex < currentIndex) {
					violations.push({
						file,
						issue: `Import order violation: ${cat.type} import at line ${cat.line} should come before previous imports`
					});
					break;
				}
				
				currentIndex = Math.max(currentIndex, catIndex);
			}
		}
		
		if (violations.length > 0) {
			const message = violations.map(v => 
				`${v.file}: ${v.issue}`
			).join('\n');
			
			expect.fail(`Import organization violations:\n${message}`);
		}
		
		expect(violations).toEqual([]);
	});
});
