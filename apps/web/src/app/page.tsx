'use client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Navbar from '@/components/homepage/navbar';
import DotGradient from '@/components/homepage/dotGradient';
import HeroImage from '@/components/homepage/heroImage';
import HeroSection from '@/components/homepage/heroSection';
import Footer from '@/components/homepage/footer';
import Section1 from '@/components/homepage/section';

export default function Home() {
  const [isWhiteTheme, setIsWhiteTheme] = useState(false);

  useEffect(() => {
    const homePage = document.getElementById('homePage');

    if (isWhiteTheme) {
      homePage?.classList.add('theme-white');
    } else {
      homePage?.classList.remove('theme-white');
    }

    const interval = setInterval(() => {
      setIsWhiteTheme((prev) => {
        const newTheme = !prev;
        const homePage = document.getElementById('homePage'); // fetch fresh
        if (newTheme) {
          homePage?.classList.add('theme-white');
        } else {
          homePage?.classList.remove('theme-white');
        }
        return newTheme;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="homePage" className="w-full bg-background">
      <div className="min-h-screen flex flex-col items-center justify-start w-full mx-auto px-4 relative z-10">
        <DotGradient />
        <Navbar />
        <HeroSection isWhiteTheme={isWhiteTheme} />
        <HeroImage />
      </div>
      <Section1 />
      <Footer />
    </div>
  );
}
