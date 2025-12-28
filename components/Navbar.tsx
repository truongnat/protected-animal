'use client';
import { ThemeToggle } from '@/components/theme-toggle';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useAuth } from '@/lib/contexts/AuthContext';
import AuthModal from '@/components/auth/AuthModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useState } from 'react';
import { User, LogOut, Settings, Shield, Menu, X } from 'lucide-react';

interface Nav {
	label: string;
	labelVi: string;
	href: string;
}

const navs: Nav[] = [
	{ label: 'Home', labelVi: 'Trang chủ', href: '/landing' },
	{ label: 'Species', labelVi: 'Loài động vật', href: '/species' },
	{ label: 'Report', labelVi: 'Báo cáo', href: '/report' },
	{ label: 'Donate', labelVi: 'Quyên góp', href: '/donate' },
	{ label: 'Blog', labelVi: 'Tin tức', href: '/blog' },
	{ label: 'About', labelVi: 'Giới thiệu', href: '/about' },
];

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
	const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
	const { language, setLanguage } = useLanguage();
	const { user, isAuthenticated, logout, isLoading } = useAuth();

	const toggleLanguage = () => {
		setLanguage(language === 'en' ? 'vi' : 'en');
	};

	const handleLogin = () => {
		setAuthModalTab('login');
		setIsAuthModalOpen(true);
	};

	const handleRegister = () => {
		setAuthModalTab('register');
		setIsAuthModalOpen(true);
	};

	return (
		<nav className="border-b bg-background">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<div className="flex items-center">
						<Link href="/landing" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
							<span className="text-2xl">🐅</span>
							<div className="flex flex-col">
								<span className="text-lg font-semibold">
									{language === 'en' ? 'Vietnam Wildlife' : 'Động vật Việt Nam'}
								</span>
								<span className="text-xs text-muted-foreground">
									{language === 'en' ? 'Conservation Platform' : 'Nền tảng bảo tồn'}
								</span>
							</div>
						</Link>
					</div>
					
					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center gap-6">
						<div className="flex items-center gap-1">
							{navs.map((nav) => (
								<Button
									key={nav.href}
									variant="ghost"
									asChild
								>
									<Link href={nav.href}>
										{language === 'en' ? nav.label : nav.labelVi}
									</Link>
								</Button>
							))}
						</div>
						
						<div className="flex items-center gap-2 border-l pl-4">
							{!isLoading && (
								<>
									{isAuthenticated && user ? (
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" className="gap-2">
													<div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
														<User className="w-4 h-4" />
													</div>
													<div className="flex flex-col items-start">
														<span className="text-sm font-medium">
															{user.fullName || user.email.split('@')[0]}
														</span>
														<Badge variant={user.role === 'admin' ? 'destructive' : 'secondary'} className="text-xs">
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
												<DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
													<LogOut className="mr-2 h-4 w-4" />
													Logout
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									) : (
										<div className="flex items-center gap-2">
											<Button onClick={handleLogin} variant="ghost">
												Sign In
											</Button>
											<Button onClick={handleRegister}>
												Register
											</Button>
										</div>
									)}
								</>
							)}
							<Button onClick={toggleLanguage} variant="outline" size="sm">
								{language === 'en' ? '🇻🇳 VI' : '🇺🇸 EN'}
							</Button>
							<ThemeToggle />
						</div>
					</div>
					
					{/* Mobile Menu Button */}
					<div className="md:hidden flex items-center gap-2">
						<Button onClick={toggleLanguage} variant="outline" size="sm">
							{language === 'en' ? 'VI' : 'EN'}
						</Button>
						<ThemeToggle />
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							{isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
						</Button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			{isMenuOpen && (
				<div className="md:hidden border-t bg-background">
					<div className="px-2 pt-2 pb-3 space-y-1">
						{navs.map((nav) => (
							<Button
								key={nav.href}
								variant="ghost"
								className="w-full justify-start"
								asChild
								onClick={() => setIsMenuOpen(false)}
							>
								<Link href={nav.href}>
									{language === 'en' ? nav.label : nav.labelVi}
								</Link>
							</Button>
						))}
						
						{!isLoading && (
							<div className="pt-4 border-t space-y-2">
								{isAuthenticated && user ? (
									<>
										<div className="px-3 py-2">
											<p className="text-sm font-medium">{user.fullName || user.email.split('@')[0]}</p>
											<p className="text-xs text-muted-foreground">{user.email}</p>
											<Badge variant={user.role === 'admin' ? 'destructive' : 'secondary'} className="mt-1">
												{user.role}
											</Badge>
										</div>
										<Button
											variant="ghost"
											className="w-full justify-start"
											asChild
											onClick={() => setIsMenuOpen(false)}
										>
											<Link href="/profile">
												<User className="mr-2 h-4 w-4" />
												Profile
											</Link>
										</Button>
										<Button
											variant="ghost"
											className="w-full justify-start"
											asChild
											onClick={() => setIsMenuOpen(false)}
										>
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
												onClick={() => setIsMenuOpen(false)}
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
												logout();
												setIsMenuOpen(false);
											}}
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
												handleLogin();
												setIsMenuOpen(false);
											}}
										>
											Sign In
										</Button>
										<Button
											className="w-full"
											onClick={() => {
												handleRegister();
												setIsMenuOpen(false);
											}}
										>
											Register
										</Button>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			)}

			{/* Auth Modal */}
			<AuthModal
				isOpen={isAuthModalOpen}
				onClose={() => setIsAuthModalOpen(false)}
				defaultTab={authModalTab}
			/>
		</nav>
	);
}