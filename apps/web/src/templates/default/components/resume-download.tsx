'use client';
import { Button } from '@dr/ui/components/base/button';
import { hexToHSL } from '@dr/utils';
import { Download, FileUser } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const ResumeDownload = ({ t, username }: { t: any, username: string }) => {
  return (
    <Link href={`/r/${username}`}>
      <Button
        variant={'outline'}
        size={'icon'}
        style={
          {
            '--text-color': t.foreground,
            '--border-color': hexToHSL(t.primary, 0.6),
            '--hover-background': t.secondary,
          } as React.CSSProperties
        }
        className="absolute top-0 lg:top-4 right-16 lg:right-36 !bg-transparent hover:!bg-[var(--hover-background)] !text-[var(--text-color)] !border-[var(--border-color)]"
      >
        <FileUser />
      </Button>
    </Link>
  );
};

export default ResumeDownload;
