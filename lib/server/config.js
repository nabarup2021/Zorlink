function normalizeOrigin(value) {
  return value ? value.replace(/\/+$/, '') : '';
}

function validateOrigin(value) {
  const normalized = normalizeOrigin(value);

  try {
    const url = new URL(normalized);
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error();
    if (url.username || url.password || url.search || url.hash) throw new Error();
    return normalized;
  } catch {
    throw new Error('SITE_ORIGIN must be a valid HTTP or HTTPS origin.');
  }
}

export function getSiteOrigin() {
  const configured = process.env.SITE_ORIGIN || '';
  if (!configured && process.env.NODE_ENV === 'production') {
    throw new Error('SITE_ORIGIN is required in production.');
  }

  return validateOrigin(configured || 'http://localhost:3000');
}

export function getSessionSecret() {
  const secret = process.env.SESSION_SECRET || '';
  if (!/^[a-f0-9]{64,}$/i.test(secret)) {
    throw new Error('SESSION_SECRET must be set to at least 64 hexadecimal characters.');
  }
  return secret;
}

export function getDiscordClientId() {
  const clientId = process.env.DISCORD_CLIENT_ID || '';
  if (!/^\d{17,20}$/.test(clientId)) {
    throw new Error('DISCORD_CLIENT_ID is missing or invalid.');
  }
  return clientId;
}

export function getDiscordRedirectUri(siteOrigin = getSiteOrigin()) {
  return process.env.DISCORD_REDIRECT_URI || `${siteOrigin}/api/auth/callback`;
}

export function getAzeliaApiConfig() {
  const host = (process.env.AZELIA_API_HOST || process.env.AZELIA_API_URL || '').replace(/\/+$/, '');
  const key = process.env.AZELIA_API_KEY || '';

  if (!host) {
    throw new Error('AZELIA_API_HOST is not configured.');
  }

  return { host, key };
}

export function getSuperuserIds() {
  return new Set(
    (process.env.SUPERUSER_IDS || '')
      .split(',')
      .map((value) => value.trim())
      .filter((value) => /^\d{17,20}$/.test(value))
  );
}
