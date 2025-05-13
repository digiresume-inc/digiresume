import { NextResponse } from 'next/server';
// The client you created from the Server-Side Auth instructions
import { createSClient } from '@/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = createSClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development';
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (profile?.onboarding === 'pending') {
        if (isLocalEnv) {
          return NextResponse.redirect(`${origin}/onboarding`);
        } else if (forwardedHost) {
          return NextResponse.redirect(`https://${forwardedHost}/onboarding`);
        } else {
          return NextResponse.redirect(`${origin}/onboarding`);
        }
      }

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
