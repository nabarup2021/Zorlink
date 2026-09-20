export const SUPERUSER_IDS = [
  '876743202051346432',
  '1427743346562043937',
];

export const CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || '';

export const BOT_INVITE_URL = (guildId = null) => {
  if (!CLIENT_ID) return 'https://discord.com/oauth2/authorize?scope=bot+applications.commands';
  const base = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&permissions=4820258979704064&scope=bot+applications.commands`;
  return guildId ? `${base}&guild_id=${guildId}` : base;
};

export const AZELIA_SUPPORT_URL = 'https://discord.gg/mfKEF3uQqU';
export const AZELIA_ACCENT = '#7F00FF';
