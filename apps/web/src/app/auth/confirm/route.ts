import { createSClient } from '@/supabase/server';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const next = searchParams.get('next') ?? '/dashboard';

  if (token_hash && type) {
    const supabase = createSClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.verifyOtp({
      type: 'email',
      token_hash,
    });

    if (!error && user) {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();
      if (profile?.onboarding === 'pending') {
        redirect('/onboarding');
      } else {
        redirect(next);
      }
    }
  }

  redirect('/auth/auth-code-error');
}
