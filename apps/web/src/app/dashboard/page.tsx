import { createSClient } from '@/supabase/server';
import React from 'react';
import { Project, Startup } from '@lf/utils';
import DashboardHome from './dashboardHome';


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
    startups ( * ),
    projects ( * )
  `
    )
    .eq('id', user?.id)
    .single();

  if (error) {
    return <div>error</div>;
  }

  let startups = data.startups.sort((a: Startup, b: Startup) => a.index - b.index);
  let projects = data.projects.sort((a: Project, b: Project) => a.index - b.index);

  return (
    <div className="w-full h-full">
      <DashboardHome profile={data} startups={startups} projects={projects} />
    </div>
  );
}
