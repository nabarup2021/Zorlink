import { NextResponse } from 'next/server';
import {
  consumeRateLimit,
  getClientIp,
  getManageableGuilds,
  readSession,
  refreshSession,
} from '../../../../lib/server/security';

export async function GET(req) {
  const session = readSession(req);

  if (!session) {
    return NextResponse.json(
      { authenticated: false, user: null },
      {
        status: 401,
        headers: { 'Cache-Control': 'no-store' },
      }
    );
  }

  const limit = consumeRateLimit(`auth-me:${session.user.id}`, 60, 60 * 1000);
  if (!limit.allowed) {
    const response = NextResponse.json(
      { authenticated: false, user: null, error: 'Rate limit exceeded.' },
      { status: 429, headers: { 'Cache-Control': 'no-store' } }
    );
    response.headers.set('Retry-After', String(limit.retryAfter));
    return response;
  }

  const responseUser = {
    ...session.user,
    guilds: [],
  };

  try {
    responseUser.guilds = await getManageableGuilds(session.user.id);
  } catch (error) {
    console.warn('[Azelia Auth] Guild sync unavailable', {
      ip: getClientIp(req),
      userId: session.user.id,
      reason: error instanceof Error ? error.message : 'unknown',
    });
  }

  const response = NextResponse.json(
    { authenticated: true, user: responseUser },
    { headers: { 'Cache-Control': 'no-store' } }
  );

  refreshSession(response, session);
  return response;
}
