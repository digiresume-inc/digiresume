import { createSClient } from '@/supabase/server';
import { redirect } from 'next/navigation';
import LoginForm from './login-form';
import { GridGradient } from '@dr/ui/components/base/grid-gradient';
import Image from 'next/image';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { username = '' } = await searchParams;

  const supabase = createSClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) {
    redirect('/dashboard');
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-background relative">
      <GridGradient className="h-[350px]" />
      <div className="flex w-full max-w-7xl mx-auto h-full">
        <div className="w-full lg:w-1/2 flex items-center justify-center relative px-6">
          <div className="w-full max-w-md z-10">
            <LoginForm username={username} />
            <span className="flex items-start justify-center gap-1 p-2 bg-[linear-gradient(to_right,transparent,var(--text-background),transparent)]">
              <img
                className="w-6"
                src="https://em-content.zobj.net/source/microsoft-teams/337/fire_1f525.png"
              />
              <p className="mt-0.5 text-foreground/70 bricolage">10K+ users getting noticed</p>
            </span>
          </div>
        </div>
        <div className="hidden lg:flex w-1/2 h-full items-center justify-center bg-transparent relative">
          <Image
            width={1024}
            height={1024}
            src="/product_showcase/login_cover.png"
            alt="Cover"
            className="object-cover w-full h-full"
            priority
          />
          {/* <div className="absolute bottom-24 right-0 h-24 w-full bg-gradient-to-t from-background/70 to-transparent" /> */}
        </div>
      </div>
    </div>
  );
}
