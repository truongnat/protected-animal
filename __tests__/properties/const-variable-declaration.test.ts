import { describe, it, expect } from 'vitest';
import { SyntaxKind, VariableDeclarationKind } from 'ts-morph';
import { getComponentFiles, initProject } from './utils/ast-helpers';

/**
 * Property 46: Const Variable Declaration
 * Validates: Requirements 15.3
 * 
 * For any variable declaration that is not reassigned, it must use const 
 * rather than let.
 */
describe('Property 46: Const Variable Declaration', () => {
	it('non-reassigned variables should use const instead of let', async () => {
		const project = initProject();
		const files = await getComponentFiles('components/**/*.{tsx,ts}');
		
		const violations: Array<{ file: string; line: number; variable: string }> = [];
		
		for (const file of files) {
			const sourceFile = project.addSourceFileAtPath(file);
			
			// Get all variable declarations
			const variableStatements = sourceFile.getDescendantsOfKind(SyntaxKind.VariableStatement);
			
			for (const statement of variableStatements) {
				const declarationList = statement.getDeclarationList();
				const declarationKind = declarationList.getDeclarationKind();
				
				// Only check 'let' declarations
				if (declarationKind === VariableDeclarationKind.Let) {
					const declarations = declarationList.getDeclarations();
					
					for (const declaration of declarations) {
						const name = declaration.getName();
						const references = declaration.findReferencesAsNodes();
						
						// Check if variable is reassigned
						let isReassigned = false;
						
						for (const ref of references) {
							const parent = ref.getParent();
							
							// Check if it's a write reference (assignment)
							if (parent && 
								(parent.getKind() === SyntaxKind.BinaryExpression ||
								 parent.getKind() === SyntaxKind.PostfixUnaryExpression ||
								 parent.getKind() === SyntaxKind.PrefixUnaryExpression)) {
								
								// Skip the initial declaration
								if (ref !== declaration.getNameNode()) {
									isReassigned = true;
									break;
								}
							}
						}
						
						// If not reassigned, it should use const
						if (!isReassigned) {
							violations.push({
								file,
								line: declaration.getStartLineNumber(),
								variable: name
							});
						}
					}
				}
			}
		}
		
		if (violations.length > 0) {
			const message = violations.map(v => 
				`${v.file}:${v.line}: Variable '${v.variable}' should use const`
			).join('\n');
			
			expect.fail(`Variables that should use const:\n${message}`);
		}
		
		expect(violations).toEqual([]);
	});
});
