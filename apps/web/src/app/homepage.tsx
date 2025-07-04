'use client';
import Navbar from '@/components/homepage/navbar';
import HeroImage from '@/components/homepage/heroImage';
import HeroSection from '@/components/homepage/heroSection';
import Footer from '@/components/homepage/footer';
import Section1 from '@/components/homepage/section';
import { GridGradient } from '@dr/ui/components/base/grid-gradient';
import { ThemeProvider } from '@/context/themeContext';

export default function HomePage() {
  return (
    <ThemeProvider>
      <div id="homePage" className="w-full bg-background">
        <div className="min-h-screen flex flex-col items-center justify-start w-full mx-auto px-4 relative z-10">
          <GridGradient className="h-[500px] lg:h-[800px]" />
          <Navbar />
          <HeroSection />
          <HeroImage />
        </div>
        <Section1 />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
