import crypto from 'node:crypto';
import {
  getAzeliaApiConfig,
  getSessionSecret,
  getSiteOrigin,
  getSuperuserIds,
} from './config';

export const SESSION_COOKIE = 'azelia_session';
export const OAUTH_STATE_COOKIE = 'azelia_oauth_state';
export const RETURN_TO_COOKIE = 'azelia_return_to';

const SESSION_IDLE_MS = 24 * 60 * 60 * 1000;
const SESSION_HARD_MS = 7 * 24 * 60 * 60 * 1000;
const OAUTH_STATE_TTL_SECONDS = 5 * 60;
const MAX_PROXY_BODY_BYTES = 1024 * 1024;

const rateBuckets = new Map();
const usedAuthCodes = new Map();

function base64url(value) {
  return Buffer.from(value).toString('base64url');
}

function fromBase64url(value) {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function sign(value) {
  return crypto.createHmac('sha256', getSessionSecret()).update(value).digest('base64url');
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(left || '');
  const rightBuffer = Buffer.from(right || '');
  if (leftBuffer.length !== rightBuffer.length) return false;
  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

export function createSignedSession(user) {
  const now = Date.now();
  const payload = {
    user: sanitizeUser(user),
    authAt: now,
    lastSeen: now,
    hardExpiresAt: now + SESSION_HARD_MS,
    nonce: crypto.randomBytes(16).toString('hex'),
  };
  const encoded = base64url(JSON.stringify(payload));
  return `${encoded}.${sign(encoded)}`;
}

export function readSession(request) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const separator = token.lastIndexOf('.');
    if (separator <= 0) return null;

    const encoded = token.slice(0, separator);
    const signature = token.slice(separator + 1);
    if (!safeEqual(sign(encoded), signature)) return null;

    const session = JSON.parse(fromBase64url(encoded));
    const now = Date.now();

    if (!session?.user?.id) return null;
    if (!Number.isFinite(session.authAt) || !Number.isFinite(session.lastSeen)) return null;
    if (!Number.isFinite(session.hardExpiresAt) || session.hardExpiresAt <= now) return null;
    if (session.lastSeen + SESSION_IDLE_MS <= now) return null;

    return session;
  } catch {
    return null;
  }
}

export function refreshSession(response, session) {
  const refreshed = {
    ...session,
    lastSeen: Date.now(),
  };

  const encoded = base64url(JSON.stringify(refreshed));
  const token = `${encoded}.${sign(encoded)}`;
  const maxAge = Math.max(0, Math.floor((refreshed.hardExpiresAt - Date.now()) / 1000));

  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge,
  });

  return refreshed;
}

export function setSessionCookie(response, token, maxAge = 7 * 24 * 60 * 60) {
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge,
  });
}

export function clearCookie(response, name, path = '/') {
  response.cookies.set(name, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: name === SESSION_COOKIE ? 'strict' : 'lax',
    path,
    maxAge: 0,
  });
}

export function createOAuthState() {
  return crypto.randomBytes(32).toString('hex');
}

export function setOAuthStateCookie(response, state) {
  response.cookies.set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/api/auth/callback',
    maxAge: OAUTH_STATE_TTL_SECONDS,
  });
}

export function setReturnToCookie(response, returnTo) {
  response.cookies.set(RETURN_TO_COOKIE, sanitizeReturnTo(returnTo), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/api/auth/callback',
    maxAge: OAUTH_STATE_TTL_SECONDS,
  });
}

export function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}

export function consumeRateLimit(key, limit, windowMs) {
  const now = Date.now();
  const current = rateBuckets.get(key);

  if (!current || current.expiresAt <= now) {
    rateBuckets.set(key, { count: 1, expiresAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((current.expiresAt - now) / 1000)),
    };
  }

  current.count += 1;

  if (rateBuckets.size > 5000) {
    for (const [bucketKey, bucket] of rateBuckets) {
      if (bucket.expiresAt <= now) rateBuckets.delete(bucketKey);
    }
  }

  return { allowed: true, retryAfter: 0 };
}

export function markAuthorizationCodeUsed(code) {
  const hash = crypto.createHash('sha256').update(code).digest('hex');
  const now = Date.now();

  for (const [key, expiresAt] of usedAuthCodes) {
    if (expiresAt <= now) usedAuthCodes.delete(key);
  }

  if (usedAuthCodes.has(hash)) return false;
  usedAuthCodes.set(hash, now + 10 * 60 * 1000);
  return true;
}

export function sanitizeReturnTo(value) {
  if (!value || typeof value !== 'string') return '/servers';
  if (!value.startsWith('/') || value.startsWith('//')) return '/servers';
  return value.slice(0, 512);
}

export function sanitizeUser(user) {
  return {
    id: typeof user?.id === 'string' ? user.id : '',
    username: typeof user?.username === 'string' ? user.username.slice(0, 64) : '',
    globalName:
      typeof user?.globalName === 'string'
        ? user.globalName.slice(0, 64)
        : typeof user?.global_name === 'string'
          ? user.global_name.slice(0, 64)
          : '',
    avatar: typeof user?.avatar === 'string' ? user.avatar.slice(0, 128) : null,
  };
}

function hasManageGuildPermission(guild) {
  if (guild?.isOwner || guild?.owner || guild?.isAdmin) return true;

  const permissionObject = guild?.permissions;
  if (permissionObject && typeof permissionObject === 'object') {
    if (permissionObject.manageGuild || permissionObject.MANAGE_GUILD) return true;
    const raw = permissionObject.value ?? permissionObject.bitfield;
    if (raw !== undefined) return hasManageGuildPermission({ permissions: raw });
  }

  const raw = typeof permissionObject === 'string' || typeof permissionObject === 'number' || typeof permissionObject === 'bigint'
    ? permissionObject
    : guild?.permission;

  if (raw === undefined || raw === null) return false;

  try {
    const value = BigInt(raw);
    return (value & 32n) === 32n;
  } catch {
    return false;
  }
}

function sanitizeGuild(guild) {
  return {
    id: String(guild?.id || ''),
    name: typeof guild?.name === 'string' ? guild.name.slice(0, 100) : 'Unknown Server',
    icon: typeof guild?.icon === 'string' ? guild.icon : null,
    memberCount: Number.isFinite(Number(guild?.memberCount)) ? Number(guild.memberCount) : 0,
    hasBot: Boolean(guild?.hasBot),
    isOwner: Boolean(guild?.isOwner || guild?.owner),
    isAdmin: Boolean(guild?.isAdmin),
    permissions: {
      manageGuild: hasManageGuildPermission(guild),
    },
  };
}

export function isManageableGuild(guild) {
  return hasManageGuildPermission(guild);
}

export async function fetchAzeliaUser(userId) {
  const { host, key } = getAzeliaApiConfig();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(
      `${host}/api/v1/auth/user?userId=${encodeURIComponent(userId)}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          ...(key ? { 'x-api-key': key } : {}),
        },
        cache: 'no-store',
        signal: controller.signal,
      }
    );

    if (!response.ok) {
      throw new Error(`Azelia auth bridge returned HTTP ${response.status}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

export async function getManageableGuilds(userId) {
  const data = await fetchAzeliaUser(userId);
  const guilds = Array.isArray(data?.guilds) ? data.guilds : [];
  return guilds.filter(isManageableGuild).map(sanitizeGuild);
}

export async function getManageableGuild(userId, guildId) {
  const guilds = await getManageableGuilds(userId);
  return guilds.find((guild) => guild.id === guildId) || null;
}

export function getProxyAuthType(pathSegments) {
  if (!pathSegments.length) return 'private';

  const root = pathSegments[0];

  if (
    pathSegments.length === 1 &&
    ['status', 'top-songs', 'nodes', 'recommendations', 'team', 'search'].includes(root)
  ) {
    return 'public';
  }

  if (root === 'admin') return 'admin';
  if (root === 'guilds') return pathSegments.length === 1 ? 'guild-list' : 'guild';
  if (root === 'users') return 'user';
  if (root === 'auth') return 'blocked';

  return 'private';
}

export function isAllowedOrigin(request) {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  return origin === getSiteOrigin();
}

export function requestBodyIsAllowed(request) {
  const length = Number(request.headers.get('content-length') || 0);
  if (Number.isFinite(length) && length > MAX_PROXY_BODY_BYTES) return false;

  if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
    const contentType = request.headers.get('content-type') || '';
    if (length > 0 && !contentType.toLowerCase().startsWith('application/json')) return false;
  }

  return true;
}

export function isSuperuser(userId) {
  return getSuperuserIds().has(userId);
}

export function securityLog(event, metadata = {}) {
  const safeMetadata = Object.fromEntries(
    Object.entries(metadata).filter(([, value]) => value !== undefined && value !== null)
  );
  console.warn(`[Azelia Security] ${event}`, safeMetadata);
}

export const SESSION_CONSTANTS = {
  idleMs: SESSION_IDLE_MS,
  hardMs: SESSION_HARD_MS,
};

export { getSiteOrigin } from './config';
