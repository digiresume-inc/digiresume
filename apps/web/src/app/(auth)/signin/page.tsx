import { createSClient } from '@/supabase/server';
import { redirect } from 'next/navigation';
import LoginForm from './loginform';
import { GridGradient } from '@dr/ui/components/base/grid-gradient';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { username = '' } = await searchParams

  const supabase = createSClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) {
    redirect('/dashboard');
  }

  return (
    <div className="h-screen w-full flex items-center justify-center lg:justify-start relative">
      <GridGradient className='h-[350px]' />
      <div className="w-full max-w-md px-6 lg:px-0 mx-auto relative z-1">
        <LoginForm username={username}/>
      </div>
    </div>
  );
}
