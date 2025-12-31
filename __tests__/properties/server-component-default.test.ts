import { describe, it, expect } from 'vitest';
import { getComponentFiles, hasEventHandlers, hasUseClientDirective, initProject, usesReactHooks } from './utils/ast-helpers';

/**
 * Property 10: Server Component Default
 * Validates: Requirements 4.1
 * 
 * For any component that does not use hooks, event handlers, or browser APIs, 
 * it must not have the 'use client' directive.
 */
describe('Property 10: Server Component Default', () => {
	it('components without interactivity should not have use client directive', async () => {
		const project = initProject();
		const files = await getComponentFiles('components/**/*.tsx');
		
		const violations: string[] = [];
		
		for (const file of files) {
			const sourceFile = project.addSourceFileAtPath(file);
			
			const hasClient = hasUseClientDirective(sourceFile);
			const hasHooks = usesReactHooks(sourceFile);
			const hasHandlers = hasEventHandlers(sourceFile);
			
			// Check for browser APIs
			const text = sourceFile.getFullText();
			const hasBrowserAPIs = /\b(window|document|localStorage|sessionStorage|navigator)\b/.test(text);
			
			// If has 'use client' but doesn't use hooks, handlers, or browser APIs
			if (hasClient && !hasHooks && !hasHandlers && !hasBrowserAPIs) {
				violations.push(`${file}: Has 'use client' but no interactivity`);
			}
		}
		
		if (violations.length > 0) {
			const message = violations.join('\n');
			expect.fail(`Components with unnecessary 'use client' directive:\n${message}`);
		}
		
		expect(violations).toEqual([]);
	});
});
