/**
 * Get Current User API Route
 * GET /api/auth/me
 */

import { eq } from 'drizzle-orm';
import { type NextRequest, NextResponse } from 'next/server';
import type { TokenPayload } from '@/lib/auth/jwt';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/middleware/auth';
import { users } from '@/lib/schema';

/**
 * User data interface
 */
interface UserData {
	id: number;
	email: string;
	fullName: string | null;
	role: string;
	emailVerified: boolean;
	isActive: boolean;
	lastLogin: string | null;
	createdAt: string;
}

/**
 * Success response interface
 */
interface SuccessResponse {
	success: true;
	data: {
		user: UserData;
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
 * GET handler for fetching current user data
 * @param request - Next.js request object
 * @param user - Authenticated user payload from middleware
 * @returns JSON response with user data or error
 */
export const GET = requireAuth(
	async (
		_request: NextRequest,
		user: TokenPayload,
	): Promise<NextResponse<SuccessResponse | ErrorResponse>> => {
		try {
			// Fetch fresh user data from database
			const userResult = await db
				.select({
					id: users.id,
					email: users.email,
					fullName: users.fullName,
					role: users.role,
					emailVerified: users.emailVerified,
					isActive: users.isActive,
					lastLogin: users.lastLogin,
					createdAt: users.createdAt,
				})
				.from(users)
				.where(eq(users.id, user.userId))
				.limit(1);

			if (userResult.length === 0) {
				console.error('Get current user error: User not found with ID:', user.userId);
				return NextResponse.json(
					{
						success: false,
						error: {
							code: 'NOT_FOUND',
							message: 'User not found',
						},
					},
					{ status: 404 },
				);
			}

			const userData = userResult[0];

			if (!userData) {
				console.error('Get current user error: User data is undefined');
				return NextResponse.json(
					{
						success: false,
						error: {
							code: 'NOT_FOUND',
							message: 'User not found',
						},
					},
					{ status: 404 },
				);
			}

			return NextResponse.json(
				{
					success: true,
					data: {
						user: userData,
					},
				},
				{ status: 200 },
			);
		} catch (error) {
			console.error('Get current user error:', error);
			return NextResponse.json(
				{
					success: false,
					error: {
						code: 'INTERNAL_ERROR',
						message: 'An error occurred while fetching user data',
					},
				},
				{ status: 500 },
			);
		}
	},
);
