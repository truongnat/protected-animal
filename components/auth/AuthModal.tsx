'use client';

import { useCallback, useEffect, useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from '@/lib/i18n/useTranslation';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

/**
 * Authentication modal component that provides login and registration functionality.
 *
 * Features:
 * - Tab-based interface for switching between login and registration
 * - Keyboard navigation support (Escape to close, Tab to navigate)
 * - ARIA labels for accessibility
 * - Internationalization support
 * - Automatic focus management
 *
 * @example
 * ```tsx
 * <AuthModal
 *   isOpen={showAuth}
 *   onClose={() => setShowAuth(false)}
 *   defaultTab="login"
 * />
 * ```
 */

/**
 * Props for the AuthModal component
 */
interface AuthModalProps {
	/** Controls whether the modal is visible */
	isOpen: boolean;
	/** Callback function called when the modal should close */
	onClose: () => void;
	/** Initial tab to display ('login' or 'register') */
	defaultTab?: 'login' | 'register';
}

/**
 * Type for valid tab values
 */
type AuthTab = 'login' | 'register';

export default function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
	const { t } = useTranslation();
	const [activeTab, setActiveTab] = useState<AuthTab>(defaultTab);

	// Reset to default tab when modal opens
	useEffect(() => {
		if (isOpen) {
			setActiveTab(defaultTab);
		}
	}, [isOpen, defaultTab]);

	/**
	 * Handles successful authentication (login or registration)
	 * Closes the modal after successful authentication
	 */
	const handleSuccess = useCallback(() => {
		onClose();
	}, [onClose]);

	/**
	 * Handles tab change with proper type safety
	 */
	const handleTabChange = useCallback((value: string) => {
		setActiveTab(value as AuthTab);
	}, []);

	/**
	 * Switches to the register tab
	 */
	const switchToRegister = useCallback(() => {
		setActiveTab('register');
	}, []);

	/**
	 * Switches to the login tab
	 */
	const switchToLogin = useCallback(() => {
		setActiveTab('login');
	}, []);

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onClose}
			aria-labelledby="auth-modal-title"
			aria-describedby="auth-modal-description"
		>
			<DialogContent className="sm:max-w-[425px]" aria-label={t('auth.modal.loginTitle')}>
				<DialogHeader>
					<DialogTitle id="auth-modal-title">
						{activeTab === 'login' ? t('auth.modal.loginTitle') : t('auth.modal.registerTitle')}
					</DialogTitle>
					<DialogDescription id="auth-modal-description">
						{activeTab === 'login'
							? t('auth.modal.loginDescription')
							: t('auth.modal.registerDescription')}
					</DialogDescription>
				</DialogHeader>

				<Tabs value={activeTab} onValueChange={handleTabChange} aria-label="Authentication options">
					<TabsList className="grid w-full grid-cols-2" aria-label="Choose authentication method">
						<TabsTrigger value="login" aria-label={t('auth.modal.signIn')}>
							{t('auth.modal.signIn')}
						</TabsTrigger>
						<TabsTrigger value="register" aria-label={t('auth.modal.register')}>
							{t('auth.modal.register')}
						</TabsTrigger>
					</TabsList>

					<TabsContent
						value="login"
						className="space-y-4"
						role="tabpanel"
						aria-labelledby="login-tab"
					>
						<LoginForm onSuccess={handleSuccess} onSwitchToRegister={switchToRegister} />
					</TabsContent>

					<TabsContent
						value="register"
						className="space-y-4"
						role="tabpanel"
						aria-labelledby="register-tab"
					>
						<RegisterForm onSuccess={handleSuccess} onSwitchToLogin={switchToLogin} />
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
}
