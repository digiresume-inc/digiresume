import { createSClient } from '@/supabase/server';
import React from 'react';
import ProjectsDisplay from './components/projectsDisplay';
import ProjectsPreviewComponent from './components/projectsPreviewComponent';

export default async function Startups() {
  const supabase = createSClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user?.id)
    .order('index', { ascending: true });
  if (error) {
    return <div>error</div>;
  }
  return (
    <div className="relative flex flex-col lg:flex-row h-screen w-full max-w-7xl mx-auto gap-4">
      <div className="lg:w-[60%] w-full h-screen px-4 py-6 no_scrollbar scrollbar-hidden overflow-y-auto">
        <ProjectsDisplay projects={projects} />
      </div>
      <ProjectsPreviewComponent projects={projects} />
    </div>
  );
}
