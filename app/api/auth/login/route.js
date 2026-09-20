import { NextResponse } from 'next/server';

export async function GET(req) {
  const clientId = process.env.DISCORD_CLIENT_ID || '1381153133568331777';
  const url = new URL(req.url);
  const redirectUri = `${url.origin}/api/auth/callback`;

  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=identify%20guilds`;

  return NextResponse.redirect(discordAuthUrl);
}
