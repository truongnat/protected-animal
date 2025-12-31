/**
 * JWT Token Utilities
 * Handles JWT token generation and verification
 */

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '15m'; // 15 minutes for access token
const REFRESH_TOKEN_EXPIRES_IN = '7d'; // 7 days for refresh token

export interface TokenPayload {
	userId: number;
	email: string;
	role: 'user' | 'expert' | 'admin';
}

export interface TokenResponse {
	accessToken: string;
	refreshToken: string;
	expiresIn: number;
}

/**
 * Generate access and refresh tokens
 * @param payload - User data to encode in token
 * @returns Object with access token, refresh token, and expiry
 */
export function generateTokens(payload: TokenPayload): TokenResponse {
	const accessToken = jwt.sign(payload, JWT_SECRET, {
		expiresIn: JWT_EXPIRES_IN,
	});

	const refreshToken = jwt.sign(payload, JWT_SECRET, {
		expiresIn: REFRESH_TOKEN_EXPIRES_IN,
	});

	return {
		accessToken,
		refreshToken,
		expiresIn: 15 * 60, // 15 minutes in seconds
	};
}

/**
 * Verify and decode a JWT token
 * @param token - JWT token to verify
 * @returns Decoded token payload or null if invalid
 */
export function verifyToken(token: string): TokenPayload | null {
	try {
		const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
		return decoded;
	} catch (_error) {
		return null;
	}
}

/**
 * Decode token without verification (for expired tokens)
 * @param token - JWT token to decode
 * @returns Decoded token payload or null if invalid
 */
export function decodeToken(token: string): TokenPayload | null {
	try {
		const decoded = jwt.decode(token) as TokenPayload;
		return decoded;
	} catch (_error) {
		return null;
	}
}

/**
 * Generate a verification token for email verification
 * @param email - User email
 * @returns Verification token
 */
export function generateVerificationToken(email: string): string {
	return jwt.sign({ email, type: 'verification' }, JWT_SECRET, {
		expiresIn: '24h',
	});
}

/**
 * Verify email verification token
 * @param token - Verification token
 * @returns Email if valid, null otherwise
 */
export function verifyVerificationToken(token: string): string | null {
	try {
		const decoded = jwt.verify(token, JWT_SECRET) as { email: string; type: string };
		if (decoded.type === 'verification') {
			return decoded.email;
		}
		return null;
	} catch (_error) {
		return null;
	}
}

/**
 * Generate a password reset token
 * @param email - User email
 * @returns Reset token
 */
export function generateResetToken(email: string): string {
	return jwt.sign({ email, type: 'reset' }, JWT_SECRET, {
		expiresIn: '1h',
	});
}

/**
 * Verify password reset token
 * @param token - Reset token
 * @returns Email if valid, null otherwise
 */
export function verifyResetToken(token: string): string | null {
	try {
		const decoded = jwt.verify(token, JWT_SECRET) as { email: string; type: string };
		if (decoded.type === 'reset') {
			return decoded.email;
		}
		return null;
	} catch (_error) {
		return null;
	}
}
