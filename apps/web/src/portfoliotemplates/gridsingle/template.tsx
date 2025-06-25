'use client';
import { IoLocationSharp, IoTime, IoArrowForward } from 'react-icons/io5';
import { FaLanguage } from 'react-icons/fa';
import { FaGraduationCap } from 'react-icons/fa6';
import { MdOutlineFileDownload, MdSunny, MdEmail, MdMail } from 'react-icons/md';
import { FaFaceSmile, FaDev, FaRankingStar } from 'react-icons/fa6';
import { BiSolidBookBookmark } from 'react-icons/bi';
import { IoMdCodeWorking, IoLogoGithub } from 'react-icons/io';
import { FaProjectDiagram, FaLinkedin } from 'react-icons/fa';
import { TbStack2Filled } from 'react-icons/tb';
import { RiNextjsFill } from 'react-icons/ri';
import { SiFlutter, SiSupabase, SiPrisma, SiPostgresql } from 'react-icons/si';
import { LuConstruction } from 'react-icons/lu';
import { RxExternalLink } from 'react-icons/rx';
import { TbFileCv } from 'react-icons/tb';
import { FaUserAlt } from 'react-icons/fa';
import { motion } from 'motion/react';
import { useState } from 'react';
import { GiSkills } from 'react-icons/gi';
import { PiCertificateFill } from 'react-icons/pi';
import SkillsMarquee from './components/skillsmarquee';
import { FlipWords } from './components/flipwords';
import { Database } from '@/lib/types/supabasetypes';
import { socialIconMap } from '@/lib/utils/iconMap';
import { Link2 } from 'lucide-react';

type Profile = Database['public']['Tables']['profiles']['Row'];
type Startup = Database['public']['Tables']['startups']['Row'];
type Project = Database['public']['Tables']['projects']['Row'];

function getPlatformIcon(url: string) {
  try {
    const host = new URL(url).hostname.replace('www.', '');
    const platform = Object.keys(socialIconMap).find((key) => host.includes(key.toLowerCase()));
    const Icon = socialIconMap[platform || ''];
    return Icon ? <Icon size={18} /> : <Link2 size={18} />;
  } catch {
    return <Link2 size={18} />;
  }
}

const GridSingle = ({
  profile,
  startups,
  projects,
}: {
  profile: Profile;
  startups: Startup[];
  projects: Project[];
}) => {
  const githubUrl = profile.socials.find((item) => item.url.includes('github.com'))?.url;
  const linkedinUrl = profile.socials.find((item) => item.url.includes('linkedin.com'))?.url;

  return (
    <div className="template-1-grid-top">
      <div className="template-1-header sm:hidden">
        <Block
          delay={0.9}
          initialY={-50}
          outputY={0}
          className="grid grid-cols-3 p-2 gap-2 w-full h-16 bg-[#101010] rounded-[16px] border-[0.5px] border-white/5"
        >
          <div
            className={`col-span-1 rounded-lg bg-[#191919] flex gap-1 items-center justify-center`}
          >
            <FaUserAlt size={15} className={'text-[#a290fc]'} />
            <p className="text-gray-300 font-semibold text-sm">About</p>
          </div>
          <div
            className={`col-span-1 rounded-lg bg-[#191919] flex gap-1 items-center justify-center`}
          >
            <LuConstruction size={15} className={'text-[#a290fc]'} />
            <p className="text-gray-300 font-semibold text-sm">Works</p>
          </div>
          <div
            className={`col-span-1 rounded-lg bg-[#191919] flex gap-1 items-center justify-center`}
          >
            <MdMail size={15} className={'text-[#a290fc]'} />
            <p className="text-gray-300 font-semibold text-sm">Contact</p>
          </div>
        </Block>
      </div>
      <div className="template-1-first">
        <div className="grid grid-rows-8 gap-3 w-full h-full">
          <Block
            delay={1}
            className="bg-[#101010] h-auto row-span-4 rounded-[24px] border-[0.5px] border-white/5 w-full flex flex-col items-center justify-center"
          >
            <span className="flex items-center mb-1">
              <TbStack2Filled className="text-[#a290fc] mr-1" size={20} />
              <p className="text-gray-400 text-sm font-semibold">My Stacks</p>
            </span>
            <p className="text-gray-300 font-bold mb-4">Tech Arsenal</p>
            <div className="flex flex-wrap gap-3 items-center justify-center">
              <a
                href="https://nextjs.org/"
                target="_blank"
                className="w-36 cursor-pointer bg-[#191919] h-12 rounded-lg border-[0.5px] border-white/5 hover:border-white/20 transition-all duration-300 flex items-center justify-center"
              >
                <RiNextjsFill className="text-gray-400 mr-1" size={30} />
                <p className="text-gray-400 text-sm font-semibold">Next JS</p>
              </a>
              <a
                href="https://www.postgresql.org/"
                target="_blank"
                className="w-36 cursor-pointer bg-[#191919] h-12 rounded-lg border-[0.5px] border-white/5 hover:border-white/20 transition-all duration-300 flex items-center justify-center"
              >
                <SiPostgresql className="text-gray-400 mr-1" size={24} />
                <p className="text-gray-400 text-sm font-semibold">Postgres</p>
              </a>
              <a
                href="https://aws.amazon.com/"
                target="_blank"
                className="w-36 cursor-pointer bg-[#191919] h-12 rounded-lg border-[0.5px] border-white/5 hover:border-white/20 transition-all duration-300 flex items-center justify-center"
              >
                <p className="text-gray-400 text-sm font-semibold">AWS</p>
              </a>
              <a
                href="https://www.prisma.io/"
                target="_blank"
                className="w-36 cursor-pointer bg-[#191919] h-12 rounded-lg border-[0.5px] border-white/5 hover:border-white/20 transition-all duration-300 flex items-center justify-center"
              >
                <SiPrisma className="text-gray-400 mr-1" size={27} />
                <p className="text-gray-400 text-sm font-semibold">Prisma</p>
              </a>
              <a
                href="https://flutter.dev/"
                target="_blank"
                className="w-36 cursor-pointer bg-[#191919] h-12 rounded-lg border-[0.5px] border-white/5 hover:border-white/20 transition-all duration-300 flex items-center justify-center"
              >
                <SiFlutter className="text-gray-400 mr-1" size={24} />
                <p className="text-gray-400 text-sm font-semibold">Flutter</p>
              </a>
              <a
                href="https://supabase.com/"
                target="_blank"
                className="w-36 cursor-pointer bg-[#191919] h-12 rounded-lg border-[0.5px] border-white/5 hover:border-white/20 transition-all duration-300 flex items-center justify-center"
              >
                <SiSupabase className="text-gray-400 mr-1" size={27} />
                <p className="text-gray-400 text-sm font-semibold">Supabase</p>
              </a>
            </div>
          </Block>
          <Block
            delay={1.1}
            className="bg-[#101010] overflow-hidden relative row-span-4 rounded-[20px] border-[0.5px] border-white/5 w-full h-[400px] md:h-full flex flex-col items-center justify-center"
          >
            <div className="absolute top-[20%] left-0 w-full h-8 bg-gradient-to-b from-[#101010] to-transparent to-90% z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#101010] to-transparent to-90% z-10 pointer-events-none"></div>
            <div className="absolute h-1/5 w-full bg-[#101010] border-b border-gray-700 z-10 top-0 left-0 flex items-center justify-center">
              <BiSolidBookBookmark className="text-[#a290fc] mr-1" size={20} />
              <p className="text-gray-300 text-base font-bold">Education Timeline</p>
            </div>
          </Block>
          {/* <Block
              delay={1.2}
              className="bg-[#101010] row-span-1 rounded-md border-[0.5px] border-white/5 w-full h-full"
            >
            </Block> */}
        </div>
      </div>
      <div className="template-1-second">
        <div className="grid grid-rows-25 md:grid-rows-21 grid-cols-4 sm:grid-cols-3 md:grid-cols-3 gap-3 w-full h-full items-center">
          <Block
            delay={1}
            className="bg-[#101010] relative overflow-hidden  row-span-4 col-span-2 sm:col-span-1 rounded-2xl border-[0.5px] border-white/5 w-full h-full min-h-28 order-2 sm:order-none flex flex-col items-center justify-center"
          >
            <span className="text-6xl text-gray-400 flex items-center justify-center z-0 font-semibold">
              08<p className="text-[#a290fc] text-4xl">+</p>
            </span>
            <div className="absolute bottom-4 blur-lg left-0 w-full h-16 bg-gradient-to-t from-[#191919]/10 to-[#101010] to-90% z-10 pointer-events-none"></div>
            <span className="h-10 w-24"></span>
            <div className="cursor-pointer absolute bg-[#191919] rounded-2xl border-[0.5px] border-white/5 flex items-center justify-center pl-4 pr-4 pt-1 pb-1 bottom-3 z-10">
              <FaProjectDiagram className="mr-1 text-[#a290fc]" />
              <p className="text-gray-400 text-sm font-semibold">Projects</p>
            </div>
          </Block>
          <Block
            delay={1.1}
            className="bg-[#101010] relative row-span-4 col-span-2 sm:col-span-1 rounded-2xl border-[0.5px] border-white/5 w-full h-full min-h-28 order-2 sm:order-none flex flex-col items-center justify-center"
          >
            <span className="text-6xl text-gray-400 flex items-center justify-center z-0 font-semibold">
              08<p className="text-[#a290fc] text-4xl">+</p>
            </span>
            <div className="absolute bottom-4 blur-lg left-0 w-full h-16 bg-gradient-to-t from-[#191919]/10 to-[#101010] to-90% z-10 pointer-events-none"></div>
            <span className="h-10 w-24"></span>
            <div className="cursor-pointer absolute bg-[#191919] rounded-2xl border-[0.5px] border-white/5 flex items-center justify-center pl-2 pr-2 pt-1 pb-1 bottom-3 z-10">
              <FaProjectDiagram className="mr-1 text-[#a290fc]" />
              <p className="text-gray-400 text-sm font-semibold">Projects</p>
            </div>
          </Block>
          <Block
            delay={1.2}
            className="bg-[#101010] relative row-span-4 col-span-2 sm:col-span-1 rounded-2xl border-[0.5px] border-white/5 w-full h-full order-2 sm:order-none flex flex-col items-center justify-center row-start-11 sm:row-start-auto min-h-28"
          >
            <span className="text-6xl text-gray-400 flex items-center justify-center z-0 font-semibold">
              02<p className="text-[#a290fc] text-4xl">+</p>
            </span>
            <div className="absolute bottom-4 blur-lg left-0 w-full h-16 bg-gradient-to-t from-[#191919]/10 to-[#101010] to-90% z-10 pointer-events-none"></div>
            <span className="h-10 w-24"></span>
            <div
              title="Years Experience"
              className="cursor-pointer absolute bg-[#191919] rounded-2xl w-[87%] border-[0.5px] border-white/5 flex items-center justify-center pl-2 pr-2 pt-1 pb-1 bottom-3 z-10"
            >
              <FaRankingStar className="mr-1 text-[#a290fc]" />
              <p className="text-gray-400 text-sm font-semibold overflow-hidden text-nowrap text-ellipsis">
                Years Experience
              </p>
            </div>
          </Block>
          <Block
            delay={1.3}
            className="bg-[#101010] relative row-span-4 col-span-2 sm:col-span-1 rounded-2xl border-[0.5px] border-white/5 w-full h-full order-2 sm:order-none flex flex-col items-center justify-center row-start-11 sm:row-start-auto min-h-28 sm:hidden"
          >
            <p>
              <MdOutlineFileDownload
                className="text-gray-400"
                size={50}
              />
            </p>
            <div className="absolute bottom-4 blur-lg left-0 w-full h-16 bg-gradient-to-t from-[#191919]/10 to-[#101010] to-90% z-10 pointer-events-none"></div>
            <span className="h-8 w-24"></span>
            <div className="absolute bg-[#191919] rounded-2xl border-[0.5px] border-white/5 flex items-center justify-center pl-2 pr-2 pt-1 pb-1 bottom-3 z-10">
              <TbFileCv className="mr-1 text-[#a290fc]" />
              <p className="text-gray-400 text-sm font-semibold">Resume</p>
            </div>
          </Block>
          <MainBlock
            delay={0.2}
            initialScale={0.3}
            outputScale={1}
            className="bg-[#101010] row-span-10 col-span-4 sm:col-span-3 rounded-[20px] border-[0.5px] border-white/5 w-full h-[350px] md:h-full order-1 sm:order-none"
          >
            <div className="flex flex-col p-4 gap-4">
              <div className="flex gap-2">
                <img
                  src={profile.avatar_url}
                  className="w-[100px] h-[100px] rounded-2xl border-dashed border-2 border-gray-400"
                />
                <div className="h-[100px] w-full p-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center justify-center gap-2 w-auto text-sm md:text-base pl-2 pr-2 pt-1 pb-1 md:pl-3 md:pr-3 md:pt-2 md:pb-2  bg-[#1c1c1c] rounded-full">
                      <div className="relative flex items-center justify-center">
                        <div className="absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75 animate-ping"></div>
                        <div className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></div>
                      </div>
                      <p className="text-center text-sm text-gray-500 font-semibold">
                        Available to Work
                      </p>
                    </span>
                    <a className="cursor-pointer group font-semibold text-gray-400 hover:text-gray-300 transition-all duration-300 hidden md:flex text-sm items-center justify-center pr-2 pl-2 pt-1 pb-1 border-[0.5px] border-white/5 bg-[#191919] rounded-md">
                      Resume{' '}
                      <MdOutlineFileDownload
                        className="ml-1 text-gray-400 group-hover:text-gray-300 transition-all duration-300"
                        size={17}
                      />
                    </a>
                  </div>
                  <p className="text-lg md:text-xl font-bold text-white pl-2 pr-2 pt-2">
                    {profile.full_name}
                  </p>
                  <span className="text-sm md:text-base text-gray-400 pl-2 pr-2 flex">
                    Im a{' '}
                    <span className="text-[#a290fc] font-semibold">
                      <FlipWords />
                    </span>
                  </span>
                </div>
              </div>
              <div className="bg-[#141414] h-full border-[0.5px] border-white/5 w-full rounded-2xl flex flex-wrap gap-1 md:gap-2 pr-2 pl-2 pt-3 pb-3">
                <div className="bg-[#191919] border-[0.5px] border-white/5 flex gap-0.5 pr-1 pl-1 lg:pr-2 lg:pl-2 lg:pb-[1px] lg:pt-[1px] items-center justify-center rounded-2xl">
                  <IoLocationSharp className="text-[#a290fc]" />
                  <p className="text-gray-400 text-xxs lg:text-xs font-semibold ">
                    {profile.country}
                  </p>
                </div>
                <div className="bg-[#191919] border-[0.5px] border-white/5 flex gap-0.5 pr-1 pl-1 lg:pr-2 lg:pl-2 lg:pb-[1px] lg:pt-[1px] items-center justify-center rounded-2xl">
                  <FaGraduationCap className="text-[#a290fc]" />
                  <p className="text-gray-400 text-xxs lg:text-xs font-semibold">
                    {profile.education.branch.slice(0, 20)}
                  </p>
                </div>
                <div className="hidden bg-[#191919] border-[0.5px] border-white/5 md:flex gap-0.5 pr-1 pl-1 lg:pr-2 lg:pl-2 lg:pb-[1px] lg:pt-[1px] items-center justify-center rounded-2xl">
                  <IoTime className="text-[#a290fc]" />
                  <p className="text-gray-400 text-xxs lg:text-xs font-semibold ">IST</p>
                </div>
                <div className="bg-[#191919] border-[0.5px] border-white/5 flex gap-0.5 pr-1 pl-1 lg:pr-2 lg:pl-2 lg:pb-[1px] lg:pt-[1px] items-center justify-center rounded-2xl">
                  <FaFaceSmile className="text-[#a290fc] mr-0.5" />
                  <p className="text-gray-400 text-xxs lg:text-xs font-semibold ">Passive</p>
                </div>
                <div className="bg-[#191919] border-[0.5px] border-white/5 flex gap-0.5 pr-1 pl-1 lg:pr-2 lg:pl-2 lg:pb-[1px] lg:pt-[1px] items-center justify-center rounded-2xl">
                  <BiSolidBookBookmark className="text-[#a290fc] " />
                  <p className="text-gray-400 text-xxs lg:text-xs font-semibold">
                    {profile.education.university.slice(0, 10)}
                  </p>
                </div>
                <div className="bg-[#191919] border-[0.5px] border-white/5 flex gap-0.5 pr-1 pl-1 lg:pr-2 lg:pl-2 lg:pb-[1px] lg:pt-[1px] items-center justify-center rounded-2xl">
                  <FaLanguage className="text-[#a290fc] mr-1" />
                  <p className="text-gray-400 text-xxs lg:text-xs font-semibold ">
                    English & Telugu
                  </p>
                </div>
                <div className="sm:hidden bg-[#191919] border-[0.5px] border-white/5 flex gap-0.5 pr-1 pl-1 lg:pr-2 lg:pl-2 lg:pb-[1px] lg:pt-[1px] items-center justify-center rounded-2xl">
                  <IoTime className="text-[#a290fc]" />
                  <p className="text-gray-400 text-xxs lg:text-xs font-semibold ">IST</p>
                </div>
                <div className="bg-[#191919] border-[0.5px] border-white/5 flex gap-0.5 pr-1 pl-1 lg:pr-2 lg:pl-2 lg:pb-[1px] lg:pt-[1px] items-center justify-center rounded-2xl">
                  <FaDev className="text-[#a290fc] mr-1" />
                  <p className="text-gray-400 text-xxs lg:text-xs font-semibold ">
                    {profile.headline}
                  </p>
                </div>
              </div>
              <div className="h-12  w-full flex  gap-4">
                <div className="h-12 w-full flex gap-4">
                  {linkedinUrl && (
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      className="w-1/2 h-full flex items-center justify-center rounded-lg bg-[#141414] border-[1.5px] border-white/30 group"
                    >
                      <FaLinkedin
                        size={22}
                        className="text-[#a290fc] md:text-[#645994] group-hover:text-[#a290fc] transition-all duration-200 mr-1"
                      />
                      <p className="text-gray-300 md:text-gray-400 group-hover:text-gray-300 transition-all duration-200 cursor-pointer text-base font-semibold">
                        Linkedin
                      </p>
                    </a>
                  )}
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      className="w-1/2 h-full flex items-center justify-center rounded-lg bg-[#141414] border-[1.5px] border-white/30 group"
                    >
                      <IoLogoGithub
                        size={22}
                        className="text-[#a290fc] md:text-[#645994] group-hover:text-[#a290fc] transition-all duration-200 mr-1"
                      />
                      <p className="text-gray-300 md:text-gray-400 group-hover:text-gray-300 transition-all duration-200 cursor-pointer text-base font-semibold">
                        Github
                      </p>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </MainBlock>
          <Block
            delay={1.2}
            className="bg-[#101010] relative overflow-hidden row-span-7 col-span-4 sm:col-span-3 rounded-[20px] border-[0.5px] border-white/5 w-full h-full order-3 sm:order-none flex flex-wrap items-center justify-center"
          >
            <div className="w-full bg-[#101010] border-b border-gray-700  z-10 top-0 left-0 flex flex-col items-center justify-center">
              <span className="flex items-center justify-center mb-2 md:mb-4">
                <GiSkills className="text-[#a290fc] mr-1 w-[15px] h-[15px] md:w-[20px] md:h-[20px]" />
                <p className="text-gray-300 text-sm md:text-base font-bold">My Current Skills</p>
              </span>
            </div>
            <div className="absolute bottom-0 left-0 w-8 h-[70%] bg-gradient-to-r from-[#101010] to-transparent to-90% z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-8 h-[70%] bg-gradient-to-l from-[#101010] to-transparent to-90% z-10 pointer-events-none"></div>
            <SkillsMarquee skills={profile.skills} />
          </Block>
        </div>
      </div>
      <div className="template-1-third">
        <div className="grid grid-rows-15 grid-cols-7 gap-3 w-full h-full">
          <Block
            delay={1.3}
            className="bg-[#101010] row-span-8 col-span-7 md:col-span-4 rounded-2xl border-[0.5px] border-white/5 w-full h-[25rem] md:h-full flex flex-col items-center justify-start py-6"
          >
            <span className="flex items-center mb-1">
              <LuConstruction className="text-[#a290fc] mr-1" size={20} />
              <p className="text-gray-400 text-sm font-semibold">My Side Hustle</p>
            </span>
            <p className="text-gray-300 font-bold mb-4">Projects Building</p>
            <div className="flex flex-col gap-2 w-full">
              {projects.map((project, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col gap-3 items-center justify-center w-full pl-4 pr-4"
                  >
                    <span className="h-fit py-2 w-full bg-[#191919] rounded-xl group border-[0.5px] border-white/5 flex items-center justify-center pl-2 pr-2">
                      <img
                        className="w-12 h-12 rounded-full mr-3"
                        src={`https://www.google.com/s2/favicons?sz=128&domain_url=${project.url}`}
                      />
                      <div className="flex flex-col items-start justify-start">
                        <span className="text-gray-300 font-bold flex items-center justify-center">
                          {project.name}
                          <a
                            href={project.url}
                            target="_blank"
                            className="cursor-pointer p-1 bg-[#292929] ml-2 rounded-md text-gray-400 hover:text-gray-300 transition-all duration-300"
                          >
                            <RxExternalLink />
                          </a>
                        </span>
                        <p className="text-xs text-gray-300 font-semibold line-clamp-1">
                          {project.description}
                        </p>
                      </div>
                    </span>
                  </div>
                );
              })}
            </div>
          </Block>
          <Block
            delay={1.4}
            className="bg-[#101010] row-span-8 col-span-7 md:col-span-3 rounded-2xl border-[0.5px] border-white/5 w-full h-full flex flex-col items-center justify-start py-6"
          >
            <span className="flex items-center mb-1">
              <PiCertificateFill className="text-[#a290fc] mr-1" size={20} />
              <p className="text-gray-400 text-sm font-semibold">shipped</p>
            </span>
            <p className="text-gray-300 font-bold mb-4">My Shipped stuff</p>
            <div className="flex flex-col gap-3 items-center justify-center w-full pl-4 pr-4">
              {startups.map((startup, index) => {
                return (
                  <a
                    key={index}
                    href={startup.url}
                    target="_blank"
                    title="Machine Learning - Amazon Web Services"
                    className="cursor-pointer w-full bg-[#191919] h-12 rounded-lg group border-[0.5px] border-white/5 hover:border-white/20 transition-all duration-300 flex items-center justify-between pl-2 pr-2"
                  >
                    <span className="flex items-center justify-center">
                      <p className="p-1">
                        <img
                          src={`https://www.google.com/s2/favicons?sz=128&domain_url=${startup.url}`}
                          className="w-[40px] h-[40px] rounded-full"
                        />
                      </p>
                      <span className="ml-1 text-gray-400 text-sm font-semibold flex flex-col w-full md:w-[73%]">
                        <p className="text-xs font-semibold text-gray-300">{startup.name}</p>
                        <p className="text-xxs overflow-hidden line-clamp-1">
                          {startup.description}
                        </p>
                      </span>
                    </span>
                    <IoArrowForward
                      className="text-gray-400 opacity-100 md:opacity-0 -rotate-45 md:rotate-0 group-hover:opacity-100 group-hover:-rotate-45 transition-all duration-500"
                      size={20}
                    />
                  </a>
                );
              })}
            </div>
          </Block>
          <Block
            delay={1.3}
            className="bg-[#101010] row-span-7 col-span-7 md:col-span-3 rounded-3xl border-[0.5px] border-white/5 w-full h-[18rem] md:h-full flex flex-col items-center justify-center"
          >
            <span className="flex items-center mb-1">
              <MdSunny className="text-[#a290fc] mr-1" size={20} />
              <p className="text-gray-400 text-sm font-semibold">Follow Me</p>
            </span>
            <p className="text-gray-300 font-bold mb-6">Online Presence</p>
            <div className="flex flex-col gap-3 items-center justify-center w-full pl-4 pr-4">
              {profile.socials.map((social, index) => {
                const Icon = getPlatformIcon(social.url);
                const lastPart = social.url.split('/').filter(Boolean).pop();
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    className="cursor-pointer w-full bg-[#191919] h-12 rounded-lg group border-[0.5px] border-white/5 hover:border-white/20 transition-all duration-300  flex items-center justify-between pl-2 pr-2"
                  >
                    <span className="flex items-center justify-start w-[90%]">
                      <p className="p-1 bg-[#292929] rounded-md">{Icon}</p>
                      <p className="ml-1 text-gray-400 text-sm overflow-hidden whitespace-nowrap overflow-ellipsis font-semibold">
                        @{lastPart}
                      </p>
                    </span>
                    <IoArrowForward
                      className="text-gray-400 opacity-100 md:opacity-0 -rotate-45 md:rotate-0 group-hover:opacity-100 group-hover:-rotate-45 transition-all duration-500"
                      size={20}
                    />
                  </a>
                );
              })}
            </div>
          </Block>
          <Block
            delay={1.5}
            className="bg-[#101010] row-span-7 col-span-7 md:col-span-4 rounded-3xl border-[0.5px] border-white/5 w-full h-[20rem] md:h-full flex flex-col items-center justify-center"
          >
            <span className="flex items-center justify-center mb-4 p-2 rounded-full bg-[#1f1f1f] w-16 h-16">
              <IoMdCodeWorking className="text-[#a290fc]" size={30} />
            </span>
            <p className="text-gray-300 font-bold text-xl mb-1">Work Together</p>
            <p className="text-gray-400 font-semibold text-sm mb-4">
              Let the Magic happen thorugh our Work!
            </p>
            <div className="flex flex-col gap-3 items-center justify-center w-full pl-4 pr-4">
              <a
                href={`mailto:${profile.email}`}
                className="cursor-pointer w-full bg-[#191919] h-12 rounded-lg group border-[0.5px] border-white/5 hover:border-white/20 transition-all duration-300 flex items-center justify-center pl-2 pr-2"
              >
                {' '}
                <MdEmail
                  className="text-[#a290fc] md:text-[#645994] group-hover:text-[#a290fc] transition-all duration-200"
                  size={25}
                />
                <p className="ml-1 text-gray-300 md:text-gray-400 group-hover:text-gray-300 transition-all duration-200 text-sm overflow-hidden whitespace-nowrap overflow-ellipsis font-semibold">
                  Email Me
                </p>
              </a>
            </div>
          </Block>
        </div>
      </div>
    </div>
  );
};

export default GridSingle;

type BlockProps = {
  className: string;
  delay: number;
  initialY?: number;
  outputY?: number;
  initialScale?: number;
  outputScale?: number;
  children?: React.ReactNode;
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
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      className={className}
      {...rest}
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
        type: 'spring',
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
