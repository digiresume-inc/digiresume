import { createSClient } from '@/supabase/server';
import dynamic from 'next/dynamic';
import type { Startup, Project } from '@/lib/types/supabasetypes';

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

  const template = profile.template_info.activeTemplate;

  const DynamicTemplate = await importTemplate(template);
  if (!DynamicTemplate) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-destructive">
        <h1 className="font-extrabold text-5xl">Template not found</h1>
      </div>
    );
  }

  return <DynamicTemplate profile={finalData} />;
}

async function importTemplate(template: string) {
  try {
    switch (template) {
      case 'grid-single':
        return (await import('@/templates/grid-single/template')).default;
      case 'default':
        return (await import('@/templates/default/template')).default;
    }
  } catch (err) {
    console.error('Template load error:', err);
    return undefined;
  }
}
