'use client';
import { PlatformIcon } from '@/components/general/get-platform-icon';
import MarkdownParser from '@/components/general/markdown-parser';
import { CompleteProfile, Project, Skill, Social, Startup } from '@/lib/types/supabase-types';
import { cn } from '@dr/ui/lib/utils';
import { AnimatePresence, motion } from 'motion/react';
import React, { useState } from 'react';
import { LuGlobe, LuMoveRight } from 'react-icons/lu';
import { SiGithub } from 'react-icons/si';

const ScifiTemplate = ({ profile }: { profile: CompleteProfile }) => {
  const addInfo = profile.template_info;
  const additionalinfo = addInfo.templates['scifi'];

  if (addInfo?.activeTemplate !== 'scifi' || !additionalinfo) return null;

  const [selectedItem, setSelectedItem] = useState<any>(null);
  return (
    <main className="jetbrains flex min-h-screen flex-col bg-neutral-950 mono text-neutral-100 text-sm">
      <StartupModel selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      <div className="flex-1 pt-24">
        <div className="text-[13px] [text-rendering:geometricPrecision] px-6 max-w-3xl text-neutral-400 mx-auto">
          <div className="mb-24">
            <h1 className='text-base font-medium text-stone-100 slide-in-from-top-2 [font-feature-setting:"kern","calt","case"] motion-safe:fade-in'>
              {profile.full_name}
            </h1>
            <p className="text-neutral-500">
              {profile.country} / {profile.geo_info.state} / {profile.geo_info.city}
            </p>
            <section className="mt-6">
              <p className="text-neutral-400">
                {profile.headline}{' '}
                <a
                  className="text-stone-300 underline decoration-stone-400 decoration-[0.5px] underline-offset-4 transition-colors hover:text-stone-200 hover:decoration-stone-200"
                  href="https://scira.ai"
                  target="_blank"
                >
                  @{profile.company}
                </a>
              </p>
              <p className="mt-4 text-neutral-400">
                Alumni{' '}
                <a
                  className="text-stone-300 underline decoration-stone-400 decoration-[0.5px] underline-offset-4 transition-colors hover:text-stone-200 hover:decoration-stone-200"
                  href="https://scira.ai"
                  target="_blank"
                >
                  @{profile.education.university}
                </a>
              </p>
            </section>
            <section className="mt-8">
              <h2 className="mb-2 text-neutral-100">about me</h2>
              <span className="text-neutral-400">
                <MarkdownParser text={profile.shortbio} />
              </span>
            </section>
            <section className="mt-12">
              <a href="/work">
                <h2 className="text-neutral-100 mb-2">skills</h2>
              </a>
              <div className="flex flex-wrap items-center gap-2">
                {profile.skills.map((skill, i) => {
                  return <SkillBox key={i} {...skill} />;
                })}
              </div>
            </section>
            <section className="mt-12">
              <a href="/work">
                <h2 className="text-neutral-100 mb-2">projects</h2>
              </a>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {profile.projects?.map((project, i) => {
                  return <ProjectBox key={i} project={project} setSelectedItem={setSelectedItem} />;
                })}
              </ul>
            </section>
            <section className="mt-12">
              <a href="/work">
                <h2 className="text-neutral-100 mb-2">shipped</h2>
              </a>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {profile.startups?.map((startup, i) => {
                  return <StartupBox key={i} startup={startup} setSelectedItem={setSelectedItem} />;
                })}
              </ul>
            </section>
            <section className="mt-12">
              <a href="/work">
                <h2 className="text-neutral-100 mb-2">experience</h2>
              </a>
              <div className="space-y-4 cursor-pointer">
                {profile.experience.map((exp, i) => {
                  return (
                    <div
                      key={i}
                      className="cursor-all-scroll px-3 py-2 group relative border border-neutral-800/50 bg-neutral-900/20 hover:bg-neutral-900 transition-colors"
                    >
                      <div className="absolute top-0 left-0 w-2 h-[0.5px] bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
                      <div className="absolute top-0 left-0 w-[0.5px] h-2 bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
                      <div className="absolute top-0 right-0 w-2 h-[0.5px] bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
                      <div className="absolute top-0 right-0 w-[0.5px] h-2 bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
                      <div className="absolute bottom-0 left-0 w-2 h-[0.5px] bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
                      <div className="absolute bottom-0 left-0 w-[0.5px] h-2 bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
                      <div className="absolute bottom-0 right-0 w-2 h-[0.5px] bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
                      <div className="absolute bottom-0 right-0 w-[0.5px] h-2 bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          title={exp.company_link}
                          className="h-4 w-4 grayscale"
                          src={`https://www.google.com/s2/favicons?sz=128&domain_url=${exp.company_link}`}
                        />
                        <span className="text-neutral-200 text-sm transition-colors group-hover:text-white">
                          {exp.company}
                        </span>
                      </div>
                      <div className="space-y-3 pl-4 text-xs">
                        {exp.roles.map((exp, i) => {
                          return (
                            <div key={i} className="flex items-center justify-between">
                              <span className="flex items-center gap-2">
                                <div className="h-2.5 w-2.5 relative">
                                  <div className="absolute h-full w-[1px] left-1/2 top-0 bg-neutral-400" />
                                  <div className="absolute w-full h-[1px] top-1/2 left-0 bg-neutral-400" />
                                </div>
                                <span className="text-neutral-300 transition-colors group-hover:text-neutral-200">
                                  {exp.headline}
                                </span>
                              </span>
                              <span>
                                {exp.start_date} - {exp.end_date ? exp.end_date : 'Present'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
            <section className="mt-12">
              <a href="/work">
                <h2 className="text-neutral-100 mb-2">education</h2>
              </a>
              <div className="flex flex-col gap-2 items-center group">
                <div className="flex items-center justify-between w-full">
                  <span className="text-neutral-200 text-sm transition-colors group-hover:text-white">
                    {profile.education.university}
                  </span>
                  <span className=" text-xs">
                    {profile.education.start_date} - {profile.education.end_date}
                  </span>
                </div>
                <div className="flex items-center justify-between w-full text-xs">
                  <span>{profile.education.branch}</span>
                  <span>grade: {profile.education.grade}</span>
                </div>
              </div>
            </section>
            <section className="mt-12">
              <h2 className="text-neutral-100">connect</h2>
              <div className="mt-2 flex flex-wrap gap-2 text-neutral-400">
                {profile.socials.map((social, i) => {
                  return <SocialBox key={i} social={social} />;
                })}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

const SkillBox = (skill: Skill) => {
  return (
    <span className="cursor-pointer text-neutral-300 border border-neutral-800/50 bg-neutral-900/20 hover:bg-neutral-900 transition-all">
      <div className="group flex flex-col h-full px-3 py-2 w-full text-left relative">
        <CardBg className="pointer-events-none absolute inset-x-[1px] inset-y-[1px] md:w-full opacity-70 group-hover:opacity-100 transition-opacity grayscale" />
        <div className="absolute top-0 left-0 w-2 h-[0.5px] bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
        <div className="absolute top-0 left-0 w-[0.5px] h-2 bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
        <div className="absolute top-0 right-0 w-2 h-[0.5px] bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
        <div className="absolute top-0 right-0 w-[0.5px] h-2 bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
        <div className="absolute bottom-0 left-0 w-2 h-[0.5px] bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
        <div className="absolute bottom-0 left-0 w-[0.5px] h-2 bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
        <div className="absolute bottom-0 right-0 w-2 h-[0.5px] bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
        <div className="absolute bottom-0 right-0 w-[0.5px] h-2 bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
        <div className="flex items-center justify-center gap-1">
          <img
            src={skill.logo}
            className="w-4 h-4 grayscale brightness-60 group-hover:brightness-100"
          />
          <span className="text-xs md:text-sm opacity-80 group-hover:opacity-100 text-neutral-200 transition-colors group-hover:text-white">
            {skill.label}
          </span>
        </div>
      </div>
    </span>
  );
};

const SocialBox = ({ social }: { social: Social }) => {
  return (
    <a
      href={social.url}
      target="_blank"
      className="cursor-pointer text-neutral-300 border border-neutral-800/50 bg-neutral-900/20 hover:bg-neutral-900 transition-all"
    >
      <div className="group flex flex-col h-full p-2 w-full text-left relative">
        <div className="absolute top-0 left-0 w-1 h-[0.5px] bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
        <div className="absolute top-0 left-0 w-[0.5px] h-1 bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
        <div className="absolute top-0 right-0 w-1 h-[0.5px] bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
        <div className="absolute top-0 right-0 w-[0.5px] h-1 bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
        <div className="absolute bottom-0 left-0 w-1 h-[0.5px] bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
        <div className="absolute bottom-0 left-0 w-[0.5px] h-1 bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
        <div className="absolute bottom-0 right-0 w-1 h-[0.5px] bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
        <div className="absolute bottom-0 right-0 w-[0.5px] h-1 bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
        <div className="flex items-center justify-center gap-1">
          <PlatformIcon url={social.url} />
        </div>
      </div>
    </a>
  );
};

const ProjectBox = ({
  project,
  setSelectedItem,
}: {
  project: Project;
  setSelectedItem: React.Dispatch<any>;
}) => {
  return (
    <li
      onClick={() => setSelectedItem(project)}
      className="cursor-all-scroll text-neutral-300 border border-neutral-800/50 bg-neutral-900/20 hover:bg-neutral-900/40 transition-all"
    >
      <div className="group flex flex-col h-full p-4 w-full text-left relative">
        <CardBg className="pointer-events-none absolute inset-x-[1px] inset-y-[1px] md:w-full opacity-70 group-hover:opacity-100 transition-opacity grayscale" />
        <div className="absolute top-0 left-0 w-3 h-[1px] bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
        <div className="absolute top-0 left-0 w-[1px] h-3 bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
        <div className="absolute top-0 right-0 w-3 h-[1px] bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
        <div className="absolute top-0 right-0 w-[1px] h-3 bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
        <div className="absolute bottom-0 left-0 w-3 h-[1px] bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
        <div className="absolute bottom-0 left-0 w-[1px] h-3 bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
        <div className="absolute bottom-0 right-0 w-3 h-[1px] bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
        <div className="absolute bottom-0 right-0 w-[1px] h-3 bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
        <div className="flex flex-col justify-between h-full">
          <div>
            <h3 className="font-medium text-neutral-200 text-sm transition-colors group-hover:text-white">
              {project.name}
            </h3>
            <div className="text-xs text-neutral-400 mt-2 line-clamp-3 opacity-80 group-hover:opacity-100 transition-opacity">
              <span className="inline text-balance">
                {' '}
                <MarkdownParser text={project.description} />
              </span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-neutral-800/50 text-[10px] text-neutral-500 group-hover:text-neutral-400 transition-colors">
            <div className="flex items-center justify-between">
              <img className="h-4 w-4 grayscale" src={`/ProjectCategory/${project.category}.png`} />
              <a
                target="_blank"
                href={project.url}
                className="flex items-center gap-1 cursor-pointer group/link"
              >
                <SiGithub /> Github{' '}
                <LuMoveRight className="-rotate-12 group-hover/link:-rotate-45 transition-all" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

const StartupBox = ({
  startup,
  setSelectedItem,
}: {
  startup: Startup;
  setSelectedItem: React.Dispatch<any>;
}) => {
  return (
    <li
      onClick={() => setSelectedItem(startup)}
      className="cursor-all-scroll text-neutral-300 border border-neutral-800/50 bg-neutral-900/20 hover:bg-neutral-900/40 transition-all"
    >
      <div className="group flex flex-col h-full p-4 w-full text-left relative">
        <CardBg className="pointer-events-none absolute inset-x-[1px] inset-y-[1px] md:w-full opacity-70 group-hover:opacity-100 transition-opacity grayscale" />
        <div className="absolute top-0 left-0 w-3 h-[1px] bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
        <div className="absolute top-0 left-0 w-[1px] h-3 bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
        <div className="absolute top-0 right-0 w-3 h-[1px] bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
        <div className="absolute top-0 right-0 w-[1px] h-3 bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
        <div className="absolute bottom-0 left-0 w-3 h-[1px] bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
        <div className="absolute bottom-0 left-0 w-[1px] h-3 bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
        <div className="absolute bottom-0 right-0 w-3 h-[1px] bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
        <div className="absolute bottom-0 right-0 w-[1px] h-3 bg-neutral-700 group-hover:bg-neutral-500 transition-colors"></div>
        <div className="flex flex-col justify-between h-full">
          <div>
            <h3 className="font-medium text-neutral-200 text-sm transition-colors group-hover:text-white">
              {startup.name}
            </h3>
            <div className="text-xs text-neutral-400 mt-2 line-clamp-3 opacity-80 group-hover:opacity-100 transition-opacity">
              <span className="inline text-balance">
                {' '}
                <MarkdownParser text={startup.description} />
              </span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-neutral-800/50 text-[10px] text-neutral-500 group-hover:text-neutral-400 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  title={startup.url}
                  className="h-4 w-4 grayscale"
                  src={`https://www.google.com/s2/favicons?sz=128&domain_url=${startup.url}`}
                />
                <img
                  title={startup.category}
                  className="h-4 w-4 grayscale"
                  src={`/ProjectCategory/${startup.category}.png`}
                />
              </div>
              <a
                target="_blank"
                href={startup.url}
                className="flex items-center gap-1 cursor-pointer group/link"
              >
                <LuGlobe /> Live Demo{' '}
                <LuMoveRight className="-rotate-12 group-hover/link:-rotate-45 transition-all" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

const CardBg = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 288 275"
    fill="none"
    {...props}
  >
    <mask
      id="gray-bg_svg__b"
      x={0}
      y={0}
      width={288}
      height={275}
      maskUnits="userSpaceOnUse"
      style={{ maskType: 'alpha' }}
    >
      <rect width={288} height={275} rx={8} fill="url(#gray-bg_svg__a)" />
    </mask>
    <g mask="url(#gray-bg_svg__b)">
      <g filter="url(#gray-bg_svg__c)">
        <ellipse
          cx="208.648"
          cy="-17.041"
          rx="45.773"
          ry="116.354"
          fill="#7F8AAD"
          transform="rotate(106.756 208.648 -17.041)"
        />
      </g>
      <g filter="url(#gray-bg_svg__d)">
        <ellipse
          cx="217.97"
          cy="-16.039"
          rx="16"
          ry="61.711"
          fill="#B4BBCF"
          transform="rotate(105.608 217.97 -16.039)"
        />
      </g>
    </g>
    <defs>
      <filter
        id="gray-bg_svg__c"
        x="3.745"
        y="-164.937"
        width="409.806"
        height="295.791"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation={46.35} result="effect1_foregroundBlur_3869_14181" />
      </filter>
      <filter
        id="gray-bg_svg__d"
        x="134.076"
        y="-62.991"
        width="167.788"
        height="93.905"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation={12.15} result="effect1_foregroundBlur_3869_14181" />
      </filter>
      <pattern
        id="gray-bg_svg__a"
        patternContentUnits="objectBoundingBox"
        width=".417"
        height=".436"
      >
        <use xlinkHref="#gray-bg_svg__e" transform="scale(.00347 .00364)" />
      </pattern>
      <image
        id="gray-bg_svg__e"
        width={120}
        height={120}
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAL0SURBVHgB7drBkYRADEPRzT8DciKn3giGklBzkPu/EzXFzuLDqIzbf3+Yb611/7i+fny+ftyzhOvb/L/ud17C9xxVL4BqD1FwCddu7LiR5UbuJdRyVL0AqoVd6BV8jxtrSoepRPFR9QKo9iIWknhMOtslPHMyxBhZL4BqS3uRV67dztMdMiixdgf3j6wXQLWlvbwncaFEnPsMd/C3R9ULoJrYxSWDBSVS3CjbFYPj6wVQ7UX36B7DuQtsbky5UXxUvQCqiR2ju7GQdJLuhkMSfePrBVBNjIXkKC1ZfnO7Yjeux9cLoJoYTUlH6kaiEmtuN5vMlqvrBVBNjIUtR1fi57vmvUrMjq8XQLWHTk85Mvt69vt1Fz2+XgDVXnSDu47P3KjcNUA4ql4A1R5+8knn6cbdMu93Y80daIypF0C1Zb44h5HodrC7ulZlI2JkvQCqrWyrIbnHjVBlPuzOe8fXC6Dai59/slf8RbTuOv4bWS+Aahtjyh0m7BpKKM//RSxX1Aug2sYuUXnxd+e0bsQl2x0j6wVQTYyI5JhMiTU34pJtiqPqBVBN7PSSo7ckstzIdTvP8fUCqBZ2ocrcNXlhV4YSbhQfVS+Aai9iIYnHpLN158zJUeCYegFUW9qLvHKdbEoke8LJJsb4egFUW/6SmBsXSsS5z3AHf3tUvQCqiV1cMlhQIsWNsl0xOL5eANVedI/uMZy7wObGlBvFR9ULoJrYMbobC0kn6W44JNE3vl4A1cRYSI7SkuU3tyt243p8vQCqidGUdKRuJCqx5nazyWy5ul4A1cRY2HJ0JX6+a96rxOz4egFUe+j0lCOzr2e/X3fR4+sFUO1FN7jr+MyNyl0DhKPqBVDt4SefdJ5u3C3zfjfW3IHGmHoBVFvmi3MYiW4Hu6trVTYiRtYLoNrKthqSe9wIVebD7rx3fL0Aqr34+Sd7xV9E667jv5H1Aqi2MabcYcKuoYTy/F/EckW9AKpt7BKVF393TutGXLLdMbJeDPYPkN6qZhcPlQEAAAAASUVORK5CYII="
      />
    </defs>
  </svg>
);

const StartupModel = ({
  selectedItem,
  setSelectedItem,
}: {
  selectedItem: any;
  setSelectedItem: React.Dispatch<any>;
}) => {
  return (
    <AnimatePresence>
      {selectedItem && (
        <div
          onClick={() => setSelectedItem(null)}
          className="pointer-events-auto px-5 z-50 fixed h-full w-full flex items-center justify-center top-0 left-0 bg-black/20 backdrop-blur"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="group p-4 relative z-[51] w-full border border-neutral-800/50 bg-neutral-900 transition-all md:w-full sm:align-middle sm:w-full sm:max-w-md gap-0 pb-5"
          >
            <CardBg className="pointer-events-none absolute inset-x-[1px] inset-y-[1px] md:w-full opacity-70 group-hover:opacity-100 transition-opacity grayscale" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.2, 1, 0.4, 1] }}
              transition={{ duration: 0.6 }}
              className="absolute top-0 left-0 w-3 h-[1px] bg-neutral-500 transition-colors"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.2, 1, 0.4, 1] }}
              transition={{ duration: 0.6 }}
              className="absolute top-0 left-0 w-[1px] h-3 bg-neutral-500 transition-colors"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.2, 1, 0.4, 1] }}
              transition={{ duration: 0.6 }}
              className="absolute top-0 -left-3 w-3 h-[1px] bg-neutral-500 transition-colors"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.2, 1, 0.4, 1] }}
              transition={{ duration: 0.6 }}
              className="absolute -top-3 left-0 w-[1px] h-3 bg-neutral-500 transition-colors"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.2, 1, 0.4, 1] }}
              transition={{ duration: 0.6 }}
              className="absolute top-0 right-0 w-3 h-[1px] bg-neutral-500 transition-colors"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.2, 1, 0.4, 1] }}
              transition={{ duration: 0.6 }}
              className="absolute top-0 right-0 w-[1px] h-3 bg-neutral-500 transition-colors"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.2, 1, 0.4, 1] }}
              transition={{ duration: 0.6 }}
              className="absolute top-0 -right-3 w-3 h-[1px] bg-neutral-500 transition-colors"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.2, 1, 0.4, 1] }}
              transition={{ duration: 0.6 }}
              className="absolute -top-3 right-0 w-[1px] h-3 bg-neutral-500 transition-colors"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.2, 1, 0.4, 1] }}
              transition={{ duration: 0.6 }}
              className="absolute bottom-0 left-0 w-3 h-[1px] bg-neutral-500 transition-colors"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.2, 1, 0.4, 1] }}
              transition={{ duration: 0.6 }}
              className="absolute bottom-0 left-0 w-[1px] h-3 bg-neutral-500 transition-colors"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.2, 1, 0.4, 1] }}
              transition={{ duration: 0.6 }}
              className="absolute bottom-0 -left-3 w-3 h-[1px] bg-neutral-500 transition-colors"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.2, 1, 0.4, 1] }}
              transition={{ duration: 0.6 }}
              className="absolute -bottom-3 left-0 w-[1px] h-3 bg-neutral-500 transition-colors"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.2, 1, 0.4, 1] }}
              transition={{ duration: 0.6 }}
              className="absolute bottom-0 right-0 w-3 h-[1px] bg-neutral-500 transition-colors"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.2, 1, 0.4, 1] }}
              transition={{ duration: 0.6 }}
              className="absolute bottom-0 right-0 w-[1px] h-3 bg-neutral-500 transition-colors"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.2, 1, 0.4, 1] }}
              transition={{ duration: 0.6 }}
              className="absolute bottom-0 -right-3 w-3 h-[1px] bg-neutral-500 transition-colors"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.2, 1, 0.4, 1] }}
              transition={{ duration: 0.6 }}
              className="absolute -bottom-3 right-0 w-[1px] h-3 bg-neutral-500 transition-colors"
            />
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-start gap-2">
                  <img
                    title={selectedItem.url}
                    className={cn("h-12 w-12 grayscale",
                        selectedItem.status ? 'rounded-none' : 'rounded-full'
                    )} 
                    src={`https://www.google.com/s2/favicons?sz=128&domain_url=${selectedItem.url}`}
                  />
                  <div className="flex flex-col items-start justify-start">
                    <h3 className="font-medium text-neutral-200 text-base transition-colors group-hover:text-white">
                      {selectedItem.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="flex items-center gap-1 bg-neutral-700 py-0.5 px-1">
                        <img
                          className="w-3 h-3 grayscale"
                          src={`/startupCategory/${selectedItem.category}.png`}
                        />
                        <p>{selectedItem.category}</p>
                      </span>
                      {selectedItem.status && (
                        <span className="flex items-center gap-1 bg-neutral-700 py-0.5 px-1">
                          <img
                            className="w-3 h-3 grayscale"
                            src={`/StartupStatus/${selectedItem.status}.png`}
                          />
                          <p>{selectedItem.status}</p>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-neutral-400 mt-2">
                  <span className="inline text-balance">
                    {' '}
                    <MarkdownParser text={selectedItem.description ?? ''} />
                  </span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-neutral-800/50 text-xs md:text-sm">
                <div className="flex items-center justify-between ">
                  <span className="text-neutral-500">MRR: 370$/month</span>
                  <a
                    target="_blank"
                    href={selectedItem.url}
                    className="flex items-center gap-1 cursor-pointer group/link text-neutral-600  hover:text-neutral-500 transition-colors"
                  >
                    <LuGlobe /> Live Demo{' '}
                    <LuMoveRight className="-rotate-12 group-hover/link:-rotate-45 transition-all" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ScifiTemplate;
