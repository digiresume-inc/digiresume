'use client';
import React from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from 'motion/react';
import { useRef } from 'react';
import { cn } from '@dr/ui/lib/utils';
import { Eye } from 'lucide-react';

const PreviewButton = ({
  setPreview,
}: {
  setPreview: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      onClick={() => setPreview(true)}
      className="lg:hidden bottom-6 fixed left-1/2 translate-x-[-50%] z-[48]"
    >
      <div className="h-10 w-32 font-bold flex items-center justify-center rounded-lg relative overflow-hidden bg-background/70 p-[1px]">
        <div className="absolute inset-0 rounded-lg">
          <MovingBorder duration={3000} rx="30%" ry="30%">
            <div
              className={cn(
                'h-30 w-30 bg-[radial-gradient(#d8d8d8_40%,transparent_60%)] opacity-[0.8]'
              )}
            />
          </MovingBorder>
        </div>
        <div className="relative flex h-full w-full items-center rounded-lg justify-center border bg-background/80 text-sm text-foreground antialiased backdrop-blur-xl">
          <Eye strokeWidth={1} className="mr-1" />
          <p className="font-semibold text-base">Preview</p>
        </div>
      </div>
    </div>
  );
};

export const MovingBorder = ({
  children,
  duration = 7000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<any>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const path = pathRef.current;
    if (!path || typeof path.getTotalLength !== 'function') return;

    try {
      const length = path.getTotalLength();
      if (length) {
        const pxPerMillisecond = length / duration;
        progress.set((time * pxPerMillisecond) % length);
      }
    } catch (err) {
      console.warn('SVG not ready:', err);
    }
  });

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).x);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).y);

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </svg>
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'inline-block',
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PreviewButton;
