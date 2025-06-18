'use client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Navbar from '@/components/homepage/navbar';
import HeroImage from '@/components/homepage/heroImage';
import HeroSection from '@/components/homepage/heroSection';
import Footer from '@/components/homepage/footer';
import Section1 from '@/components/homepage/section';
import { GridGradient } from '@dr/ui/components/base/grid-gradient';
import { ThemeProvider } from '@/context/themeContext';

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
    // <ThemeProvider>
      <div id="homePage" className="w-full bg-background">
        <div className="min-h-screen flex flex-col items-center justify-start w-full mx-auto px-4 relative z-10">
          <GridGradient className="h-[500px] lg:h-[800px]" />
          <Navbar />
          <HeroSection isWhiteTheme={isWhiteTheme} />
          <HeroImage />
        </div>
        <Section1 />
        <Footer />
      </div>
    // </ThemeProvider>
  );
}
