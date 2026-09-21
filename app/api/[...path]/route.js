import { NextResponse } from 'next/server';
import {
  consumeRateLimit,
  getClientIp,
  getManageableGuild,
  getManageableGuilds,
  getProxyAuthType,
  getSiteOrigin,
  isAllowedOrigin,
  isSuperuser,
  readSession,
  refreshSession,
  requestBodyIsAllowed,
  securityLog,
} from '../../../lib/server/security';
import { getAzeliaApiConfig } from '../../../lib/server/config';

function errorResponse(message, status, code = status) {
  return NextResponse.json(
    { success: false, error: message, code },
    { status, headers: { 'Cache-Control': 'no-store' } }
  );
}

async function handleProxy(request, { params }) {
  if (!isAllowedOrigin(request)) {
    securityLog('Cross-origin API request blocked', { ip: getClientIp(request) });
    return errorResponse('Origin not allowed.', 403);
  }

  if (!requestBodyIsAllowed(request)) {
    return errorResponse('Invalid request body.', 415);
  }

  const pathSegments = params.path || [];
  const authType = getProxyAuthType(pathSegments);

  if (authType === 'blocked') {
    return errorResponse('Endpoint not available through the public API proxy.', 404);
  }

  let session = null;
  let rateLimit;

  if (authType !== 'public') {
    session = readSession(request);

    if (!session) {
      return errorResponse('Authentication required.', 401);
    }

    rateLimit = consumeRateLimit(
      `proxy:user:${session.user.id}`,
      60,
      60 * 1000
    );
  } else {
    rateLimit = consumeRateLimit(
      `proxy:public:${getClientIp(request)}`,
      60,
      60 * 1000
    );
  }

  if (!rateLimit.allowed) {
    const response = errorResponse('Rate limit exceeded.', 429);
    response.headers.set('Retry-After', String(rateLimit.retryAfter));
    return response;
  }

  if (authType === 'admin' && !isSuperuser(session.user.id)) {
    securityLog('Admin API authorization denied', {
      ip: getClientIp(request),
      userId: session.user.id,
      path: pathSegments.join('/'),
    });
    return errorResponse('Forbidden.', 403);
  }

  if (authType === 'user') {
    const requestedUserId = pathSegments[1];

    if (!/^\d{17,20}$/.test(requestedUserId || '') || requestedUserId !== session.user.id) {
      securityLog('User object authorization denied', {
        ip: getClientIp(request),
        userId: session.user.id,
        requestedUserId,
      });
      return errorResponse('Forbidden.', 403);
    }
  }

  if (authType === 'guild-list') {
    if (request.method !== 'GET') return errorResponse('Method not allowed.', 405);

    let guilds;
    try {
      guilds = await getManageableGuilds(session.user.id);
    } catch (error) {
      securityLog('Guild list service failed', {
        ip: getClientIp(request),
        userId: session.user.id,
        reason: error instanceof Error ? error.message : 'unknown',
      });
      return errorResponse('Guild service unavailable.', 503);
    }

    const response = NextResponse.json(
      { success: true, guilds },
      { headers: { 'Cache-Control': 'no-store' } }
    );

    refreshSession(response, session);
    return response;
  }

  if (authType === 'guild') {
    const guildId = pathSegments[1];

    if (!/^\d{17,20}$/.test(guildId || '')) {
      return errorResponse('Invalid guild ID.', 400);
    }

    try {
      const guild = await getManageableGuild(session.user.id, guildId);

      if (!guild) {
        securityLog('Guild authorization denied', {
          ip: getClientIp(request),
          userId: session.user.id,
          guildId,
        });
        return errorResponse('You do not have permission to manage this guild.', 403);
      }

      if (guild.hasBot === false) {
        return errorResponse('Azelia is not installed in this guild.', 409);
      }
    } catch (error) {
      securityLog('Guild authorization service failed', {
        ip: getClientIp(request),
        userId: session.user.id,
        guildId,
        reason: error instanceof Error ? error.message : 'unknown',
      });
      return errorResponse('Authorization service unavailable.', 503);
    }
  }

  let targetUrl;

  try {
    const { host, key } = getAzeliaApiConfig();
    const endpoint = `/api/v1/${pathSegments.join('/')}`;
    const { search } = new URL(request.url);
    targetUrl = `${host}${endpoint}${search}`;

    const headers = {
      Accept: 'application/json',
      ...(key ? { 'x-api-key': key } : {}),
    };

    const options = {
      method: request.method,
      headers,
      cache: 'no-store',
    };

    if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
      const body = await request.text();
      if (body) options.body = body;
      headers['Content-Type'] = 'application/json';
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    options.signal = controller.signal;

    let res;
    try {
      res = await fetch(targetUrl, options);
    } finally {
      clearTimeout(timeout);
    }

    const data = await res.json().catch(() => ({
      success: false,
      error: `Upstream returned HTTP ${res.status}`,
      code: res.status,
    }));

    const response = NextResponse.json(data, {
      status: res.status,
      headers: { 'Cache-Control': 'no-store' },
    });

    if (session) {
      refreshSession(response, session);
    }

    return response;
  } catch (error) {
    console.error(`API Proxy Error on /${pathSegments.join('/')}:`, error);
    const response = errorResponse('Internal Server Proxy Error.', 502);
    if (session) refreshSession(response, session);
    return response;
  }
}

export async function GET(request, context) {
  return handleProxy(request, context);
}

export async function POST(request, context) {
  return handleProxy(request, context);
}

export async function PUT(request, context) {
  return handleProxy(request, context);
}

export async function PATCH(request, context) {
  return handleProxy(request, context);
}

export async function DELETE(request, context) {
  return handleProxy(request, context);
}

export async function OPTIONS(request) {
  if (!isAllowedOrigin(request)) {
    return errorResponse('Origin not allowed.', 403);
  }

  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': getSiteOrigin(),
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Credentials': 'true',
      Vary: 'Origin',
    },
  });
}
