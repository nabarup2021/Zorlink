export async function fetchApi(path, options = {}) {
  const url = `/api${path.replace(/^\/api\/v1/, '')}`;

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  try {
    const res = await fetch(url, { ...options, headers });
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
  getStatus: () => fetchApi('/api/v1/status'),
  getTopSongs: () => fetchApi('/api/v1/top-songs'),
  getRecommendations: (genre = 'trending', userId = null) =>
    fetchApi(`/api/v1/recommendations?genre=${genre}${userId ? `&userId=${userId}` : ''}`),
  getTeam: () => fetchApi('/api/v1/team'),
  authUser: (userId) => fetchApi(`/api/v1/auth/user?userId=${userId}`),
  getNodes: () => fetchApi('/api/v1/nodes'),
  getGuilds: () => fetchApi('/api/v1/guilds'),
  getGuildPlayer: (guildId) => fetchApi(`/api/v1/guilds/${guildId}/player`),
  getGuildConfig: (guildId) => fetchApi(`/api/v1/guilds/${guildId}/config`),
  updateGuildConfig: (guildId, data) =>
    fetchApi(`/api/v1/guilds/${guildId}/config`, { method: 'POST', body: JSON.stringify(data) }),
  setGuildConfig: (guildId, data) =>
    fetchApi(`/api/v1/guilds/${guildId}/config`, { method: 'POST', body: JSON.stringify(data) }),
  search: (query, source = 'ytmsearch') =>
    fetchApi(`/api/v1/search?query=${encodeURIComponent(query)}&source=${source}`),
  play: (guildId, data) =>
    fetchApi(`/api/v1/guilds/${guildId}/player/play`, { method: 'POST', body: JSON.stringify(data) }),
  pause: (guildId) => fetchApi(`/api/v1/guilds/${guildId}/player/pause`, { method: 'POST' }),
  skip: (guildId) => fetchApi(`/api/v1/guilds/${guildId}/player/skip`, { method: 'POST' }),
  stop: (guildId) => fetchApi(`/api/v1/guilds/${guildId}/player/stop`, { method: 'POST' }),
  setVolume: (guildId, volume) =>
    fetchApi(`/api/v1/guilds/${guildId}/player/volume`, { method: 'POST', body: JSON.stringify({ volume }) }),
  seek: (guildId, positionMs) =>
    fetchApi(`/api/v1/guilds/${guildId}/player/seek`, { method: 'POST', body: JSON.stringify({ positionMs }) }),
  setFilter: (guildId, filter) =>
    fetchApi(`/api/v1/guilds/${guildId}/player/filter`, { method: 'POST', body: JSON.stringify({ filter }) }),
  toggleAutoplay: (guildId, enabled) =>
    fetchApi(`/api/v1/guilds/${guildId}/player/autoplay`, { method: 'POST', body: JSON.stringify({ enabled }) }),
  getAdminStats: () => fetchApi('/api/v1/admin/stats'),
  getAdminPlayers: () => fetchApi('/api/v1/admin/players'),
  getUserPlaylists: (userId) => fetchApi(`/api/v1/users/${userId}/playlists`),
  createPlaylist: (userId, data) =>
    fetchApi(`/api/v1/users/${userId}/playlists`, { method: 'POST', body: JSON.stringify(data) }),
  deletePlaylist: (userId, playlistId) =>
    fetchApi(`/api/v1/users/${userId}/playlists/${playlistId}`, { method: 'DELETE' }),
  getUserLikes: (userId) => fetchApi(`/api/v1/users/${userId}/likes`),
  toggleUserLike: (userId, track) =>
    fetchApi(`/api/v1/users/${userId}/likes`, { method: 'POST', body: JSON.stringify({ track }) }),
};
