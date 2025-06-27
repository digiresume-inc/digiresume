"use client";

//icons
import { IoLocationSharp, IoTime, IoArrowForward } from "react-icons/io5";
import { MdSunny, MdEmail, MdMail, MdViewTimeline } from "react-icons/md";
import { FaDev, FaGraduationCap } from "react-icons/fa6";
import { BiSolidBookBookmark } from "react-icons/bi";
import { IoMdCodeWorking } from "react-icons/io";
import { TbStack2Filled } from "react-icons/tb";
import { BsCalendarDateFill } from "react-icons/bs";
import { LuConstruction } from "react-icons/lu";
import { RxExternalLink } from "react-icons/rx";
import {
  FaUserAlt,
  FaLanguage,
  FaQuoteLeft,
  FaQuoteRight,
} from "react-icons/fa";
import { Link2 } from "lucide-react";
import { PiCertificateFill } from "react-icons/pi";
import { GiSkills } from "react-icons/gi";

// libraries
import { motion, HTMLMotionProps } from "motion/react";
import Image from "next/image";
import Link from "next/link";

// components and data
import Timeline from "./components/timeline";
import SkillsMarquee from "./components/skillsmarquee";
import { FlipWords } from "./components/flipwords";
import GithubCalender from "./components/githubcalendar";
import { socialIconMap } from "@/lib/utils/iconMap";
import MarkdownParser from "@/components/general/markdownparser";
import { Button } from "./components/movingborder";
import { cn } from "@dr/ui/lib/utils";
import { GridSingle } from "@/lib/types/supabasetypes";


function getPlatformIcon(url: string) {
  try {
    const host = new URL(url).hostname.replace("www.", "");
    const platform = Object.keys(socialIconMap).find((key) =>
      host.includes(key.toLowerCase())
    );
    const Icon = socialIconMap[platform || ""];
    return Icon ? <Icon size={18} /> : <Link2 size={18} />;
  } catch {
    return <Link2 size={18} />;
  }
}

const GridSingleTemplate = ({ profile }: { profile: GridSingle }) => {
  const githubUsername =
    profile.socials
      ?.find((s: any) => s.url.includes("github.com"))
      ?.url.split("github.com/")[1]
      ?.split("/")[0] ?? null;

  const stuff = [
    ...(profile.startups || []).map((item: any) => ({
      ...item,
      type: "startup",
    })),
    ...(profile.projects || []).map((item: any) => ({
      ...item,
      type: "project",
    })),
  ].slice(0, 4);

  const additionalinfo = profile.additonalInfo;

  return (
    <div
      className="relative min-h-screen w-full bg-black theme-grid-single"
      role="main"
      aria-label="Portfolio Main Section"
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0",
          "[background-size:35px_35px]",
          "[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-black"
      ></div>
      <div className="grid-single-grid-top mono relative">
        <div
          aria-label="Mobile Navigation"
          role="navigation"
          className="grid-single-header sm:hidden fixed top-3 right-0 z-50 px-4"
        >
          <Block
            delay={0.9}
            initialY={-50}
            outputY={0}
            className="grid grid-cols-3 p-2 gap-2 w-full h-14 bg-background rounded-[16px] border"
          >
            <Link
              href="#about"
              aria-label="Navigate to About section"
              className={`col-span-1 rounded-lg bg-secondary flex gap-1 items-center justify-center`}
            >
              <FaUserAlt
                size={15}
                className="text-primary"
                aria-hidden="true"
              />
              <span className="text-foreground/70 font-semibold text-sm">
                About
              </span>
            </Link>
            <Link
              href="#works"
              aria-label="Navigate to Works section"
              className={`col-span-1 rounded-lg bg-secondary flex gap-1 items-center justify-center`}
            >
              <LuConstruction
                size={15}
                className="text-primary"
                aria-hidden="true"
              />
              <span className="text-foreground/70 font-semibold text-sm">
                Works
              </span>
            </Link>
            <Link
              href="#contact"
              aria-label="Navigate to Contact section"
              className={`col-span-1 rounded-lg bg-secondary flex gap-1 items-center justify-center`}
            >
              <MdMail size={15} className="text-primary" aria-hidden="true" />
              <span className="text-foreground/70 font-semibold text-sm">
                Contact
              </span>
            </Link>
          </Block>
        </div>
        <div
          className="grid-single-first"
          role="region"
          aria-labelledby="tech-stack-and-timeline"
        >
          <div className="grid grid-rows-8 gap-3 w-full h-full">
            <Block
              delay={1}
              className="bg-background h-auto row-span-4 rounded-[24px] border w-full flex flex-col items-center justify-start py-4"
              role="region"
              aria-labelledby="tech-stack-heading"
            >
              <span id="tech-stack-heading" className="flex items-center mb-1">
                <TbStack2Filled
                  className="text-primary mr-1"
                  size={20}
                  aria-hidden="true"
                />
                <p className="text-foreground/60 text-sm font-semibold">
                  My Stack
                </p>
              </span>
              <p className="text-foreground/80 font-bold mb-4">Tech Arsenal</p>
              <div
                className="flex flex-wrap gap-3 items-center justify-center"
                role="list"
                aria-label="Technology Stack"
              >
                {additionalinfo.techstack
                  .slice(0, 6)
                  .map((skill: any, index: number) => (
                    <span
                      key={index}
                      className="w-36 cursor-pointer bg-secondary h-12 rounded-lg border hover:border-foreground/20 transition-all duration-300 flex items-center justify-center gap-2"
                      role="listitem"
                    >
                      {skill.logo && (
                        <img
                          src={skill.logo}
                          alt={`${skill.label} logo`}
                          className="size-[30px] grayscale rounded-md"
                        />
                      )}
                      <p className="text-foreground/60 text-sm font-semibold tracking-tighter line-clamp-1">
                        {skill.label}
                      </p>
                    </span>
                  ))}
              </div>
            </Block>

            <Block
              delay={1.1}
              className="bg-background overflow-hidden relative row-span-4 rounded-[20px] border w-full h-[400px] md:h-full flex flex-col items-center justify-center"
              role="region"
              aria-labelledby="timeline-heading"
            >
              <div
                className="absolute top-[20%] left-0 w-full h-8 bg-gradient-to-b from-background to-transparent to-90% z-10 pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-background to-transparent to-90% z-10 pointer-events-none"
                aria-hidden="true"
              />
              <div className="absolute h-1/5 w-full bg-background border-b border-primary/30 z-10 top-0 left-0 flex items-center justify-center">
                <MdViewTimeline
                  className="text-primary mr-1"
                  size={20}
                  aria-hidden="true"
                />
                <p
                  id="timeline-heading"
                  className="text-foreground/80 text-base font-bold"
                >
                  My Timeline
                </p>
              </div>
              <Timeline profile={profile} />
            </Block>
          </div>
        </div>

        <div
          role="region"
          aria-labelledby="main-profile"
          className="grid-single-second"
        >
          <div className="grid grid-rows-21 grid-cols-4 gap-3 w-full h-full items-center">
            <Block
              delay={1}
              role="region"
              aria-labelledby="github-calendar-heading"
              className="bg-background px-2 text-xs md:text-sm text-foreground relative row-span-5 lg:row-span-6 col-span-4 rounded-2xl border w-full h-full order-2 sm:order-none flex flex-col items-center justify-center overflow-hidden"
            >
              <h2 id="github-calendar-heading" className="sr-only">
                GitHub Contribution Calendar
              </h2>
              <GithubCalender username={githubUsername ?? ""} />
            </Block>
            <MainBlock
              delay={0.2}
              initialScale={0.3}
              outputScale={1}
              role="region"
              aria-labelledby="about-heading"
              className="bg-background mt-16 lg:mt-0 row-span-10 col-span-4 rounded-[20px] border w-full min-h-[350px] md:min-h-auto md:h-full order-1 sm:order-none"
            >
              <div id="about" className="flex flex-col p-4 gap-4">
                <h2 id="about-heading" className="sr-only">
                  About Section
                </h2>
                <div className="flex gap-2">
                  <Image
                    src={profile.avatar_url}
                    width={100}
                    height={100}
                    alt="Profile Image"
                    className="w-[100px] h-[100px] rounded-2xl border-dashed border-2 border-primary"
                  />
                  <div className="h-[100px] w-full p-2">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm md:text-base px-2.5 py-1 bg-[#1c1c1c] rounded-full border">
                        <div className="relative flex items-center justify-center">
                          <div className="absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75 animate-ping"></div>
                          <div className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></div>
                        </div>
                        <p className="text-center text-xs lg:text-sm text-foreground/40 font-semibold">
                          Available to Work
                        </p>
                      </span>
                      {profile.profile_link?.url?.trim() &&
                        profile.profile_link?.text?.trim() && (
                          <a
                            className="hidden lg:block"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={profile.profile_link.url}
                          >
                            <Button
                              borderRadius="0.375rem"
                              className="group cursor-pointer text-xs px-2 py-1 font-semibold bg-secondary text-foreground/60 hover:text-foreground/80 border flex items-center justify-center gap-1"
                            >
                              {profile.profile_link.text}
                              <IoArrowForward
                                className="text-foreground/60 opacity-100 md:hidden md:group-hover:block md:opacity-50 -rotate-45 md:rotate-0 group-hover:opacity-100 group-hover:-rotate-45 transition-all duration-500"
                                size={16}
                              />
                              <Link2
                                className="text-foreground/60 hidden md:block md:group-hover:hidden group-hover:opacity-0 transition-all duration-300"
                                size={16}
                              />
                            </Button>
                          </a>
                        )}
                    </div>
                    <p className="text-lg md:text-xl font-bold text-foreground px-2 pt-2">
                      {profile.full_name}
                    </p>
                    <span className="text-sm md:text-base text-foreground/50 px-2 flex tracking-tighter lg:tracking-normal [word-spacing:-3px]">
                      I'm a{" "}
                      <span className="text-primary font-semibold ml-0.5 lg:ml-1">
                        <FlipWords words={additionalinfo.flipwords} />
                      </span>
                    </span>
                  </div>
                </div>

                <div className="bg-[#141414] h-full border w-full rounded-2xl flex flex-wrap gap-1 md:gap-2 px-2 py-3">
                  {[
                    {
                      icon: <IoLocationSharp className="text-primary" />,
                      label: profile.country.split("-")[0],
                    },
                    {
                      icon: <FaGraduationCap className="text-primary" />,
                      label: additionalinfo.educationInShort,
                    },
                    {
                      icon: <IoTime className="text-primary" />,
                      label: additionalinfo.timezone,
                      className: "hidden md:flex",
                    },
                    {
                      icon: null,
                      label: `${additionalinfo.nature.icon}${additionalinfo.nature.type}`,
                    },
                    {
                      icon: <BiSolidBookBookmark className="text-primary" />,
                      label: additionalinfo.universityInShort,
                    },
                    {
                      icon: <FaLanguage className="text-primary mr-1" />,
                      label: `${additionalinfo.languages[0]} & ${additionalinfo.languages[1]}`,
                    },
                    {
                      icon: <IoTime className="text-primary" />,
                      label: additionalinfo.timezone,
                      className: "sm:hidden",
                    },
                    {
                      icon: <FaDev className="text-primary mr-1" />,
                      label: additionalinfo.healineInShort,
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`bg-secondary border flex gap-0.5 px-2 py-1 items-center justify-center rounded-2xl ${
                        item.className || ""
                      }`}
                    >
                      {item.icon}
                      <p className="text-foreground/60 text-xs font-semibold">
                        {item.label}
                      </p>
                    </div>
                  ))}
                  <a
                    className="block lg:hidden"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={profile.profile_link.url}
                  >
                    <Button
                      borderRadius="12rem"
                      className="group cursor-pointer text-xs px-2 py-1 font-semibold bg-[#171717] text-foreground/60 hover:text-foreground/80 border flex items-center justify-center gap-0.5"
                    >
                      {profile.profile_link.text}
                      <Link2 className="text-foreground/60" size={16} />
                    </Button>
                  </a>
                </div>
                <div
                  role="note"
                  aria-label="Personal quote"
                  className="w-full relative bg-[#141414] border rounded-xl py-1.5 px-3.5 text-xs lg:text-sm text-foreground/80 max-w-md text-center mx-auto"
                >
                  <div className="flex items-start justify-start">
                    <FaQuoteLeft className="text-primary text-xs opacity-80" />
                  </div>
                  <p className="italic leading-snug px-2 text-foreground">
                    {additionalinfo.quote}
                  </p>
                  <div className="flex items-end justify-end">
                    <FaQuoteRight className="text-primary text-xs opacity-80" />
                  </div>
                </div>
              </div>
            </MainBlock>
            <Block
              delay={1.2}
              role="region"
              aria-labelledby="skills-heading"
              className="bg-background relative overflow-hidden row-span-6 lg:row-span-5 col-span-4 rounded-[20px] border w-full h-full order-3 sm:order-none flex flex-wrap items-center justify-center"
            >
              <div className="w-full bg-background border-b border-primary/30 z-10 top-0 left-0 flex flex-col items-center justify-center">
                <span className="flex items-center justify-center mb-2 md:mb-4">
                  <GiSkills className="text-primary mr-1 w-[15px] h-[15px] md:w-[20px] md:h-[20px]" />
                  <p
                    id="skills-heading"
                    className="text-foreground/80 text-sm md:text-base font-bold"
                  >
                    My Skills
                  </p>
                </span>
              </div>
              <div className="absolute bottom-0 left-0 w-8 h-[70%] bg-gradient-to-r from-background to-transparent to-90% z-10 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-8 h-[70%] bg-gradient-to-l from-background to-transparent to-90% z-10 pointer-events-none" />
              <SkillsMarquee skills={profile.skills} />
            </Block>
          </div>
        </div>
        <div
          role="region"
          aria-labelledby="certifications-contact"
          className="grid-single-third"
        >
          <div
            id="works"
            className="grid grid-rows-15 grid-cols-7 gap-3 w-full h-full"
          >
            <Block
              delay={1.3}
              className="bg-background row-span-8 col-span-7 md:col-span-4 rounded-2xl border w-full h-[25rem] md:h-full flex flex-col items-center justify-start py-4"
              role="region"
              aria-labelledby="currently-building-heading"
            >
              <h2 id="currently-building-heading" className="sr-only">
                Currently Building
              </h2>
              <span className="flex items-center mb-1">
                <LuConstruction className="text-primary mr-1" size={20} />
                <p className="text-foreground/60 text-sm font-semibold">
                  My Stuff
                </p>
              </span>
              <p className="text-foreground/80 font-bold mb-4">
                Currently Building
              </p>
              <div className="flex flex-col gap-2 w-full">
                {stuff.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-3 items-center justify-center w-full px-4"
                  >
                    <span className="w-full bg-secondary rounded-xl group border flex items-center justify-center px-3 py-2 gap-2">
                      <img
                        className={cn(
                          "w-10 h-10",
                          item.type === "project"
                            ? "rounded-full"
                            : "rounded-xl"
                        )}
                        src={`https://www.google.com/s2/favicons?sz=128&domain_url=${item.url}`}
                        alt={`${item.name} favicon`}
                      />
                      <div className="flex flex-col items-start justify-center">
                        <span className="text-lg md:text-[1.2rem] leading-[1.75rem] text-foreground font-bold flex items-center justify-center">
                          <p className="text-base line-clamp-1">
                            {item.name}
                          </p>
                          <a
                            href={item.url}
                            target="_blank"
                            className="cursor-pointer p-1 bg-popover ml-2 rounded-md text-foreground/60 hover:text-foreground/80 transition-all duration-300"
                          >
                            <RxExternalLink />
                          </a>
                        </span>
                        <span className="text-xs text-foreground/80 line-clamp-1">
                          <MarkdownParser text={item.description} />
                        </span>
                      </div>
                    </span>
                  </div>
                ))}
              </div>
            </Block>
            <Block
              delay={1.4}
              className="bg-background row-span-8 col-span-7 md:col-span-3 rounded-2xl border w-full h-full flex flex-col items-center justify-start py-4"
              role="region"
              aria-labelledby="certifications-heading"
            >
              <h2 id="certifications-heading" className="sr-only">
                Certifications
              </h2>
              <span className="flex items-center mb-1">
                <PiCertificateFill className="text-primary mr-1" size={20} />
                <p className="text-foreground/60 text-sm font-semibold">
                  Certs
                </p>
              </span>
              <p className="text-foreground/80 font-bold mb-4">
                My Certifications
              </p>
              <div className="flex flex-col gap-3 items-center justify-center w-full px-4">
                {profile.certifications
                  .slice(0, 4)
                  .map((cert: any, index: number) => (
                    <a
                      key={index}
                      href={cert.url}
                      target="_blank"
                      title={cert.description}
                      className="cursor-pointer w-full bg-secondary h-12 rounded-lg group border hover:border-foreground/20 transition-all duration-300 flex items-center justify-between px-2"
                    >
                      <span className="flex items-center">
                        <img
                          src={`https://www.google.com/s2/favicons?sz=128&domain_url=${cert.url}`}
                          className="w-8 h-8"
                          alt={`${cert.name} favicon`}
                        />
                        <span className="ml-1 text-foreground/60 text-sm font-semibold flex flex-col w-full md:w-[73%]">
                          <p className="text-xs font-semibold text-foreground ">
                            {cert.name}
                          </p>
                          <p className="text-xxs overflow-hidden line-clamp-1 text-foreground/80">
                            {cert.description}
                          </p>
                        </span>
                      </span>
                      <IoArrowForward
                        className="text-foreground/60 transition-transform duration-500 group-hover:-rotate-45"
                        size={20}
                      />
                    </a>
                  ))}
              </div>
            </Block>
            <Block
              delay={1.3}
              className="bg-background row-span-7 col-span-7 md:col-span-3 rounded-3xl border w-full h-[18rem] md:h-full flex flex-col items-center justify-start py-4"
              role="region"
              aria-labelledby="online-presence-heading"
            >
              <h2 id="online-presence-heading" className="sr-only">
                Online Presence
              </h2>
              <span className="flex items-center mb-1">
                <MdSunny className="text-primary mr-1" size={20} />
                <p className="text-foreground/60 text-sm font-semibold">
                  Follow Me
                </p>
              </span>
              <p className="text-foreground/80 font-bold mb-6">
                Online Presence
              </p>
              <div className="flex flex-col gap-3 items-center justify-center w-full px-4">
                {profile.socials
                  .slice(0, 4)
                  .map((social: any, index: number) => {
                    const Icon = getPlatformIcon(social.url);
                    const lastPart = social.url
                      .split("/")
                      .filter(Boolean)
                      .pop();
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        className="cursor-pointer w-full bg-secondary rounded-lg group border hover:border-foreground/20 transition-all duration-300 flex items-center justify-between px-3 py-1"
                      >
                        <span className="flex items-center justify-start w-[90%]">
                          <span className="p-1 text-primary rounded-md">
                            {Icon}
                          </span>
                          <p className="ml-1 text-foreground/60 text-sm overflow-hidden whitespace-nowrap overflow-ellipsis font-semibold">
                            @{lastPart}
                          </p>
                        </span>
                        <IoArrowForward
                          className="text-foreground/60 transition-transform duration-500 group-hover:-rotate-45"
                          size={20}
                        />
                      </a>
                    );
                  })}
              </div>
            </Block>
            <Block
              delay={1.5}
              className="bg-background row-span-7 col-span-7 md:col-span-4 rounded-3xl border w-full h-[20rem] md:h-full flex flex-col items-center justify-start py-4"
              role="region"
              aria-labelledby="contact-heading"
            >
              <h2 id="contact-heading" className="sr-only">
                Contact
              </h2>
              <span className="flex items-center justify-center mb-4 p-2 rounded-full bg-popover w-16 h-16">
                <IoMdCodeWorking className="text-primary" size={30} />
              </span>
              <p className="text-foreground/80 font-bold text-xl mb-1">
                Work Together
              </p>
              <p className="text-foreground/60 font-semibold text-sm mb-4 tracking-tighter text-center">
                Let the magic happen through our work!
              </p>
              <div className="flex flex-col gap-3 items-center justify-center w-full px-4">
                <Link
                  href={`mailto:${profile.email}`}
                  className="cursor-pointer w-full bg-secondary h-12 rounded-lg group border hover:border-foreground/20 transition-all duration-300 flex items-center justify-center px-2"
                >
                  <MdEmail
                    className="text-primary group-hover:text-primary/80 transition-all duration-200"
                    size={25}
                  />
                  <p className="ml-1 text-foreground/80 group-hover:text-foreground transition-all duration-200 text-sm font-semibold">
                    Email Me
                  </p>
                </Link>
                {additionalinfo.meetingScheduleLink && (
                  <a
                    href={additionalinfo.meetingScheduleLink}
                    target="_blank"
                    className="cursor-pointer w-full bg-secondary h-12 rounded-lg group border hover:border-foreground/20 transition-all duration-300 flex items-center justify-center px-2"
                  >
                    <BsCalendarDateFill
                      className="text-primary group-hover:text-primary/80 transition-all duration-200"
                      size={22}
                    />
                    <p className="ml-1 text-foreground/80 group-hover:text-foreground transition-all duration-200 text-sm font-semibold">
                      Schedule
                    </p>
                  </a>
                )}
              </div>
            </Block>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridSingleTemplate;

type BlockProps = HTMLMotionProps<"div"> & {
  className: string;
  delay: number;
  initialY?: number;
  outputY?: number;
  initialScale?: number;
  outputScale?: number;
};

const Block = ({
  className,
  delay,
  initialY = 0,
  outputY = 0,
  initialScale = 1,
  outputScale = 1,
  children,
  ...rest
}: BlockProps) => {
  return (
    <motion.div
      initial={{ scale: initialScale, opacity: 0, y: initialY }}
      animate={{ scale: outputScale, opacity: 1, y: outputY }}
      transition={{
        delay,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className={className}
      {...rest} // spread all div props like role, aria-labelledby, etc.
    >
      {children}
    </motion.div>
  );
};

const MainBlock = ({
  className,
  delay,
  initialY = 0,
  outputY = 0,
  initialScale = 1,
  outputScale = 1,
  children,
  ...rest
}: BlockProps) => {
  return (
    <motion.div
      initial={{ scale: initialScale, opacity: 0, y: initialY }}
      animate={{ scale: outputScale, opacity: 1, y: outputY }}
      transition={{
        delay: delay,
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};
