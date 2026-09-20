import { NextResponse } from 'next/server';

export async function POST(req) {
  const url = new URL(req.url);
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  response.cookies.delete('azelia_session');
  return response;
}
