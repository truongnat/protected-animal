import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import QueryProvider from '@/components/providers/QueryProvider';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/lib/contexts/AuthContext';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';

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
		<html lang="vi" suppressHydrationWarning>
			<body className={poppins.className}>
				<QueryProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="light"
						enableSystem
						disableTransitionOnChange
					>
						<LanguageProvider>
							<AuthProvider>
								<Navbar />
								{children}
								<Footer />
							</AuthProvider>
						</LanguageProvider>
					</ThemeProvider>
				</QueryProvider>
				<Toaster />
			</body>
		</html>
	);
}
