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
} from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  formatMonthShortYear,
  getLineHeightPercent,
  getMonthsDifference,
  hexToHSL,
} from '@dr/utils';
import { Startup, Project, statusOptions, categoryOptions } from '@dr/schemas';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@dr/ui/components/base/tabs';
import MarkdownParser from '@/components/general/markdownparser';
import { socialIconMap } from '@/lib/utils/iconMap';
import { cn } from '@dr/ui/lib/utils';
import type { Database, Experience, Skill, Social, Theme } from '@/lib/types/supabasetypes';

type Profile = Database['public']['Tables']['profiles']['Row'];

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
  startups: any;
  projects: any;
  theme: Theme;
}) => {
  const t = theme?.theme_data;
  const showExp = profile.experience.length > 0;
  const showStartups = startups.length > 0;
  const showProjects = projects.length > 0;
  const defaultValue = showExp ? 'experience' : showStartups ? 'startups' : 'projects';
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
        <h2 className="text-lg lg:text-2xl font-bold">Preview</h2>
        <div className="relative w-[300px] h-[620px] rounded-[50px] bg-black shadow-2xl border-[14px] border-black flex items-center justify-center">
          {/* Dynamic Island */}
          <div className="absolute top-[-5px] left-1/2 -translate-x-1/2 bg-black rounded-t-2xl rounded-b-4xl w-[130px] h-[25px] z-20"></div>

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
            <div className="p-4 space-y-2">
              <div
                style={{
                  background: hexToHSL(t.secondary!, 0.5),
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
                  /{profile.username}
                </p>
                <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/p/${profile.username}`}>
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
                                      : '/company.png'
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
                                                    •
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
                      {startups.map((startup: Startup, index: number) => (
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
                              <p style={{ color: t.foreground }} className="text-xs font-semibold">
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
                                      className={`flex items-center gap-0.5 px-1 py-0.5 rounded-full text-tiny`}
                                    >
                                      <span>{currentStatus.icon}</span>
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
                                      <span>{currentCategory.icon}</span>
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
                            className="text-xxs font-medium"
                          >
                            <span className="line-clamp-3">
                              <MarkdownParser text={startup.description} />{' '}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                )}
                {showProjects && (
                  <TabsContent value="projects">
                    <div className="space-y-2">
                      {projects.map((project: Project, index: number) => (
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
                              <p style={{ color: t.foreground }} className="text-xs font-semibold">
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
                                      <span>{currentCategory.icon}</span>
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
                      ))}
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;
