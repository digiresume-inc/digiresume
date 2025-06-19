'use client';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/supabase/client';
import { Button } from '@dr/ui/components/base/button';
import Loader from '@/components/general/loader';

interface GoogleSignin {
  isLoginLoading: boolean;
  isGoogleLoading: boolean;
  setIsGoogleLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GoogleSignin({
  isLoginLoading,
  isGoogleLoading,
  setIsGoogleLoading,
}: GoogleSignin) {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const next = searchParams.get('next');

  async function signInWithGoogle() {
    setIsGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback${
            next ? `?next=${encodeURIComponent(next)}` : ''
          }`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      setIsGoogleLoading(false);
    }
  }

  return (
    <Button
      onClick={signInWithGoogle}
      disabled={isGoogleLoading || isLoginLoading}
      variant="secondary"
      className="w-full border border-foreground/20 h-[38px] cursor-pointer"
    >
      {isGoogleLoading ? (
        <>
          <Loader />
          Loading google...
        </>
      ) : (
        <>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/250px-Google_Favicon_2025.svg.png"
            className="w-[20px] h-[20px]"
          />
          Continue with Google
        </>
      )}
    </Button>
  );
}
