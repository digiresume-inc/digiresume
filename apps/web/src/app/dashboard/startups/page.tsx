import { createSClient } from '@/supabase/server';
import React from 'react';
import {StartupsClient} from './startups';

export default async function Startups() {
  const supabase = await createSClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if(!user){
    return <div>no user found</div>
  }
  const { data: startups, error } = await supabase
    .from('startups')
    .select('*')
    .eq('user_id', user?.id)
    .order('index', { ascending: true });
  if (error) {
    return <div>error</div>;
  }
  return (
    <StartupsClient startups={startups}/>
  );
}
