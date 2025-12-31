import { describe, it, expect } from 'vitest';
import { SyntaxKind } from 'ts-morph';
import { getComponentFiles, initProject } from './utils/ast-helpers';

/**
 * Property 25: Dark Mode Support
 * Validates: Requirements 8.3
 * 
 * For any component that uses color classes, it must include dark mode 
 * variants (dark:) for theme support.
 */
describe('Property 25: Dark Mode Support', () => {
	it('components with color classes should have dark mode variants', async () => {
		const project = initProject();
		const files = await getComponentFiles('components/**/*.tsx');
		
		const violations: Array<{ file: string; line: number; className: string }> = [];
		
		// Color-related Tailwind classes that should have dark mode variants
		const colorClasses = [
			'bg-',
			'text-',
			'border-',
			'ring-',
			'divide-',
			'placeholder-',
			'from-',
			'via-',
			'to-'
		];
		
		for (const file of files) {
			const sourceFile = project.addSourceFileAtPath(file);
			
			// Find all className attributes
			const jsxAttributes = sourceFile.getDescendantsOfKind(SyntaxKind.JsxAttribute);
			
			for (const attr of jsxAttributes) {
				const nameNode = attr.getNameNode();
				const attrName = nameNode.getText();
				
				if (attrName === 'className') {
					const initializer = attr.getInitializer();
					
					if (initializer) {
						const text = initializer.getText();
						
						// Check if has color classes
						const hasColorClass = colorClasses.some(colorClass => 
							text.includes(colorClass)
						);
						
						// Check if has dark mode variant
						const hasDarkMode = text.includes('dark:');
						
						// If has color classes but no dark mode, it's a potential violation
						// (Allow exceptions for components that explicitly don't need dark mode)
						if (hasColorClass && !hasDarkMode) {
							// Skip if it's using CSS variables or theme colors (which handle dark mode automatically)
							if (!text.includes('var(--') && !text.includes('hsl(var(--')) {
								violations.push({
									file,
									line: attr.getStartLineNumber(),
									className: text.substring(0, 50)
								});
							}
						}
					}
				}
			}
		}
		
		if (violations.length > 0) {
			const message = violations.map(v => 
				`${v.file}:${v.line}: Color classes without dark mode variant`
			).join('\n');
			
			expect.fail(`Components missing dark mode support:\n${message}`);
		}
		
		expect(violations).toEqual([]);
	});
});
