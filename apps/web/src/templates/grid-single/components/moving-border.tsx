"use client";
import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";
import { cn } from "@dr/ui/lib/utils";

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Component
      className={cn(
        "relative overflow-hidden bg-transparent p-[1px] text-xl",
        containerClassName
      )}
      style={{ borderRadius }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "size-20 bg-[radial-gradient(#a290fc_40%,transparent_60%)] opacity-[0.8]",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border bg-background text-sm text-foreground antialiased backdrop-blur-xl overflow-hidden",
          className
        )}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <div className="absolute inset-0 z-0">
          <AnimatedDotBackground />
        </div>
        <span className="relative z-10 flex gap-1">{children}</span>
      </div>
    </Component>
  );
}

const AnimatedDotBackground = () => {
  return (
    <div className="absolute inset-0 opacity-60">
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/60 via-primary/80 to-blue-500/60"
        style={{
          backgroundImage: `
              radial-gradient(circle at 25% 25%, #3b82f6 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, #8b5cf6 1px, transparent 1px),
              radial-gradient(circle at 25% 75%, #a855f7 1px, transparent 1px),
              radial-gradient(circle at 75% 25%, #3b82f6 1px, transparent 1px)
            `,
          backgroundSize: "20px 20px, 25px 25px, 30px 30px, 15px 15px",
          animation:
            "dotMove 8s linear infinite, dotFade 4s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
              radial-gradient(circle at 50% 50%, #8b5cf6 0.5px, transparent 0.5px),
              radial-gradient(circle at 0% 100%, #3b82f6 0.5px, transparent 0.5px)
            `,
          backgroundSize: "12px 12px, 18px 18px",
          animation:
            "dotMove2 6s linear infinite reverse, dotPulse 3s ease-in-out infinite",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
    </div>
  );
};

export const MovingBorder = ({
  children,
  duration = 3000,
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
  const pathRef = useRef<SVGRectElement | null>(null);
  const progress = useMotionValue<number>(0);
  const [pathReady, setPathReady] = useState(false);

  useEffect(() => {
    if (pathRef.current) {
      try {
        const length = pathRef.current.getTotalLength?.();
        if (length && !isNaN(length)) {
          setPathReady(true);
        }
      } catch (err) {
        setPathReady(false);
        console.warn("Path init error:", err);
      }
    }
  }, []);

  useAnimationFrame((time) => {
    if (!pathRef.current || !pathReady) return;

    try {
      const length = pathRef.current.getTotalLength();
      if (!length || isNaN(length)) return;

      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    } catch (err) {
      console.warn("Animation error:", err);
    }
  });

  const x = useTransform(progress, (val) => {
    try {
      return pathReady && pathRef.current
        ? pathRef.current.getPointAtLength(val).x
        : 0;
    } catch {
      return 0;
    }
  });

  const y = useTransform(progress, (val) => {
    try {
      return pathReady && pathRef.current
        ? pathRef.current.getPointAtLength(val).y
        : 0;
    } catch {
      return 0;
    }
  });

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
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      {pathReady && (
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            display: "inline-block",
            transform,
          }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
};
