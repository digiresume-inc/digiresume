import { createSClient } from '@/supabase/server';
import React from 'react';
import {ProjectsClient} from './projects';

export default async function Projects() {
  const supabase = await createSClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if(!user){
    return <div>no user found</div>
  }
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user?.id)
    .order('index', { ascending: true });
  if (error) {
    return <div>error</div>;
  }
  return (
    <ProjectsClient projects={projects} />
  );
}
