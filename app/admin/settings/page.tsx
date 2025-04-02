'use client';

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export default function SettingsPage() {
	const [settings, setSettings] = useState({
		site_title: 'Protected Animals',
		site_description: 'Raising awareness about endangered species and conservation efforts',
		contact_email: 'contact@protectedanimals.org',
		social_facebook: '',
		social_twitter: '',
		social_instagram: '',
	});
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	useEffect(() => {
		async function fetchSettings() {
			try {
				const { data, error } = await supabase.from('settings').select('*').single();

				if (error && error.code !== 'PGRST116') {
					// PGRST116 is the error code for "no rows returned"
					throw error;
				}

				if (data) {
					setSettings(data);
				}
			} catch (err: any) {
				console.error('Error fetching settings:', err);
				setError(err.message || 'Failed to load settings');
			} finally {
				setLoading(false);
			}
		}

		fetchSettings();
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setSettings((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSaving(true);
		setError('');
		setSuccess('');

		try {
			// Check if settings already exist
			const { data: existingSettings, error: checkError } = await supabase
				.from('settings')
				.select('id')
				.single();

			if (checkError && checkError.code !== 'PGRST116') {
				throw checkError;
			}

			if (existingSettings) {
				// Update existing settings
				const { error: updateError } = await supabase
					.from('settings')
					.update(settings)
					.eq('id', existingSettings.id);

				if (updateError) throw updateError;
			} else {
				// Insert new settings
				const { error: insertError } = await supabase.from('settings').insert([settings]);

				if (insertError) throw insertError;
			}

			setSuccess('Settings saved successfully!');
		} catch (err: any) {
			setError(err.message || 'An error occurred while saving settings');
			console.error('Error saving settings:', err);
		} finally {
			setSaving(false);
		}
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
			</div>
		);
	}

	return (
		<div>
			<h1 className="text-2xl font-semibold text-gray-900 mb-6">Website Settings</h1>

			{error && (
				<div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
					<div className="flex">
						<div className="flex-shrink-0">
							<svg
								className="h-5 w-5 text-red-400"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<div className="ml-3">
							<p className="text-sm text-red-700">{error}</p>
						</div>
					</div>
				</div>
			)}

			{success && (
				<div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4">
					<div className="flex">
						<div className="flex-shrink-0">
							<svg
								className="h-5 w-5 text-green-400"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<div className="ml-3">
							<p className="text-sm text-green-700">{success}</p>
						</div>
					</div>
				</div>
			)}

			<div className="bg-white shadow overflow-hidden sm:rounded-md">
				<form onSubmit={handleSubmit} className="p-6 space-y-6">
					<div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
						<div className="sm:col-span-4">
							<label htmlFor="site_title" className="block text-sm font-medium text-gray-700">
								Site Title
							</label>
							<div className="mt-1">
								<input
									type="text"
									name="site_title"
									id="site_title"
									value={settings.site_title}
									onChange={handleChange}
									className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
								/>
							</div>
						</div>

						<div className="sm:col-span-6">
							<label htmlFor="site_description" className="block text-sm font-medium text-gray-700">
								Site Description
							</label>
							<div className="mt-1">
								<textarea
									id="site_description"
									name="site_description"
									rows={3}
									value={settings.site_description}
									onChange={handleChange}
									className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
								/>
							</div>
							<p className="mt-2 text-sm text-gray-500">
								Brief description of your website. Used in meta tags for SEO.
							</p>
						</div>

						<div className="sm:col-span-4">
							<label htmlFor="contact_email" className="block text-sm font-medium text-gray-700">
								Contact Email
							</label>
							<div className="mt-1">
								<input
									type="email"
									name="contact_email"
									id="contact_email"
									value={settings.contact_email}
									onChange={handleChange}
									className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
								/>
							</div>
						</div>

						<div className="sm:col-span-6">
							<h3 className="text-lg font-medium text-gray-900">Social Media</h3>
							<p className="mt-1 text-sm text-gray-500">
								Add your social media profile URLs to display them on your website.
							</p>
						</div>

						<div className="sm:col-span-4">
							<label htmlFor="social_facebook" className="block text-sm font-medium text-gray-700">
								Facebook
							</label>
							<div className="mt-1">
								<input
									type="url"
									name="social_facebook"
									id="social_facebook"
									value={settings.social_facebook}
									onChange={handleChange}
									className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
									placeholder="https://facebook.com/yourpage"
								/>
							</div>
						</div>

						<div className="sm:col-span-4">
							<label htmlFor="social_twitter" className="block text-sm font-medium text-gray-700">
								Twitter
							</label>
							<div className="mt-1">
								<input
									type="url"
									name="social_twitter"
									id="social_twitter"
									value={settings.social_twitter}
									onChange={handleChange}
									className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
									placeholder="https://twitter.com/yourhandle"
								/>
							</div>
						</div>

						<div className="sm:col-span-4">
							<label htmlFor="social_instagram" className="block text-sm font-medium text-gray-700">
								Instagram
							</label>
							<div className="mt-1">
								<input
									type="url"
									name="social_instagram"
									id="social_instagram"
									value={settings.social_instagram}
									onChange={handleChange}
									className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
									placeholder="https://instagram.com/yourhandle"
								/>
							</div>
						</div>
					</div>

					<div className="pt-5">
						<div className="flex justify-end">
							<button
								type="submit"
								disabled={saving}
								className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
							>
								{saving ? 'Saving...' : 'Save Settings'}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
