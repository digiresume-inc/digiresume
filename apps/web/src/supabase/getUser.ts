import { redirect } from 'next/navigation';
import { createSClient } from './server';

export async function getUser() {
  const supabase = createSClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/signin');
  }

  return user;
}
