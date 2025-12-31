import { describe, it, expect } from 'vitest';
import { Node, SyntaxKind } from 'ts-morph';
import { getComponentFiles, initProject } from './utils/ast-helpers';

/**
 * Property 5: Props Interface Definition
 * Validates: Requirements 3.1
 * 
 * For any component that accepts props, it must have an explicitly 
 * defined TypeScript interface for those props.
 */
describe('Property 5: Props Interface Definition', () => {
	it('components with props should have explicit interfaces', async () => {
		const project = initProject();
		const files = await getComponentFiles('components/**/*.tsx');
		
		const violations: string[] = [];
		
		for (const file of files) {
			const sourceFile = project.addSourceFileAtPath(file);
			
			// Get all function declarations and arrow functions
			const functions = sourceFile.getFunctions();
			const variableDeclarations = sourceFile.getVariableDeclarations();
			
			const allComponents = [
				...functions,
				...variableDeclarations.filter(decl => {
					const initializer = decl.getInitializer();
					return initializer && Node.isArrowFunction(initializer);
				})
			];
			
			for (const component of allComponents) {
				let parameters: any[] = [];
				
				if (Node.isFunctionDeclaration(component)) {
					parameters = component.getParameters();
				} else if (Node.isVariableDeclaration(component)) {
					const initializer = component.getInitializer();
					if (initializer && Node.isArrowFunction(initializer)) {
						parameters = initializer.getParameters();
					}
				}
				
				// Check if component has parameters (props)
				if (parameters.length > 0) {
					const firstParam = parameters[0];
					const typeNode = firstParam.getTypeNode();
					
					// Check if parameter has explicit type
					if (!typeNode) {
						const componentName = Node.isFunctionDeclaration(component) 
							? component.getName() 
							: component.getName();
						
						violations.push(`${file}: Component '${componentName}' has props without explicit type`);
					}
				}
			}
		}
		
		if (violations.length > 0) {
			const message = violations.join('\n');
			expect.fail(`Components with props missing explicit interfaces:\n${message}`);
		}
		
		expect(violations).toEqual([]);
	});
});
