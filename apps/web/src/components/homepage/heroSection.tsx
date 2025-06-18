import React from 'react';
import UsernameCheck from './usernamecheck';
import { FlipWords } from './flipword';

const HeroSection = () => {
  return (
    <main className="max-w-7xl sm:pt-18 container relative mx-auto px-6 pt-16 md:pt-24 lg:px-16 lg:pt-20 xl:px-20 overflow-hidden">
      <div className="relative">
        <div className="mx-auto">
          <div className="mx-auto max-w-3xl lg:col-span-6 lg:flex lg:items-center justify-center text-center">
            <div className="relative z-10 lg:h-auto pt-[50px] lg:min-h-[300px] flex flex-col items-center justify-center sm:mx-auto md:w-3/4 lg:mx-0 lg:w-full gap-4 lg:gap-8">
              <div className="flex flex-col items-center">
                <h1
                  className={`bricolage text-foreground font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight select-none`}
                >
                  <span className="block cursor-pointer lg:mb-2">
                    <FlipWords duration={9000} words={['Portfolio', 'Resume']} className="" />{' '}
                    driven by your{' '}
                    <FlipWords duration={9000} words={['Resume', 'Portfolio']} className="m1-1" />,
                  </span>
                  <span className="inline md:ml-0">
                    fueled by <span className="hidden md:inline">your</span>
                    <FlipWords duration={3000} className="ml-0 lg:ml-2 text-hero" />
                  </span>
                </h1>
                <p className="pt-2 text-sm md:text-base lg:text-lg font-medium text-muted-foreground my-3 sm:mt-5 lg:mb-0 sm:px-6 lg:px-10 max-w-prose text-center">
                  Build a paper-feel digital resume with <strong>digiresu.me</strong> — highlight
                  startups, showcase projects, and get verified in one sleek, shareable profile.
                </p>
              </div>
              <UsernameCheck />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
