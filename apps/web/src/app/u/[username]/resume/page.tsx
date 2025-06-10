import React from 'react';
import { Geist_Mono } from 'next/font/google';
import { CornerDownRight, Link2, MapPin } from 'lucide-react';
import { iconMap } from '@/app/dashboard/utils/iconMap';
import MarkdownParser from '@/components/markdownparser';
import { formatMonthShortYear, getMonthsDifference, Project, Startup } from '@lf/utils';
import { createSClient } from '@/supabase/server';

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});


function getPlatformIcon(url: string) {
  try {
    const host = new URL(url).hostname.replace('www.', '');
    const platform = Object.keys(iconMap).find((key) => host.includes(key.toLowerCase()));
    const Icon = iconMap[platform || ''];
    return Icon ? <Icon size={18} /> : <Link2 size={18} />;
  } catch {
    return <Link2 size={18} />;
  }
}

export default async function Resume({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  let profile;
  let startups;
  let projects;
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

  profile = data;
  startups = data.startups.sort((a: Startup, b: Startup) => a.index - b.index);
  projects = data.projects.sort((a: Project, b: Project) => a.index - b.index);

  profile = {
    ...data,
    startups: startups,
    projects: projects,
  };

  const isEducationEmpty = Object.values(profile.education).every(val => typeof val === "string" && val.trim() === "");

  return (
    <div
      className={`${geistMono.variable} container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-0 md:p-16 bg-white`}
    >
      <section className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-4">
        <header className="flex items-center justify-between">
          <div className="flex-1 space-y-1.5">
            <h1 className="text-2xl font-bold text-black" id="resume-name">
              {profile.full_name}
            </h1>
            <p className={`max-w-md text-pretty mono text-sm text-black/80 print:text-[12px]`}>
              {profile.headline}
            </p>
            <p className="max-w-md items-center text-pretty mono text-xs text-black">
              <a
                className="inline-flex gap-x-1.5 items-center leading-none hover:underline"
                href="https://www.google.com/maps/place/India"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Location: Wrocław, Poland, CET"
              >
                <MapPin className="w-3.5 h-3.5" strokeWidth={1} />
                {profile.country.split('-')[0]}, Poland, CET
              </a>
            </p>
            <div
              className="flex gap-x-1 pt-1 mono text-sm text-foreground/80 print:hidden"
              role="list"
              aria-label="Contact links"
            >
              {profile.socials.map((social: any, index: any) => {
                const icon = getPlatformIcon(social.url);
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white hover:bg-gray-200 text-black/80 hover:text-black size-8"
                    aria-label={`Link to ${new URL(social.url).hostname}`}
                  >
                    <>{icon}</>
                  </a>
                );
              })}
            </div>
          </div>
          <span
            className="relative flex shrink-0 overflow-hidden rounded-xl size-28"
            aria-hidden="true"
          >
            <img
              className="aspect-square h-full w-full object-cover"
              alt="Bartosz Jarocki's profile picture"
              src={profile.avatar_url}
              referrerPolicy="no-referrer"
            />
          </span>
        </header>
        <div className="space-y-8 print:space-y-4">
          <section className="flex min-h-0 flex-col gap-y-3 print:gap-y-1">
            <h2 className="text-xl font-bold text-black" id="about-section">
              About
            </h2>
            <div
              className="text-pretty mono text-sm text-black/80 print:text-[12px]"
              aria-labelledby="about-section"
            >
              {profile.shortbio || 'No bio available.'}
            </div>
          </section>
          <section className="flex min-h-0 flex-col gap-y-3 print:gap-y-1">
            <h2 className="text-xl font-bold text-black" id="work-experience">
              Work Experience
            </h2>
            <div
              className="space-y-4 print:space-y-0"
              role="feed"
              aria-labelledby="work-experience"
            >
              {profile.experience.map((exp: any, index: any) => {
                return (
                  <article key={index} role="article">
                    <div className="rounded-lg bg-white text-black py-1 print:py-0">
                      <div className="flex flex-col space-y-1.5 print:space-y-1">
                        <div className="flex items-center justify-between gap-x-2 text-base">
                          <h3 className="inline-flex items-center justify-center gap-x-1 font-semibold leading-none print:text-sm">
                            <a
                              className="hover:underline"
                              href={exp.company_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${exp.company} company website`}
                            >
                              {exp.company}
                            </a>
                          </h3>
                        </div>
                        <div className="space-y-1 mt-2 pl-2">
                          {exp.roles.map((role: any, idx: any) => {
                            return (
                              <span
                                key={idx}
                                className="flex items-center justify-between text-black/90"
                                aria-label={`Employment period: ${role.start_date + 'to' + role.end_date || 'Present'}`}
                              >
                                <h4
                                  key={idx}
                                  className="mono text-sm font-semibold leading-none print:text-[12px] flex items-center gap-2"
                                >
                                  <CornerDownRight strokeWidth={1} size={16} /> {role.headline}{' '}
                                  <span className="inline-flex items-center rounded-lg border px-2 py-0.5 font-semibold mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent cursor-default bg-gray-300/70 text-black hover:bg-gray-300/50 align-middle text-xs print:px-1 print:py-0.5 print:text-[8px] print:leading-tight">
                                    {role.location_type}
                                  </span>
                                </h4>
                                <p className="mono text-xs font-medium leading-none print:text-[10px]">
                                  {formatMonthShortYear(role.start_date)} -{' '}
                                  {role.end_date ? formatMonthShortYear(role.end_date) : 'Present'}
                                  {role.end_date && (
                                    <span className="ml-0.5">
                                      ({getMonthsDifference(role.start_date, role.end_date)})
                                    </span>
                                  )}
                                </p>
                              </span>
                            );
                          })}
                        </div>
                      </div>
                      <div className="text-pretty mono text-sm text-muted-foreground pl-2">
                        <div className="mt-2 text-xs text-black/80 print:mt-1 print:text-[10px] text-pretty">
                          <MarkdownParser text={exp.contribution} />
                        </div>
                        <div className="mt-2">
                          <ul
                            className="inline-flex list-none p-0 -mx-2 flex-wrap gap-1 sm:hidden"
                            aria-label="Technologies used"
                          >
                            <li>
                              <div className="inline-flex items-center rounded-md border px-2 py-0.5 font-semibold mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/60 align-middle text-xs print:px-1 print:py-0.5 print:text-[8px] print:leading-tight">
                                Remote
                              </div>
                            </li>
                            <li>
                              <div className="inline-flex items-center rounded-md border px-2 py-0.5 font-semibold mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/60 align-middle text-xs print:px-1 print:py-0.5 print:text-[8px] print:leading-tight">
                                React
                              </div>
                            </li>
                            <li>
                              <div className="inline-flex items-center rounded-md border px-2 py-0.5 font-semibold mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/60 align-middle text-xs print:px-1 print:py-0.5 print:text-[8px] print:leading-tight">
                                Next.js
                              </div>
                            </li>
                            <li>
                              <div className="inline-flex items-center rounded-md border px-2 py-0.5 font-semibold mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/60 align-middle text-xs print:px-1 print:py-0.5 print:text-[8px] print:leading-tight">
                                TypeScript
                              </div>
                            </li>
                            <li>
                              <div className="inline-flex items-center rounded-md border px-2 py-0.5 font-semibold mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/60 align-middle text-xs print:px-1 print:py-0.5 print:text-[8px] print:leading-tight">
                                Node.js
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
          {!isEducationEmpty && <section className="flex min-h-0 flex-col gap-y-3 print:gap-y-1">
            <h2 className="text-xl font-bold text-black" id="education-section">
              Education
            </h2>
            <div className="space-y-4" role="feed" aria-labelledby="education-section">
              <article role="article">
                <div className="rounded-lg bg-white text-black">
                  <div className="flex flex-col space-y-1.5">
                    <div className="flex items-center justify-between gap-x-2 text-base">
                      <h3
                        className="font-semibold leading-none"
                        id={`education-${profile.education.university.replace(/\s+/g, '-').toLowerCase()}`}
                      >
                        {profile.education.university}
                      </h3>
                      <p
                        className="mono text-xs font-medium leading-none print:text-[10px]"
                        aria-label={`Education period: ${formatMonthShortYear(profile.education.start_date)} to ${profile.education.end_date || 'Present'}`}
                      >
                        {formatMonthShortYear(profile.education.start_date)} -{' '}
                        {profile.education.end_date
                          ? formatMonthShortYear(profile.education.end_date)
                          : 'Present'}
                      </p>
                    </div>
                  </div>
                  <div
                    className="text-pretty mono text-sm mt-2 text-black/80 print:text-[12px]"
                    aria-labelledby={`education-${profile.education.university.replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    {profile.education.branch || 'No branch specified.'}
                  </div>
                </div>
              </article>
            </div>
          </section>}
          <section className="flex min-h-0 flex-col gap-y-3 print:gap-y-1">
            <h2 className="text-xl font-bold text-black" id="skills-section">
              Skills
            </h2>
            <ul className="flex list-none flex-wrap gap-1 p-0" aria-label="List of skills">
              {profile.skills.map((skill: any, index: any) => {
                return (
                  <li key={index}>
                    <div
                      className="cursor-default flex gap-1 items-center justify-center rounded-md border px-2 py-0.5 text-xs font-semibold mono transition-colors text-nowrap border-transparent bg-gray-300/70 text-black hover:bg-gray-200/80 print:text-[10px]"
                      aria-label={`Skill: ${skill.label}`}
                    >
                      {skill.logo && (
                        <img
                          src={skill.logo}
                          alt={`${skill.label} logo`}
                          className="mr-1 h-4 w-4 rounded"
                        />
                      )}
                      {skill.label}
                    </div>
                  </li>
                );
              })}
              {/* <li>
                <div
                  className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold mono transition-colors text-nowrap border-transparent bg-gray-300/80 text-black hover:bg-gray-300/60 print:text-[10px]"
                  aria-label="Skill: React/Next.js/Remix"
                >
                  React/Next.js/Remix
                </div>
              </li> */}
            </ul>
          </section>
        </div>
      </section>
    </div>
  );
}
