import GitHubCalendarClient from '@/components/githubcalendar';
import { createSClient } from '@/supabase/server';
import { redis } from '@/redis/config';
import { Badge } from '@lf/ui/components/base/badge';
import { Card, CardContent } from '@lf/ui/components/base/card';
import { Skill } from '@lf/utils';
import React from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@lf/ui/components/base/button';

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
  const experience = [
    {
      name: 'Dub.co',
      logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://dub.co&size=64',
      roles: [
        {
          title: 'Full Stack Developer',
          timeWorked: '12 m',
          startDate: 'Aug 2023',
          endDate: 'Aug 2024',
          location: 'Virginia, United States',
        },
        {
          title: 'Software Engineer Intern',
          timeWorked: '8 m',
          startDate: 'Jan 2023',
          endDate: 'Aug 2023',
          location: 'Virginia, United States',
        },
      ],
    },
    {
      name: 'Linkf0lio',
      logo: 'https://ph-files.imgix.net/3235dd13-c508-403d-853b-2adcc58e1072.vnd.microsoft.icon?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=64&h=64&fit=crop&frame=1&dpr=2',
      roles: [
        {
          title: 'CTO',
          timeWorked: '4 m',
          startDate: 'Aug 2022',
          endDate: 'Jan 2023',
          location: 'united states',
        },
        {
          title: 'Co-Founder',
          timeWorked: '12 m',
          startDate: 'Aug 2021',
          endDate: 'Aug 2022',
          location: 'united states',
        },
      ],
    },
  ];
  return (
    // <div className="min-h-screen w-full flex flex-col gap-4 items-center justify-center">
    //   <h1 className="font-extrabold text-5xl">{username}</h1>

    //   {/* Skills */}
    //   <div className="flex flex-wrap gap-2">
    // {profile.skills.map((skill: Skill) => (
    //   <Badge
    //     key={skill.value}
    //     variant="secondary"
    //     className="flex items-center gap-1 rounded-full"
    //   >
    //     <img src={skill.logo} alt={skill.label} className="h-3 w-3" />
    //     {skill.label}
    //   </Badge>
    // ))}
    //   </div>

    //   <div>
    //     {profile.startups.map((startup: any, index: number) => (
    //       <Card key={index} className="w-84">
    //         <CardContent>
    //           <h1 className="font-bold text-2xl">{startup.name}</h1>
    //           <h1 className="font-medium text-lg">{startup.url}</h1>
    //           <h1 className="font-light text-base">{startup.description}</h1>
    //         </CardContent>
    //       </Card>
    //     ))}
    //   </div>

    //   <GitHubCalendarClient username="steven-tey" />
    // </div>
    <div
      className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden"
      // style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex p-4 @container">
              <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
                <div className="flex gap-4">
                  <img className="rounded-full h-32 w-32" src={profile.avatar_url} />
                  <div className="flex flex-col justify-center">
                    <p className="text-2xl font-bold leading-tight tracking-[-0.015em]">
                      {profile.full_name}
                    </p>
                    <p className="flex items-center justify-starttext-base font-normal gap-1">
                      <MapPin className="w-4 lg:w-5 h-4 lg:h-5" /> {profile.country}{' '}
                      <img
                        src={`https://flagsapi.com/${profile.country.split('-')[1]}/flat/64.png`}
                        className="w-4 lg:w-5 h-4 lg:h-5"
                      />
                    </p>
                    <p className="text-base font-normal leading-normal">
                      Estimated monthly earnings: $5,000
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-stretch">
              <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-start">
                <Button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em]">
                  <span className="truncate">Follow</span>
                </Button>
                <Button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em]">
                  <span className="truncate">Message</span>
                </Button>
              </div>
            </div>
            <h2 className=" text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Skills
            </h2>
            <div className="flex gap-3 p-3 flex-wrap pr-4">
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
            <div className="pb-3">
              <div className="flex border-b px-4 gap-8">
                <a
                  className="flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4"
                  href="#"
                >
                  <p className=" text-sm font-bold leading-normal tracking-[0.015em]">Experience</p>
                </a>
                <a
                  className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent pb-[13px] pt-4"
                  href="#"
                >
                  <p className="text-sm font-bold leading-normal tracking-[0.015em]">Startups</p>
                </a>
                <a
                  className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent pb-[13px] pt-4"
                  href="#"
                >
                  <p className="text-sm font-bold leading-normal tracking-[0.015em]">Projects</p>
                </a>
              </div>
            </div>
            <div className="mt-6 pl-4">
              {experience.map((company, companyIndex) => (
                <div className="group" key={companyIndex}>
                  <div className="w-full flex justify-between">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <img
                        alt={company.name}
                        className="cursor-pointer w-10 h-10 rounded-full flex justify-center items-center object-cover hover:opacity-90 transition-opacity border-primaryBorder flex-grow border"
                        src={company.logo}
                      />
                      <p className="font-medium text-lg truncate">{company.name}</p>
                    </div>
                  </div>

                  {company.roles.map((role, roleIndex) => (
                    <div
                      key={roleIndex}
                      className={`${
                        roleIndex === 0 ? 'pl-8' : 'pl-8'
                      } relative w-full transition-colors duration-200 flex flex-col items-center ${
                        roleIndex === company.roles.length - 1 ? 'pb-6' : 'pb-4'
                      }`}
                    >
                      {roleIndex === 0 && (
                        <div className="absolute w-[1.5px] bg-primary h-full left-[19px]" />
                      )}
                      <div className="w-full flex relative">
                        <div className="w-4 h-3 border-l-2 border-b-2 rounded-bl-lg absolute -left-[13px] border-primary" />
                        <div className="w-full flex ml-4">
                          <div className="group w-full duration-300 ease-in-out rounded-2xl outline-none transition-shadow group b-0 ">
                            <div
                              className="w-full group flex items-center relative text-left cursor-default p-0"
                              role="none"
                            >
                              <div className="w-full flex flex-col gap-2">
                                <div className="flex items-center justify-between w-full">
                                  <div className="w-full flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                      <p className="text-gray-1k font-semibold text-sm">
                                        {role.title}
                                      </p>
                                    </div>
                                    <p className="text-muted-foreground font-normal text-xs">
                                      <strong>
                                        {role.startDate} - {role.endDate} ({role.timeWorked}){' '}
                                        <span className="font-normal capitalize">
                                          • {role.location}
                                        </span>
                                      </strong>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <h3 className=" text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Socials
            </h3>
            <div className="@container">
              <div className="gap-2 px-4 flex flex-wrap justify-start">
                <div className="flex flex-col items-center gap-2  py-2.5 text-center w-20">
                  <div className="rounded-full  p-2.5">
                    <div
                      className=""
                      data-icon="TwitterLogo"
                      data-size="20px"
                      data-weight="regular"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z" />
                      </svg>
                    </div>
                  </div>
                  <p className=" text-sm font-medium leading-normal">Twitter</p>
                </div>
                <div className="flex flex-col items-center gap-2 py-2.5 text-center w-20">
                  <div className="rounded-full p-2.5">
                    <div className="" data-icon="GithubLogo" data-size="20px" data-weight="regular">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z" />
                      </svg>
                    </div>
                  </div>
                  <p className=" text-sm font-medium leading-normal">GitHub</p>
                </div>
                <div className="flex flex-col items-center gap-2  py-2.5 text-center w-20">
                  <div className="rounded-full  p-2.5">
                    <div
                      className=""
                      data-icon="LinkedinLogo"
                      data-size="20px"
                      data-weight="regular"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z" />
                      </svg>
                    </div>
                  </div>
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
