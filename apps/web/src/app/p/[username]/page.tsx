import { createSClient } from '@/supabase/server';
import type { Startup, Project } from '@/lib/types/supabase-types';
import { createClient } from '@/supabase/client';
import { Metadata } from 'next';
import { RemoveMarkdown } from '@dr/utils';

export async function generateStaticParams() {
  const supabase = createClient();

  const { data: profiles, error } = await supabase.from('profiles').select('username');

  if (error || !profiles) {
    return [];
  }

  return profiles
    .filter((profile) => typeof profile.username === 'string' && profile.username.trim() !== '')
    .map((profile) => ({
      username: profile.username,
    }));
}

const getNameBio = async (username: string) => {
  const supabase = createSClient();
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('full_name, shortbio, avatar_url, favicon_url')
    .eq('username', username)
    .single();

  if (profileError || !profile) {
    return null;
  }

  return profile;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  const results = await getNameBio(username);
  const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${username}`;

  return {
    title: `${results?.full_name}'s Portfolio`,
    description: RemoveMarkdown(results?.shortbio || results?.full_name! + "'s Portfolio"),
    icons: {
      icon: results?.favicon_url,
    },
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: `${results?.full_name}'s Portfolio`,
      description: RemoveMarkdown(results?.shortbio || results?.full_name! + "'s Portfolio"),
      url: fullUrl,
      images: [
        {
          url: results?.avatar_url!,
          width: 1200,
          height: 630,
          alt: `${results?.full_name}'s OpenGraph Image`,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: `${results?.full_name}'s Portfolio`,
      description: RemoveMarkdown(results?.shortbio || results?.full_name! + "'s Portfolio"),
      images: [results?.avatar_url!],
    },
  };
}

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
      case 'scifi':
        return (await import('@/templates/scifi/template')).default;
      case 'default':
        return (await import('@/templates/default/template')).default;
    }
  } catch (err) {
    console.error('Template load error:', err);
    return undefined;
  }
}
