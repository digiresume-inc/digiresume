import React from 'react';
import Marquee from 'react-fast-marquee';
import { Skill } from '@dr/utils';

const SkillsMarquee = ({skills}:{skills: Skill[]}) => {
  return (
    <Marquee direction="right" speed={30} pauseOnHover pauseOnClick autoFill>
      {skills.map((skill, index) => {
        return (
          <img
            key={index}
            src={skill.logo}
            className="mr-4 opacity-70 w-[30px] h-[30px] md:w-[50px] md:h-[50px]"
          />
        );
      })}
    </Marquee>
  );
};

export default SkillsMarquee;
