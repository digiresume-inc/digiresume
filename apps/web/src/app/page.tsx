import * as React from 'react';
import Navbar from '@/components/homepage/navbar';
import DotGradient from '@/components/homepage/dotGradient';
import HeroImage from '@/components/homepage/heroImage';
import HeroSection from '@/components/homepage/heroSection';

export default async function Home() {
  return (
    <div className="relative w-full bg-background">
      <DotGradient />

      <div className="min-h-screen flex flex-col items-center justify-start w-full mx-auto px-4 relative z-10">
        <Navbar />
        <HeroSection />
        <HeroImage />
      </div>
    </div>
  );
}
