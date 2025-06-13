import React from 'react';
import UsernameCheck from './usernamecheck';
import { FlipWords } from './flipword';

const HeroSection = () => {
  return (
    <main className="max-w-7xl sm:pt-18 container relative mx-auto px-6 pt-16 md:pt-24 lg:px-16 lg:pt-20 xl:px-20 overflow-hidden">
      <div className="relative">
        <div className="mx-auto">
          <div className="mx-auto max-w-2xl lg:col-span-6 lg:flex lg:items-center justify-center text-center">
            <div className="relative z-10 lg:h-auto pt-[60px] lg:min-h-[300px] flex flex-col items-center justify-center sm:mx-auto md:w-3/4 lg:mx-0 lg:w-full gap-4 lg:gap-8">
              <div className="flex flex-col items-center">
                <h1
                  className={`bricolage text-foreground font-bold text-3xl lg:text-6xl tracking-tight select-none`}
                >
                  <span className="block cursor-pointer lg:mb-2">The Spotlight your</span>
                  <span className="block md:ml-0">
                    <FlipWords duration={3000} className="mr-2 lg:mr-4 text-primary" />
                    deserves
                  </span>
                </h1>
                <p className="pt-2 text-sm sm:text-base lg:text-lg font-medium text-muted-foreground my-3 sm:mt-5 lg:mb-0 sm:px-6 lg:px-10 max-w-prose text-center">
                  Create a stunning, paper-like digital resume with <strong>Digiresu.me</strong>.
                  Highlight your startups, showcase projects, map your journey, and get verified —
                  all in one sleek, shareable profile.
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
