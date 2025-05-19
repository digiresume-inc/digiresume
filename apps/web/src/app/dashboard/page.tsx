import { createSClient } from '@/supabase/server';
import React from 'react';
import UpdateForm from './components/updateForm';

export default async function Dashboard() {
  const supabase = createSClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase.from('profiles').select('*').eq('id', user?.id).single();
  return <UpdateForm profile={data} />;
}
