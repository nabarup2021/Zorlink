import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import {
  consumeRateLimit,
  OAUTH_STATE_COOKIE,
  RETURN_TO_COOKIE,
  clearCookie,
  createSignedSession,
  getClientIp,
  getSiteOrigin,
  markAuthorizationCodeUsed,
  sanitizeReturnTo,
  securityLog,
  setSessionCookie,
} from '../../../../lib/server/security';
import { getAzeliaApiConfig, getDiscordRedirectUri } from '../../../../lib/server/config';

function sanitizeCallbackUser(user) {
  if (!user?.id || !/^\d{17,20}$/.test(String(user.id))) return null;

  return {
    id: String(user.id),
    username: typeof user.username === 'string' ? user.username.slice(0, 64) : '',
    globalName:
      typeof user.globalName === 'string'
        ? user.globalName.slice(0, 64)
        : typeof user.global_name === 'string'
          ? user.global_name.slice(0, 64)
          : '',
    avatar: typeof user.avatar === 'string' ? user.avatar.slice(0, 128) : null,
  };
}

function invalidResponse(message, status = 403) {
  const response = NextResponse.json({ error: message, code: status }, { status });
  clearCookie(response, OAUTH_STATE_COOKIE, '/api/auth/callback');
  clearCookie(response, RETURN_TO_COOKIE, '/api/auth/callback');
  return response;
}

export async function GET(req) {
  const ip = getClientIp(req);
  const callbackLimit = consumeRateLimit(`auth-callback:${ip}`, 20, 60 * 60 * 1000);

  if (!callbackLimit.allowed) {
    const response = invalidResponse('Too many authentication callbacks.', 429);
    response.headers.set('Retry-After', String(callbackLimit.retryAfter));
    return response;
  }

  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const storedState = req.cookies.get(OAUTH_STATE_COOKIE)?.value;
  const responseOrigin = getSiteOrigin();

  if (
    !code ||
    code.length > 512 ||
    !state ||
    !storedState ||
    !/^[a-f0-9]{64}$/i.test(state)
  ) {
    securityLog('OAuth callback input rejected', { ip });
    return invalidResponse('Invalid OAuth callback.', 400);
  }

  const stateBuffer = Buffer.from(state);
  const storedStateBuffer = Buffer.from(storedState);
  const stateMatch =
    stateBuffer.length === storedStateBuffer.length &&
    crypto.timingSafeEqual(stateBuffer, storedStateBuffer);

  if (!stateMatch) {
    securityLog('OAuth state mismatch', { ip });
    return invalidResponse('OAuth state validation failed.', 403);
  }

  if (!markAuthorizationCodeUsed(code)) {
    securityLog('OAuth authorization-code replay blocked', { ip });
    return invalidResponse('Authorization code replay detected.', 403);
  }

  const returnTo = sanitizeReturnTo(req.cookies.get(RETURN_TO_COOKIE)?.value);

  try {
    const { host, key } = getAzeliaApiConfig();
    const redirectUri = getDiscordRedirectUri(responseOrigin);

    const exchangeRes = await fetch(`${host}/api/v1/auth/discord/exchange`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(key ? { 'x-api-key': key } : {}),
      },
      body: JSON.stringify({
        code,
        redirect_uri: redirectUri,
      }),
      cache: 'no-store',
    });

    if (!exchangeRes.ok) {
      securityLog('OAuth exchange failed', { ip, status: exchangeRes.status });
      return invalidResponse('Discord authentication could not be completed.', 502);
    }

    const data = await exchangeRes.json();
    const user = sanitizeCallbackUser(data?.user);

    if (!data?.success || !user) {
      securityLog('OAuth exchange returned invalid user', { ip });
      return invalidResponse('Discord authentication returned invalid user data.', 502);
    }

    const redirect = NextResponse.redirect(`${responseOrigin}${returnTo}`);
    setSessionCookie(redirect, createSignedSession(user));
    clearCookie(redirect, OAUTH_STATE_COOKIE, '/api/auth/callback');
    clearCookie(redirect, RETURN_TO_COOKIE, '/api/auth/callback');

    securityLog('OAuth session created', {
      ip,
      userId: user.id,
    });

    return redirect;
  } catch (error) {
    securityLog('OAuth callback internal failure', {
      ip,
      reason: error instanceof Error ? error.message : 'unknown',
    });
    return invalidResponse('Authentication service unavailable.', 503);
  }
}
