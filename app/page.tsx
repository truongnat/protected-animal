import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
	title: 'Protected Animals | Conservation Awareness',
	description:
		'Learn about endangered animal species, conservation efforts, and how you can help protect wildlife.',
};

export default async function Home() {
	redirect('/landing');

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
		</div>
	);
}
