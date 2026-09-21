import { NextResponse } from 'next/server';
import {
  clearCookie,
  consumeRateLimit,
  getClientIp,
  readSession,
  securityLog,
} from '../../../../lib/server/security';

export async function POST(req) {
  const session = readSession(req);
  const userKey = session?.user?.id || getClientIp(req);
  const limit = consumeRateLimit(`auth-logout:${userKey}`, 20, 60 * 60 * 1000);

  if (!limit.allowed) {
    const response = NextResponse.json(
      { error: 'Too many logout requests.', code: 429 },
      { status: 429 }
    );
    response.headers.set('Retry-After', String(limit.retryAfter));
    return response;
  }

  const response = NextResponse.json(
    { success: true, message: 'Logged out successfully' },
    { headers: { 'Cache-Control': 'no-store' } }
  );

  clearCookie(response, 'azelia_session', '/');
  clearCookie(response, 'azelia_oauth_state', '/api/auth/callback');
  clearCookie(response, 'azelia_return_to', '/api/auth/callback');

  if (session?.user?.id) {
    securityLog('Session logout', { ip: getClientIp(req), userId: session.user.id });
  }

  return response;
}

export async function GET(req) {
  return POST(req);
}
