import type { Metadata } from 'next';
import DonateClient from './donate-client';

export const metadata: Metadata = {
	title: 'Donate | Protected Animal',
	description: 'Support our mission to protect endangered species through your donation',
};

export default function DonatePage() {
	return <DonateClient />;
}
