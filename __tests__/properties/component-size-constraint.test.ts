import { describe, it, expect } from 'vitest';
import { countSignificantLines, getComponentFiles, initProject } from './utils/ast-helpers';

/**
 * Property 2: Component Size Constraint
 * Validates: Requirements 2.1
 * 
 * For any component file, if it exceeds 200 lines, it must have extracted 
 * sub-components as separate functions within the file or separate files.
 */
describe('Property 2: Component Size Constraint', () => {
	it('components exceeding 200 lines should have sub-components', async () => {
		const project = initProject();
		const files = await getComponentFiles('components/**/*.{tsx,ts}');
		
		const violations: Array<{ file: string; lines: number }> = [];
		
		for (const file of files) {
			const sourceFile = project.addSourceFileAtPath(file);
			const lineCount = countSignificantLines(sourceFile);
			
			if (lineCount > 200) {
				// Check if file has multiple function components (sub-components)
				const functions = sourceFile.getFunctions();
				const arrowFunctions = sourceFile.getVariableDeclarations()
					.filter(decl => {
						const initializer = decl.getInitializer();
						return initializer?.getKindName() === 'ArrowFunction';
					});
				
				const totalComponents = functions.length + arrowFunctions.length;
				
				// If file is large but has only 1 component, it's a violation
				if (totalComponents <= 1) {
					violations.push({ file, lines: lineCount });
				}
			}
		}
		
		if (violations.length > 0) {
			const message = violations.map(v => 
				`${v.file}: ${v.lines} lines (should extract sub-components)`
			).join('\n');
			
			expect.fail(`Components exceeding 200 lines without sub-components:\n${message}`);
		}
		
		expect(violations).toEqual([]);
	});
});
