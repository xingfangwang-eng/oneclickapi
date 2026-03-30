import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_ORIGINS = ['http://localhost:3000', 'https://oneclickapi.dev'];

const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000,
  max: 100
};

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export async function POST(request: NextRequest) {
  try {
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }
    
    const origin = request.headers.get('origin');
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json(
        { error: 'CORS origin not allowed' },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    const { url, method = 'GET', headers, requestBody } = body;

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const fetchOptions: RequestInit = {
      method,
      headers: headers || {},
      signal: controller.signal,
    };

    if (requestBody && method !== 'GET' && method !== 'HEAD') {
      fetchOptions.body = requestBody;
    }

    const response = await fetch(url, fetchOptions);
    clearTimeout(timeoutId);

    const responseData = await response.text();

    const nextResponse = NextResponse.json(
      {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: responseData,
      },
      { status: 200 }
    );
    
    nextResponse.headers.set('Access-Control-Allow-Origin', origin || '*');
    nextResponse.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    nextResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return nextResponse;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timeout after 5 seconds' },
        { status: 408 }
      );
    }

    console.error('Proxy error:', error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const rateLimitData = rateLimitStore.get(ip);
  
  if (!rateLimitData) {
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs
    });
    return true;
  }
  
  if (now > rateLimitData.resetTime) {
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs
    });
    return true;
  }
  
  if (rateLimitData.count >= RATE_LIMIT.max) {
    return false;
  }
  
  rateLimitStore.set(ip, {
    ...rateLimitData,
    count: rateLimitData.count + 1
  });
  
  return true;
}