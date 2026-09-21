export const CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || '';

export const BOT_INVITE_URL = (guildId = null) => {
  const base = CLIENT_ID
    ? `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&permissions=4820258979704064&scope=bot+applications.commands`
    : 'https://discord.com/oauth2/authorize?scope=bot+applications.commands';

  return guildId ? `${base}&guild_id=${encodeURIComponent(guildId)}` : base;
};

export const AZELIA_SUPPORT_URL = 'https://discord.gg/mfKEF3uQqU';
export const AZELIA_ACCENT = '#7F00FF';
