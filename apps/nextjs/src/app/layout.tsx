import type { Metadata } from 'next';
import './globals.css';
import { Montserrat, Bricolage_Grotesque } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Linkfolio',
  description: 'Your portfolio on web light and powerful',
};

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${bricolage.variable} montserrat`}>{children}</body>
    </html>
  );
}
