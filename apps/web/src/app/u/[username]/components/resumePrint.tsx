'use client';
import { formatMonthShortYear, getMonthsDifference, Skill } from '@lf/utils';
import { MapPin } from 'lucide-react';
import React from 'react';

export default function ResumePrint({
  profile,
  startups,
  projects,
}: {
  profile: any;
  startups: any;
  projects: any;
}) {
  return (
    <main
      className="hidden print:block container relative mx-auto scroll-my-12 overflow-auto p-4 print:px-0 print:py-10 md:py-16 md:px-16 bg-white"
      id="main-content"
    >
      <div className="sr-only">
        <h1>
          {profile.full_name}
          {/* */}'s Resume
        </h1>
      </div>
      <section
        className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-4"
        aria-label="Resume Content"
      >
        <header className="flex items-center justify-between">
          <div className="flex-1 space-y-1.5">
            <h1 className="text-2xl font-bold text-black" id="resume-name">
              {profile.full_name}
            </h1>
            <p
              className="max-w-md text-pretty font-mono text-sm text-black/80 print:text-[12px]"
              aria-labelledby="resume-name"
            >
              {profile.headline}
            </p>
            <p className="max-w-md items-center text-pretty font-mono text-xs text-black">
              <a
                className="inline-flex gap-x-1 items-center leading-none hover:underline"
                href="https://www.google.com/maps/place/Wrocław"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Location: Wrocław, Poland, CET"
              >
                <MapPin strokeWidth={1.5} size={14} />
                {profile.country}
              </a>
            </p>
            <div
              className="flex gap-x-1 pt-1 font-mono text-sm text-black/80 print:hidden"
              role="list"
              aria-label="Contact links"
            >
              <a
                href="https://jarocki.me"
                aria-label="Personal website"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border text-black/80 border-gray-300 bg-white hover:bg-gray-300/50 hover:text-black size-8"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-globe size-4"
                  aria-hidden="true"
                >
                  <circle cx={12} cy={12} r={10} />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </a>
              <a
                href="mailto:bartosz.jarocki@hey.com"
                aria-label="Email"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border text-black/80 border-gray-300 bg-white hover:bg-gray-300/50 hover:text-black size-8"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-mail size-4"
                  aria-hidden="true"
                >
                  <rect width={20} height={16} x={2} y={4} rx={2} />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
              <a
                href="tel:+48530213401"
                aria-label="Phone"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border text-black/80 border-gray-300 bg-white hover:bg-gray-300/50 hover:text-black size-8"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-phone size-4"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </a>
              <a
                href="https://github.com/BartoszJarocki"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border text-black/80 border-gray-300 bg-white hover:bg-gray-300/50 hover:text-black size-8"
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/bjarocki/"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border text-black/80 border-gray-300 bg-white hover:bg-gray-300/50 hover:text-black size-8"
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4"
                  aria-hidden="true"
                >
                  <title>LinkedIn</title>
                  <path
                    fill="currentColor"
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  />
                </svg>
              </a>
              <a
                href="https://x.com/BartoszJarocki"
                aria-label="X"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border text-black/80 border-gray-300 bg-white hover:bg-gray-300/50 hover:text-black size-8"
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4"
                  aria-hidden="true"
                >
                  <title>X</title>
                  <path
                    fill="currentColor"
                    d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
                  />
                </svg>
              </a>
            </div>
            <div
              className="hidden gap-x-2 font-mono text-sm text-black/80 print:flex print:text-[12px]"
              aria-label="Print contact information"
            >
              <a className="underline hover:text-black/70" href={profile.profile_link.url}>
                {profile.profile_link.text}
              </a>
              <span aria-hidden="true">/</span>
              <a className="underline hover:text-black/70" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              <span aria-hidden="true">/</span>
              <a className="underline hover:text-black/70" href="tel:+918074414860">
                +918074414860
              </a>
            </div>
          </div>
          <span
            className="relative flex shrink-0 overflow-hidden rounded-xl size-28"
            aria-hidden="true"
          >
            <img
              className="aspect-square h-full w-full"
              alt={`${profile.full_name}'s profile picture`}
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
              className="text-pretty font-mono text-sm text-black/80 print:text-[12px]"
              aria-labelledby="about-section"
            >
              Frontend-focused Full Stack Engineer specializing in high-performance React
              applications, scalable Node.js services, and real-time collaboration systems.
              Experienced in technical architecture design and remote team leadership.
            </div>
          </section>
          <section className="flex min-h-0 flex-col gap-y-3 print:gap-y-1">
            <h2 className="text-xl font-bold text-black" id="work-experience">
              Work Experience
            </h2>
            <div
              className="space-y-4 print:space-y-0 px-2"
              role="feed"
              aria-labelledby="work-experience"
            >
              {profile.experience.map((exp: any, idx: any) => {
                return (
                  <article key={idx} role="article">
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
                            <ul
                              className="list-none p-0 hidden gap-x-1 sm:inline-flex"
                              aria-label="Technologies used"
                            >
                              <li>
                                <div className="inline-flex items-center rounded-md border px-2 py-0.5 font-semibold font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent bg-gray-200 text-black hover:bg-gray-200/60 align-middle text-xs print:px-1 print:py-0.5 print:text-[8px] print:leading-tight">
                                  React
                                </div>
                              </li>
                              <li>
                                <div className="inline-flex items-center rounded-md border px-2 py-0.5 font-semibold font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent bg-gray-200 text-black hover:bg-gray-200/60 align-middle text-xs print:px-1 print:py-0.5 print:text-[8px] print:leading-tight">
                                  Next.js
                                </div>
                              </li>
                              <li>
                                <div className="inline-flex items-center rounded-md border px-2 py-0.5 font-semibold font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent bg-gray-200 text-black hover:bg-gray-200/60 align-middle text-xs print:px-1 print:py-0.5 print:text-[8px] print:leading-tight">
                                  TypeScript
                                </div>
                              </li>
                              <li>
                                <div className="inline-flex items-center rounded-md border px-2 py-0.5 font-semibold font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent bg-gray-200 text-black hover:bg-gray-200/60 align-middle text-xs print:px-1 print:py-0.5 print:text-[8px] print:leading-tight">
                                  Node.js
                                </div>
                              </li>
                            </ul>
                          </h3>
                        </div>
                        <div className="space-y-1 mt-2">
                          {exp.roles.map((role: any, idx: any) => {
                            return (
                              <span
                                key={idx}
                                className="flex items-center justify-between text-black/90"
                                aria-label={`Employment period: ${role.start_date + 'to' + role.end_date || 'Present'}`}
                              >
                                <h4
                                  key={idx}
                                  className="font-mono text-sm font-semibold leading-none print:text-[12px] flex items-center gap-2"
                                >
                                  - {role.headline}{' '}
                                  <span className="inline-flex items-center rounded-lg border px-2 py-0.5 font-semibold font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent cursor-default bg-gray-300/70 text-black hover:bg-gray-300/50 align-middle text-xs print:px-1 print:py-0.5 print:text-[8px] print:leading-tight">
                                    {role.location_type}
                                  </span>
                                </h4>
                                <p className="font-mono text-xs font-medium leading-none print:text-[10px]">
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
                      <div className="text-pretty font-mono text-sm text-muted-foreground">
                        <div className="mt-2 text-xs text-black/80 print:mt-1 print:text-[10px] text-pretty">
                          Leading technical architecture of a blockchain-based film funding
                          platform.
                          <ul className="list-inside list-disc">
                            <li>
                              Architecting migration from CRA to Next.js for improved performance,
                              SEO, and DX
                            </li>
                            <li>
                              Established release process enabling faster deployments and reliable
                              rollbacks
                            </li>
                            <li>Implementing system-wide monitoring and security improvements</li>
                          </ul>
                        </div>
                        <div className="mt-2">
                          <ul
                            className="inline-flex list-none p-0 -mx-2 flex-wrap gap-1 sm:hidden"
                            aria-label="Technologies used"
                          >
                            <li>
                              <div className="inline-flex items-center rounded-md border px-2 py-0.5 font-semibold font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/60 align-middle text-xs print:px-1 print:py-0.5 print:text-[8px] print:leading-tight">
                                Remote
                              </div>
                            </li>
                            <li>
                              <div className="inline-flex items-center rounded-md border px-2 py-0.5 font-semibold font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/60 align-middle text-xs print:px-1 print:py-0.5 print:text-[8px] print:leading-tight">
                                React
                              </div>
                            </li>
                            <li>
                              <div className="inline-flex items-center rounded-md border px-2 py-0.5 font-semibold font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/60 align-middle text-xs print:px-1 print:py-0.5 print:text-[8px] print:leading-tight">
                                Next.js
                              </div>
                            </li>
                            <li>
                              <div className="inline-flex items-center rounded-md border px-2 py-0.5 font-semibold font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/60 align-middle text-xs print:px-1 print:py-0.5 print:text-[8px] print:leading-tight">
                                TypeScript
                              </div>
                            </li>
                            <li>
                              <div className="inline-flex items-center rounded-md border px-2 py-0.5 font-semibold font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/60 align-middle text-xs print:px-1 print:py-0.5 print:text-[8px] print:leading-tight">
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
          <section className="flex min-h-0 flex-col gap-y-3 print:gap-y-1 text-black">
            <h2 className="text-xl font-bold" id="education-section">
              Education
            </h2>
            <div className="space-y-4" role="feed" aria-labelledby="education-section">
              <article role="article">
                <div className="rounded-lg bg-white text-black">
                  <div className="flex flex-col space-y-1.5">
                    <div className="flex items-center justify-between gap-x-2 text-base">
                      <h3
                        className="font-semibold leading-none"
                        id="education-wrocław-university-of-technology"
                      >
                        {profile.education}
                      </h3>
                      <div
                        className="text-sm tabular-nums text-gray-500"
                        aria-label="Period: 2007 to 2010"
                      >
                        2007{/* */} - {/* */}2010
                      </div>
                    </div>
                  </div>
                  <div
                    className="text-pretty font-mono text-sm mt-2 text-black/80 print:text-[12px]"
                    aria-labelledby="education-wrocław-university-of-technology"
                  >
                    Bachelor's Degree in Control systems engineering and Robotics
                  </div>
                </div>
              </article>
            </div>
          </section>
          <section className="flex min-h-0 flex-col gap-y-3 print:gap-y-1 text-black">
            <h2 className="text-xl font-bold" id="skills-section">
              Skills
            </h2>
            <ul
              className="flex items-center list-none flex-wrap gap-1 p-0"
              aria-label="List of skills"
            >
              {profile.skills.map((skill: Skill, index: number) => {
                return (
                  <li key={index}>
                    <div
                      className="flex gap-1 items-center justify-center rounded-md border px-2 py-0.5 text-xs font-semibold font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent cursor-default bg-gray-300/80 text-black/80 hover:bg-gray-300/60 print:text-[10px]"
                      aria-label={`Skill: ${skill.label}`}
                    >
                      {skill.logo && (
                        <img src={skill.logo} className="h-4 w-4 print:hidden rounded" />
                      )}
                      {skill.label}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
          <section className="flex min-h-0 flex-col gap-y-3 print:gap-y-1 print-force-new-page scroll-mb-16 print:space-y-4 print:pt-12 text-black">
            <h2 className="text-xl font-bold" id="side-projects">
              Side projects
            </h2>
            <div
              className="-mx-3 grid grid-cols-1 gap-3 print:grid-cols-3 print:gap-2 md:grid-cols-2 lg:grid-cols-3"
              role="feed"
              aria-labelledby="side-projects"
            >
              <article className="h-full">
                <div
                  className="rounded-lg bg-gray-200/70 text-black flex h-full flex-col overflow-hidden border border-[#d8dae0] p-3"
                  role="article"
                >
                  <div className="flex flex-col space-y-1.5">
                    <div className="space-y-1">
                      <h3 className="font-semibold tracking-tight text-base">
                        <a
                          href="https://monito.dev/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 hover:underline"
                          aria-label="Monito project (opens in new tab)"
                        >
                          Monito
                          <span
                            className="size-1 rounded-full bg-green-500"
                            aria-label="Active project indicator"
                          />
                        </a>
                        <div
                          className="hidden font-mono text-xs underline print:visible"
                          aria-hidden="true"
                        >
                          monito.dev
                        </div>
                      </h3>
                      <p
                        className="text-black text-pretty font-mono text-xs print:text-[10px]"
                        aria-label="Project description"
                      >
                        Browser extension for debugging web applications. Includes taking
                        screenshots, screen recording, E2E tests generation and generating bug
                        reports
                      </p>
                    </div>
                  </div>
                  <div className="text-pretty font-mono text-sm text-muted-foreground mt-auto flex">
                    <ul
                      className="mt-2 flex list-none flex-wrap gap-1 p-0"
                      aria-label="Technologies used"
                    >
                      <li>
                        <div className="inline-flex items-center rounded-md border font-semibold font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent  bg-gray-300 text-black hover:bg-gray-100/60 px-1 py-0 text-[10px] print:px-1 print:py-0.5 print:text-[8px] print:leading-tight">
                          TypeScript
                        </div>
                      </li>
                      <li>
                        <div className="inline-flex items-center rounded-md border font-semibold font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent  bg-gray-300 text-black hover:bg-gray-100/60 px-1 py-0 text-[10px] print:px-1 print:py-0.5 print:text-[8px] print:leading-tight">
                          Next.js
                        </div>
                      </li>
                      <li>
                        <div className="inline-flex items-center rounded-md border font-semibold font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent  bg-gray-300 text-black hover:bg-gray-100/60 px-1 py-0 text-[10px] print:px-1 print:py-0.5 print:text-[8px] print:leading-tight">
                          Browser Extension
                        </div>
                      </li>
                      <li>
                        <div className="inline-flex items-center rounded-md border font-semibold font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap border-transparent  bg-gray-300 text-black hover:bg-gray-100/60 px-1 py-0 text-[10px] print:px-1 print:py-0.5 print:text-[8px] print:leading-tight">
                          PostgreSQL
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
