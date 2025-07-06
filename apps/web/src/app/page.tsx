import { Metadata } from 'next';
import HomePage from './home-page';

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
    title: process.env.NEXT_PUBLIC_APP_NAME,
    description:
      'One platform. Your resume and portfolio, perfectly synced. Show off your skills, projects, and achievements.',
    icons: {
      icon: '/favicon.ico',
    },
    openGraph: {
      title: process.env.NEXT_PUBLIC_APP_NAME,
      description:
        'One platform. Your resume and portfolio, perfectly synced. Show off your skills, projects, and achievements.',
      url: process.env.NEXT_PUBLIC_BASE_URL,
      images: [
        {
          url: '/ogimage.png',
          width: 1200,
          height: 630,
          alt: `${process.env.NEXT_PUBLIC_APP_NAME}'s OpenGraph Image`,
        },
      ],
      siteName: process.env.NEXT_PUBLIC_APP_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title: process.env.NEXT_PUBLIC_APP_NAME,
      description:
        'One platform. Your resume and portfolio, perfectly synced. Show off your skills, projects, and achievements.',
      images: ['/ogimage.png'],
    },
  };
}

export default function Home() {
  return <HomePage />;
}
