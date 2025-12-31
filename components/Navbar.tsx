'use client';

import { LogOut, Menu, Settings, Shield, User, X } from 'lucide-react';
import Link from 'next/link';
import { type KeyboardEvent, useCallback, useState } from 'react';
import AuthModal from '@/components/auth/AuthModal';
import { ThemeToggle } from '@/components/theme-toggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useTranslation } from '@/lib/i18n/useTranslation';

/**
 * Navigation item configuration
 */
interface NavItem {
	label: string;
	labelVi: string;
	href: string;
}

/**
 * Props for the Logo component
 */
interface LogoProps {
	language: 'en' | 'vi';
}

/**
 * Props for the DesktopNav component
 */
interface DesktopNavProps {
	navItems: NavItem[];
	language: 'en' | 'vi';
}

/**
 * Props for the UserMenu component
 */
interface UserMenuProps {
	user: {
		fullName?: string | null;
		email: string;
		role: string;
	};
	onLogout: () => void;
}

/**
 * Props for the LanguageSelector component
 */
interface LanguageSelectorProps {
	language: 'en' | 'vi';
	onToggle: () => void;
}

/**
 * Props for the MobileMenu component
 */
interface MobileMenuProps {
	isOpen: boolean;
	navItems: NavItem[];
	language: 'en' | 'vi';
	isAuthenticated: boolean;
	user: {
		fullName?: string | null;
		email: string;
		role: string;
	} | null;
	isLoading: boolean;
	onClose: () => void;
	onLogin: () => void;
	onRegister: () => void;
	onLogout: () => void;
}

const navItems: NavItem[] = [
	{ label: 'Home', labelVi: 'Trang chủ', href: '/landing' },
	{ label: 'Species', labelVi: 'Loài động vật', href: '/species' },
	{ label: 'Report', labelVi: 'Báo cáo', href: '/report' },
	{ label: 'Donate', labelVi: 'Quyên góp', href: '/donate' },
	{ label: 'Blog', labelVi: 'Tin tức', href: '/blog' },
	{ label: 'About', labelVi: 'Giới thiệu', href: '/about' },
];

/**
 * Logo component displaying the site branding
 * @param {LogoProps} props - Component props
 * @returns Logo component
 */
function Logo({ language }: LogoProps) {
	return (
		<Link
			href="/landing"
			className="flex items-center gap-2 hover:opacity-80 transition-opacity"
			aria-label={language === 'en' ? 'Vietnam Wildlife home page' : 'Trang chủ Động vật Việt Nam'}
		>
			<span className="text-2xl" aria-hidden="true">
				🐅
			</span>
			<div className="flex flex-col">
				<span className="text-lg font-semibold">
					{language === 'en' ? 'Vietnam Wildlife' : 'Động vật Việt Nam'}
				</span>
				<span className="text-xs text-muted-foreground">
					{language === 'en' ? 'Conservation Platform' : 'Nền tảng bảo tồn'}
				</span>
			</div>
		</Link>
	);
}

/**
 * Desktop navigation menu component
 * @param {DesktopNavProps} props - Component props
 * @returns Desktop navigation menu
 */
function DesktopNav({ navItems, language }: DesktopNavProps) {
	return (
		<nav aria-label="Main navigation">
			<div className="flex items-center gap-1">
				{navItems.map((nav) => (
					<Button key={nav.href} variant="ghost" asChild>
						<Link href={nav.href}>{language === 'en' ? nav.label : nav.labelVi}</Link>
					</Button>
				))}
			</div>
		</nav>
	);
}

/**
 * User menu dropdown component
 * @param {UserMenuProps} props - Component props
 * @returns User menu dropdown
 */
function UserMenu({ user, onLogout }: UserMenuProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="gap-2"
					aria-label={`User menu for ${user.fullName || user.email}`}
					type="button"
				>
					<div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
						<User className="w-4 h-4" />
					</div>
					<div className="flex flex-col items-start">
						<span className="text-sm font-medium">{user.fullName || user.email.split('@')[0]}</span>
						<Badge
							variant={user.role === 'admin' ? 'destructive' : 'secondary'}
							className="text-xs"
						>
							{user.role}
						</Badge>
					</div>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56">
				<DropdownMenuLabel>
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium">{user.fullName || 'User'}</p>
						<p className="text-xs text-muted-foreground">{user.email}</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href="/profile">
						<User className="mr-2 h-4 w-4" />
						Profile
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href="/dashboard">
						<Settings className="mr-2 h-4 w-4" />
						Dashboard
					</Link>
				</DropdownMenuItem>
				{user.role === 'admin' && (
					<DropdownMenuItem asChild>
						<Link href="/admin">
							<Shield className="mr-2 h-4 w-4" />
							Admin Panel
						</Link>
					</DropdownMenuItem>
				)}
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={onLogout} className="text-destructive focus:text-destructive">
					<LogOut className="mr-2 h-4 w-4" />
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

/**
 * Language selector component
 * @param {LanguageSelectorProps} props - Component props
 * @returns Language selector button
 */
function LanguageSelector({ language, onToggle }: LanguageSelectorProps) {
	const { t } = useTranslation();

	return (
		<Button
			onClick={onToggle}
			variant="outline"
			size="sm"
			aria-label={t('language.toggle')}
			type="button"
		>
			{language === 'en' ? '🇻🇳 VI' : '🇺🇸 EN'}
		</Button>
	);
}

/**
 * Mobile menu component
 * @param {MobileMenuProps} props - Component props
 * @returns Mobile menu or null if closed
 */
function MobileMenu({
	isOpen,
	navItems,
	language,
	isAuthenticated,
	user,
	isLoading,
	onClose,
	onLogin,
	onRegister,
	onLogout,
}: MobileMenuProps) {
	if (!isOpen) return null;

	return (
		<div
			className="md:hidden border-t bg-background"
			role="navigation"
			aria-label="Mobile navigation"
		>
			<div className="px-2 pt-2 pb-3 space-y-1">
				{navItems.map((nav) => (
					<Button
						key={nav.href}
						variant="ghost"
						className="w-full justify-start"
						asChild
						onClick={onClose}
					>
						<Link href={nav.href}>{language === 'en' ? nav.label : nav.labelVi}</Link>
					</Button>
				))}

				{!isLoading && (
					<div className="pt-4 border-t space-y-2">
						{isAuthenticated && user ? (
							<>
								<div className="px-3 py-2">
									<p className="text-sm font-medium">{user.fullName || user.email.split('@')[0]}</p>
									<p className="text-xs text-muted-foreground">{user.email}</p>
									<Badge
										variant={user.role === 'admin' ? 'destructive' : 'secondary'}
										className="mt-1"
									>
										{user.role}
									</Badge>
								</div>
								<Button variant="ghost" className="w-full justify-start" asChild onClick={onClose}>
									<Link href="/profile">
										<User className="mr-2 h-4 w-4" />
										Profile
									</Link>
								</Button>
								<Button variant="ghost" className="w-full justify-start" asChild onClick={onClose}>
									<Link href="/dashboard">
										<Settings className="mr-2 h-4 w-4" />
										Dashboard
									</Link>
								</Button>
								{user.role === 'admin' && (
									<Button
										variant="ghost"
										className="w-full justify-start"
										asChild
										onClick={onClose}
									>
										<Link href="/admin">
											<Shield className="mr-2 h-4 w-4" />
											Admin Panel
										</Link>
									</Button>
								)}
								<Button
									variant="ghost"
									className="w-full justify-start text-destructive"
									onClick={() => {
										onLogout();
										onClose();
									}}
									type="button"
								>
									<LogOut className="mr-2 h-4 w-4" />
									Logout
								</Button>
							</>
						) : (
							<div className="space-y-2">
								<Button
									variant="outline"
									className="w-full"
									onClick={() => {
										onLogin();
										onClose();
									}}
									type="button"
								>
									Sign In
								</Button>
								<Button
									className="w-full"
									onClick={() => {
										onRegister();
										onClose();
									}}
									type="button"
								>
									Register
								</Button>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

/**
 * Main navigation bar component for the application
 *
 * Provides responsive navigation with desktop and mobile views, user authentication,
 * language switching, and theme toggling. Includes proper ARIA labels and keyboard
 * navigation support for accessibility.
 *
 * @returns Navigation bar component
 *
 * @example
 * ```tsx
 * <Navbar />
 * ```
 */
export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
	const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
	const { language, setLanguage } = useLanguage();
	const { user, isAuthenticated, logout, isLoading } = useAuth();
	const { t } = useTranslation();

	const toggleLanguage = useCallback(() => {
		setLanguage(language === 'en' ? 'vi' : 'en');
	}, [language, setLanguage]);

	const handleLogin = useCallback(() => {
		setAuthModalTab('login');
		setIsAuthModalOpen(true);
	}, []);

	const handleRegister = useCallback(() => {
		setAuthModalTab('register');
		setIsAuthModalOpen(true);
	}, []);

	const handleMenuToggle = useCallback(() => {
		setIsMenuOpen((prev) => !prev);
	}, []);

	const handleMenuClose = useCallback(() => {
		setIsMenuOpen(false);
	}, []);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent<HTMLButtonElement>) => {
			if (e.key === 'Escape' && isMenuOpen) {
				setIsMenuOpen(false);
			}
		},
		[isMenuOpen],
	);

	return (
		<nav className="border-b bg-background" aria-label="Primary navigation">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<div className="flex items-center">
						<Logo language={language} />
					</div>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center gap-6">
						<DesktopNav navItems={navItems} language={language} />

						<div className="flex items-center gap-2 border-l pl-4">
							{!isLoading &&
								(isAuthenticated && user ? (
									<UserMenu user={user} onLogout={logout} />
								) : (
									<div className="flex items-center gap-2">
										<Button onClick={handleLogin} variant="ghost" type="button">
											Sign In
										</Button>
										<Button onClick={handleRegister} type="button">
											Register
										</Button>
									</div>
								))}
							<LanguageSelector language={language} onToggle={toggleLanguage} />
							<ThemeToggle />
						</div>
					</div>

					{/* Mobile Menu Button */}
					<div className="md:hidden flex items-center gap-2">
						<LanguageSelector language={language} onToggle={toggleLanguage} />
						<ThemeToggle />
						<Button
							variant="ghost"
							size="icon"
							onClick={handleMenuToggle}
							onKeyDown={handleKeyDown}
							aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
							aria-expanded={isMenuOpen}
							aria-controls="mobile-menu"
							type="button"
						>
							{isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
						</Button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			<div id="mobile-menu">
				<MobileMenu
					isOpen={isMenuOpen}
					navItems={navItems}
					language={language}
					isAuthenticated={isAuthenticated}
					user={user}
					isLoading={isLoading}
					onClose={handleMenuClose}
					onLogin={handleLogin}
					onRegister={handleRegister}
					onLogout={logout}
				/>
			</div>

			{/* Auth Modal */}
			<AuthModal
				isOpen={isAuthModalOpen}
				onClose={() => setIsAuthModalOpen(false)}
				defaultTab={authModalTab}
			/>
		</nav>
	);
}
