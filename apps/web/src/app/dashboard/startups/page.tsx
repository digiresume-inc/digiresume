import { createSClient } from '@/supabase/server';
import React from 'react';
import {StartupsClient} from './startups';
import { getUser } from '@/supabase/getUser';

export default async function Startups() {
  const supabase = createSClient();
  const user = await getUser();
  
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
