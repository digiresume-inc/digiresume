import type { Metadata } from 'next';
import './globals.css';
import { Montserrat, Bricolage_Grotesque } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Linkfolio',
  description: 'Your portfolio on web light and powerful',
};

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${bricolage.variable} montserrat`}>
        <NextTopLoader
          color="#c2a180"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #c2a180,0 0 5px #c2a180"
        />
        <Toaster richColors position="top-right" />
        {children}
      </body>
    </html>
  );
}
