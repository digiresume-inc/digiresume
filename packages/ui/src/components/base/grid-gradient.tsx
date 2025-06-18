import { cn } from '@dr/ui/lib/utils';

export const GridGradient = ({ className }: { className?: string }) => {
  return (
    <>
      <div className="absolute inset-0">
        <div
          className={cn(
            className,
            'absolute inset-x-0 bottom-0',
            '[background-size:40px_40px]',
            '[background-image:linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)]',
            '[mask-image:linear-gradient(to_top,black,transparent)]',
            'mask-image-[linear-gradient(to_top,black,transparent)]'
          )}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-background"></div>
    </>
  );
};
