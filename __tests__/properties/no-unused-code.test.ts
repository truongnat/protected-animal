import { describe, it, expect } from 'vitest';
import { getComponentFiles, getTypeScriptDiagnostics, initProject } from './utils/ast-helpers';

/**
 * Property 48: No Unused Code
 * Validates: Requirements 15.5
 * 
 * For any component file, there must be no unused variables, imports, or functions.
 */
describe('Property 48: No Unused Code', () => {
	it('component files should have no unused code', async () => {
		const project = initProject();
		const files = await getComponentFiles('components/**/*.{tsx,ts}');
		
		const violations: Array<{ file: string; message: string; line: number }> = [];
		
		for (const file of files) {
			const sourceFile = project.addSourceFileAtPath(file);
			const diagnostics = getTypeScriptDiagnostics(sourceFile);
			
			// Filter for unused code errors
			const unusedErrors = diagnostics.filter(d => 
				d.message.includes('is declared but') ||
				d.message.includes('never used') ||
				d.message.includes('never read')
			);
			
			for (const error of unusedErrors) {
				violations.push({
					file: error.file,
					message: error.message,
					line: error.line || 0
				});
			}
		}
		
		if (violations.length > 0) {
			const message = violations.map(v => 
				`${v.file}:${v.line}: ${v.message}`
			).join('\n');
			
			expect.fail(`Files with unused code:\n${message}`);
		}
		
		expect(violations).toEqual([]);
	});
});
