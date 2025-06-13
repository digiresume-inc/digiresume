import { createSClient } from '@/supabase/server';
import React from 'react';
import Dashboard from './dashboard';
import type { Database } from '@/lib/types/supabasetypes';
import { redirect } from 'next/navigation';

type Startup = Database['public']['Tables']['startups']['Row'];
type Project = Database['public']['Tables']['projects']['Row'];

export default async function DashboardPage() {
  const supabase = createSClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/signin');
  }

  const { data, error } = await supabase
    .from('profiles')
    .select(
      `
    *,
    startups ( * ),
    projects ( * )
  `
    )
    .eq('id', user.id)
    .single();

  if (error) {
    return <div>error</div>;
  }

  let startups = data.startups.sort((a: Startup, b: Startup) => a.index - b.index);
  let projects = data.projects.sort((a: Project, b: Project) => a.index - b.index);

  return (
    <div className="w-full h-full">
      <Dashboard user={user} profile={data} startups={startups} projects={projects} />
    </div>
  );
}
