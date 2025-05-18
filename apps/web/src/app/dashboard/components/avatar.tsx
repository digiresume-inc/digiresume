'use client';
import { ImagePlus } from 'lucide-react';
import React from 'react';

const AvatarComponent = () => {
  return (
    <div className="col-span-2 lg:col-span-1 aspect-square rounded-2xl flex flex-col items-center justify-start p-6 bg-secondary shadow-md border border-border">
      <h3 className="text-base lg:text-lg font-semibold text-foreground mb-3">Your Avatar</h3>

      <div className="cursor-pointer hover:opacity-80 transition-opacity opacity-60 w-24 aspect-square bg-muted rounded-lg border-2 border-dashed border-foreground/30 flex items-center justify-center">
        <ImagePlus className="w-6 h-6 text-foreground/60" />
      </div>
      <p className="text-xs text-muted-foreground mt-3 text-center">Max size: 2MB</p>
      <p className="text-xs text-muted-foreground mt-1 text-center">Accepted: jpg, png, jpeg</p>
    </div>
  );
};

export default AvatarComponent;
