import React from 'react';
import { CornerDownRight, Link2, Mail, MapPin, Phone, Verified } from 'lucide-react';
import { socialIconMap } from '@/lib/utils/iconMap';
import MarkdownParser from '@/components/general/markdownparser';
import { formatMonthShortYear, getMonthsDifference } from '@dr/utils';
import { createSClient } from '@/supabase/server';
import DynamicImage from '@/components/general/dynamicImage';
import type { Database } from '@/lib/types/supabasetypes';


function getPlatformIcon(url: string) {
  try {
    const host = new URL(url).hostname.replace('www.', '');
    const platform = Object.keys(socialIconMap).find((key) => host.includes(key.toLowerCase()));
    const Icon = socialIconMap[platform || ''];
    return Icon ? (
      <Icon className="w-4 h-4 lg:w-4.5 lg:h-4.5" />
    ) : (
      <Link2 className="w-4 h-4 lg:w-4.5 lg:h-4.5" />
    );
  } catch {
    return <Link2 className="w-4 h-4 lg:w-4.5 lg:h-4.5" />;
  }
}

type Startup = Database['public']['Tables']['startups']['Row'];
type Project = Database['public']['Tables']['projects']['Row'];

export default async function ResumePage({ params }: { params: Promise<{ username: string }> }) {
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

  const isEducationEmpty = Object.values(profile.education).every(
    (val) => typeof val === 'string' && val.trim() === ''
  );

  return (
    <div
      className="container relative mx-auto scroll-my-12 overflow-auto px-4 py-8 print:p-0 md:px-16 md:py-16 bg-white"
    >
      <section className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-4">
        <header className="flex items-start justify-between">
          <div className="flex-1 space-y-1.5">
            <h1
              className="text-lg lg:text-2xl font-bold text-black merriweather flex flex-wrap items-center gap-1"
              id="resume-name"
            >
              {profile.full_name} <Verified />
            </h1>
            <p
              className={`ml-0.5 max-w-md text-pretty jetbrains text-xs lg:text-sm text-black/80 print:text-[12px]`}
            >
              {profile.headline}{' '}
              <strong className="underline underline-offset-2 cursor-pointer">
                @{profile.company}
              </strong>
            </p>
            <p className="max-w-md items-center text-pretty jetbrains text-xs text-black">
              <a
                className="flex flex-wrap items-center gap-x-0.5 lg:gap-x-1.5 leading-none hover:underline"
                href={`https://www.google.com/maps/place/${profile.geo_info.city}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Location: ${profile.country.split('-')[0]}, ${profile.geo_info.state}, ${profile.geo_info.city}`}
              >
                <MapPin className="w-3 lg:w-3.5 h-3 lg:h-3.5" strokeWidth={1} />
                <span>{profile.country.split('-')[0]}</span>
                <span>/</span>
                <span>{profile.geo_info.state}</span>
                <span>/</span>
                <span>{profile.geo_info.city}</span>
              </a>
            </p>
            <div
              className="flex gap-x-1 pt-1 jetbrains text-sm text-foreground/80 print:hidden"
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
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-200 lg:border-gray-300 bg-white hover:bg-gray-200 text-black/80 hover:text-black size-8"
                    aria-label={`Link to ${new URL(social.url).hostname}`}
                  >
                    <>{icon}</>
                  </a>
                );
              })}
            </div>
          </div>
          <span
            className="relative flex shrink-0 overflow-hidden rounded-xl size-22 lg:size-28"
            aria-hidden="true"
          >
            <DynamicImage
              height={112}
              width={112}
              className="aspect-square h-full w-full object-cover grayscale border border-gray-200 lg:border-gray-300 rounded-xl"
              alt={`${profile.full_name}'s profile picture`}
              url={profile.avatar_url}
            />
          </span>
        </header>
        <div className="space-y-8 print:space-y-4">
          <section className="flex min-h-0 gap-x-3 gap-y-2 print:gap-x-1 jetbrains">
            <a
              href={`mailto:${profile.email}`}
              className="flex gap-1 items-center justify-start text-xs border-b border-black lg:border-black/80 hover:border-black text-black lg:text-black/80 hover:text-black transition-colors duration-200"
            >
              <Mail strokeWidth={1} size={18} /> Mail
            </a>
            <a
              href={`tel:+918074414860`}
              className="flex gap-1 items-center justify-start text-xs border-b border-black lg:border-black/80 hover:border-black text-black lg:text-black/80 hover:text-black transition-colors duration-200"
            >
              <Phone strokeWidth={1.3} size={16} />
              <span className="truncate max-w-[120px] sm:max-w-[160px] lg:max-w-none">
                +91-100-MARYADA
              </span>
            </a>
            <a
              href={profile.profile_link.url}
              target="_blank"
              className="flex gap-1 items-center justify-start text-xs border-b border-black lg:border-black/80 hover:border-black text-black lg:text-black/80 hover:text-black transition-colors duration-200"
            >
              <Link2 strokeWidth={1.3} size={16} />{' '}
              <span className="truncate max-w-[80px] sm:max-w-[120px] lg:max-w-none">
                {profile.profile_link.text}
              </span>
            </a>
          </section>
          {profile.shortbio && (
            <section className="flex min-h-0 flex-col gap-y-3 print:gap-y-1">
              <h2
                className="text-base lg:text-xl font-bold text-black/80 merriweather"
                id="about-section"
              >
                About
              </h2>
              <div
                className="text-pretty jetbrains text-xs lg:text-sm text-black/80 print:text-[12px]"
                aria-labelledby="about-section"
              >
                <MarkdownParser text={profile.shortbio} />
              </div>
            </section>
          )}
          {profile.experience.length > 0 && (
            <section className="flex min-h-0 flex-col gap-y-3 print:gap-y-1">
              <h2
                className="text-base lg:text-xl font-bold text-black/80 merriweather"
                id="work-experience"
              >
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
                            <h3 className="text-sm lg:text-base inline-flex items-center justify-center gap-x-1 font-semibold leading-none print:text-sm">
                              <a
                                className="hover:underline merriweather"
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
                                  className="flex flex-col lg:flex-row lg:items-center lg:justify-between text-black/90 gap-y-1"
                                >
                                  <h4 className="jetbrains text-xs lg:text-sm font-semibold leading-none print:text-[12px] flex items-center gap-1 flex-wrap">
                                    <CornerDownRight strokeWidth={1} size={16} />
                                    <span className="flex-1 min-w-0">
                                      {role.headline || 'No role specified.'}
                                    </span>
                                    <span className="inline-flex items-center rounded-lg border px-1 lg:px-2 py-0.5 font-semibold jetbrains transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent cursor-default bg-gray-300/70 text-black hover:bg-gray-300/50 align-middle text-xxs lg:text-xs print:px-1 print:py-0.5 print:text-[8px] print:leading-tight">
                                      {role.location_type}
                                    </span>
                                  </h4>
                                  <p className="pl-6 lg:pl-0 jetbrains text-black/70 text-xs font-medium tracking-tight lg:tracking-normal leading-none print:text-[10px] flex-shrink-0">
                                    {formatMonthShortYear(role.start_date)} -{' '}
                                    {role.end_date
                                      ? formatMonthShortYear(role.end_date)
                                      : 'Present'}
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
                        <div className="text-pretty jetbrains text-sm text-muted-foreground pl-2">
                          <div className="mt-4 text-xs text-black/80 print:mt-1 print:text-[10px] text-pretty">
                            <MarkdownParser text={exp.contribution} />
                          </div>
                          {exp.skills_used.length > 0 && (
                            <div className="mt-2">
                              <ul
                                className="inline-flex list-none pl-0.5 lg:pl-2 flex-wrap gap-1"
                                aria-label="Technologies used"
                              >
                                {exp.skills_used.map((skill: any, index: number) => {
                                  return (
                                    <li key={index} aria-label={`Skill: ${skill.label}`}>
                                      <div className="cursor-default flex items-center rounded-md border px-1.5 py-0.5 font-semibold jetbrains transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent lg:bg-gray-300/70 bg-gray-200/80 text-black hover:bg-gray-300/50 align-middle text-xxs lg:text-xs print:px-1 print:py-0.5 print:text-[8px] print:leading-tight">
                                        {skill.logo && (
                                          <img
                                            src={skill.logo}
                                            alt={`${skill.label} logo`}
                                            className="mr-0.5 h-3 w-3 rounded grayscale"
                                          />
                                        )}
                                        {skill.label}
                                      </div>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}
          {!isEducationEmpty && (
            <section className="flex min-h-0 flex-col gap-y-3 print:gap-y-1">
              <h2
                className="text-base lg:text-xl font-bold text-black/80 merriweather"
                id="education-section"
              >
                Education
              </h2>
              <div className="space-y-4" role="feed" aria-labelledby="education-section">
                <article role="article">
                  <div className="rounded-lg bg-white text-black">
                    <div className="flex flex-col space-y-1.5">
                      <div className="flex items-center justify-between text-base">
                        <h3
                          className="text-sm lg:text-base font-semibold leading-none merriweather flex-1 min-w-0"
                          id={`education-${profile.education.university.replace(/\s+/g, '-').toLowerCase()}`}
                        >
                          {profile.education.university}
                        </h3>
                        <p
                          className="jetbrains text-xs font-medium leading-none tracking-tighter lg:tracking-normal print:text-[10px] text-black/70 flex-shrink-0"
                          aria-label={`Education period: ${formatMonthShortYear(profile.education.start_date)} to ${profile.education.end_date || 'Present'}`}
                        >
                          {formatMonthShortYear(profile.education.start_date)} -{' '}
                          {profile.education.end_date
                            ? formatMonthShortYear(profile.education.end_date)
                            : 'Present'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 justify-between">
                        <div
                          className="text-pretty jetbrains text-xs lg:text-sm text-black/80 print:text-[12px] flex-1 min-w-0"
                          aria-labelledby={`education-${profile.education.university.replace(/\s+/g, '-').toLowerCase()}`}
                        >
                          {profile.education.branch || 'No branch specified.'}
                        </div>
                        <p className="jetbrains text-xs lg:text-sm font-extrabold leading-none text-black/80 whitespace-nowrap flex-shrink-0">
                          {profile.education.grade}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </section>
          )}
          {profile.skills.length > 0 && (
            <section className="flex min-h-0 flex-col gap-y-3 print:gap-y-1">
              <h2
                className="text-base lg:text-xl font-bold text-black/80 merriweather"
                id="skills-section"
              >
                Skills
              </h2>
              <ul className="flex list-none flex-wrap gap-1 p-0" aria-label="List of skills">
                {profile.skills.map((skill: any, index: any) => {
                  return (
                    <li key={index}>
                      <div
                        className="cursor-default flex gap-1 items-center justify-center rounded-md border px-2 py-0.5 text-xs font-semibold jetbrains transition-colors text-nowrap border-transparent lg:bg-gray-300/70 bg-gray-200/80 text-black hover:bg-gray-300/50 print:text-[10px]"
                        aria-label={`Skill: ${skill.label}`}
                      >
                        {skill.logo && (
                          <img
                            src={skill.logo}
                            alt={`${skill.label} logo`}
                            className="mr-1 h-4 w-4 rounded grayscale"
                          />
                        )}
                        {skill.label}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
          {projects.length > 0 && (
            <section className="flex min-h-0 flex-col gap-y-3 print:gap-y-1">
              <h2
                className="text-base lg:text-xl font-bold text-black/80 merriweather"
                id="skills-section"
              >
                Projects
              </h2>
              <div
                className="grid grid-cols-1 gap-3 print:grid-cols-3 print:gap-2 md:grid-cols-2 lg:grid-cols-3"
                role="feed"
                aria-labelledby="projects"
              >
                {projects.map((project: any, index: number) => {
                  return (
                    <article key={index} className="h-full">
                      <div
                        className="rounded-lg bg-white text-black flex h-full flex-col overflow-hidden border border-gray-200 lg:border-gray-300 p-3"
                        role="article"
                      >
                        <div className="flex flex-col space-y-1.5">
                          <div className="space-y-1">
                            <h3 className="font-semibold tracking-tight text-base">
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 hover:underline merriweather relative"
                                aria-label={`${project.Name} project (opens in new tab)`}
                              >
                                {project.name}
                                <span className="absolute top-1/2 -translate-y-1/2 -right-4 w-1.5 h-1.5 flex items-center justify-center">
                                  <span className="absolute w-full h-full bg-green-600 dark:bg-green-500 rounded-full"></span>
                                  <span className="absolute w-full h-full bg-green-600 dark:bg-green-500 rounded-full opacity-75 animate-ping"></span>
                                </span>
                              </a>
                              <div
                                className="hidden jetbrains text-xs underline print:visible"
                                aria-hidden="true"
                              >
                                {project.name}
                              </div>
                            </h3>
                            <span
                              className="text-black/80 text-pretty jetbrains text-xs print:text-[10px]"
                              aria-label="Project description"
                            >
                              <MarkdownParser text={project.description} />
                            </span>
                          </div>
                        </div>
                        <div className="text-pretty jetbrains text-sm text-black/80 mt-auto flex">
                          <ul
                            className="mt-2 flex list-none flex-wrap gap-1 p-0"
                            aria-label="Technologies used"
                          >
                            <li>
                              <div className="inline-flex items-center rounded-md border font-semibold jetbrains transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent lg:bg-gray-300/70 bg-gray-200/80 text-black hover:bg-gray-300/50 px-1 py-0 text-[10px] print:px-1 print:py-0.5 print:text-[8px] print:leading-tight">
                                TypeScript
                              </div>
                            </li>
                            <li>
                              <div className="inline-flex items-center rounded-md border font-semibold jetbrains transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent lg:bg-gray-300/70 bg-gray-200/80 text-black hover:bg-gray-300/50 px-1 py-0 text-[10px] print:px-1 print:py-0.5 print:text-[8px] print:leading-tight">
                                Next.js
                              </div>
                            </li>
                            <li>
                              <div className="inline-flex items-center rounded-md border font-semibold jetbrains transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent lg:bg-gray-300/70 bg-gray-200/80 text-black hover:bg-gray-300/50 px-1 py-0 text-[10px] print:px-1 print:py-0.5 print:text-[8px] print:leading-tight">
                                Browser Extension
                              </div>
                            </li>
                            <li>
                              <div className="inline-flex items-center rounded-md border font-semibold jetbrains transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent lg:bg-gray-300/70 bg-gray-200/80 text-black hover:bg-gray-300/50 px-1 py-0 text-[10px] print:px-1 print:py-0.5 print:text-[8px] print:leading-tight">
                                PostgreSQL
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}
          {startups.length > 0 && (
            <section className="flex min-h-0 flex-col gap-y-3 print:gap-y-1">
              <h2
                className="text-base lg:text-xl font-bold text-black/80 merriweather"
                id="skills-section"
              >
                Shipped
              </h2>
              <div
                className="grid grid-cols-1 gap-3 print:grid-cols-3 print:gap-2 md:grid-cols-2 lg:grid-cols-3"
                role="feed"
                aria-labelledby="startups"
              >
                {startups.map((startup: any, index: number) => {
                  return (
                    <article key={index} className="h-full">
                      <div
                        className="rounded-lg bg-white text-black flex h-full flex-col overflow-hidden border border-gray-200 lg:border-gray-300 p-3"
                        role="article"
                      >
                        <div className="flex flex-col space-y-1.5">
                          <div className="space-y-1">
                            <h3 className="font-semibold tracking-tight text-base">
                              <a
                                href={startup.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 hover:underline merriweather relative"
                                aria-label={`${startup.Name} startup (opens in new tab)`}
                              >
                                {startup.name}
                                <span className="absolute top-1/2 -translate-y-1/2 -right-4 w-1.5 h-1.5 flex items-center justify-center">
                                  <span className="absolute w-full h-full bg-green-600 dark:bg-green-500 rounded-full"></span>
                                  <span className="absolute w-full h-full bg-green-600 dark:bg-green-500 rounded-full opacity-75 animate-ping"></span>
                                </span>
                              </a>
                              <div
                                className="hidden jetbrains text-xs underline print:visible"
                                aria-hidden="true"
                              >
                                {startup.name}
                              </div>
                            </h3>
                            <span
                              className="text-black/80 text-pretty jetbrains text-xs print:text-[10px]"
                              aria-label="Project description"
                            >
                              <MarkdownParser text={startup.description} />
                            </span>
                          </div>
                        </div>
                        <div className="text-pretty jetbrains text-sm text-black/80 mt-auto flex">
                          <ul
                            className="mt-2 flex list-none flex-wrap gap-1 p-0"
                            aria-label="Technologies used"
                          >
                            <li>
                              <div className="inline-flex items-center rounded-md border font-semibold jetbrains transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent lg:bg-gray-300/70 bg-gray-200/80 text-black hover:bg-gray-300/50 px-1 py-0 text-[10px] print:px-1 print:py-0.5 print:text-[8px] print:leading-tight">
                                TypeScript
                              </div>
                            </li>
                            <li>
                              <div className="inline-flex items-center rounded-md border font-semibold jetbrains transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent lg:bg-gray-300/70 bg-gray-200/80 text-black hover:bg-gray-300/50 px-1 py-0 text-[10px] print:px-1 print:py-0.5 print:text-[8px] print:leading-tight">
                                Next.js
                              </div>
                            </li>
                            <li>
                              <div className="inline-flex items-center rounded-md border font-semibold jetbrains transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent lg:bg-gray-300/70 bg-gray-200/80 text-black hover:bg-gray-300/50 px-1 py-0 text-[10px] print:px-1 print:py-0.5 print:text-[8px] print:leading-tight">
                                Browser Extension
                              </div>
                            </li>
                            <li>
                              <div className="inline-flex items-center rounded-md border font-semibold jetbrains transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent lg:bg-gray-300/70 bg-gray-200/80 text-black hover:bg-gray-300/50 px-1 py-0 text-[10px] print:px-1 print:py-0.5 print:text-[8px] print:leading-tight">
                                PostgreSQL
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </section>
    </div>
  );
}
