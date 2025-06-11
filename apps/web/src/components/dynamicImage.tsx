import { getImage } from '@/lib/utils/getImage';
import Image from 'next/image';

export default async function DynamicImage({
  url,
  alt,
  width,
  height,
  className,
}: {
  url: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
}) {
  const { img, base64 } = await getImage(url);

  return (
    <Image
      {...img}
      className={className || ''}
      alt={alt || 'Image'}
      width={width}
      height={height}
      placeholder="blur"
      blurDataURL={base64}
      referrerPolicy="no-referrer"
    />
  );
}
