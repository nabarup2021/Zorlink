export async function fetchApi(path, options = {}) {
  const normalizedPath = path.startsWith('/api/')
    ? path
    : `/api${path.replace(/^\/api\/v1/, '')}`;

  const headers = {
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(options.headers || {}),
  };

  try {
    const res = await fetch(normalizedPath, {
      ...options,
      headers,
      credentials: options.credentials || 'same-origin',
      cache: options.cache || 'no-store',
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
      throw new Error(errData.error || `Request failed with status ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error(`Client API Error on ${path}:`, err);
    throw err;
  }
}

export const api = {
  getCurrentUser: () => fetchApi('/api/auth/me'),
  getStatus: () => fetchApi('/api/v1/status'),
  getTopSongs: () => fetchApi('/api/v1/top-songs'),
  getRecommendations: (genre = 'trending') =>
    fetchApi(`/api/v1/recommendations?genre=${encodeURIComponent(genre)}`),
  getTeam: () => fetchApi('/api/v1/team'),
  getNodes: () => fetchApi('/api/v1/nodes'),
  getGuilds: () => fetchApi('/api/v1/guilds'),
  getGuildPlayer: (guildId) => fetchApi(`/api/v1/guilds/${encodeURIComponent(guildId)}/player`),
  getGuildConfig: (guildId) => fetchApi(`/api/v1/guilds/${encodeURIComponent(guildId)}/config`),
  updateGuildConfig: (guildId, data) =>
    fetchApi(`/api/v1/guilds/${encodeURIComponent(guildId)}/config`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  setGuildConfig: (guildId, data) =>
    fetchApi(`/api/v1/guilds/${encodeURIComponent(guildId)}/config`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  search: (query, source = 'ytmsearch') =>
    fetchApi(`/api/v1/search?query=${encodeURIComponent(query)}&source=${encodeURIComponent(source)}`),
  play: (guildId, data = {}) =>
    fetchApi(`/api/v1/guilds/${encodeURIComponent(guildId)}/player/play`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  pause: (guildId) =>
    fetchApi(`/api/v1/guilds/${encodeURIComponent(guildId)}/player/pause`, { method: 'POST' }),
  skip: (guildId) =>
    fetchApi(`/api/v1/guilds/${encodeURIComponent(guildId)}/player/skip`, { method: 'POST' }),
  stop: (guildId) =>
    fetchApi(`/api/v1/guilds/${encodeURIComponent(guildId)}/player/stop`, { method: 'POST' }),
  setVolume: (guildId, volume) =>
    fetchApi(`/api/v1/guilds/${encodeURIComponent(guildId)}/player/volume`, {
      method: 'POST',
      body: JSON.stringify({ volume }),
    }),
  seek: (guildId, positionMs) =>
    fetchApi(`/api/v1/guilds/${encodeURIComponent(guildId)}/player/seek`, {
      method: 'POST',
      body: JSON.stringify({ positionMs }),
    }),
  setFilter: (guildId, filter) =>
    fetchApi(`/api/v1/guilds/${encodeURIComponent(guildId)}/player/filter`, {
      method: 'POST',
      body: JSON.stringify({ filter }),
    }),
  toggleAutoplay: (guildId, enabled) =>
    fetchApi(`/api/v1/guilds/${encodeURIComponent(guildId)}/player/autoplay`, {
      method: 'POST',
      body: JSON.stringify({ enabled }),
    }),
  getAdminStats: () => fetchApi('/api/v1/admin/stats'),
  getAdminPlayers: () => fetchApi('/api/v1/admin/players'),
  getUserPlaylists: (userId) => fetchApi(`/api/v1/users/${encodeURIComponent(userId)}/playlists`),
  createPlaylist: (userId, data) =>
    fetchApi(`/api/v1/users/${encodeURIComponent(userId)}/playlists`, { method: 'POST', body: JSON.stringify(data) }),
  deletePlaylist: (userId, playlistId) =>
    fetchApi(`/api/v1/users/${encodeURIComponent(userId)}/playlists/${encodeURIComponent(playlistId)}`, { method: 'DELETE' }),
  getUserLikes: (userId) =>
    fetchApi(`/api/v1/users/${encodeURIComponent(userId)}/likes`),
  toggleUserLike: (userId, track) =>
    fetchApi(`/api/v1/users/${encodeURIComponent(userId)}/likes`, { method: 'POST', body: JSON.stringify({ track }) }),
};
