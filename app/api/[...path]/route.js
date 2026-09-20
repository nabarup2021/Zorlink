import { NextResponse } from 'next/server';

const API_HOST = process.env.AZELIA_API_HOST || '';
const API_KEY = process.env.AZELIA_API_KEY || '';

async function proxyRequest(request, { params }) {
  const pathSegments = params.path || [];
  const endpoint = `/api/v1/${pathSegments.join('/')}`;
  const { search } = new URL(request.url);

  const targetUrl = `${API_HOST.replace(/\/$/, '')}${endpoint}${search}`;

  if (!API_HOST) {
    return NextResponse.json({ success: false, error: 'Azelia API bridge is not configured' }, { status: 503 });
  }


  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  };

  try {
    const options = {
      method: request.method,
      headers,
    };

    if (request.method === 'POST' || request.method === 'PUT') {
      const bodyText = await request.text().catch(() => '');
      if (bodyText) options.body = bodyText;
    }

    const res = await fetch(targetUrl, options);
    const data = await res.json().catch(() => ({ success: false, error: `HTTP ${res.status}` }));

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error(`API Proxy Error on ${endpoint}:`, error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Proxy Error' },
      { status: 500 }
    );
  }
}

export async function GET(request, context) {
  return proxyRequest(request, context);
}

export async function POST(request, context) {
  return proxyRequest(request, context);
}

export async function PUT(request, context) {
  return proxyRequest(request, context);
}

export async function DELETE(request, context) {
  return proxyRequest(request, context);
}
