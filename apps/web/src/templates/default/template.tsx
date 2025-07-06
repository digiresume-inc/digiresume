import React from 'react';
import { Badge } from '@dr/ui/components/base/badge';
import {
  formatMonthShortYear,
  formatMonthYear,
  getLineHeightPercent,
  getMonthsDifference,
  hexToHSL,
  Skill,
} from '@dr/utils';
import { statusOptions, categoryOptions } from '@dr/schemas';
import { Info, MapPin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@dr/ui/components/base/tabs';
import { Popover, PopoverTrigger, PopoverContent } from '@dr/ui/components/base/popover';
import ShareCard from './components/share-card';
import MarkdownParser from '@/components/general/markdown-parser';
import ProfileUrl from './components/profile-url';
import ResumeDownload from './components/resume-download';
import DynamicImage from '@/components/general/dynamic-image';
import RevenueChart from './components/revenue-chart';

import type { CompleteProfile, Project, Startup } from '@/lib/types/supabase-types';
import { PlatformIcon } from '@/components/general/get-platform-icon';


const DefualtTemplate = ({ profile }: { profile: CompleteProfile }) => {
  const t = profile.theme.theme_data;
  const showExp = profile.experience.length > 0;
  const startups = profile.startups!;
  const projects = profile.projects!;

  const showStartups = startups.length > 0;
  const showProjects = projects.length > 0;
  const defaultValue = showExp ? 'experience' : showStartups ? 'startups' : 'projects';

  const additionalinfo = profile.template_info;

  if (additionalinfo?.activeTemplate !== 'default') return null;
  return (
    <div
      style={{
        background: t.background,
      }}
      className="relative flex size-full min-h-screen flex-col overflow-x-hidden"
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5">
          <div className="flex flex-col max-w-[960px] flex-1 relative py-6 lg:py-0">
            <ShareCard profile={profile} t={t} />
            <ResumeDownload t={t} />
            <div className="flex px-6 py-4">
              <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
                <div className="flex gap-4 items-center justify-start">
                  <div
                    style={{
                      borderColor: t.border,
                    }}
                    className="h-18 lg:h-24 w-18 lg:w-24 rounded-2xl p-1 border-2 border-dashed"
                  >
                    <DynamicImage
                      width={96}
                      height={96}
                      className="rounded-2xl h-full w-full object-cover"
                      alt={profile.full_name}
                      url={profile.avatar_url}
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-1.5">
                    <p
                      style={{
                        color: t.foreground,
                      }}
                      className="text-lg md:text-xl lg:text-2xl font-bold leading-tight tracking-[-0.015em]"
                    >
                      {profile.full_name}
                    </p>
                    <p
                      style={{
                        color: hexToHSL(t.foreground!, 0.7),
                      }}
                      className="flex items-center justify-start text-sm font-normal lg:font-medium gap-0.5 lg:gap-1 px-0"
                    >
                      <MapPin className="w-3 lg:w-[14px] h-3 lg:h-[14px]" />{' '}
                      {profile.country.split('-')[0]}{' '}
                      <img
                        src={`https://flagsapi.com/${profile.country.split('-')[1]}/flat/64.png`}
                        className="w-4 lg:w-5 h-4 lg:h-5"
                      />
                      <span>/</span>
                      <span>{profile.geo_info.state}</span>
                      <span>/</span>
                      <span>{profile.geo_info.city}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-center px-6 py-2">
              <h1
                style={{
                  color: t.foreground,
                }}
                className="text-base lg:text-2xl font-bold"
              >
                {profile.headline}
              </h1>
              <p
                style={{
                  color: hexToHSL(t.foreground, 0.7),
                }}
                className="text-sm text-muted-foreground font-medium text-start"
              >
                at{' '}
                <span
                  style={{
                    color: hexToHSL(t.foreground, 0.8),
                  }}
                  className="font-bold"
                >
                  @{profile.company}
                </span>{' '}
                · {profile.education.university} Alumni
              </p>
            </div>
            <div className="flex items-center justify-start lg:items-start px-6 py-4 gap-3">
              <ProfileUrl profile={profile} t={t} />
            </div>
            <div className="gap-2 flex flex-wrap items-center justify-start px-6 py-4">
              {profile.socials.map((social: any, index: number) => {
                return (
                  <a
                    target="_blank"
                    href={social.url}
                    key={index}
                    style={
                      {
                        color: t.foreground,
                        borderColor: hexToHSL(t.primary, 0.5),
                        '--hover-background': hexToHSL(t.secondary, 0.5),
                        '--hover-border': hexToHSL(t.primary, 0.6),
                      } as React.CSSProperties
                    }
                    className="w-10 h-10 border-[1.5px] transition-colors duration-200 rounded-lg p-2 flex items-center justify-center hover:bg-[var(--hover-background)] hover:border-[var(--hover-border)]"
                  >
                    <PlatformIcon url={social.url} />
                  </a>
                );
              })}
            </div>
            <div className="flex gap-2 px-6 py-4 flex-wrap items-center justify-start">
              {profile.skills.map((skill: Skill) => (
                <Badge
                  key={skill.value}
                  style={{
                    background: t.secondary,
                    color: t.foreground,
                  }}
                  variant="secondary"
                  className="flex items-center gap-1 rounded-full text-xs px-3 py-1"
                >
                  {skill.logo && (
                    <img src={skill.logo} alt={skill.label} className="h-4 w-4 rounded-md" />
                  )}
                  {skill.label}
                </Badge>
              ))}
            </div>
            <Tabs defaultValue={defaultValue} className="w-full mt-4 p-4">
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
                      className="cursor-pointer flex flex-col items-center justify-center  border-t-0 border-r-0 border-l-0 border-b-[3px] data-[state=active]:shadow-none border-transparent data-[state=active]:bg-[var(--background-color)] data-[state=active]:border-[var(--active-border-color)] !text-[var(--inactive-text-color)] data-[state=active]:!text-[var(--active-text-color)] pb-[10px] lg:pb-[20px] pt-4 text-sm font-bold tracking-[0.015em] bg-transparent rounded-none focus-visible:ring-0 focus-visible:outline-none"
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
                      className="cursor-pointer flex flex-col items-center justify-center border-t-0 border-r-0 border-l-0 border-b-[3px] data-[state=active]:shadow-none border-transparent data-[state=active]:bg-[var(--background-color)] data-[state=active]:border-[var(--active-border-color)] !text-[var(--inactive-text-color)] data-[state=active]:!text-[var(--active-text-color)] pb-[10px] lg:pb-[20px] pt-4 text-sm font-bold tracking-[0.015em] bg-transparent rounded-none focus-visible:ring-0 focus-visible:outline-none"
                    >
                      Startups
                    </TabsTrigger>
                  )}
                  {showProjects && (
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
                      className="cursor-pointer flex flex-col items-center justify-center border-t-0 border-r-0 border-l-0 border-b-[3px] data-[state=active]:shadow-none border-transparent data-[state=active]:bg-[var(--background-color)] data-[state=active]:border-[var(--active-border-color)] !text-[var(--inactive-text-color)] data-[state=active]:!text-[var(--active-text-color)] pb-[10px] lg:pb-[20px] pt-4 text-sm font-bold tracking-[0.015em] bg-transparent rounded-none focus-visible:ring-0 focus-visible:outline-none"
                    >
                      Projects
                    </TabsTrigger>
                  )}
                </TabsList>
              </div>
              {showExp && (
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
                              background: t.primary,
                            }}
                            className="absolute w-[1.5px] top-[50px] left-[19px]"
                          />
                          <div className="w-full flex justify-between">
                            <div className="flex items-center gap-2 relative">
                              <div
                                style={{
                                  borderColor: t.border,
                                }}
                                className="w-10 h-10 rounded-full border border-dashed p-0.5"
                              >
                                <img
                                  alt={company.company}
                                  className="cursor-pointer w-full h-full rounded-full flex justify-center items-center object-cover hover:opacity-90 transition-opacity flex-grow"
                                  src={
                                    company.company_link
                                      ? `https://www.google.com/s2/favicons?sz=128&domain_url=${company.company_link}`
                                      : '/general/company.png'
                                  }
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <div className="flex items-center justify-start gap-2">
                                  <p
                                    style={{
                                      color: t.foreground,
                                    }}
                                    className="font-bold text-base lg:text-lg truncate"
                                  >
                                    {company.company}
                                  </p>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Info
                                        style={{
                                          color: t.foreground,
                                        }}
                                        strokeWidth={1}
                                        size={16}
                                        className="text-muted-foreground cursor-pointer"
                                      />
                                    </PopoverTrigger>
                                    <PopoverContent
                                      style={{
                                        background: t.background,
                                        color: t.foreground,
                                        borderColor: t.border,
                                      }}
                                      className="w-80 text-xs font-medium mt-4 relative border"
                                    >
                                      <MarkdownParser text={company.contribution} />
                                    </PopoverContent>
                                  </Popover>
                                </div>
                                {company.skills_used.length > 0 && (
                                  <div className="mt-0">
                                    <ul
                                      className="inline-flex list-none flex-wrap gap-1"
                                      aria-label="Technologies used"
                                    >
                                      {company.skills_used.map((skill: any, index: number) => {
                                        return (
                                          <li key={index} aria-label={`Skill: ${skill.label}`}>
                                            <div
                                              style={{
                                                background: t.secondary,
                                                color: hexToHSL(t.foreground, 0.7),
                                              }}
                                              className="cursor-default flex items-center rounded-full border px-1.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent  align-middle text-xxs lg:text-xs"
                                            >
                                              {skill.logo && (
                                                <img
                                                  src={skill.logo}
                                                  alt={`${skill.label} logo`}
                                                  className="mr-0.5 h-3 w-3 rounded"
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
                          </div>

                          {company.roles.map((role: any, roleIndex: any) => (
                            <div
                              key={roleIndex}
                              className="relative w-full transition-colors duration-200 flex flex-col items-center py-4 pl-8"
                            >
                              <div className="w-full flex relative">
                                <div
                                  style={{
                                    borderColor: t.primary!,
                                  }}
                                  className="w-4 h-3 border-l-2 border-b-2 rounded-bl-lg absolute -left-[13px]"
                                />
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
                                                    <p
                                                      style={{
                                                        color: t.foreground,
                                                      }}
                                                      className="font-semibold text-sm truncate max-w-46 sm:max-w-fit"
                                                    >
                                                      {role.headline}
                                                    </p>
                                                    <p
                                                      style={{
                                                        color: t.foreground,
                                                      }}
                                                    >
                                                      •
                                                    </p>
                                                    <span
                                                      style={{
                                                        color: hexToHSL(t.foreground!, 0.7),
                                                      }}
                                                      className="text-xs text-muted-foreground truncate max-w-16 lg:max-w-fit"
                                                    >
                                                      {role.employment_type}
                                                    </span>
                                                  </span>
                                                </div>
                                                <p
                                                  style={{
                                                    color: hexToHSL(t.foreground, 0.7),
                                                  }}
                                                  className="text-muted-foreground font-normal text-xs truncate overflow-hidden whitespace-nowrap max-w-58 sm:max-w-fit"
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
              )}
              {showStartups && (
                <TabsContent value="startups">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-6 pl-2 lg:pl-4">
                    {startups.map((startup: Startup, index: number) => {
                      return (
                        <div
                          key={index}
                          style={{
                            background: t.card,
                            borderColor: hexToHSL(t.primary!, 0.3),
                          }}
                          className="min-h-34 col-span-1 w-full bg-card rounded-lg border p-3 flex flex-col gap-2 items-start justify-start"
                        >
                          <div className="flex items-center justify-center gap-2">
                            <div
                              style={{
                                borderColor: hexToHSL(t.primary!, 0.3),
                              }}
                              className="w-12 h-12 p-0.5 border rounded-full border-dashed"
                            >
                              <img
                                src={`https://www.google.com/s2/favicons?sz=128&domain_url=${startup.url}`}
                                className="w-full h-full rounded-full"
                              />
                            </div>
                            <div className="flex flex-col items-start justify-center gap-1">
                              <p
                                style={{ color: t.foreground }}
                                className="text-base font-bold ml-1"
                              >
                                {startup.name}
                              </p>
                              <div className="flex gap-2 items-center justify-start w-full">
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
                                      className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xxs lg:text-xs`}
                                    >
                                      <img
                                        className="w-3 lg:w-4 h-3 lg:h-4"
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
                                      className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xxs lg:text-xs"
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
                                      className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xxs lg:text-xs`}
                                    >
                                      <img
                                        className="w-3 lg:w-4 h-3 lg:h-4"
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
                                      className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs"
                                    >
                                      {startup.category}
                                    </span>
                                  );
                                })()}
                              </div>
                            </div>
                          </div>
                          <div
                            style={{ background: hexToHSL(t.primary!, 0.6) }}
                            className="h-px w-full"
                          />
                          <div className="h-fit w-full">
                            {startup.show_revenue ? (
                              <div className="h-32 w-full">
                                <RevenueChart />
                              </div>
                            ) : (
                              <div
                                style={{
                                  color: hexToHSL(t.foreground!, 0.7),
                                }}
                                className="text-sm font-medium h-full"
                              >
                                <span className="line-clamp-3">
                                  <MarkdownParser
                                    text={startup.description || 'No Description Found.'}
                                  />
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
              )}
              {showProjects && (
                <TabsContent value="projects">
                  {' '}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-6 pl-2 lg:pl-4">
                    {projects.map((project: Project, index: number) => {
                      return (
                        <div
                          key={index}
                          style={{
                            background: t.card,
                            borderColor: hexToHSL(t.primary!, 0.3),
                          }}
                          className="min-h-34 col-span-1 w-full bg-card rounded-lg border p-3 flex flex-col gap-2 items-start justify-start"
                        >
                          <div className="flex items-center justify-center gap-2">
                            <div
                              style={{
                                borderColor: hexToHSL(t.primary!, 0.3),
                              }}
                              className="w-12 h-12 p-0.5 border rounded-full border-dashed"
                            >
                              <img
                                src={`https://www.google.com/s2/favicons?sz=128&domain_url=${project.url}`}
                                className="w-full h-full rounded-full"
                              />
                            </div>
                            <div className="flex flex-col items-start justify-center gap-1">
                              <p
                                style={{ color: t.foreground }}
                                className="text-base font-bold ml-1"
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
                                      className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xxs lg:text-xs`}
                                    >
                                      <span>{currentCategory.icon}</span>
                                      <span>{currentCategory.text}</span>
                                    </span>
                                  ) : (
                                    <span
                                      style={{
                                        background: t.secondary,
                                        color: t.foreground,
                                      }}
                                      className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xxs lg:text-xs"
                                    >
                                      {project.category}
                                    </span>
                                  );
                                })()}
                              </div>
                            </div>
                          </div>
                          <div
                            style={{ background: hexToHSL(t.primary!, 0.6) }}
                            className="h-px w-full bg-primary/60"
                          />
                          <div
                            style={{
                              color: hexToHSL(t.foreground!, 0.7),
                            }}
                            className="text-sm font-medium"
                          >
                            <span className="line-clamp-3">
                              <MarkdownParser text={project.description} />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefualtTemplate;
