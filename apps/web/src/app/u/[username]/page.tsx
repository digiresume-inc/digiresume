import GitHubCalendarClient from '@/components/githubcalendar';
import { createSClient } from '@/supabase/server';
import { redis } from '@/redis/config';
import { Badge } from '@lf/ui/components/base/badge';
import { Card, CardContent } from '@lf/ui/components/base/card';
import { Skill } from '@lf/utils';
import React from 'react';

export default async function UsernamePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  let profile;

  try {
    const cached = await redis.get(`profile:${username}`);

    if (cached) {
      profile = typeof cached === 'string' ? JSON.parse(cached) : cached;
    } else {
      const supabase = createSClient();
      const { data, error } = await supabase
        .from('profiles')
        .select(
          `
        *,
        startups (
          id,
          name,
          url,
          description
        )
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

      profile = data;

      await redis.set(`profile:${username}`, JSON.stringify(profile), {
        ex: 21600,
      });
    }
  } catch (err) {
    console.error('Redis or Supabase error:', err);
    return (
      <div className="h-screen w-full flex items-center justify-center bg-destructive">
        <h1 className="font-extrabold text-5xl">Error loading {username}</h1>
      </div>
    );
  }

  return renderProfile(profile, username);
}

function renderProfile(profile: any, username: string) {
  return (
    <div className="min-h-screen w-full flex flex-col gap-4 items-center justify-center">
      <h1 className="font-extrabold text-5xl">{username}</h1>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {profile.skills.map((skill: Skill) => (
          <Badge
            key={skill.value}
            variant="secondary"
            className="flex items-center gap-1 rounded-full"
          >
            <img src={skill.logo} alt={skill.label} className="h-3 w-3" />
            {skill.label}
          </Badge>
        ))}
      </div>

      <div>
        {profile.startups.map((startup: any, index: number) => (
          <Card key={index} className="w-84">
            <CardContent>
              <h1 className="font-bold text-2xl">{startup.name}</h1>
              <h1 className="font-medium text-lg">{startup.url}</h1>
              <h1 className="font-light text-base">{startup.description}</h1>
            </CardContent>
          </Card>
        ))}
      </div>

      <GitHubCalendarClient username="steven-tey" />
    </div>
  );
}
