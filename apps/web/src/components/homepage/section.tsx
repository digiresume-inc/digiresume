import React from 'react';
import ThemeBasedImage from './themeBasedImage';

const Section1 = () => {
  const first = ['/product_showcase/profile_showcase.png', '/product_showcase/resume_showcase.png'];
  const second = [
    '/product_showcase/startup_showcase.png',
    '/product_showcase/resume_startup_showcase.png',
  ];
  return (
    <div className="min-h-screen w-full max-w-5xl py-12 px-6 mx-auto mt-24">
      <div className="custom-bento-grid gap-8 divide-y-2 divide-x-0 md:divide-x-2 md:divide-y-0 divide-home-divider border-t-2 border-b-2 border-home-divider">
        <div style={{ gridArea: 'a' }} className="pe-0 lg:pe-12 py-14 relative h-full">
          <h1 className="text-[21px] leading-[28px] tracking-[-.37px] font-[510] text-balance text-foreground">
            Instant portfolio, beautifully crafted
          </h1>
          <div className="block w-[1px] h-[1px] min-w-[1px] min-h-[1px] select-none mt-[3px]" />
          <p className="text-[15px] leading-[24.5px] tracking-[0] text-balance text-foreground/70">
            Create a minimal, elegant profile that highlights your work — without touching a single
            line of code.
          </p>
          <div className="block w-[1px] h-[1px] min-w-[1px] min-h-[1px] select-none mt-[31px]" />
          <div className="select-none aspect-[432/320] max-w-full max-h-full overflow-hidden w-full mask-image">
            <div className="relative p-1 rounded-[18px] border-l border-t bg-transparent w-full ">
              <ThemeBasedImage
                width={1000}
                height={1000}
                images={first}
                className="w-full border-l border-t rounded-[18px] object-cover opacity-100"
                disableAnimation
                alt="Prouct showcase"
              />
            </div>
          </div>
        </div>
        <div style={{ gridArea: 'b' }} className="pe-12 py-14 relative">
          <h1 className="text-[21px] leading-[28px] tracking-[-.37px] font-[510] text-balance text-foreground">
            Showcase your projects and startups
          </h1>
          <div className="block w-[1px] h-[1px] min-w-[1px] min-h-[1px] select-none mt-[3px]" />
          <p className="text-[15px] leading-[24.5px] tracking-[0] text-balance text-foreground/70">
            Add side projects, startups, and experiments — complete with links, badges, and
            screenshots — all under one roof.
          </p>
          <div className="block w-[1px] h-[1px] min-w-[1px] min-h-[1px] select-none mt-[31px]" />
          <div className="select-none aspect-[432/320] max-w-full max-h-full overflow-hidden w-full mask-right contain-strict isolate">
            <div className="w-full">
              <ThemeBasedImage
                width={1000}
                height={1000}
                images={second}
                className="w-full rounded-[18px] object-cover opacity-100 border-border/70 border-l border-b"
                disableAnimation
                alt="Prouct showcase"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1;
