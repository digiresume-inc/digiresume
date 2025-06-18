'use client';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/supabase/client';
import { Button } from '@dr/ui/components/base/button';

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
          <span>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
          Loading google...
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Continue with Google
        </>
      )}
    </Button>
  );
}
