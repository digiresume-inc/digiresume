// app/api/linkedin/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url || !url.includes('linkedin.com/in/')) {
    return NextResponse.json({ error: 'Invalid LinkedIn URL' }, { status: 400 });
  }

  try {
    const apifyToken = process.env.APIFY_TOKEN;
    if (!apifyToken) {
      return NextResponse.json({ error: 'Missing Apify token' }, { status: 500 });
    }

    const apifyUrl = `https://api.apify.com/v2/acts/curious_coder~linkedin-profile-scraper/run-sync-get-dataset-items?token=${apifyToken}`;

    // Optional: load cookies from env (recommended) or database
    const cookieJson = process.env.LINKEDIN_COOKIES_BASE64;
    const cookies = cookieJson ? JSON.parse(Buffer.from(cookieJson, 'base64').toString()) : [];

    const payload = {
      urls: [url],
      cookie: cookies,
      proxy: {
        useApifyProxy: true,
        apifyProxyGroups: ['RESIDENTIAL'],
      },
    };

    const apifyRes = await fetch(apifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!apifyRes.ok) {
      const text = await apifyRes.text();
      return NextResponse.json({ error: 'Apify call failed', details: text }, { status: apifyRes.status });
    }

    const data = await apifyRes.json();
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: 'Unexpected error', message: error.message }, { status: 500 });
  }
}
