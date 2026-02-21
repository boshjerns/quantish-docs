import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'https://api.quantish.live';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { method, path, apiKey, body: requestBody } = body;

    // Build full URL
    const url = `${API_BASE_URL}${path}`;

    // Build headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (apiKey) {
      headers['x-api-key'] = apiKey;
    }

    // Make request
    const res = await fetch(url, {
      method,
      headers,
      body: requestBody && Object.keys(requestBody).length > 0
        ? JSON.stringify(requestBody)
        : undefined,
    });

    const text = await res.text();

    return new NextResponse(text, {
      status: res.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: { message: error instanceof Error ? error.message : 'Proxy request failed' } },
      { status: 500 }
    );
  }
}

// Handle CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
