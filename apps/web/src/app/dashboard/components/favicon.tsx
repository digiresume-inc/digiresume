'use client';
import { ToastError, ToastSuccess } from '@/components/general/toast';
import { createClient } from '@/supabase/client';
import { Button } from '@dr/ui/components/base/button';
import React, { useState } from 'react';
import { Pencil, GlobeLock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Loader from '@/components/general/loader';

const FaviconUploader = ({ favicon_url }: { favicon_url: string }) => {
  const supabase = createClient();
  const [faviconUrl, setFaviconUrl] = useState(favicon_url);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

      if(!user) {
        return;
      }

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
      router.refresh();
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
    <div className="col-span-2 md:col-span-1 lg:h-[235px] rounded-2xl flex flex-col items-center justify-start p-6 bg-secondary shadow-md border border-border">
      <h3 className="text-sm lg:text-lg font-semibold text-foreground mb-3">Your Favicon</h3>

      {isLoading ? (
        <div className="transition-all w-18 lg:w-24 aspect-square rounded-lg border-2 flex items-center justify-center border-dashed border-foreground/30 bg-muted opacity-80">
          <Loader className="w-6 h-6 text-foreground/60" />
        </div>
      ) : faviconUrl ? (
        <div className="relative">
          <Image
            width={96}
            height={96}
            src={faviconUrl}
            alt="Favicon"
            className="w-18 lg:w-24 h-18 lg:h-24 rounded-full object-contain border-2 border-muted/30 bg-white"
          />
          <Button
            onClick={() => {
              if (!isLoading) document.getElementById('favInput')?.click();
            }}
            disabled={isLoading}
            size="icon"
            className="absolute top-[-4px] right-[-4px] z-10 rounded-full text-primary-foreground"
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
          className={`cursor-pointer transition-all w-18 lg:w-24 aspect-square rounded-lg border-2 flex items-center justify-center ${
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
      <p className="text-xxs text-muted-foreground mt-3 text-center">Max size: 1 MB</p>
      <p className="text-xxs text-muted-foreground mt-1 text-center">
        Only .ico files are accepted
      </p>
    </div>
  );
};

export default FaviconUploader;
