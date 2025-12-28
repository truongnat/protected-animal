/**
 * Authentication Middleware
 * Verifies JWT tokens and extracts user information
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, type TokenPayload } from '../auth/jwt';

export interface AuthenticatedRequest extends NextRequest {
  user?: TokenPayload;
}

/**
 * Extract token from Authorization header or cookies
 * @param request - Next.js request object
 * @returns JWT token or null
 */
function extractToken(request: NextRequest): string | null {
  // Try Authorization header first
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Try cookie
  const token = request.cookies.get('access_token');
  return token?.value || null;
}

/**
 * Verify authentication token
 * @param request - Next.js request object
 * @returns User payload if authenticated, null otherwise
 */
export function verifyAuth(request: NextRequest): TokenPayload | null {
  const token = extractToken(request);
  
  if (!token) {
    return null;
  }

  return verifyToken(token);
}

/**
 * Middleware to require authentication
 * Returns 401 if not authenticated
 */
export function requireAuth(
  handler: (request: NextRequest, user: TokenPayload) => Promise<NextResponse>
) {
  return async (request: NextRequest) => {
    const user = verifyAuth(request);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'Authentication required',
          },
        },
        { status: 401 }
      );
    }

    return handler(request, user);
  };
}

/**
 * Middleware to require specific role
 * Returns 403 if user doesn't have required role
 */
export function requireRole(
  roles: Array<'user' | 'expert' | 'admin'>,
  handler: (request: NextRequest, user: TokenPayload) => Promise<NextResponse>
) {
  return async (request: NextRequest) => {
    const user = verifyAuth(request);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'Authentication required',
          },
        },
        { status: 401 }
      );
    }

    if (!roles.includes(user.role)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'FORBIDDEN',
            message: 'Insufficient permissions',
          },
        },
        { status: 403 }
      );
    }

    return handler(request, user);
  };
}

/**
 * Optional authentication middleware
 * Adds user to request if authenticated, but doesn't require it
 */
export function optionalAuth(
  handler: (request: NextRequest, user: TokenPayload | null) => Promise<NextResponse>
) {
  return async (request: NextRequest) => {
    const user = verifyAuth(request);
    return handler(request, user);
  };
}
