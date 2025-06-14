import * as React from 'react';
import Navbar from '@/components/homepage/navbar';
import DotGradient from '@/components/homepage/dotGradient';
import HeroImage from '@/components/homepage/heroImage';
import HeroSection from '@/components/homepage/heroSection';
import Footer from '@/components/homepage/footer';

export default async function Home() {
  return (
    <div className="w-full bg-background">
      <div className="min-h-screen flex flex-col items-center justify-start w-full mx-auto px-4 relative z-10">
        <DotGradient />
        <Navbar />
        <HeroSection />
        <HeroImage />
      </div>
      <Footer />
    </div>
  );
}
