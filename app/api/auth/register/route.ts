/**
 * User Registration API Route
 * POST /api/auth/register
 */

import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import { generateTokens } from '@/lib/auth/jwt';
import { hashPassword, validatePasswordStrength } from '@/lib/auth/password';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';

/**
 * Registration request body interface
 */
interface RegisterRequestBody {
	email: string;
	password: string;
	fullName?: string;
}

/**
 * Registration response data interface
 */
interface RegisterResponseData {
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
	data: RegisterResponseData;
}

/**
 * POST handler for user registration
 * @param request - Next.js request object
 * @returns JSON response with user data and tokens or error
 */
export async function POST(
	request: NextRequest,
): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
	try {
		const body = (await request.json()) as RegisterRequestBody;
		const { email, password, fullName } = body;

		// Validate required fields
		if (!email || !password) {
			console.error('Registration validation error: Missing email or password');
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

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			console.error('Registration validation error: Invalid email format:', email);
			return NextResponse.json(
				{
					success: false,
					error: {
						code: 'VALIDATION_ERROR',
						message: 'Invalid email format',
					},
				},
				{ status: 400 },
			);
		}

		// Validate password strength
		const passwordValidation = validatePasswordStrength(password);
		if (!passwordValidation.isValid) {
			console.error('Registration validation error: Weak password');
			return NextResponse.json(
				{
					success: false,
					error: {
						code: 'VALIDATION_ERROR',
						message: passwordValidation.error || 'Password does not meet strength requirements',
					},
				},
				{ status: 400 },
			);
		}

		// Check if user already exists
		const existingUser = await db
			.select()
			.from(users)
			.where(eq(users.email, email.toLowerCase()))
			.limit(1);

		if (existingUser.length > 0) {
			console.error('Registration error: User already exists with email:', email);
			return NextResponse.json(
				{
					success: false,
					error: {
						code: 'ALREADY_EXISTS',
						message: 'User with this email already exists',
					},
				},
				{ status: 409 },
			);
		}

		// Hash password
		const passwordHash = await hashPassword(password);

		// Create user
		const newUser = await db
			.insert(users)
			.values({
				email: email.toLowerCase(),
				passwordHash,
				fullName: fullName || null,
				role: 'user',
				emailVerified: false,
				isActive: true,
			})
			.returning();

		const user = newUser[0];

		if (!user) {
			console.error('Registration error: Failed to create user');
			return NextResponse.json(
				{
					success: false,
					error: {
						code: 'INTERNAL_ERROR',
						message: 'Failed to create user account',
					},
				},
				{ status: 500 },
			);
		}

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
			{ status: 201 },
		);
	} catch (error) {
		console.error('Registration error:', error);
		return NextResponse.json(
			{
				success: false,
				error: {
					code: 'INTERNAL_ERROR',
					message: 'An error occurred during registration',
				},
			},
			{ status: 500 },
		);
	}
}
