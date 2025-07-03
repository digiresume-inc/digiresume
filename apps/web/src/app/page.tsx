import Navbar from '@/components/homepage/navbar';
import HeroImage from '@/components/homepage/heroImage';
import HeroSection from '@/components/homepage/heroSection';
import Footer from '@/components/homepage/footer';
import Section1 from '@/components/homepage/section';
import { GridGradient } from '@dr/ui/components/base/grid-gradient';
import { ThemeProvider } from '@/context/themeContext';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Digiresume",
    description: "Build a dynamic digital portfolio and resume that stay in sync. Showcase your skills, projects, startups, and achievements.",
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      title: "Digiresume",
      description: "Build a dynamic digital portfolio and resume that stay in sync. Showcase your skills, projects, startups, and achievements.",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      images: [
        {
          url: "/ogimage.png",
          width: 1200,
          height: 630,
          alt: "Digiresume's OpenGraph Image",
        },
      ],
      siteName: "Digiresume",
    },
    twitter: {
      card: "summary",
      title: "Digiresume",
      description: "Build a dynamic digital portfolio and resume that stay in sync. Showcase your skills, projects, startups, and achievements.",
      images: ["/ogimage.png"],
    },
  };
}

export default async function Home() {

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
