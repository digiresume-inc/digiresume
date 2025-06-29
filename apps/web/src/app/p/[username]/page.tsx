import { createSClient } from '@/supabase/server';
import GridSingleTemplate from '@/templates/grid-single/template';
import DefualtTemplate from '@/templates/default/template';

import type {
  Startup,
  Project,
} from '@/lib/types/supabasetypes';


export default async function PortfolioPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const supabase = createSClient();
  const { data, error } = await supabase
    .from('profiles')
    .select(
      `
        *,
        startups (*),
        projects(*)
      `
    )
    .eq('username', username)
    .single();


  if (error || !data) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-destructive">
        <h1 className="font-extrabold text-5xl">{username}</h1>
      </div>
    );
  }

  let { startups, projects, ...profile } = data;
  startups.sort((a: Startup, b: Startup) => a.index - b.index);
  projects.sort((a: Project, b: Project) => a.index - b.index);

  const finalData = {
    ...profile,
    startups,
    projects,
  };

  if(profile.template_info.activeTemplate === 'default'){
    return <DefualtTemplate profile={finalData} />;
  }

  if(profile.template_info.activeTemplate === 'grid-single'){
    return <GridSingleTemplate profile={finalData} />;
  }
}
