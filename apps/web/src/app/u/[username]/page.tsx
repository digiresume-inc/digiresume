import GitHubCalendarClient from '@/components/githubcalendar';
import { createSClient } from '@/supabase/server';
import { redis } from '@/redis/config';
import { Badge } from '@lf/ui/components/base/badge';
import {
  formatMonthShortYear,
  formatMonthYear,
  getLineHeightPercent,
  getMonthsDifference,
  Skill,
} from '@lf/utils';
import React from 'react';
import { Info, MapPin, File, Link2 } from 'lucide-react';
import { BiRupee } from 'react-icons/bi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@lf/ui/components/base/tabs';
import { SiGithub, SiLinkedin, SiX } from 'react-icons/si';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@lf/ui/components/base/hover-card';
import { Popover, PopoverTrigger, PopoverContent } from '@lf/ui/components/base/popover';

export default async function UsernamePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  let profile;

  try {
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
    // const cached = await redis.get(`profile:${username}`);

    // if (cached) {
    //   profile = typeof cached === 'string' ? JSON.parse(cached) : cached;
    // } else {
    //   const supabase = createSClient();
    //   const { data, error } = await supabase
    //     .from('profiles')
    //     .select(
    //       `
    //     *,
    //     startups (
    //       id,
    //       name,
    //       url,
    //       description
    //     )
    //   `
    //     )
    //     .eq('username', username)
    //     .single();

    //   if (error || !data) {
    //     return (
    //       <div className="h-screen w-full flex items-center justify-center bg-destructive">
    //         <h1 className="font-extrabold text-5xl">{username}</h1>
    //       </div>
    //     );
    //   }

    //   profile = data;

    //   await redis.set(`profile:${username}`, JSON.stringify(profile), {
    //     ex: 21600,
    //   });
    // }
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
    <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5">
          <div className="flex flex-col max-w-[960px] flex-1">
            <div className="flex p-4">
              <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
                <div className="flex gap-4 items-center justify-center lg:justify-start">
                  <img
                    className="rounded-full h-18 lg:h-24 w-18 lg:w-24"
                    src={profile.avatar_url}
                  />
                  <div className="flex flex-col justify-center gap-1.5">
                    <p className="text-xl lg:text-2xl font-bold leading-tight tracking-[-0.015em]">
                      {profile.full_name}
                    </p>
                    <p className="flex items-center justify-start text-sm font-normal gap-0.5 lg:gap-1">
                      <MapPin className="w-3 lg:w-[14px] h-3 lg:h-[14px]" />{' '}
                      {profile.country.split('-')[0]}{' '}
                      <img
                        src={`https://flagsapi.com/${profile.country.split('-')[1]}/flat/64.png`}
                        className="w-4 lg:w-5 h-4 lg:h-5"
                      />
                      <span className="w-px h-4 bg-primary/70 mx-1 lg:mx-2" />
                      <span className="flex items-center gap-0.5">
                        <BiRupee className="w-4 h-4 mt-[1px]" />
                        <span className="-ml-0.5">10cr/month</span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center lg:items-start justify-center p-4">
              <h1 className="text-base lg:text-2xl font-bold">Full Stack Web/App Developer</h1>
              <p className="text-sm text-muted-foreground">Contributor @Dub.co · VBIT Alumni</p>
            </div>
            <div className="flex items-center justify-center lg:justify-start lg:items-start p-4 gap-3">
              {profile.resume_url && (
                <a
                  href={profile.resume_url}
                  target="_blank"
                  className="flex items-center gap-1 text-sm lg:text-base border-b-2 border-dashed text-foreground/80 border-primary/70 hover:border-primary hover:text-foreground transition"
                >
                  <File strokeWidth={1} size={16} />
                  Resume
                </a>
              )}
              {profile.profile_link?.url && profile.profile_link.text && (
                <a
                  href={profile.profile_link?.url}
                  target="_blank"
                  className="flex items-center gap-1 text-sm lg:text-base border-b-2 border-dashed text-foreground/80 border-primary/70 hover:border-primary hover:text-foreground transition"
                >
                  <Link2 strokeWidth={1} size={16} />
                  {profile.profile_link.text}
                </a>
              )}
            </div>
            <div className="flex gap-x-2 gap-y-3 p-4 flex-wrap items-center justify-center lg:justify-start">
              {profile.skills.map((skill: Skill) => (
                <Badge
                  key={skill.value}
                  variant="secondary"
                  className="flex items-center gap-1 rounded-full text-xs px-3 py-1"
                >
                  <img src={skill.logo} alt={skill.label} className="h-4 w-4 rounded-md" />
                  {skill.label}
                </Badge>
              ))}
            </div>
            <Tabs defaultValue="experience" className="w-full mt-8 p-4">
              <div className="relative rounded-sm overflow-x-scroll h-10 no_scrollbar scrollbar-hidden">
                <TabsList className="absolute flex flex-row justify-stretch w-full bg-background">
                  <TabsTrigger
                    value="experience"
                    className="flex flex-col items-center justify-center border-t-0 border-r-0 border-l-0 border-b-[3px] border-transparent data-[state=active]:border-primary text-muted-foreground data-[state=active]:text-foreground pb-[20px] pt-4 text-sm font-bold tracking-[0.015em] bg-transparent rounded-none focus-visible:ring-0 focus-visible:outline-none"
                  >
                    Experience
                  </TabsTrigger>
                  <TabsTrigger
                    value="startups"
                    className="flex flex-col items-center justify-center border-t-0 border-r-0 border-l-0 border-b-[3px] border-transparent data-[state=active]:border-primary text-muted-foreground data-[state=active]:text-foreground pb-[20px] pt-4 text-sm font-bold tracking-[0.015em] bg-transparent rounded-none focus-visible:ring-0 focus-visible:outline-none"
                  >
                    Startups
                  </TabsTrigger>
                  <TabsTrigger
                    value="projects"
                    className="flex flex-col items-center justify-center border-t-0 border-r-0 border-l-0 border-b-[3px] border-transparent data-[state=active]:border-primary text-muted-foreground data-[state=active]:text-foreground pb-[20px] pt-4 text-sm font-bold tracking-[0.015em] bg-transparent rounded-none focus-visible:ring-0 focus-visible:outline-none"
                  >
                    Projects
                  </TabsTrigger>
                  <TabsTrigger
                    value="skills"
                    className="flex flex-col items-center justify-center border-t-0 border-r-0 border-l-0 border-b-[3px] border-transparent data-[state=active]:border-primary text-muted-foreground data-[state=active]:text-foreground pb-[20px] pt-4 text-sm font-bold tracking-[0.015em] bg-transparent rounded-none focus-visible:ring-0 focus-visible:outline-none"
                  >
                    Skills
                  </TabsTrigger>
                  <TabsTrigger
                    value="more"
                    className="flex flex-col items-center justify-center border-t-0 border-r-0 border-l-0 border-b-[3px] border-transparent data-[state=active]:border-primary text-muted-foreground data-[state=active]:text-foreground pb-[20px] pt-4 text-sm font-bold tracking-[0.015em] bg-transparent rounded-none focus-visible:ring-0 focus-visible:outline-none"
                  >
                    More
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="experience">
                {' '}
                <div className="mt-6 pl-2 lg:pl-4">
                  {profile.experience.map((company: any, companyIndex: any) => {
                    const lineHeight = getLineHeightPercent(company.roles.length);

                    return (
                      <div className="group relative mb-4" key={companyIndex}>
                        <div
                          style={{
                            height: lineHeight,
                          }}
                          className="absolute w-[1.5px] bg-primary top-[50px] left-[19px]"
                        />
                        <div className="w-full flex justify-between">
                          <div className="flex items-center gap-2 relative">
                            <img
                              alt={company.company}
                              className="cursor-pointer w-10 h-10 rounded-full flex justify-center items-center object-cover hover:opacity-90 transition-opacity border-primaryBorder flex-grow border"
                              src={company.company_logo}
                            />
                            <p className="font-bold text-base lg:text-lg truncate">
                              {company.company}
                            </p>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Info
                                  strokeWidth={1}
                                  size={16}
                                  className="text-muted-foreground cursor-pointer"
                                />
                              </PopoverTrigger>
                              <PopoverContent className="w-80 text-xs font-medium mt-4 relative">
                                {company.contribution}
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>

                        {company.roles.map((role: any, roleIndex: any) => (
                          <div
                            key={roleIndex}
                            className="relative w-full transition-colors duration-200 flex flex-col items-center py-4 pl-8"
                          >
                            <div className="w-full flex relative">
                              <div className="w-4 h-3 border-l-2 border-b-2 rounded-bl-lg absolute -left-[13px] border-primary" />
                              <div className="w-full flex ml-3 lg:ml-4">
                                <div className="group w-full duration-300 ease-in-out rounded-2xl outline-none transition-shadow group b-0 ">
                                  <div
                                    className="w-full group flex items-center relative text-left cursor-default p-0"
                                    role="none"
                                  >
                                    <div className="w-full flex flex-col gap-2">
                                      <div className="flex items-center justify-between w-full">
                                        <Popover>
                                          <PopoverTrigger asChild>
                                            <div className="w-full flex flex-col gap-1">
                                              <div className="flex items-center gap-2 truncate overflow-hidden">
                                                <span className="flex items-center justify-start gap-1 truncate overflow-hidden whitespace-nowrap">
                                                  <p className="font-semibold text-sm truncate max-w-46 sm:max-w-fit">
                                                    {role.headline}
                                                  </p>
                                                  <p>•</p>
                                                  <span className="text-xs text-muted-foreground truncate max-w-16 lg:max-w-fit">
                                                    {role.employment_type}
                                                  </span>
                                                </span>
                                              </div>
                                              <p className="text-muted-foreground font-normal text-xs truncate overflow-hidden whitespace-nowrap max-w-58 sm:max-w-fit">
                                                <strong className="truncate overflow-hidden">
                                                  {formatMonthShortYear(role.start_date)} -{' '}
                                                  {role.end_date
                                                    ? formatMonthShortYear(role.end_date)
                                                    : 'Present'}
                                                  {role.end_date && (
                                                    <span className="ml-0.5">
                                                      (
                                                      {getMonthsDifference(
                                                        role.start_date,
                                                        role.end_date
                                                      )}
                                                      )
                                                    </span>
                                                  )}
                                                  <span className="mx-0.5">•</span>
                                                  <span className="font-normal">
                                                    {role.location}, {role.location_type}
                                                  </span>
                                                </strong>
                                              </p>
                                            </div>
                                          </PopoverTrigger>
                                          <PopoverContent className="text-sm font-medium block sm:hidden">
                                            <ul className="list-disc pl-4 space-y-1">
                                              <li>{role.headline}</li>
                                              <li>{role.employment_type}</li>
                                              <li>
                                                {formatMonthYear(role.start_date)}
                                                <span className="mx-1">-</span>
                                                {role.end_date
                                                  ? formatMonthYear(role.end_date)
                                                  : 'Present'}
                                                {role.end_date && (
                                                  <span className="mx-1">
                                                    (
                                                    {getMonthsDifference(
                                                      role.start_date,
                                                      role.end_date
                                                    )}
                                                    )
                                                  </span>
                                                )}
                                              </li>
                                              <li>{role.location}</li>
                                              <li>{role.location_type}</li>
                                            </ul>
                                          </PopoverContent>
                                        </Popover>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
              <TabsContent value="startups">...</TabsContent>
              <TabsContent value="projects">...</TabsContent>
            </Tabs>
            <div className="@container">
              <div className="gap-2 px-4 flex flex-wrap justify-start">
                <div className="flex flex-col items-center gap-2  py-2.5 text-center w-20">
                  <SiX />
                  <p className=" text-sm font-medium leading-normal">Twitter</p>
                </div>
                <div className="flex flex-col items-center gap-2 py-2.5 text-center w-20">
                  <SiGithub />
                  <p className=" text-sm font-medium leading-normal">GitHub</p>
                </div>
                <div className="flex flex-col items-center gap-2  py-2.5 text-center w-20">
                  <SiLinkedin />
                  <p className=" text-sm font-medium leading-normal">LinkedIn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
