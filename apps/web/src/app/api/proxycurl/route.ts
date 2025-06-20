import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { username } = await req.json();

  const linkedInUsernameRegex = /^[a-zA-Z0-9-]+$/;

  if (!linkedInUsernameRegex.test(username)) {
    return NextResponse.json({ error: 'Invalid LinkedIn username format' }, { status: 400 });
  }

  const linkedin_profile_url = `https://www.linkedin.com/in/${username}`;

  try {
    const token = process.env.PROXYCURL_API_TOKEN;
    if (!token) {
      return NextResponse.json({ error: 'Missing Proxycurl API key' }, { status: 500 });
    }

    const queryString = [
      `url=${linkedin_profile_url}`, // not encoded
      'fallback_to_cache=on-error',
      'use_cache=if-present',
      'skills=include',
      'inferred_salary=include',
      'extra=include',
      'personal_email=include',
    ].join('&');

    const fullUrl = `https://nubela.co/proxycurl/api/v2/linkedin?${queryString}`;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: 'Proxycurl API error', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Unexpected error', message: error.message },
      { status: 500 }
    );
  }
}
