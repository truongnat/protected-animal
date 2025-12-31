import { describe, it, expect } from 'vitest';
import { getComponentFiles, getTypeScriptDiagnostics, initProject } from './utils/ast-helpers';

/**
 * Property 9: No Implicit Any
 * Validates: Requirements 3.5
 * 
 * For any component file, TypeScript compilation with strict mode 
 * must produce no implicit any errors.
 */
describe('Property 9: No Implicit Any', () => {
	it('component files should have no implicit any types', async () => {
		const project = initProject();
		const files = await getComponentFiles('components/**/*.{tsx,ts}');
		
		const violations: Array<{ file: string; message: string; line: number }> = [];
		
		for (const file of files) {
			const sourceFile = project.addSourceFileAtPath(file);
			const diagnostics = getTypeScriptDiagnostics(sourceFile);
			
			// Filter for implicit any errors
			const implicitAnyErrors = diagnostics.filter(d => 
				d.message.includes('implicitly has an \'any\' type') ||
				d.message.includes('Parameter') && d.message.includes('any')
			);
			
			for (const error of implicitAnyErrors) {
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
			
			expect.fail(`Files with implicit any types:\n${message}`);
		}
		
		expect(violations).toEqual([]);
	});
});
