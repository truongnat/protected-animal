/**
 * User Logout API Route
 * POST /api/auth/logout
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auditLogs } from '@/lib/schema';
import { verifyAuth } from '@/lib/middleware/auth';

export async function POST(request: NextRequest) {
  try {
    // Get user from token (optional - logout works even if token is invalid)
    const user = verifyAuth(request);

    // Log logout action if user is authenticated
    if (user) {
      const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
      const userAgent = request.headers.get('user-agent') || 'unknown';

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
    const response = NextResponse.json(
      {
        success: true,
        data: {
          message: 'Logged out successfully',
        },
      },
      { status: 200 }
    );

    // Delete auth cookies
    response.cookies.delete('access_token');
    response.cookies.delete('refresh_token');
    response.cookies.delete('user_session');

    return response;
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
      { status: 500 }
    );
  }
}
