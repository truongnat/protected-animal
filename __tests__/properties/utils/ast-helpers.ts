import path from 'node:path';
import { glob } from 'glob';
import { Node, Project, type SourceFile } from 'ts-morph';

/**
 * Initialize a TypeScript project for AST analysis
 */
export function initProject(): Project {
	return new Project({
		tsConfigFilePath: path.resolve(process.cwd(), 'tsconfig.json'),
		skipAddingFilesFromTsConfig: true,
	});
}

/**
 * Get all component files matching a pattern
 */
export async function getComponentFiles(pattern: string): Promise<string[]> {
	return glob(pattern, {
		cwd: process.cwd(),
		ignore: ['node_modules/**', '.next/**', 'out/**', 'build/**'],
	});
}

/**
 * Check if a file has 'use client' directive
 */
export function hasUseClientDirective(sourceFile: SourceFile): boolean {
	const text = sourceFile.getFullText();
	const firstStatement = sourceFile.getStatements()[0];

	if (!firstStatement) return false;

	// Check for 'use client' in the first few lines
	const firstLines = text.split('\n').slice(0, 5).join('\n');
	return /['"]use client['"]/.test(firstLines);
}

/**
 * Check if a component uses React hooks
 */
export function usesReactHooks(sourceFile: SourceFile): boolean {
	const hookPatterns = [
		'useState',
		'useEffect',
		'useCallback',
		'useMemo',
		'useRef',
		'useContext',
		'useReducer',
		'useLayoutEffect',
	];

	const text = sourceFile.getFullText();
	return hookPatterns.some((hook) => text.includes(hook));
}

/**
 * Check if a component has event handlers
 */
export function hasEventHandlers(sourceFile: SourceFile): boolean {
	const text = sourceFile.getFullText();
	const eventHandlerPattern = /on[A-Z]\w+\s*=\s*\{/;
	return eventHandlerPattern.test(text);
}

/**
 * Get all function declarations and arrow functions in a file
 */
export function getFunctions(sourceFile: SourceFile) {
	return [
		...sourceFile.getFunctions(),
		...sourceFile.getVariableDeclarations().filter((decl) => {
			const initializer = decl.getInitializer();
			return initializer && Node.isArrowFunction(initializer);
		}),
	];
}

/**
 * Check if a file has TypeScript errors
 */
export function hasTypeScriptErrors(sourceFile: SourceFile): boolean {
	const diagnostics = sourceFile.getPreEmitDiagnostics();
	return diagnostics.length > 0;
}

/**
 * Get TypeScript diagnostics for a file
 */
export function getTypeScriptDiagnostics(sourceFile: SourceFile) {
	return sourceFile.getPreEmitDiagnostics().map((diagnostic) => ({
		message: diagnostic.getMessageText().toString(),
		line: diagnostic.getLineNumber(),
		file: sourceFile.getFilePath(),
	}));
}

/**
 * Check if a component has proper TypeScript interface for props
 */
export function hasPropsInterface(sourceFile: SourceFile, componentName: string): boolean {
	const interfaces = sourceFile.getInterfaces();
	const typeAliases = sourceFile.getTypeAliases();

	const propsInterfaceName = `${componentName}Props`;

	return (
		interfaces.some((i) => i.getName() === propsInterfaceName) ||
		typeAliases.some((t) => t.getName() === propsInterfaceName)
	);
}

/**
 * Check if file uses implicit any
 */
export function hasImplicitAny(sourceFile: SourceFile): boolean {
	const diagnostics = sourceFile.getPreEmitDiagnostics();
	return diagnostics.some(
		(d) =>
			d.getCode() === 7006 || // Parameter implicitly has an 'any' type
			d.getCode() === 7031 || // Binding element implicitly has an 'any' type
			d.getCode() === 7034, // Variable implicitly has an 'any' type
	);
}

/**
 * Count lines in a file (excluding empty lines and comments)
 */
export function countSignificantLines(sourceFile: SourceFile): number {
	const text = sourceFile.getFullText();
	const lines = text.split('\n');

	return lines.filter((line) => {
		const trimmed = line.trim();
		return (
			trimmed.length > 0 &&
			!trimmed.startsWith('//') &&
			!trimmed.startsWith('/*') &&
			!trimmed.startsWith('*')
		);
	}).length;
}
