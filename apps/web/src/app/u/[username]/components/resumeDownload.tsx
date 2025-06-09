'use client';
import { Button } from '@lf/ui/components/base/button';
import { hexToHSL } from '@lf/utils';
import { Download } from 'lucide-react';
import React from 'react';

const ResumeDownload = ({ t }: { t: any }) => {
  return (
    <Button
      variant={'outline'}
      size={'icon'}
      onClick={() => {
        window.print();
      }}
      style={
        {
          '--text-color': t.foreground,
          '--border-color': hexToHSL(t.primary, 0.6),
          '--hover-background': t.secondary,
        } as React.CSSProperties
      }
      className="absolute top-0 lg:top-4 right-16 lg:right-36 !bg-transparent hover:!bg-[var(--hover-background)] !text-[var(--text-color)] !border-[var(--border-color)]"
    >
      <Download />
    </Button>
  );
};

export default ResumeDownload;
