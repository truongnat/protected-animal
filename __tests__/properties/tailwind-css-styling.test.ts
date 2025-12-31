import { describe, it, expect } from 'vitest';
import { SyntaxKind } from 'ts-morph';
import { getComponentFiles, initProject } from './utils/ast-helpers';

/**
 * Property 23: Tailwind CSS Styling
 * Validates: Requirements 8.1, 8.5
 * 
 * For any component styling, it must use Tailwind CSS utility classes 
 * in className prop rather than inline styles (except for truly dynamic values).
 */
describe('Property 23: Tailwind CSS Styling', () => {
	it('components should use Tailwind classes instead of inline styles', async () => {
		const project = initProject();
		const files = await getComponentFiles('components/**/*.tsx');
		
		const violations: Array<{ file: string; line: number }> = [];
		
		for (const file of files) {
			const sourceFile = project.addSourceFileAtPath(file);
			
			// Find all JSX attributes
			const jsxAttributes = sourceFile.getDescendantsOfKind(SyntaxKind.JsxAttribute);
			
			for (const attr of jsxAttributes) {
				const nameNode = attr.getNameNode();
				const attrName = nameNode.getText();
				
				// Check for style attribute
				if (attrName === 'style') {
					const initializer = attr.getInitializer();
					
					if (initializer) {
						const text = initializer.getText();
						
						// Allow dynamic styles (with variables or expressions)
						// Flag static style objects
						const isStaticStyle = /^\{\s*\{[^}]*\}\s*\}$/.test(text) && 
							!text.includes('${') && 
							!text.includes('props.') &&
							!text.includes('state.');
						
						if (isStaticStyle) {
							violations.push({
								file,
								line: attr.getStartLineNumber()
							});
						}
					}
				}
			}
		}
		
		if (violations.length > 0) {
			const message = violations.map(v => 
				`${v.file}:${v.line}: Using inline styles instead of Tailwind classes`
			).join('\n');
			
			expect.fail(`Components with inline styles:\n${message}`);
		}
		
		expect(violations).toEqual([]);
	});
});
