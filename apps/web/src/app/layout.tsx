import type { Metadata } from 'next';
import './globals.css';
import {
  Montserrat,
  Bricolage_Grotesque,
  JetBrains_Mono,
  Merriweather,
  Sora,
} from 'next/font/google';
import { Toaster } from 'sonner';
import HolyLoader from 'holy-loader';
import { ThemeProvider } from '@/context/theme-context';

export const metadata: Metadata = {
  title: 'Digiresume',
  description: 'Build sleek online resumes and portfolio pages easily.',
};

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
});

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
});

const merriweather = Merriweather({
  variable: '--font-merriweather',
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
});

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${bricolage.variable} ${jetbrains.variable} ${merriweather.variable} ${sora.variable} sora`}
      >
        <HolyLoader
          color="#737373"
          initialPosition={0.08}
          height={3}
          showSpinner={false}
          easing="ease"
          speed={200}
          boxShadow="0 0 10px #737373,0 0 5px #737373"
        />
        <Toaster richColors position="top-right" />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
