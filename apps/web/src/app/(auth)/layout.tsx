import { FlipWords } from '@/components/homepage/flipword';
import { cn } from '@dr/ui/lib/utils';
import React from 'react';
import Image from 'next/image';

const words = [
  'Build ',
  'Share ',
  'Connect ',
  'Create ',
  'Collaborate ',
  'Showcase ',
  'Grow ',
  'Inspire ',
  'Innovate ',
  'Elevate ',
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen relative overflow-hidden">
      <div className="absolute inset-0 z-[-1]">
        <div
          className={cn(
            'absolute inset-x-0 bottom-0 h-[350px]',
            '[background-size:40px_40px]',
            '[background-image:linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)]',
            '[mask-image:linear-gradient(to_top,black,transparent)]',
            'dark:[mask-image:linear-gradient(to_top,black,transparent)]',
            'mask-image-[linear-gradient(to_top,black,transparent)]'
          )}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-background z-[-1]"></div>
      {children}
    </div>
  );
};

export default Layout;
