'use client';
import * as React from 'react';
import { useEffect } from 'react';
import Navbar from '@/components/homepage/navbar';
import DotGradient from '@/components/homepage/dotGradient';
import HeroImage from '@/components/homepage/heroImage';
import HeroSection from '@/components/homepage/heroSection';
import Footer from '@/components/homepage/footer';
import Section1 from '@/components/homepage/section';

export default function Home() {
  useEffect(() => {
    const body = document.body;
    let toggle = false;

    const interval = setInterval(() => {
      toggle = !toggle;
      if (toggle) {
        body.classList.add('theme-white');
      } else {
        body.classList.remove('theme-white');
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-full bg-background">
      <div className="min-h-screen flex flex-col items-center justify-start w-full mx-auto px-4 relative z-10">
        <DotGradient />
        <Navbar />
        <HeroSection />
        <HeroImage />
      </div>
      <Section1 />
      <Footer />
    </div>
  );
}
