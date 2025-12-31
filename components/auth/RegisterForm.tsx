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
import { type RegisterFormData, registerSchema } from '@/lib/validations/auth';

/**
 * Registration form component with validation and error handling.
 *
 * Features:
 * - React Hook Form integration for form state management
 * - Zod schema validation with password confirmation
 * - Loading states during submission
 * - Internationalization support
 * - Accessible form labels and error messages
 * - Password strength requirements display
 *
 * @example
 * ```tsx
 * <RegisterForm
 *   onSuccess={() => console.log('Registration successful')}
 *   onSwitchToLogin={() => setTab('login')}
 * />
 * ```
 */

/**
 * Props for the RegisterForm component
 */
interface RegisterFormProps {
	/** Callback function called when registration is successful */
	onSuccess?: () => void;
	/** Callback function to switch to the login form */
	onSwitchToLogin?: () => void;
}

/**
 * API response structure for registration
 */
interface RegisterResponse {
	success: boolean;
	error?: {
		message: string;
	};
}

export default function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
	const { t } = useTranslation();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { refreshUser } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	});

	/**
	 * Handles form submission
	 * @param data - Validated form data containing email, password, and optional full name
	 */
	const onSubmit = async (data: RegisterFormData): Promise<void> => {
		setIsLoading(true);

		try {
			const response = await fetch('/api/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: data.email,
					password: data.password,
					fullName: data.fullName || undefined,
				}),
				credentials: 'include',
			});

			const result: RegisterResponse = await response.json();

			if (result.success) {
				toast.success(t('auth.register.success'));
				await refreshUser();

				if (onSuccess) {
					onSuccess();
				}
			} else {
				toast.error(result.error?.message || t('auth.register.error'));
			}
		} catch (error) {
			toast.error(t('auth.register.error'));
			console.error('Registration error:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="grid gap-4"
			aria-label={t('auth.modal.register')}
		>
			<div className="grid gap-3">
				<Label htmlFor="email">{t('auth.register.email')}</Label>
				<Input
					id="email"
					type="email"
					placeholder={t('auth.register.emailPlaceholder')}
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
				<Label htmlFor="fullName">{t('auth.register.fullName')}</Label>
				<Input
					id="fullName"
					type="text"
					placeholder={t('auth.register.fullNamePlaceholder')}
					{...register('fullName')}
					disabled={isLoading}
					aria-invalid={errors.fullName ? 'true' : 'false'}
					aria-describedby={errors.fullName ? 'fullName-error' : undefined}
				/>
				{errors.fullName && (
					<p id="fullName-error" className="text-sm text-destructive" role="alert">
						{errors.fullName.message}
					</p>
				)}
			</div>

			<div className="grid gap-3">
				<Label htmlFor="password">{t('auth.register.password')}</Label>
				<Input
					id="password"
					type="password"
					placeholder={t('auth.register.passwordPlaceholder')}
					{...register('password')}
					disabled={isLoading}
					aria-invalid={errors.password ? 'true' : 'false'}
					aria-describedby={errors.password ? 'password-error password-hint' : 'password-hint'}
				/>
				{errors.password && (
					<p id="password-error" className="text-sm text-destructive" role="alert">
						{errors.password.message}
					</p>
				)}
				<p id="password-hint" className="text-xs text-muted-foreground">
					{t('auth.register.passwordHint')}
				</p>
			</div>

			<div className="grid gap-3">
				<Label htmlFor="confirmPassword">{t('auth.register.confirmPassword')}</Label>
				<Input
					id="confirmPassword"
					type="password"
					placeholder={t('auth.register.confirmPasswordPlaceholder')}
					{...register('confirmPassword')}
					disabled={isLoading}
					aria-invalid={errors.confirmPassword ? 'true' : 'false'}
					aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
				/>
				{errors.confirmPassword && (
					<p id="confirmPassword-error" className="text-sm text-destructive" role="alert">
						{errors.confirmPassword.message}
					</p>
				)}
			</div>

			<Button type="submit" className="w-full" disabled={isLoading} aria-busy={isLoading}>
				{isLoading ? t('auth.register.creatingAccount') : t('auth.register.createAccountButton')}
			</Button>

			{onSwitchToLogin && (
				<div className="text-center text-sm">
					<span className="text-muted-foreground">{t('auth.register.hasAccount')} </span>
					<button
						type="button"
						onClick={onSwitchToLogin}
						className="text-primary hover:underline font-medium"
						disabled={isLoading}
						aria-label={t('auth.register.signIn')}
					>
						{t('auth.register.signIn')}
					</button>
				</div>
			)}
		</form>
	);
}
