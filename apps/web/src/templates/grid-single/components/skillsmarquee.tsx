"use client";
import React from "react";
import Marquee from "react-fast-marquee";

export type Skill = {
  label: string;
  value: string;
  logo: string;
  category: string;
};

const IconItem = ({ icon, label }: { icon: string; label: string }) => (
  <div
    role="listitem"
    aria-label={label}
    className="group relative flex items-center justify-center mx-3 z-5"
  >
    {icon && <img
      src={icon}
      alt={label}
      className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] object-contain transition cursor-pointer"
    />}
    {!icon && <p className="text-sm font-semibold">{label}</p>}
    <span className="absolute top-[-25px] text-xs text-foreground bg-secondary border bg-opacity-80 px-2 py-1 rounded hidden group-hover:block whitespace-nowrap z-10">
      {label}
    </span>
  </div>
);

const SkillsMarquee = ({ skills }: { skills: Skill[] }) => {
  if (!skills?.length) return null;

  return (
    <Marquee
      className="overflow-visible"
      style={{ overflow: "visible" }}
      aria-label="List of technical skills"
      direction="right"
      speed={30}
      pauseOnHover
      pauseOnClick
      autoFill
    >
      {skills.map((skill, idx) => (
        <IconItem key={idx} icon={skill.logo} label={skill.label} />
      ))}
    </Marquee>
  );
};

export default SkillsMarquee;
