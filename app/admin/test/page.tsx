'use client';

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export default function TestPage() {
	const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
	const [message, setMessage] = useState('');
	const [data, setData] = useState<any>(null);

	useEffect(() => {
		async function testSupabase() {
			try {
				// Test a simple query
				const { data, error } = await supabase.from('species').select('count').limit(1);

				if (error) {
					setStatus('error');
					setMessage(error.message);
					return;
				}

				setStatus('success');
				setMessage('Supabase connection successful');
				setData(data);
			} catch (error: any) {
				setStatus('error');
				setMessage(error.message || 'Unknown error');
			}
		}

		testSupabase();
	}, []);

	return (
		<div className="p-8">
			<h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>

			{status === 'loading' && (
				<div className="bg-blue-100 p-4 rounded">
					<p>Testing Supabase connection...</p>
				</div>
			)}

			{status === 'success' && (
				<div className="bg-green-100 p-4 rounded">
					<p className="text-green-800 font-medium">{message}</p>
					<pre className="mt-4 bg-gray-100 p-4 rounded overflow-auto">
						{JSON.stringify(data, null, 2)}
					</pre>
				</div>
			)}

			{status === 'error' && (
				<div className="bg-red-100 p-4 rounded">
					<p className="text-red-800 font-medium">Error: {message}</p>
					<div className="mt-4">
						<h2 className="font-medium">Troubleshooting:</h2>
						<ul className="list-disc pl-5 mt-2">
							<li>Check that your Supabase URL and anon key are correct in .env.local</li>
							<li>Verify that your Supabase project is running</li>
							<li>Check that the species table exists in your database</li>
							<li>Ensure that RLS policies allow the anon key to read from the species table</li>
						</ul>
					</div>
				</div>
			)}

			<div className="mt-8">
				<h2 className="text-xl font-bold mb-4">Environment Variables</h2>
				<div className="bg-gray-100 p-4 rounded">
					<p>
						<strong>NEXT_PUBLIC_SUPABASE_URL:</strong>{' '}
						{process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Not set'}
					</p>
					<p>
						<strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong>{' '}
						{process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Not set'}
					</p>
				</div>
			</div>
		</div>
	);
}
