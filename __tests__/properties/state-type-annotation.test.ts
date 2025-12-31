import { describe, it, expect } from 'vitest';
import { SyntaxKind } from 'ts-morph';
import { getComponentFiles, initProject } from './utils/ast-helpers';

/**
 * Property 6: State Type Annotation
 * Validates: Requirements 3.2
 * 
 * For any useState hook call, it must have an explicit type parameter 
 * or type inference from initial value.
 */
describe('Property 6: State Type Annotation', () => {
	it('useState calls should have explicit types or type inference', async () => {
		const project = initProject();
		const files = await getComponentFiles('components/**/*.tsx');
		
		const violations: string[] = [];
		
		for (const file of files) {
			const sourceFile = project.addSourceFileAtPath(file);
			
			// Find all useState calls
			const callExpressions = sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression);
			
			for (const call of callExpressions) {
				const expression = call.getExpression();
				const expressionText = expression.getText();
				
				if (expressionText === 'useState') {
					// Check if it has type arguments
					const typeArgs = call.getTypeArguments();
					
					// Check if it has an initial value (for type inference)
					const args = call.getArguments();
					
					// If no type arguments and no initial value, it's a violation
					if (typeArgs.length === 0 && args.length === 0) {
						const lineNumber = call.getStartLineNumber();
						violations.push(`${file}:${lineNumber}: useState without type or initial value`);
					}
				}
			}
		}
		
		if (violations.length > 0) {
			const message = violations.join('\n');
			expect.fail(`useState calls without explicit types:\n${message}`);
		}
		
		expect(violations).toEqual([]);
	});
});
