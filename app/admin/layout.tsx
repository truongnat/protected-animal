import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Protected Animals | Conservation Awareness',
	description:
		'Learn about endangered animal species, conservation efforts, and how you can help protect wildlife.',
};

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
