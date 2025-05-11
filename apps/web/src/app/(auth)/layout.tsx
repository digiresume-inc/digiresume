import { FlipWords } from '@/components/flipword';
import { cn } from '@lf/ui/lib/utils';
import React from 'react';

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
            '[background-size:20px_20px]',
            '[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]',
            'dark:[background-image:radial-gradient(#09090b_1px,transparent_1px)]',
            '[mask-image:linear-gradient(to_top,black,transparent)]',
            'dark:[mask-image:linear-gradient(to_top,black,transparent)]',
            'mask-image-[linear-gradient(to_top,black,transparent)]'
          )}
        />
        <div className="opacity-50 hidden lg:block">
          <FlipWords
            className="absolute top-1/4 right-1/12 text-5xl font-bold bricolage"
            words={words}
            duration={2000}
          />
        </div>
        <img
          className="absolute opacity-70 bottom-[-100px] right-0 hidden lg:block"
          src="/test/linkfolio_vertical_login.png"
        />
      </div>
      {children}
    </div>
  );
};

export default Layout;
