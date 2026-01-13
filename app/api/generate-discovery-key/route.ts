import { NextRequest, NextResponse } from 'next/server';

const DISCOVERY_ADMIN_SECRET = process.env.DISCOVERY_ADMIN_SECRET || 'Ivsienavzirowvafimqgkvejanv';
const DISCOVERY_API_URL = process.env.DISCOVERY_API_URL || 'https://quantish.live';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Call the Discovery server's admin API to generate key
    const response = await fetch(`${DISCOVERY_API_URL}/api/admin/generate-api-key`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Secret': DISCOVERY_ADMIN_SECRET,
      },
      body: JSON.stringify({
        name: name || 'Docs Generated Key',
        email,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Failed to generate API key' },
        { status: response.status }
      );
    }

    // Return only the necessary data
    return NextResponse.json({
      success: true,
      key: data.key,
      keyPrefix: data.keyPrefix,
      name: data.name,
      usage: data.usage,
    });
  } catch (error) {
    console.error('Discovery key generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
