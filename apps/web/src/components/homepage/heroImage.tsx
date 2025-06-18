import React from 'react';
import { blurFade } from '@dr/utils';
import ThemeBasedImage from './themeBasedImage';

const HeroImage = () => {
  const MobileImages = ['/herocover/profile_vertical.png', '/herocover/resume_vertical.png'];
  const DesktopImages = ['/herocover/profile.png', '/herocover/resume.png'];

  return (
    <>
      <div className="relative flex lg:hidden">
        <div className="absolute bottom-0 left-0 w-full h-36 pointer-events-none bg-gradient-to-t from-background/80 to-transparent z-10" />
        <ThemeBasedImage
          images={MobileImages}
          width={600}
          height={600}
          alt="Home Cover"
          priority
        />
      </div>
      <div className="relative hidden lg:flex h-[600px] rounded-md overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-48 pointer-events-none bg-gradient-to-t from-background/80 to-transparent z-10" />
        <div className="border border-[var(--image-border-color)] rounded-t-xl p-1 mt-6">
          <ThemeBasedImage
            images={DesktopImages}
            height={1080}
            width={1920}
            alt="Home Cover"
            className="w-full object-cover border border-[var(--image-border-color)]/60 rounded-xl"
            priority
          />
        </div>
      </div>
    </>
  );
};

export default HeroImage;
