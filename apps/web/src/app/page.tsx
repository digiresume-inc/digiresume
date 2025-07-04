import { Metadata } from 'next';
import HomePage from './homepage';

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
    title: 'Digiresume',
    description:
      'One platform. Your resume and portfolio, perfectly synced. Show off your skills, projects, and achievements.',
    icons: {
      icon: '/favicon.ico',
    },
    openGraph: {
      title: 'Digiresume',
      description:
        'One platform. Your resume and portfolio, perfectly synced. Show off your skills, projects, and achievements.',
      url: process.env.NEXT_PUBLIC_BASE_URL,
      images: [
        {
          url: '/ogimage.png',
          width: 1200,
          height: 630,
          alt: "Digiresume's OpenGraph Image",
        },
      ],
      siteName: 'Digiresume',
    },
    twitter: {
      card: 'summary',
      title: 'Digiresume',
      description:
        'One platform. Your resume and portfolio, perfectly synced. Show off your skills, projects, and achievements.',
      images: ['/ogimage.png'],
    },
  };
}

export default function Home() {
  return <HomePage />;
}
