'use client';
import Image from 'next/image';
import { Button } from '@dr/ui/components/base/button';
import { Input } from '@dr/ui/components/base/input';
import { cn } from '@dr/ui/lib/utils';
import { ArrowRight, AtSign } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { SiGithub, SiInstagram, SiLinkedin, SiX } from 'react-icons/si';
import ThemeBasedImage from './themeBasedImage';
import { GridGradient } from '@dr/ui/components/base/grid-gradient';
import Link from 'next/link';

const Footer = () => {
  const FooterLogos = ['/logos/dr_dark.png', '/logos/dr_light.png'];

  return (
    <div id="homeFooter" className="py-12 px-6 bg-transparent min-h-98 lg:h-98 relative">
      <GridGradient className="h-[216px]" />
      <div className="relative z-20 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between h-full bg-background/60 md:bg-background/90 px-4 md:px-8 lg:px-12 pb-8 rounded-b-3xl">
        <div className="flex flex-col flex-1 items-start gap-2 h-full">
          <ThemeBasedImage
            images={FooterLogos}
            width={96}
            height={136}
            alt="Footer logo"
            className="w-20 lg:w-24"
            priority
          />
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
          <div className="flex-col gap-2 mt-auto hidden md:flex text-foreground">
            <div className="flex items-center gap-1 text-sm font-light">
              <AtSign size={16} strokeWidth={1} /> 2025 <strong>Digiresume</strong>, All rights
              reserved
            </div>
            <div className="flex h-12 items-center bg-linear-(--gradient-background) bg-clip-text text-right text-transparent lg:order-4 lg:mr-0 md:order-3 md:ml-auto md:h-11 sm:ml-0 sm:mt-2 sm:w-full">
              <Image
                alt="Love"
                loading="lazy"
                width={68}
                height={68}
                className="-mr-3 sm:-ml-4"
                style={{ color: 'transparent' }}
                src="/general/love.svg"
              />
              Made by
              <span className="font-medium ml-2 hover:text-foreground transition-colors duration-200 cursor-pointer">
                @prasadreddy03
              </span>
            </div>
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
            <Link target='="_blank' href={'https://x.com/digiresume'}>
              <SiX
                size={24}
                className="text-foreground/70 hover:text-foreground transition-colors duration-200 cursor-pointer"
              />
            </Link>
            <Link target='="_blank' href={'https://instagram.com/digiresu.me'}>
              <SiInstagram
                size={24}
                className="text-foreground/70 hover:text-foreground transition-colors duration-200 cursor-pointer"
              />
            </Link>
            <Link target='="_blank' href={'https://linkedin.com/company/digiresume'}>
              <SiLinkedin
                size={24}
                className="text-foreground/70 hover:text-foreground transition-colors duration-200 cursor-pointer"
              />
            </Link>
            <SiGithub
              size={24}
              className="text-foreground/70 hover:text-foreground transition-colors duration-200 cursor-pointer"
            />
          </div>
          <div className="flex gap-4 items-center mt-auto text-sm text-foreground">
            <p className="font-medium leading-none tracking-tight text-foreground/70 hover:text-foreground transition-colors duration-200 cursor-pointer">
              Privacy policy
            </p>
            <p className="font-medium leading-none tracking-tight text-foreground/70 hover:text-foreground transition-colors duration-200 cursor-pointer">
              Terms of service
            </p>
          </div>
        </div>
        <div className="flex-col gap-2 mt-4 flex md:hidden w-full text-foreground">
          <div className="flex-wrap items-center gap-1 text-sm font-light">
            @2025 <strong>Digiresume</strong>, All rights reserved
          </div>
          <div className="text-sm flex h-12 items-center bg-linear-(--gradient-background) bg-clip-text text-right text-transparent lg:order-4 lg:mr-0 md:order-3 md:ml-auto md:h-11 sm:ml-0 sm:mt-2 sm:w-full">
            <Image
              alt="Love"
              loading="lazy"
              width={68}
              height={68}
              className="-mr-3 -ml-4"
              style={{ color: 'transparent' }}
              src="/general/love.svg"
            />
            Made by
            <span className="font-medium ml-2 hover:text-foreground transition-colors duration-200 cursor-pointer">
              @prasadreddy03
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
