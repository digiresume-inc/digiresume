import { createSClient } from '@/supabase/server';
import { redirect } from 'next/navigation';
import LoginForm from './loginform';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { username = '' } = await searchParams

  const supabase = createSClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) {
    redirect('/dashboard/home');
  }

  return (
    <div className="h-screen w-full flex items-center justify-center lg:justify-start">
      <div className="w-full max-w-md lg:ml-[20%] px-6 lg:px-0">
        <LoginForm username={username}/>
      </div>
    </div>
  );
}
