'use client';
import { ToastError, ToastSuccess } from '@/components/general/toast';
import { createClient } from '@/supabase/client';
import { Button } from '@lf/ui/components/base/button';
import React, { useState } from 'react';
import { Pencil, ImagePlus, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const AvatarComponent = ({ avatar_url }: { avatar_url: string }) => {
  const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = useState(avatar_url);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleFile = async (file: File) => {
    if (file.size > 2 * 1024 * 1024) {
      ToastError({ message: 'File size exceeds 2MB limit.' });
      return;
    }

    setIsLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        return;
      }

      if (avatar_url) {
        const oldFilePath = avatar_url.split(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/userimages/`
        )[1];

        if (oldFilePath) {
          await supabase.storage.from('userimages').remove([`${oldFilePath}`]);
        }
      }

      const fileExt = file.name.split('.').pop();
      const filePath = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('userimages')
        .upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('userimages').getPublicUrl(filePath);

      await supabase
        .from('profiles')
        .update({
          avatar_url: data.publicUrl,
        })
        .eq('id', user.id);

      setAvatarUrl(data.publicUrl);
      router.refresh();
      ToastSuccess({ message: 'Image uploaded.' });
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
    if (file && file.type.startsWith('image/')) {
      handleFile(file);
    } else {
      ToastError({ message: 'Invalid file type. Please upload an image.' });
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
      <h3 className="text-sm lg:text-lg font-semibold text-foreground mb-3">Your Avatar</h3>

      {isLoading ? (
        <div
          className={`transition-all w-18 lg:w-24 aspect-square rounded-lg border-2 flex items-center justify-center border-dashed border-foreground/30 bg-muted opacity-80`}
        >
          <Loader2 className="w-6 h-6 text-foreground/60 animate-spin" />
        </div>
      ) : avatarUrl ? (
        <div className="relative">
          <Image
            width={96}
            height={96}
            src={avatarUrl}
            alt="Avatar"
            className="w-18 lg:w-24 h-18 lg:h-24 rounded-2xl object-cover border-2 border-muted/30"
            referrerPolicy="no-referrer"
          />
          <Button
            onClick={() => {
              if (!isLoading) document.getElementById('fileInput')?.click();
            }}
            disabled={isLoading}
            size="icon"
            className="absolute top-[-12px] right-[-12px] z-10 rounded-full text-primary-foreground"
          >
            <Pencil />
          </Button>
        </div>
      ) : (
        <div
          onClick={() => document.getElementById('fileInput')?.click()}
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
          <ImagePlus className="w-6 h-6 text-foreground/60" />
        </div>
      )}

      <input
        type="file"
        name="picture"
        id="fileInput"
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <p className="text-xxs text-muted-foreground mt-3 text-center">Max size: 2 MB</p>
      <p className="text-xxs text-muted-foreground mt-1 text-center">Accepted: jpg, png, jpeg</p>
    </div>
  );
};

export default AvatarComponent;
