import { Button } from '@dr/ui/components/base/button';
import { Input } from '@dr/ui/components/base/input';
import { cn } from '@dr/ui/lib/utils';
import { ArrowRight, AtSign } from 'lucide-react';
import React from 'react';
import { SiGithub, SiInstagram, SiLinkedin, SiX } from 'react-icons/si';

const Footer = () => {
  return (
    <div className="py-12 px-6 bg-transparent min-h-98 lg:h-98 relative">
      <div className="absolute inset-0 z-0">
        <div
          className={cn(
            'absolute inset-x-0 bottom-0 h-[216px]',
            '[background-size:20px_20px]',
            '[background-image:radial-gradient(#8a6642_1.1px,transparent_1.1px)]',
            '[mask-image:linear-gradient(to_top,black,transparent)]',
            'dark:[mask-image:linear-gradient(to_top,black,transparent)]',
            'mask-image-[linear-gradient(to_top,black,transparent)]'
          )}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_80%,black)] bg-background"></div>
      <div className="relative z-20 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between h-full bg-background/60 md:bg-background/90 px-4 md:px-8 lg:px-12 pb-8 rounded-b-3xl">
        <div className="flex flex-col flex-1 items-start gap-2 h-full">
          <img className="w-20 lg:w-24" src="word-mark-shrinked.png" />
          <p className="text-xs text-muted-foreground font-medium tracking-wide italic mt-2">
            Proudly{' '}
            <span className="text-primary font-semibold not-italic ml-1 hover:underline cursor-pointer">
              Open Source
            </span>{' '}
            ✨
          </p>
          <p className="mt-2 text-sm font-light text-muted-foreground max-w-md">
            Create a stunning, paper-like digital resume with <strong>digiresu.me</strong>.
            Highlight your startups, showcase projects, map your journey, and get verified — all in
            one sleek, shareable profile.
          </p>
          <div className="flex-col gap-2 mt-auto hidden md:flex">
            <div className="flex items-center gap-1 text-sm font-light">
              <AtSign size={16} strokeWidth={1} /> 2025 <strong>Digiresume</strong>, All rights
              reserved
            </div>
            <span className="flex items-center w-full">
              Made with ❤️ by <span className="font-semibold hover:underline ml-1">@prasadreddy03</span>
            </span>
          </div>
        </div>
        <div className="flex flex-col items-start gap-2 h-full w-full lg:w-auto mt-6 md:mt-0">
          <div className="flex flex-col gap-4 items-start justify-start lg:justify-center w-full">
            <p className="tex-lg lg:text-2xl font-extrabold text-foreground">
              Sign up to our newsletter
            </p>
            <div className="w-full flex items-center gap-2">
              <Input placeholder="jethalal@tmkoc.com" className="w-full" />
              <Button variant={'default'} size={'icon'} className="">
                <ArrowRight />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4 py-6">
            <SiX size={24} className='text-foreground/70 hover:text-foreground transition-colors duration-200 cursor-pointer' />
            <SiInstagram size={24} className='text-foreground/70 hover:text-foreground transition-colors duration-200 cursor-pointer'  />
            <SiLinkedin size={24} className='text-foreground/70 hover:text-foreground transition-colors duration-200 cursor-pointer'  />
            <SiGithub size={24} className='text-foreground/70 hover:text-foreground transition-colors duration-200 cursor-pointer'  />
          </div>
          <div className="flex gap-4 items-center mt-auto text-sm">
            <p className="font-light underline decoration-1 cursor-pointer">Privacy policy</p>
            <p className="font-light underline decoration-1 cursor-pointer">Terms of service</p>
          </div>
        </div>
        <div className="flex-col gap-2 mt-4 flex md:hidden w-full">
          <div className="flex items-center gap-1 text-sm font-light">
            <AtSign size={16} strokeWidth={1} /> 2025 <strong>Digiresume</strong>, All rights
            reserved
          </div>
          <span className="flex items-center w-full text-sm">
            Made with ❤️ by <span className="font-semibold hover:underline ml-1">@prasadreddy03</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
