import { describe, it, expect } from 'vitest';
import { SyntaxKind } from 'ts-morph';
import { getComponentFiles, initProject } from './utils/ast-helpers';

/**
 * Property 15: Form Input Labels
 * Validates: Requirements 5.3
 * 
 * For any form input element, it must have an associated label element 
 * with matching htmlFor/id or aria-label attribute.
 */
describe('Property 15: Form Input Labels', () => {
	it('form inputs should have associated labels', async () => {
		const project = initProject();
		const files = await getComponentFiles('components/**/*.tsx');
		
		const violations: Array<{ file: string; line: number }> = [];
		
		for (const file of files) {
			const sourceFile = project.addSourceFileAtPath(file);
			
			// Get all JSX elements
			const jsxElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement);
			const jsxOpeningElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement);
			
			for (const element of [...jsxElements, ...jsxOpeningElements]) {
				const tagName = element.getTagNameNode().getText();
				
				// Check for input, textarea, select elements
				if (['input', 'Input', 'textarea', 'Textarea', 'select', 'Select'].includes(tagName)) {
					const text = element.getText();
					
					// Check for accessibility attributes
					const hasAriaLabel = /aria-label\s*=/.test(text);
					const hasId = /\bid\s*=/.test(text);
					
					// Input should have either aria-label or id (for label association)
					if (!hasAriaLabel && !hasId) {
						violations.push({
							file,
							line: element.getStartLineNumber()
						});
					}
				}
			}
		}
		
		if (violations.length > 0) {
			const message = violations.map(v => 
				`${v.file}:${v.line}: Form input without label association`
			).join('\n');
			
			expect.fail(`Form inputs without labels:\n${message}`);
		}
		
		expect(violations).toEqual([]);
	});
});
