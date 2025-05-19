'use client';
import { ToastError, ToastSuccess } from '@/components/toast';
import { createClient } from '@/supabase/client';
import { Button } from '@lf/ui/components/base/button';
import React, { useEffect, useState } from 'react';
import { Pencil, ImagePlus, Loader2, GlobeLock } from 'lucide-react';

const FaviconUploader = ({ favicon_url }: { favicon_url: string }) => {
  const supabase = createClient();
  const [faviconUrl, setFaviconUrl] = useState(favicon_url);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFile = async (file: File) => {
    if (file.size > 2 * 1024 * 1024) {
      ToastError({ message: 'File size exceeds 2MB limit.' });
      return;
    }

    if (!file.name.endsWith('.ico')) {
      ToastError({ message: 'Invalid file type. Only .ico files are accepted.' });
      return;
    }

    setIsLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (favicon_url) {
        const oldFilePath = favicon_url.split(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/userfavicons/`
        )[1];

        if (oldFilePath) {
          await supabase.storage.from('userfavicons').remove([oldFilePath]);
        }
      }

      const filePath = `${Date.now()}.ico`;

      const { error: uploadError } = await supabase.storage
        .from('userfavicons')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('userfavicons').getPublicUrl(filePath);

      await supabase
        .from('profiles')
        .update({
          favicon_url: data.publicUrl,
        })
        .eq('id', user?.id);

      setFaviconUrl(data.publicUrl);
      ToastSuccess({ message: 'Favicon uploaded.' });
    } catch (error) {
      ToastError({ message: 'An unexpected error occurred.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      handleFile(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (!file) return;

    if (file.name.endsWith('.ico')) {
      handleFile(file);
    } else {
      ToastError({ message: 'Invalid file type. Only .ico files are accepted.' });
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="col-span-2 md:col-span-1 aspect-square rounded-2xl flex flex-col items-center justify-start p-6 bg-secondary shadow-md border border-border">
      <h3 className="text-base lg:text-lg font-semibold text-foreground mb-3">Your Favicon</h3>

      {isLoading ? (
        <div className="transition-all w-24 aspect-square rounded-lg border-2 flex items-center justify-center border-dashed border-foreground/30 bg-muted opacity-80">
          <Loader2 className="w-6 h-6 text-foreground/60 animate-spin" />
        </div>
      ) : faviconUrl ? (
        <div className="relative">
          <img
            src={faviconUrl}
            alt="Favicon"
            className="w-24 h-24 rounded-full object-contain border-2 border-muted/30 bg-white"
          />
          <Button
            onClick={() => {
              if (!isLoading) document.getElementById('favInput')?.click();
            }}
            disabled={isLoading}
            size="icon"
            className="absolute top-[-2px] right-[-2px] z-10 rounded-full"
          >
            <Pencil />
          </Button>
        </div>
      ) : (
        <div
          onClick={() => document.getElementById('favInput')?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          aria-disabled={isLoading}
          role="button"
          tabIndex={0}
          className={`cursor-pointer transition-all w-24 aspect-square rounded-lg border-2 flex items-center justify-center ${
            isDragging
              ? 'border-primary/80 bg-primary/60 opacity-100'
              : 'border-dashed border-foreground/30 bg-muted opacity-60 hover:opacity-80'
          }`}
        >
          <GlobeLock className="w-6 h-6 text-foreground/60" />
        </div>
      )}

      <input
        type="file"
        name="favicon"
        id="favInput"
        onChange={handleFileChange}
        accept=".ico"
        className="hidden"
      />
      <p className="text-xs text-muted-foreground mt-3 text-center">Max size: 2MB</p>
      <p className="text-xs text-muted-foreground mt-1 text-center">Only .ico files are accepted</p>
    </div>
  );
};

export default FaviconUploader;
