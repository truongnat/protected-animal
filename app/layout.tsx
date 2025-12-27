import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/theme-provider';
import QueryProvider from '@/components/providers/QueryProvider';
import { Toaster } from 'sonner';

const poppins = Poppins({
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Protected Animals | Conservation Awareness',
	description:
		'Learn about endangered animal species, conservation efforts, and how you can help protect wildlife.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={poppins.className}>
				<QueryProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<Navbar />
						{children}
						<Footer />
					</ThemeProvider>
				</QueryProvider>
				<Toaster />
			</body>
		</html>
	);
}
