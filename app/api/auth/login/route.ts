/**
 * User Login API Route
 * POST /api/auth/login
 */

import { eq } from 'drizzle-orm';
import { cookies, headers } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import { generateTokens } from '@/lib/auth/jwt';
import { verifyPassword } from '@/lib/auth/password';
import { db } from '@/lib/db';
import { auditLogs, users } from '@/lib/schema';

/**
 * Login request body interface
 */
interface LoginRequestBody {
	email: string;
	password: string;
}

/**
 * Login response data interface
 */
interface LoginResponseData {
	user: {
		id: number;
		email: string;
		fullName: string | null;
		role: string;
		emailVerified: boolean;
	};
	tokens: {
		accessToken: string;
		refreshToken: string;
		expiresIn: number;
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
 * Success response interface
 */
interface SuccessResponse {
	success: true;
	data: LoginResponseData;
}

/**
 * POST handler for user login
 * @param request - Next.js request object
 * @returns JSON response with user data and tokens or error
 */
export async function POST(
	request: NextRequest,
): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
	try {
		const body = (await request.json()) as LoginRequestBody;
		const { email, password } = body;

		// Validate required fields
		if (!email || !password) {
			console.error('Login validation error: Missing email or password');
			return NextResponse.json(
				{
					success: false,
					error: {
						code: 'VALIDATION_ERROR',
						message: 'Email and password are required',
					},
				},
				{ status: 400 },
			);
		}

		// Find user by email
		const userResult = await db
			.select()
			.from(users)
			.where(eq(users.email, email.toLowerCase()))
			.limit(1);

		if (userResult.length === 0) {
			console.error('Login error: User not found for email:', email);
			return NextResponse.json(
				{
					success: false,
					error: {
						code: 'INVALID_CREDENTIALS',
						message: 'Invalid email or password',
					},
				},
				{ status: 401 },
			);
		}

		const user = userResult[0];

		if (!user) {
			console.error('Login error: User data is undefined');
			return NextResponse.json(
				{
					success: false,
					error: {
						code: 'INVALID_CREDENTIALS',
						message: 'Invalid email or password',
					},
				},
				{ status: 401 },
			);
		}

		// Check if user is active
		if (!user.isActive) {
			console.error('Login error: Account disabled for user:', user.id);
			return NextResponse.json(
				{
					success: false,
					error: {
						code: 'ACCOUNT_DISABLED',
						message: 'Your account has been disabled',
					},
				},
				{ status: 403 },
			);
		}

		// Verify password
		const isPasswordValid = await verifyPassword(password, user.passwordHash);

		if (!isPasswordValid) {
			console.error('Login error: Invalid password for user:', user.id);
			return NextResponse.json(
				{
					success: false,
					error: {
						code: 'INVALID_CREDENTIALS',
						message: 'Invalid email or password',
					},
				},
				{ status: 401 },
			);
		}

		// Update last login
		await db
			.update(users)
			.set({ lastLogin: new Date().toISOString() })
			.where(eq(users.id, user.id));

		// Log login action
		const headersList = await headers();
		const ipAddress =
			headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
		const userAgent = headersList.get('user-agent') || 'unknown';

		await db.insert(auditLogs).values({
			userId: user.id,
			action: 'user.login',
			entityType: 'user',
			entityId: user.id,
			ipAddress,
			userAgent,
		});

		// Generate tokens
		const tokens = generateTokens({
			userId: user.id,
			email: user.email,
			role: user.role as 'user' | 'expert' | 'admin',
		});

		// Set cookies
		const cookieStore = await cookies();
		cookieStore.set('access_token', tokens.accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: tokens.expiresIn,
			path: '/',
		});

		cookieStore.set('refresh_token', tokens.refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 7 * 24 * 60 * 60, // 7 days
			path: '/',
		});

		return NextResponse.json(
			{
				success: true,
				data: {
					user: {
						id: user.id,
						email: user.email,
						fullName: user.fullName,
						role: user.role,
						emailVerified: user.emailVerified,
					},
					tokens,
				},
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error('Login error:', error);
		return NextResponse.json(
			{
				success: false,
				error: {
					code: 'INTERNAL_ERROR',
					message: 'An error occurred during login',
				},
			},
			{ status: 500 },
		);
	}
}
