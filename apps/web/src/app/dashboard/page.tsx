import { createSClient } from '@/supabase/server';
import React from 'react';
import UpdateForm from './components/updateForm';
import { Database } from '@/lib/types/supabasetypes';

type Profile = Database['public']['Tables']['profiles']['Row'];

export default async function Dashboard() {
  const supabase = createSClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase.from('profiles').select('*').eq('id', user?.id).single();
  if (error) {
    return <div>error</div>;
  }
  return <UpdateForm profile={data} />;
}
