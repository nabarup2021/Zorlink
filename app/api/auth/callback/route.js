import { NextResponse } from 'next/server';

export async function GET(req) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error || !code) {
    return NextResponse.redirect(`${url.origin}/?error=${error || 'no_code'}`);
  }

  const redirectUri = `${url.origin}/api/auth/callback`;
  const botApiUrl = process.env.AZELIA_API_URL || '';

  try {
    // Call Bot API to exchange code for user & mutual guilds
    const exchangeRes = await fetch(`${botApiUrl}/api/v1/auth/discord/exchange`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, redirect_uri: redirectUri }),
    });

    if (!exchangeRes.ok) {
      // Fallback redirect if bot is restarting
      return NextResponse.redirect(`${url.origin}/servers`);
    }

    const data = await exchangeRes.json();
    if (!data?.success || !data?.user) {
      return NextResponse.redirect(`${url.origin}/servers`);
    }

    const sessionData = {
      ...data.user,
      guilds: data.guilds || [],
    };

    const response = NextResponse.redirect(`${url.origin}/servers`);
    response.cookies.set('azelia_session', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });
    return response;
  } catch (err) {
    console.error('OAuth Exchange via Bot API Error:', err);
    return NextResponse.redirect(`${url.origin}/servers`);
  }
}
