import { cn } from '@lf/ui/lib/utils';
import React from 'react';

const DotGradient = () => {
  return (
    <>
      <div className="absolute inset-0">
        <div
          className={cn(
            'absolute inset-x-0 bottom-0 h-[400px] lg:h-[600px]',
            '[background-size:20px_20px]',
            '[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]',
            'dark:[background-image:radial-gradient(#09090b_1px,transparent_1px)]',
            '[mask-image:linear-gradient(to_top,black,transparent)]',
            'dark:[mask-image:linear-gradient(to_top,black,transparent)]',
            'mask-image-[linear-gradient(to_top,black,transparent)]'
          )}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-background"></div>
    </>
  );
};

export default DotGradient;
