import { createSClient } from '@/supabase/server';
import React from 'react';
import {ProjectsClient} from './projects';
import { getUser } from '@/supabase/getUser';

export default async function Projects() {
  const supabase = createSClient();
  const user = await getUser();


  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id)
    .order('index', { ascending: true });
  if (error) {
    return <div>error</div>;
  }
  return (
    <ProjectsClient projects={projects} />
  );
}
