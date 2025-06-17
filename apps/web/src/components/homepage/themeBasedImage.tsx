'use client';
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';

type ThemeBasedImageProps = {
  images: string[];
  width: number;
  height: number;
  alt: string;
  animationVariants?: any;
  priority?: boolean;
  disableAnimation?: boolean;
  className?: string;
};

const ThemeBasedImage = ({
  images,
  width,
  height,
  alt,
  animationVariants,
  priority,
  disableAnimation = false,
  className,
}: ThemeBasedImageProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex: number) => (prevIndex + 1) % 2);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const imageElement = (
    <Image
      width={width}
      height={height}
      alt={alt}
      src={images[currentImageIndex] as string}
      priority={priority}
      className={className}
    />
  );

  if (disableAnimation) {
    return <div>{imageElement}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={images[currentImageIndex]}
        variants={animationVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.15 }}
      >
        {imageElement}
      </motion.div>
    </AnimatePresence>
  );
};

export default ThemeBasedImage;
