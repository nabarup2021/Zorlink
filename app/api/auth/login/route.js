import { NextResponse } from 'next/server';
import {
  consumeRateLimit,
  createOAuthState,
  getClientIp,
  getSiteOrigin,
  sanitizeReturnTo,
  securityLog,
  setOAuthStateCookie,
  setReturnToCookie,
} from '../../../../lib/server/security';
import { getDiscordClientId, getDiscordRedirectUri } from '../../../../lib/server/config';

export async function GET(req) {
  const ip = getClientIp(req);
  const limit = consumeRateLimit(`auth-login:${ip}`, 10, 60 * 60 * 1000);

  if (!limit.allowed) {
    const response = NextResponse.json(
      { error: 'Too many login attempts.', code: 429 },
      { status: 429 }
    );
    response.headers.set('Retry-After', String(limit.retryAfter));
    return response;
  }

  try {
    const siteOrigin = getSiteOrigin();
    const clientId = getDiscordClientId();
    const redirectUri = getDiscordRedirectUri(siteOrigin);
    const url = new URL(req.url);
    const returnTo = sanitizeReturnTo(url.searchParams.get('returnTo'));
    const state = createOAuthState();

    const response = NextResponse.redirect(
      `https://discord.com/api/oauth2/authorize?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&response_type=code&scope=identify%20guilds&state=${encodeURIComponent(state)}`
    );

    setOAuthStateCookie(response, state);
    setReturnToCookie(response, returnTo);

    securityLog('OAuth login started', { ip, returnTo });
    return response;
  } catch (error) {
    securityLog('OAuth login configuration failure', {
      ip,
      reason: error instanceof Error ? error.message : 'unknown',
    });
    return NextResponse.json(
      { error: 'Authentication service is not configured.', code: 503 },
      { status: 503 }
    );
  }
}
