'use client';
import { Button } from '@dr/ui/components/base/button';
import {
  BatteryLow,
  ExternalLink,
  MapPin,
  SignalMedium,
  X,
  Link2,
  Info,
  CircleHelp,
  Verified,
  Mail,
  Phone,
  CornerDownRight,
} from 'lucide-react';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  formatMonthShortYear,
  getLineHeightPercent,
  getMonthsDifference,
  hexToHSL,
} from '@dr/utils';
import { statusOptions, categoryOptions } from '@dr/schemas';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@dr/ui/components/base/tabs';
import MarkdownParser from '@/components/general/markdownparser';
import { socialIconMap } from '@/lib/utils/iconMap';
import { cn } from '@dr/ui/lib/utils';

import type {
  Profile,
  Startup,
  Project,
  Experience,
  Skill,
  Social,
  Theme,
} from '@/lib/types/supabasetypes';
import RevenueChart from '@/templates/default/components/revenueChart';
import ViewSwitch from './viewSwitcher';

// type Profile = Database['public']['Tables']['profiles']['Row'];
// type Startup = Database['public']['Tables']['startups']['Row'];
// type Project = Database['public']['Tables']['projects']['Row'];

function getPlatformIcon(url: string) {
  try {
    const host = new URL(url).hostname.replace('www.', '');
    const platform = Object.keys(socialIconMap).find((key) => host.includes(key.toLowerCase()));
    const Icon = socialIconMap[platform || ''];
    return Icon ? <Icon size={15} /> : <Link2 size={15} />;
  } catch {
    return <Link2 size={15} />;
  }
}

const MobilePreview = ({
  preview,
  setPreview,
  profile,
  startups,
  projects,
  theme,
}: {
  preview: boolean;
  setPreview: React.Dispatch<React.SetStateAction<boolean>>;
  profile: Profile;
  startups: Startup[];
  projects: Project[];
  theme: Theme;
}) => {
  const t = theme.theme_data;
  const showExp = profile.experience.length > 0;
  const showStartups = startups.length > 0;
  const showProjects = projects.length > 0;
  const defaultValue = showExp ? 'experience' : showStartups ? 'startups' : 'projects';
  const [isResumeView, setIsResumeView] = useState(false);
  const isEducationEmpty = Object.values(profile.education).every(
    (val) => typeof val === 'string' && val.trim() === ''
  );

  return (
    <div
      className={cn(
        'lg:flex lg:w-[40%] w-full h-screen p-4 fixed top-0 left-0 lg:static bg-background/50 backdrop-blur z-50',
        {
          flex: preview,
          hidden: !preview,
        }
      )}
    >
      <Button
        onClick={() => setPreview(false)}
        className="flex lg:hidden absolute top-4 right-4"
        size={'icon'}
        variant={'outline'}
      >
        <X />
      </Button>
      <div className="flex flex-col w-full items-center justify-center gap-4 scale-90 lg:scale-100">
        <ViewSwitch isResumeView={isResumeView} onToggle={setIsResumeView} />
        <div className="relative w-[300px] h-[620px] rounded-[50px] bg-black shadow-2xl border-[14px] border-black flex items-center justify-center">
          {/* Dynamic Island */}
          <div className="absolute top-[-5px] left-1/2 -translate-x-1/2 bg-black rounded-t-2xl rounded-b-4xl w-[130px] h-[25px] z-20">
            <div className="bg-[#404040] size-2.5 rounded-full absolute top-1/4 right-1/4" />
            <div className="bg-[#404040] w-12 h-2.5 rounded-full absolute top-1/4 right-2/5" />
          </div>

          {/* Status Icons (Top Right) */}
          <div className="absolute top-1 right-8 flex z-30">
            <BatteryLow size={16} />
          </div>
          <div className="absolute top-[1px] right-12 flex items-center gap-2 z-30">
            <SignalMedium size={16} />
          </div>

          <div className="absolute top-1 left-8 flex items-center gap-2 z-30 text-xs">9:41</div>

          {/* Side Buttons */}
          <div className="absolute left-[-16px] top-[100px] w-[4px] h-[40px] rounded-full bg-black z-20"></div>
          <div className="absolute left-[-16px] top-[160px] w-[4px] h-[40px] rounded-full bg-black z-20"></div>
          <div className="absolute right-[-16px] top-[130px] w-[4px] h-[60px] rounded-full bg-black z-20"></div>

          {/* iPhone Screen */}
          <div
            style={{
              background: t.background,
            }}
            className="w-[270px] h-[590px] rounded-[36px] overflow-y-auto z-10 py-4 scrollbar-hidden no_scrollbar"
          >
            {/* Content */}
            {isResumeView ? (
              <div className="p-4 space-y-2">
                <div className="w-full rounded-full h-6 flex items-center justify-between px-2 bg-gray-200">
                  {profile.favicon_url ? (
                    <Image
                      width={20}
                      height={20}
                      alt="Favicon"
                      className="h-5 w-5 rounded-full grayscale"
                      referrerPolicy="no-referrer"
                      src={profile.favicon_url}
                    />
                  ) : (
                    <span title="No custom favicon">
                      <CircleHelp strokeWidth={1} className="h-4 w-4 text-black" />
                    </span>
                  )}
                  <p className="text-xs text-black">/r/{profile.username}</p>
                  <Link
                    target="_blank"
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/r/${profile.username}`}
                  >
                    <ExternalLink strokeWidth={1.5} size={14} className="text-black" />
                  </Link>
                </div>
                <div className="relative mx-auto overflow-auto py-4 bg-white">
                  <section className="mx-auto w-full max-w-2xl space-y-4 bg-white">
                    <header className="flex flex-col items-start justify-center gap-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-1">
                          <h1
                            className="line-clamp-1 text-sm font-bold text-black merriweather flex items-center gap-1"
                            id="resume-name"
                          >
                            {profile.full_name.slice(0, 18)} <Verified size={15} className='mb-[3px]' />
                          </h1>
                          <p className="max-w-md items-center text-pretty jetbrains text-xs text-black">
                            <a
                              className="flex flex-wrap items-center gap-x-0.5 leading-none hover:underline"
                              href={`https://www.google.com/maps/place/${profile.geo_info.city}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Location: ${profile.country.split('-')[0]}, ${profile.geo_info.state}, ${profile.geo_info.city}`}
                            >
                              <MapPin className="w-3 h-3" strokeWidth={1} />
                              <span>{profile.country.split('-')[0]}</span>
                              <span>/</span>
                              <span>{profile.geo_info.state}</span>
                              <span>/</span>
                              <span>{profile.geo_info.city}</span>
                            </a>
                          </p>
                        </div>
                        <span
                          className="relative flex shrink-0 overflow-hidden rounded-xl size-16"
                          aria-hidden="true"
                        >
                          <Image
                            height={64}
                            width={64}
                            className="aspect-square h-full w-full object-cover grayscale border border-gray-200 lg:border-gray-300 rounded-xl"
                            alt={`${profile.full_name}'s profile picture`}
                            src={profile.avatar_url}
                          />
                        </span>
                      </div>
                      <p className={`ml-0.5 text-balance jetbrains text-xs text-black/80`}>
                        {profile.headline}{' '}
                        <strong className="underline underline-offset-2 cursor-pointer">
                          @{profile.company}
                        </strong>
                      </p>
                      <div
                        className="flex gap-x-1 pt-1 jetbrains text-sm text-foreground/80"
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
                    </header>
                    <div className="space-y-6">
                      <section className="flex flex-wrap min-h-0 gap-x-3 gap-y-2 jetbrains">
                        <a
                          href={`mailto:${profile.email}`}
                          className="flex gap-1 items-center justify-start text-xxs border-b border-black lg:border-black/80 hover:border-black text-black lg:text-black/80 hover:text-black transition-colors duration-200"
                        >
                          <Mail strokeWidth={1} size={13} /> Mail
                        </a>
                        <a
                          href={`tel:+918074414860`}
                          className="flex gap-1 items-center justify-start text-xxs border-b border-black lg:border-black/80 hover:border-black text-black lg:text-black/80 hover:text-black transition-colors duration-200"
                        >
                          <Phone strokeWidth={1.3} size={11} />
                          <span className="truncate max-w-[120px] sm:max-w-[160px] lg:max-w-none">
                            +91-100-GADALTD
                          </span>
                        </a>
                        <a
                          href={profile.profile_link.url}
                          target="_blank"
                          className="flex gap-1 items-center justify-start text-xxs border-b border-black lg:border-black/80 hover:border-black text-black lg:text-black/80 hover:text-black transition-colors duration-200"
                        >
                          <Link2 strokeWidth={1.3} size={11} />{' '}
                          <span className="truncate max-w-[80px] sm:max-w-[120px] lg:max-w-none">
                            {profile.profile_link.text}
                          </span>
                        </a>
                      </section>
                      {profile.shortbio && (
                        <section className="flex min-h-0 flex-col gap-y-2">
                          <h2
                            className="text-sm font-bold text-black/80 merriweather"
                            id="about-section"
                          >
                            About
                          </h2>
                          <div
                            className=" jetbrains text-xxs text-black/80 text-balance"
                            aria-labelledby="about-section"
                          >
                            <MarkdownParser text={profile.shortbio} />
                          </div>
                        </section>
                      )}
                      {profile.experience.length > 0 && (
                        <section className="flex min-h-0 flex-col gap-y-2">
                          <h2
                            className="text-sm font-bold text-black/80 merriweather"
                            id="work-experience"
                          >
                            Work Experience
                          </h2>
                          <div className="space-y-3" role="feed" aria-labelledby="work-experience">
                            {profile.experience.map((exp: any, index: any) => {
                              return (
                                <article key={index} role="article">
                                  <div className="rounded-lg bg-white text-black py-1">
                                    <div className="flex flex-col space-y-1.5">
                                      <div className="flex items-center justify-between gap-x-2 text-base">
                                        <h3 className="text-sm inline-flex items-center justify-center gap-x-1 font-semibold leading-none">
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
                                      <div className="space-y-1 mt-1 pl-1.5">
                                        {exp.roles.map((role: any, idx: any) => {
                                          return (
                                            <span
                                              key={idx}
                                              className="flex flex-col text-black/90 gap-y-1"
                                            >
                                              <h4 className="jetbrains text-xs font-semibold leading-none flex items-center gap-1 flex-wrap">
                                                <CornerDownRight strokeWidth={1} size={16} />
                                                <span className="flex-1 min-w-0">
                                                  {role.headline || 'No role specified.'}
                                                </span>
                                                <span className="inline-flex items-center rounded-lg border px-1 py-0.5 font-semibold jetbrains transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent cursor-default bg-gray-300/70 text-black hover:bg-gray-300/50 align-middle text-xxs">
                                                  {role.location_type}
                                                </span>
                                              </h4>
                                              <p className="pl-5 jetbrains text-black/70 text-xxs font-medium tracking-tight leading-none flex-shrink-0">
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
                                              </p>
                                            </span>
                                          );
                                        })}
                                      </div>
                                    </div>
                                    <div className="text-balance jetbrains text-sm text-muted-foreground pl-2">
                                      <div className="mt-4 text-xxs text-black/80 text-balance">
                                        <MarkdownParser text={exp.contribution} />
                                      </div>
                                      {exp.skills_used.length > 0 && (
                                        <div className="mt-2">
                                          <ul
                                            className="inline-flex list-none pl-0.5 flex-wrap gap-1"
                                            aria-label="Technologies used"
                                          >
                                            {exp.skills_used.map((skill: any, index: number) => {
                                              return (
                                                <li
                                                  key={index}
                                                  aria-label={`Skill: ${skill.label}`}
                                                >
                                                  <div className="cursor-default flex items-center rounded-md border px-1.5 py-0.5 font-semibold jetbrains transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent lg:bg-gray-300/70 bg-gray-200/80 text-black hover:bg-gray-300/50 align-middle text-xxs">
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
                        <section className="flex min-h-0 flex-col gap-y-2">
                          <h2
                            className="text-sm font-bold text-black/80 merriweather"
                            id="education-section"
                          >
                            Education
                          </h2>
                          <div
                            className="space-y-3"
                            role="feed"
                            aria-labelledby="education-section"
                          >
                            <article role="article">
                              <div className="rounded-lg bg-white text-black">
                                <div className="flex flex-col space-y-1.5">
                                  <div className="flex items-center justify-between text-base">
                                    <h3
                                      className="text-xs font-semibold leading-none merriweather flex-1 min-w-0"
                                      id={`education-${profile.education.university.replace(/\s+/g, '-').toLowerCase()}`}
                                    >
                                      {profile.education.university}
                                    </h3>
                                    <p
                                      className="jetbrains text-xs font-medium leading-none tracking-tighter lg:tracking-normal text-black/70 flex-shrink-0"
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
                                      className="text-pretty jetbrains text-xxs text-black/80 flex-1 min-w-0"
                                      aria-labelledby={`education-${profile.education.university.replace(/\s+/g, '-').toLowerCase()}`}
                                    >
                                      {profile.education.branch || 'No branch specified.'}
                                    </div>
                                    <p className="jetbrains text-xs font-extrabold leading-none text-black/80 whitespace-nowrap flex-shrink-0">
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
                        <section className="flex min-h-0 flex-col gap-y-2">
                          <h2
                            className="text-sm font-bold text-black/80 merriweather"
                            id="skills-section"
                          >
                            Skills
                          </h2>
                          <ul
                            className="flex list-none flex-wrap gap-1 p-0"
                            aria-label="List of skills"
                          >
                            {profile.skills.map((skill: any, index: any) => {
                              return (
                                <li key={index}>
                                  <div
                                    className="cursor-default flex gap-0.5 items-center justify-center rounded-md border px-2 py-0.5 text-xxs font-semibold jetbrains transition-colors text-nowrap border-transparent lg:bg-gray-300/70 bg-gray-200/80 text-black hover:bg-gray-300/50"
                                    aria-label={`Skill: ${skill.label}`}
                                  >
                                    {skill.logo && (
                                      <img
                                        src={skill.logo}
                                        alt={`${skill.label} logo`}
                                        className="mr-1 h-3.5 w-3.5 rounded grayscale"
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
                        <section className="flex min-h-0 flex-col gap-y-2">
                          <h2
                            className="text-sm font-bold text-black/80 merriweather"
                            id="skills-section"
                          >
                            Projects
                          </h2>
                          <div
                            className="grid grid-cols-1 gap-2"
                            role="feed"
                            aria-labelledby="projects"
                          >
                            {projects.map((project: any, index: number) => {
                              return (
                                <article key={index} className="h-full">
                                  <div
                                    className="rounded-lg bg-white text-black flex h-full flex-col overflow-hidden border border-gray-200 lg:border-gray-300 p-1.5"
                                    role="article"
                                  >
                                    <div className="flex flex-col space-y-1.5">
                                      <div className="space-y-1">
                                        <h3 className="font-semibold tracking-tight text-sm">
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
                                            className="hidden jetbrains text-xs underline"
                                            aria-hidden="true"
                                          >
                                            {project.name}
                                          </div>
                                        </h3>
                                        <span
                                          className="text-black/80 text-balance jetbrains text-xxs"
                                          aria-label="Project description"
                                        >
                                          <MarkdownParser text={project.description} />
                                        </span>
                                      </div>
                                    </div>
                                    <div className="text-balance jetbrains text-xs text-black/80 mt-auto flex">
                                      <ul
                                        className="mt-1.5 flex list-none flex-wrap gap-1 p-0"
                                        aria-label="Technologies used"
                                      >
                                        <li>
                                          <div className="inline-flex items-center rounded border font-semibold jetbrains transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent lg:bg-gray-300/70 bg-gray-200/80 text-black hover:bg-gray-300/50 px-1 py-0 text-[10px]">
                                            TypeScript
                                          </div>
                                        </li>
                                        <li>
                                          <div className="inline-flex items-center rounded border font-semibold jetbrains transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent lg:bg-gray-300/70 bg-gray-200/80 text-black hover:bg-gray-300/50 px-1 py-0 text-[10px]">
                                            Next.js
                                          </div>
                                        </li>
                                        <li>
                                          <div className="inline-flex items-center rounded border font-semibold jetbrains transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent lg:bg-gray-300/70 bg-gray-200/80 text-black hover:bg-gray-300/50 px-1 py-0 text-[10px]">
                                            Browser Extension
                                          </div>
                                        </li>
                                        <li>
                                          <div className="inline-flex items-center rounded border font-semibold jetbrains transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent lg:bg-gray-300/70 bg-gray-200/80 text-black hover:bg-gray-300/50 px-1 py-0 text-[10px]">
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
                        <section className="flex min-h-0 flex-col gap-y-2">
                          <h2
                            className="text-sm font-bold text-black/80 merriweather"
                            id="skills-section"
                          >
                            Shipped
                          </h2>
                          <div
                            className="grid grid-cols-1 gap-2"
                            role="feed"
                            aria-labelledby="startups"
                          >
                            {startups.map((startup: any, index: number) => {
                              return (
                                <article key={index} className="h-full">
                                  <div
                                    className="rounded-lg bg-white text-black flex h-full flex-col overflow-hidden border border-gray-200 lg:border-gray-300 p-1.5"
                                    role="article"
                                  >
                                    <div className="flex flex-col space-y-1.5">
                                      <div className="space-y-1">
                                        <h3 className="font-semibold tracking-tight text-sm">
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
                                            className="hidden jetbrains text-xs underline"
                                            aria-hidden="true"
                                          >
                                            {startup.name}
                                          </div>
                                        </h3>
                                        <span
                                          className="text-black/80 text-pretty jetbrains text-xxs"
                                          aria-label="Project description"
                                        >
                                          <MarkdownParser text={startup.description} />
                                        </span>
                                      </div>
                                    </div>
                                    <div className="text-pretty jetbrains text-xs text-black/80 mt-auto flex">
                                      <ul
                                        className="mt-2 flex list-none flex-wrap gap-1 p-0"
                                        aria-label="Technologies used"
                                      >
                                        {index === 0 && (
                                          <>
                                            <li>
                                              <div className="inline-flex items-center rounded border font-semibold jetbrains transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent lg:bg-gray-300/70 bg-gray-200/80 text-black hover:bg-gray-300/50 px-1 py-0 text-[10px]">
                                                🛠️ JugadScript
                                              </div>
                                            </li>
                                            <li>
                                              <div className="inline-flex items-center rounded border font-semibold jetbrains transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent lg:bg-gray-300/70 bg-gray-200/80 text-black hover:bg-gray-300/50 px-1 py-0 text-[10px]">
                                                🔋 Battery Debugging
                                              </div>
                                            </li>{' '}
                                          </>
                                        )}
                                        {index === 1 && (
                                          <>
                                            <li>
                                              <div className="inline-flex items-center rounded border font-semibold jetbrains transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent lg:bg-gray-300/70 bg-gray-200/80 text-black hover:bg-gray-300/50 px-1 py-0 text-[10px]">
                                                📟 Infrared UI
                                              </div>
                                            </li>
                                            <li>
                                              <div className="inline-flex items-center rounded border font-semibold jetbrains transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent lg:bg-gray-300/70 bg-gray-200/80 text-black hover:bg-gray-300/50 px-1 py-0 text-[10px]">
                                                🤳 Clap-to-Connect™
                                              </div>
                                            </li>
                                          </>
                                        )}
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
              </div>
            ) : (
              <div className="p-4 space-y-2">
                <div
                  style={{
                    background: hexToHSL(t.secondary!, 0.8),
                  }}
                  className="w-full rounded-full h-6 flex items-center justify-between px-2"
                >
                  {profile.favicon_url ? (
                    <Image
                      width={20}
                      height={20}
                      alt="Favicon"
                      className="h-5 w-5 rounded-full"
                      referrerPolicy="no-referrer"
                      src={profile.favicon_url}
                    />
                  ) : (
                    <span title="No custom favicon">
                      <CircleHelp
                        style={{
                          color: t.foreground,
                        }}
                        strokeWidth={1}
                        className="h-4 w-4"
                      />
                    </span>
                  )}
                  <p
                    style={{
                      color: t.foreground,
                    }}
                    className="text-xs"
                  >
                    /p/{profile.username}
                  </p>
                  <Link
                    target="_blank"
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/p/${profile.username}`}
                  >
                    <ExternalLink
                      style={{
                        color: t.foreground,
                      }}
                      strokeWidth={1.5}
                      size={14}
                      className="text-foreground"
                    />
                  </Link>
                </div>
                <div className="h-1 w-full" />

                <div className="flex items-center justify-start gap-2">
                  {profile.avatar_url && (
                    <div
                      style={{
                        borderColor: t.border,
                      }}
                      className="w-12 h-12 p-0.5 border border-dashed rounded-md"
                    >
                      <Image
                        alt="Profile Image"
                        width={48}
                        height={48}
                        className="w-full h-full rounded-md object-cover"
                        src={profile.avatar_url}
                      />
                    </div>
                  )}
                  <div className="flex flex-col items-start justify-center gap-1">
                    <p
                      style={{
                        color: t.foreground,
                      }}
                      className="text-sm font-semibold"
                    >
                      {profile.full_name}
                    </p>
                    {profile.country && (
                      <p
                        style={{
                          color: hexToHSL(t.foreground!, 0.7),
                        }}
                        className="flex flex-wrap items-center text-xs font-medium gap-0.5"
                      >
                        <MapPin className="w-3 h-3" strokeWidth={1} />
                        {profile.country.split('-')[0]}
                        <img
                          className="w-4"
                          alt={`${profile.country.split('-')[1]} Flag`}
                          src={`https://flagsapi.com/${profile.country.split('-')[1]}/flat/64.png`}
                          referrerPolicy="no-referrer"
                        />
                        <span className="font-medium mx-1">/</span>
                        {profile.geo_info.city}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-start justify-center px-2 py-1">
                  {profile.headline && (
                    <h1
                      style={{
                        color: t.foreground,
                      }}
                      className="text-xs font-bold"
                    >
                      {profile.headline}
                    </h1>
                  )}
                  {profile.company && profile.education.university && (
                    <p
                      style={{
                        color: hexToHSL(t.foreground!, 0.7),
                      }}
                      className="text-xxs text-muted-foreground"
                    >
                      at{' '}
                      <span
                        style={{
                          color: hexToHSL(t.foreground!, 0.8),
                        }}
                        className="font-semibold"
                      >
                        @{profile.company}
                      </span>{' '}
                      · {profile.education.university} Alumni
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-start text-xxs gap-2 mb-3 px-2 pb-1">
                  {profile.profile_link.url && profile.profile_link.text && (
                    <div
                      style={{
                        color: hexToHSL(t.foreground!, 0.7),
                      }}
                    >
                      <a
                        target="_blank"
                        href={profile.profile_link.url}
                        style={{
                          borderColor: hexToHSL(t.primary!),
                        }}
                        className={`changeon_hover cursor-pointer w-fit flex items-center gap-0.5 border-b-2 border-dashed transition-colors`}
                      >
                        <Link2 className="w-[12px] h-[12px]" />
                        {profile.profile_link.text}
                      </a>
                      <style jsx>{`
                        .changeon_hover:hover {
                          color: ${hexToHSL(t.foreground!)};
                          border-color: ${hexToHSL(t.primary!)};
                        }
                      `}</style>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap items-center justify-start gap-1 px-2">
                  {profile.skills.map((skill: Skill, index: number) => (
                    <div
                      key={index}
                      style={{
                        background: t.secondary,
                        color: t.foreground,
                      }}
                      className="flex items-center font-medium justify-center gap-1 rounded-full px-2 py-0.5 text-tiny"
                    >
                      {skill.logo && (
                        <img src={skill.logo} alt={skill.label} className="h-2 w-2 rounded-xs" />
                      )}
                      {skill.label}
                    </div>
                  ))}
                </div>
                {profile.socials.length > 0 && (
                  <div className="gap-1 flex flex-wrap items-center justify-start p-2">
                    {profile.socials.map((social: Social, index: number) => {
                      const icon = getPlatformIcon(social.url);
                      return (
                        <a
                          style={
                            {
                              color: t.foreground,
                              borderColor: hexToHSL(t.primary!, 0.5),
                              '--hover-background': hexToHSL(t.secondary!, 0.5),
                              '--hover-border': hexToHSL(t.primary!, 0.6),
                            } as React.CSSProperties
                          }
                          target="_blank"
                          href={social.url}
                          key={index}
                          className="w-8 h-8 border transition-colors duration-200 rounded-md px-2 flex items-center justify-center hover:bg-[var(--hover-background)] hover:border-[var(--hover-border)]"
                        >
                          <>{icon}</>
                        </a>
                      );
                    })}
                  </div>
                )}
                <Tabs defaultValue={defaultValue} className="w-full mt-4">
                  <div className="relative rounded-sm overflow-x-scroll h-10 no_scrollbar scrollbar-hidden">
                    <TabsList
                      style={{
                        background: t.background,
                      }}
                      className="absolute flex flex-row justify-stretch w-auto"
                    >
                      {showExp && (
                        <TabsTrigger
                          value="experience"
                          style={
                            {
                              '--active-text-color': t.foreground,
                              '--inactive-text-color': hexToHSL(t.foreground!, 0.7),
                              '--active-border-color': t.primary,
                              '--background-color': t.background,
                            } as React.CSSProperties
                          }
                          className="cursor-pointer flex flex-col items-center justify-center border-t-0 border-r-0 border-l-0 border-b-[2.5px] data-[state=active]:shadow-none border-transparent data-[state=active]:bg-[var(--background-color)] data-[state=active]:border-[var(--active-border-color)] !text-[var(--inactive-text-color)] data-[state=active]:!text-[var(--active-text-color)] pb-[5px] pt-2 text-xxs font-semibold tracking-[0.015em] bg-transparent rounded-none focus-visible:ring-0 focus-visible:outline-none"
                        >
                          Experience
                        </TabsTrigger>
                      )}
                      {showStartups && (
                        <TabsTrigger
                          value="startups"
                          style={
                            {
                              '--active-text-color': t.foreground,
                              '--inactive-text-color': hexToHSL(t.foreground!, 0.7),
                              '--active-border-color': t.primary,
                              '--background-color': t.background,
                            } as React.CSSProperties
                          }
                          className="cursor-pointer flex flex-col items-center justify-center border-t-0 border-r-0 border-l-0 border-b-[2.5px] data-[state=active]:shadow-none border-transparent data-[state=active]:bg-[var(--background-color)] data-[state=active]:border-[var(--active-border-color)] !text-[var(--inactive-text-color)] data-[state=active]:!text-[var(--active-text-color)] pb-[5px] pt-2 text-xxs font-semibold tracking-[0.015em] bg-transparent rounded-none focus-visible:ring-0 focus-visible:outline-none"
                        >
                          Startups
                        </TabsTrigger>
                      )}
                      {showStartups && (
                        <TabsTrigger
                          value="projects"
                          style={
                            {
                              '--active-text-color': t.foreground,
                              '--inactive-text-color': hexToHSL(t.foreground!, 0.7),
                              '--active-border-color': t.primary,
                              '--background-color': t.background,
                            } as React.CSSProperties
                          }
                          className="cursor-pointer flex flex-col items-center justify-center border-t-0 border-r-0 border-l-0 border-b-[2.5px] data-[state=active]:shadow-none border-transparent data-[state=active]:bg-[var(--background-color)] data-[state=active]:border-[var(--active-border-color)] !text-[var(--inactive-text-color)] data-[state=active]:!text-[var(--active-text-color)] pb-[5px] pt-2 text-xxs font-semibold tracking-[0.015em] bg-transparent rounded-none focus-visible:ring-0 focus-visible:outline-none"
                        >
                          Projects
                        </TabsTrigger>
                      )}
                    </TabsList>
                  </div>
                  {showExp && (
                    <TabsContent value="experience">
                      <div className="mt-2">
                        {profile.experience.map((company: Experience, companyIndex: number) => {
                          const lineHeight = getLineHeightPercent(company.roles.length);

                          return (
                            <div className="group relative mb-4" key={companyIndex}>
                              <div
                                style={{
                                  height: lineHeight,
                                  background: t.primary,
                                }}
                                className="absolute w-[1.5px] top-[34px] left-[15px]"
                              />
                              <div className="w-full flex justify-between">
                                <div className="flex items-center gap-1 relative">
                                  <img
                                    alt={`${company.company} Logo`}
                                    className="cursor-pointer w-8 h-8 rounded-full flex justify-center items-center object-cover hover:opacity-90 transition-opacity border-primaryBorder flex-grow border"
                                    src={
                                      company.company_link
                                        ? `https://www.google.com/s2/favicons?sz=128&domain_url=${company.company_link}`
                                        : '/general/company.png'
                                    }
                                  />
                                  <p
                                    style={{
                                      color: t.foreground,
                                    }}
                                    className="font-bold text-xs truncate"
                                  >
                                    {company.company}
                                  </p>
                                  <Info
                                    style={{
                                      color: t.foreground,
                                    }}
                                    strokeWidth={1}
                                    size={10}
                                    className="cursor-pointer"
                                  />
                                </div>
                              </div>

                              {company.roles.map((role: any, roleIndex: any) => (
                                <div
                                  key={roleIndex}
                                  className="relative w-full transition-colors duration-200 flex flex-col items-center py-2 pl-7"
                                >
                                  <div className="w-full flex relative">
                                    <div
                                      style={{
                                        borderColor: t.primary!,
                                      }}
                                      className="w-4 h-3 border-l-2 border-b-2 rounded-bl-lg absolute -left-[13px]"
                                    />
                                    <div className="w-full flex ml-2">
                                      <div className="group w-full duration-300 ease-in-out rounded-2xl outline-none transition-shadow group b-0 ">
                                        <div
                                          className="w-full group flex items-center relative text-left cursor-default p-0"
                                          role="none"
                                        >
                                          <div className="w-full flex flex-col gap-2">
                                            <div className="flex items-center justify-between w-full">
                                              <div className="w-full flex flex-col">
                                                <div className="flex items-center gap-2 truncate overflow-hidden">
                                                  <span className="flex items-center justify-start gap-1 truncate overflow-hidden whitespace-nowrap">
                                                    <p
                                                      style={{
                                                        color: t.foreground,
                                                      }}
                                                      className="font-semibold text-xxs truncate max-w-46 sm:max-w-fit"
                                                    >
                                                      {role.headline}
                                                    </p>
                                                    <p
                                                      style={{
                                                        color: t.foreground,
                                                      }}
                                                    >
                                                      &middot;
                                                    </p>
                                                    <span
                                                      style={{
                                                        color: hexToHSL(t.foreground!, 0.7),
                                                      }}
                                                      className="text-tiny truncate max-w-16 lg:max-w-fit"
                                                    >
                                                      {role.employment_type}
                                                    </span>
                                                  </span>
                                                </div>
                                                <p
                                                  style={{
                                                    color: hexToHSL(t.foreground!, 0.7),
                                                  }}
                                                  className="font-normal text-tiny truncate overflow-hidden whitespace-nowrap max-w-58 sm:max-w-fit"
                                                >
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
                                                    <span
                                                      style={{
                                                        color: t.foreground,
                                                      }}
                                                      className="mx-0.5"
                                                    >
                                                      •
                                                    </span>
                                                    <span className="font-normal">
                                                      {role.location}, {role.location_type}
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
                          );
                        })}
                      </div>
                    </TabsContent>
                  )}
                  {showStartups && (
                    <TabsContent value="startups">
                      <div className="space-y-2">
                        {startups.map(
                          (startup: Startup, index: number) =>
                            startup.show_on_profile && (
                              <div
                                key={index}
                                style={{
                                  background: t.card,
                                  borderColor: hexToHSL(t.primary!, 0.3),
                                }}
                                className="w-full rounded-lg border border-primary/60 h-fit px-3 py-2 flex flex-col gap-2 items-start justify-center"
                              >
                                <div className="flex items-center justify-center gap-2">
                                  <img
                                    src={`https://www.google.com/s2/favicons?sz=128&domain_url=${startup.url}`}
                                    className="w-8 h-8 rounded-full"
                                    alt={`${startup.name} Icon`}
                                  />
                                  <div className="flex flex-col items-start justify-center gap-1">
                                    <p
                                      style={{ color: t.foreground }}
                                      className="text-xs font-semibold"
                                    >
                                      {startup.name}
                                    </p>
                                    <div className="flex gap-1 items-center justify-start w-full">
                                      {(() => {
                                        const currentStatus = statusOptions.find(
                                          (s) => s.status === startup.status
                                        );
                                        return currentStatus ? (
                                          <span
                                            style={{
                                              background: t.secondary,
                                              color: t.foreground,
                                            }}
                                            className={`flex items-center gap-0.5 px-1 py-0.5 rounded-full text-tiny`}
                                          >
                                            <img
                                              className="w-3 h-3"
                                              src={`/startupStatus/${currentStatus.status}.png`}
                                            />
                                            <span>{currentStatus.text}</span>
                                          </span>
                                        ) : (
                                          <span
                                            style={{
                                              background: t.secondary,
                                              color: t.foreground,
                                            }}
                                            className="flex items-center gap-0.5 px-1 py-0.5 rounded-full text-tiny"
                                          >
                                            {startup.status}
                                          </span>
                                        );
                                      })()}
                                      {(() => {
                                        const currentCategory = categoryOptions.find(
                                          (s) => s.category === startup.category
                                        );
                                        return currentCategory ? (
                                          <span
                                            style={{
                                              background: t.secondary,
                                              color: t.foreground,
                                            }}
                                            className={`flex items-center gap-0.5 px-1 py-0.5 rounded-full text-tiny`}
                                          >
                                            <img
                                              className="w-3 h-3"
                                              src={`/startupCategory/${currentCategory.category}.png`}
                                            />
                                            <span>{currentCategory.text}</span>
                                          </span>
                                        ) : (
                                          <span
                                            style={{
                                              background: t.secondary,
                                              color: t.foreground,
                                            }}
                                            className="flex items-center gap-0.5 px-1 py-0.5 rounded-full text-tiny"
                                          >
                                            {startup.category}
                                          </span>
                                        );
                                      })()}
                                    </div>
                                  </div>
                                </div>
                                <div
                                  style={{
                                    background: hexToHSL(t.primary, 0.3),
                                  }}
                                  className="w-full h-px"
                                />
                                <div
                                  style={{
                                    color: hexToHSL(t.foreground!, 0.7),
                                  }}
                                  className="text-xxs font-medium w-full"
                                >
                                  {startup.show_revenue ? (
                                    <div className="h-24 w-full">
                                      <RevenueChart />
                                    </div>
                                  ) : (
                                    <span className="line-clamp-3">
                                      <MarkdownParser
                                        text={startup.description || 'No Description Found.'}
                                      />
                                    </span>
                                  )}
                                </div>
                              </div>
                            )
                        )}
                      </div>
                    </TabsContent>
                  )}
                  {showProjects && (
                    <TabsContent value="projects">
                      <div className="space-y-2">
                        {projects.map(
                          (project: Project, index: number) =>
                            project.show_on_profile && (
                              <div
                                key={index}
                                style={{
                                  background: t.card,
                                  borderColor: hexToHSL(t.primary, 0.3),
                                }}
                                className="w-full rounded-lg border h-fit px-3 py-2 flex flex-col gap-2 items-start justify-center"
                              >
                                <div className="flex items-center justify-center gap-2">
                                  <img
                                    src={`https://www.google.com/s2/favicons?sz=128&domain_url=${project.url}`}
                                    className="w-8 h-8 rounded-full"
                                    alt={`${project.name} Icon`}
                                  />
                                  <div className="flex flex-col items-start justify-center gap-1">
                                    <p
                                      style={{ color: t.foreground }}
                                      className="text-xs font-semibold"
                                    >
                                      {project.name}
                                    </p>
                                    <div className="flex gap-2 items-center justify-start w-full">
                                      {(() => {
                                        const currentCategory = categoryOptions.find(
                                          (s) => s.category === project.category
                                        );
                                        return currentCategory ? (
                                          <span
                                            style={{
                                              background: t.secondary,
                                              color: t.foreground,
                                            }}
                                            className={`flex items-center gap-0.5 px-1 py-0.5 rounded-full text-tiny`}
                                          >
                                            <img
                                              className="w-3 h-3"
                                              src={`/startupCategory/${currentCategory.category}.png`}
                                            />
                                            <span>{currentCategory.text}</span>
                                          </span>
                                        ) : (
                                          <span
                                            style={{
                                              background: t.secondary,
                                              color: t.foreground,
                                            }}
                                            className="flex items-center gap-0.5 px-1 py-0.5 rounded-full text-tiny"
                                          >
                                            {project.category}
                                          </span>
                                        );
                                      })()}
                                    </div>
                                  </div>
                                </div>
                                <div
                                  style={{
                                    background: hexToHSL(t.primary, 0.3),
                                  }}
                                  className="w-full h-px"
                                />
                                <div
                                  style={{
                                    color: hexToHSL(t.foreground!, 0.7),
                                  }}
                                  className="text-xxs font-medium"
                                >
                                  <span className="line-clamp-3">
                                    <MarkdownParser text={project.description} />{' '}
                                  </span>
                                </div>
                              </div>
                            )
                        )}
                      </div>
                    </TabsContent>
                  )}
                </Tabs>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;
