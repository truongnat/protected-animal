import { describe, it, expect } from 'vitest';
import { SyntaxKind } from 'ts-morph';
import { getComponentFiles, initProject } from './utils/ast-helpers';

/**
 * Property 18: Next.js Image Usage
 * Validates: Requirements 6.4
 * 
 * For any image rendering, it must use the Next.js Image component 
 * with width and height or fill prop specified.
 */
describe('Property 18: Next.js Image Usage', () => {
	it('images should use Next.js Image component with proper sizing', async () => {
		const project = initProject();
		const files = await getComponentFiles('components/**/*.tsx');
		
		const violations: Array<{ file: string; line: number; issue: string }> = [];
		
		for (const file of files) {
			const sourceFile = project.addSourceFileAtPath(file);
			
			// Check for native img tags
			const jsxElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement);
			const jsxOpeningElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement);
			
			for (const element of [...jsxElements, ...jsxOpeningElements]) {
				const tagName = element.getTagNameNode().getText();
				
				// Check for native img tag
				if (tagName === 'img') {
					violations.push({
						file,
						line: element.getStartLineNumber(),
						issue: 'Using native <img> instead of Next.js Image'
					});
				}
				
				// Check Image component has proper sizing
				if (tagName === 'Image') {
					const text = element.getText();
					
					const hasWidth = /\bwidth\s*=/.test(text);
					const hasHeight = /\bheight\s*=/.test(text);
					const hasFill = /\bfill\b/.test(text);
					
					// Image should have either (width AND height) OR fill
					if (!hasFill && !(hasWidth && hasHeight)) {
						violations.push({
							file,
							line: element.getStartLineNumber(),
							issue: 'Image component missing width/height or fill prop'
						});
					}
				}
			}
		}
		
		if (violations.length > 0) {
			const message = violations.map(v => 
				`${v.file}:${v.line}: ${v.issue}`
			).join('\n');
			
			expect.fail(`Image usage violations:\n${message}`);
		}
		
		expect(violations).toEqual([]);
	});
});
