'use client';
import React from 'react';
import Image from 'next/image';
import { useTheme } from '@/context/themeContext';

type ThemeBasedImageProps = {
  images: string[]; // [darkImage, lightImage]
  width: number;
  height: number;
  alt: string;
  priority?: boolean;
  className?: string;
};

const ThemeBasedImage = ({
  images,
  width,
  height,
  alt,
  priority,
  className,
}: ThemeBasedImageProps) => {
  const { isWhiteTheme } = useTheme();
  const currentImageIndex = isWhiteTheme ? 1 : 0;

  return (
    <div>
      <Image
        width={width}
        height={height}
        alt={alt}
        src={images[currentImageIndex] as string}
        priority={priority}
        className={className}
      />
    </div>
  );
};

export default ThemeBasedImage;
