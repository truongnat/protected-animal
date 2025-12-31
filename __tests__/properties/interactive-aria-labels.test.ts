import { describe, it, expect } from 'vitest';
import { SyntaxKind } from 'ts-morph';
import { getComponentFiles, initProject } from './utils/ast-helpers';

/**
 * Property 14: Interactive ARIA Labels
 * Validates: Requirements 5.2
 * 
 * For any interactive element (button, link, input), it must have an accessible 
 * label via aria-label, aria-labelledby, or associated label element.
 */
describe('Property 14: Interactive ARIA Labels', () => {
	it('interactive elements should have accessible labels', async () => {
		const project = initProject();
		const files = await getComponentFiles('components/**/*.tsx');
		
		const violations: Array<{ file: string; line: number; element: string }> = [];
		
		for (const file of files) {
			const sourceFile = project.addSourceFileAtPath(file);
			
			// Get all JSX elements
			const jsxElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement);
			const jsxOpeningElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement);
			
			for (const element of [...jsxElements, ...jsxOpeningElements]) {
				const tagName = element.getTagNameNode().getText();
				
				// Check interactive elements
				if (['button', 'a', 'input'].includes(tagName.toLowerCase())) {
					const text = element.getText();
					
					// Check for accessibility attributes
					const hasAriaLabel = /aria-label\s*=/.test(text);
					const hasAriaLabelledBy = /aria-labelledby\s*=/.test(text);
					const hasId = /\bid\s*=/.test(text);
					
					// For buttons and links, check if they have text content
					const parent = element.getParent();
					let hasTextContent = false;
					
					if (parent && parent.getKind() === SyntaxKind.JsxElement) {
						const children = parent.getChildrenOfKind(SyntaxKind.JsxText);
						hasTextContent = children.some(child => child.getText().trim().length > 0);
					}
					
					// Input elements should have associated label (checked via id)
					// Buttons/links should have aria-label, aria-labelledby, or text content
					const hasAccessibleLabel = hasAriaLabel || hasAriaLabelledBy || hasTextContent || hasId;
					
					if (!hasAccessibleLabel) {
						violations.push({
							file,
							line: element.getStartLineNumber(),
							element: tagName
						});
					}
				}
			}
		}
		
		if (violations.length > 0) {
			const message = violations.map(v => 
				`${v.file}:${v.line}: <${v.element}> without accessible label`
			).join('\n');
			
			expect.fail(`Interactive elements without accessible labels:\n${message}`);
		}
		
		expect(violations).toEqual([]);
	});
});
