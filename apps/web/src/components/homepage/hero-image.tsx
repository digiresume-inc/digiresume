'use client';
import React from 'react';
import ThemeBasedImage from './theme-based-image';
import { MovingBorder } from '../general/moving-border';
import { cn } from '@dr/ui/lib/utils';
import { useIsMobile } from '@dr/ui/hooks/use-mobile';

const HeroImage = () => {
  const MobileImages = ['/herocover/profile_vertical.png', '/herocover/resume_vertical.png'];
  const DesktopImages = ['/herocover/profile.png', '/herocover/resume.png'];

  const isMobile = useIsMobile();

  return (
    <>
      <div className="relative flex md:hidden">
        <div className="absolute bottom-0 left-0 w-full h-36 pointer-events-none bg-gradient-to-t from-background/80 to-transparent z-10" />
        <ThemeBasedImage images={MobileImages} width={600} height={600} alt="Home Cover" priority />
      </div>
      <div className="relative hidden md:flex h-[600px] rounded-md overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-48 pointer-events-none bg-gradient-to-t from-background via-background/70 to-transparent z-10" />
        <div className="border border-hero-image-border rounded-t-xl p-[1px] mt-6 relative overflow-hidden">
          {!isMobile && (
            <div className="absolute inset-0">
              <MovingBorder>
                <div
                  className={cn(
                    'h-[1000px] w-[1000px] bg-[radial-gradient(var(--moving-border)_40%,transparent_60%)] opacity-[0.8]'
                  )}
                />
              </MovingBorder>
            </div>
          )}
          <ThemeBasedImage
            images={DesktopImages}
            height={1080}
            width={1920}
            alt="Home Cover"
            className="w-full object-cover border border-hero-image-border/60 rounded-xl antialiased backdrop-blur-xl"
            priority
          />
        </div>
      </div>
    </>
  );
};

export default HeroImage;
