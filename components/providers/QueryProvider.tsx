'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Component, type ReactNode, useState } from 'react';

/**
 * Props for the QueryProvider component
 */
interface QueryProviderProps {
	/** Child components to be wrapped with React Query context */
	children: ReactNode;
}

/**
 * Props for the QueryErrorBoundary component
 */
interface QueryErrorBoundaryProps {
	/** Child components to be protected by the error boundary */
	children: ReactNode;
}

/**
 * State for the QueryErrorBoundary component
 */
interface QueryErrorBoundaryState {
	/** Whether an error has been caught */
	hasError: boolean;
	/** The error that was caught, if any */
	error: Error | null;
}

/**
 * Error boundary component for React Query operations
 * Catches and displays errors that occur during data fetching
 */
class QueryErrorBoundary extends Component<QueryErrorBoundaryProps, QueryErrorBoundaryState> {
	constructor(props: QueryErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): QueryErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		console.error('React Query Error Boundary caught an error:', error, errorInfo);
	}

	render(): ReactNode {
		if (this.state.hasError) {
			return (
				<div className="flex flex-col items-center justify-center min-h-screen p-4">
					<div className="max-w-md w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
						<h2 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">
							Something went wrong
						</h2>
						<p className="text-red-600 dark:text-red-300 mb-4">
							An error occurred while loading data. Please try refreshing the page.
						</p>
						{this.state.error && (
							<details className="text-sm text-red-700 dark:text-red-400">
								<summary className="cursor-pointer font-medium mb-2">Error details</summary>
								<pre className="whitespace-pre-wrap break-words bg-red-100 dark:bg-red-900/40 p-2 rounded">
									{this.state.error.message}
								</pre>
							</details>
						)}
						<button
							type="button"
							onClick={() => window.location.reload()}
							className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
						>
							Reload page
						</button>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

/**
 * QueryProvider component that wraps the application with React Query context
 *
 * This provider configures React Query with optimized defaults for the application:
 * - Stale time: 1 minute (prevents immediate refetching on client)
 * - Garbage collection time: 10 minutes (keeps unused data in cache)
 * - Smart retry logic: Doesn't retry 4xx errors, retries others up to 3 times
 * - Disabled refetch on window focus for better UX
 * - Includes error boundary for graceful error handling
 * - Includes React Query DevTools in development
 *
 * @example
 * ```tsx
 * <QueryProvider>
 *   <App />
 * </QueryProvider>
 * ```
 */
export default function QueryProvider({ children }: QueryProviderProps): ReactNode {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						// With SSR, we usually want to set some default staleTime
						// above 0 to avoid refetching immediately on the client
						staleTime: 60 * 1000, // 1 minute
						gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
						retry: (failureCount, error: unknown) => {
							// Don't retry on 4xx errors
							const errorWithStatus = error as { status?: number };
							if (
								errorWithStatus?.status &&
								errorWithStatus.status >= 400 &&
								errorWithStatus.status < 500
							) {
								return false;
							}
							// Retry up to 3 times for other errors
							return failureCount < 3;
						},
						refetchOnWindowFocus: false,
					},
					mutations: {
						retry: 1,
					},
				},
			}),
	);

	return (
		<QueryErrorBoundary>
			<QueryClientProvider client={queryClient}>
				{children}
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</QueryErrorBoundary>
	);
}
