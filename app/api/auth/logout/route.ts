/**
 * User Logout API Route
 * POST /api/auth/logout
 */

import { cookies, headers } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAuth } from '@/lib/middleware/auth';
import { auditLogs } from '@/lib/schema';

/**
 * Success response interface
 */
interface SuccessResponse {
	success: true;
	data: {
		message: string;
	};
}

/**
 * Error response interface
 */
interface ErrorResponse {
	success: false;
	error: {
		code: string;
		message: string;
	};
}

/**
 * POST handler for user logout
 * @param request - Next.js request object
 * @returns JSON response with success message or error
 */
export async function POST(
	request: NextRequest,
): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
	try {
		// Get user from token (optional - logout works even if token is invalid)
		const user = await verifyAuth(request);

		// Log logout action if user is authenticated
		if (user) {
			const headersList = await headers();
			const ipAddress =
				headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
			const userAgent = headersList.get('user-agent') || 'unknown';

			await db.insert(auditLogs).values({
				userId: user.userId,
				action: 'user.logout',
				entityType: 'user',
				entityId: user.userId,
				ipAddress,
				userAgent,
			});
		}

		// Clear cookies
		const cookieStore = await cookies();
		cookieStore.delete('access_token');
		cookieStore.delete('refresh_token');
		cookieStore.delete('user_session');

		return NextResponse.json(
			{
				success: true,
				data: {
					message: 'Logged out successfully',
				},
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error('Logout error:', error);
		return NextResponse.json(
			{
				success: false,
				error: {
					code: 'INTERNAL_ERROR',
					message: 'An error occurred during logout',
				},
			},
			{ status: 500 },
		);
	}
}
