import { signOutAction } from './actions';

export default async function LogoutPage() {
	await signOutAction();

	// This should never be rendered as signOutAction redirects
	return null;
}
