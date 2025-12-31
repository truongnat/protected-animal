import { describe, it, expect } from 'vitest';
import { SyntaxKind } from 'ts-morph';
import { getComponentFiles, initProject } from './utils/ast-helpers';

/**
 * Property 3: JSX Reusability
 * Validates: Requirements 2.2
 * 
 * For any JSX pattern that appears more than twice in a component, 
 * it must be extracted into a reusable sub-component.
 */
describe('Property 3: JSX Reusability', () => {
	it('JSX patterns appearing more than twice should be extracted', async () => {
		const project = initProject();
		const files = await getComponentFiles('components/**/*.tsx');
		
		const violations: Array<{ file: string; pattern: string; count: number }> = [];
		
		for (const file of files) {
			const sourceFile = project.addSourceFileAtPath(file);
			
			// Get all JSX elements
			const jsxElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement);
			const jsxSelfClosing = sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement);
			
			// Track JSX patterns by their structure
			const patternCounts = new Map<string, number>();
			
			for (const element of [...jsxElements, ...jsxSelfClosing]) {
				// Get a simplified pattern (tag name + key attributes)
				const text = element.getText();
				
				// Skip very short patterns (likely primitives)
				if (text.length < 30) continue;
				
				// Create a normalized pattern (remove specific values but keep structure)
				const pattern = text
					.replace(/\{[^}]+\}/g, '{...}') // Replace expressions
					.replace(/\d+/g, 'N') // Replace numbers
					.replace(/"[^"]*"/g, '""') // Replace string literals
					.replace(/'[^']*'/g, "''") // Replace string literals
					.substring(0, 100); // Limit pattern length
				
				patternCounts.set(pattern, (patternCounts.get(pattern) || 0) + 1);
			}
			
			// Check for patterns appearing more than twice
			for (const [pattern, count] of patternCounts.entries()) {
				if (count > 2) {
					violations.push({ 
						file, 
						pattern: pattern.substring(0, 50) + '...', 
						count 
					});
				}
			}
		}
		
		if (violations.length > 0) {
			const message = violations.map(v => 
				`${v.file}: Pattern appears ${v.count} times: ${v.pattern}`
			).join('\n');
			
			expect.fail(`JSX patterns appearing more than twice:\n${message}`);
		}
		
		expect(violations).toEqual([]);
	});
});
