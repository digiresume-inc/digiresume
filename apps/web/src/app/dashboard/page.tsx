import { createSClient } from '@/supabase/server';
import React from 'react';
import UpdateForm from './components/updateForm';
import { Database } from '@/lib/types/supabasetypes';
import { Startup } from '@lf/utils';

type Profile = Database['public']['Tables']['profiles']['Row'];

export default async function Dashboard() {
  const supabase = createSClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('profiles')
    .select(
      `
    *,
    startups ( * )
  `
    )
    .eq('id', user?.id)
    .single();

  if (error) {
    return <div>error</div>;
  }

  let startups = data.startups.sort((a: Startup, b: Startup) => a.index - b.index);

  return <UpdateForm profile={data} startups={startups} />;
}
