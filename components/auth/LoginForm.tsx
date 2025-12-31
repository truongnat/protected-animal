'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { type LoginFormData, loginSchema } from '@/lib/validations/auth';

/**
 * Login form component with validation and error handling.
 *
 * Features:
 * - React Hook Form integration for form state management
 * - Zod schema validation
 * - Loading states during submission
 * - Internationalization support
 * - Accessible form labels and error messages
 * - Test credentials display for development
 *
 * @example
 * ```tsx
 * <LoginForm
 *   onSuccess={() => console.log('Login successful')}
 *   onSwitchToRegister={() => setTab('register')}
 * />
 * ```
 */

/**
 * Props for the LoginForm component
 */
interface LoginFormProps {
	/** Callback function called when login is successful */
	onSuccess?: () => void;
	/** Callback function to switch to the registration form */
	onSwitchToRegister?: () => void;
}

export default function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
	const { t } = useTranslation();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { login } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	/**
	 * Handles form submission
	 * @param data - Validated form data containing email and password
	 */
	const onSubmit = async (data: LoginFormData): Promise<void> => {
		setIsLoading(true);

		try {
			const success = await login(data.email, data.password);

			if (success) {
				toast.success(t('auth.login.success'));
				if (onSuccess) {
					onSuccess();
				}
			} else {
				toast.error(t('auth.login.error'));
			}
		} catch (error) {
			console.error('Login error:', error);
			toast.error(t('auth.login.error'));
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="grid gap-4"
			aria-label={t('auth.modal.signIn')}
		>
			<div className="grid gap-3">
				<Label htmlFor="email">{t('auth.login.email')}</Label>
				<Input
					id="email"
					type="email"
					placeholder={t('auth.login.emailPlaceholder')}
					{...register('email')}
					disabled={isLoading}
					aria-invalid={errors.email ? 'true' : 'false'}
					aria-describedby={errors.email ? 'email-error' : undefined}
				/>
				{errors.email && (
					<p id="email-error" className="text-sm text-destructive" role="alert">
						{errors.email.message}
					</p>
				)}
			</div>

			<div className="grid gap-3">
				<div className="flex items-center justify-between">
					<Label htmlFor="password">{t('auth.login.password')}</Label>
					<button
						type="button"
						className="text-xs text-primary hover:underline"
						disabled={isLoading}
						aria-label={t('auth.login.forgotPassword')}
					>
						{t('auth.login.forgotPassword')}
					</button>
				</div>
				<Input
					id="password"
					type="password"
					placeholder={t('auth.login.passwordPlaceholder')}
					{...register('password')}
					disabled={isLoading}
					aria-invalid={errors.password ? 'true' : 'false'}
					aria-describedby={errors.password ? 'password-error' : undefined}
				/>
				{errors.password && (
					<p id="password-error" className="text-sm text-destructive" role="alert">
						{errors.password.message}
					</p>
				)}
			</div>

			<Button type="submit" className="w-full" disabled={isLoading} aria-busy={isLoading}>
				{isLoading ? t('auth.login.signingIn') : t('auth.login.signInButton')}
			</Button>

			{onSwitchToRegister && (
				<div className="text-center text-sm">
					<span className="text-muted-foreground">{t('auth.login.noAccount')} </span>
					<button
						type="button"
						onClick={onSwitchToRegister}
						className="text-primary hover:underline font-medium"
						disabled={isLoading}
						aria-label={t('auth.login.createAccount')}
					>
						{t('auth.login.createAccount')}
					</button>
				</div>
			)}

			<div className="pt-2 border-t">
				<p className="text-xs text-center text-muted-foreground">
					{t('auth.login.testCredentials')}
				</p>
			</div>
		</form>
	);
}
