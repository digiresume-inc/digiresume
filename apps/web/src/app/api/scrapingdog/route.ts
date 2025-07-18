// app/api/linkedin/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { username } = await req.json();

  const linkedInUsernameRegex = /^[a-zA-Z0-9-]+$/;

  if (!linkedInUsernameRegex.test(username)) {
    return NextResponse.json({ error: 'Invalid LinkedIn username format' }, { status: 400 });
  }

  const linkedin_profile_url = `https://www.linkedin.com/in/${username}`;

  try {
    const apiKey = process.env.SCRAPING_DOG_API_TOKEN;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing ScrapingDog API key' }, { status: 500 });
    }

    const scrapingDogUrl = 'https://api.scrapingdog.com/linkedin';

    // Extract LinkedIn username or linkId from the full URL
    const linkId = linkedin_profile_url.split('linkedin.com/in/')[1]?.replace(/\/$/, '');

    if (!linkId) {
      return NextResponse.json({ error: 'Unable to extract LinkedIn ID from URL' }, { status: 400 });
    }

    const params = new URLSearchParams({
      api_key: apiKey,
      type: 'profile',
      linkId: linkId,
      premium: 'false',
    });

    const response = await fetch(`${scrapingDogUrl}?${params.toString()}`);

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({ error: 'ScrapingDog call failed', details: text }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: 'Unexpected error', message: error.message }, { status: 500 });
  }
}
