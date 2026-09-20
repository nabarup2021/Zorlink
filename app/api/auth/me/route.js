import { NextResponse } from 'next/server';

export async function GET(req) {
  const sessionCookie = req.cookies.get('azelia_session');

  if (!sessionCookie?.value) {
    return NextResponse.json({ authenticated: false, user: null });
  }

  try {
    const user = JSON.parse(sessionCookie.value);
    return NextResponse.json({ authenticated: true, user });
  } catch {
    return NextResponse.json({ authenticated: false, user: null });
  }
}
