'use client';

import React, { useState } from 'react';
import { FilePlus2, Loader2, Pencil } from 'lucide-react';
import { ToastError, ToastSuccess } from '@/components/toast';
import { createClient } from '@/supabase/client';
import { Button } from '@lf/ui/components/base/button';
import { useRouter } from 'next/navigation';

const ResumeComponent = ({ resume_url }: { resume_url: string }) => {
  const supabase = createClient();
  const [resumeUrl, setResumeUrl] = useState(resume_url);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleFile = async (file: File) => {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (!validTypes.includes(file.type)) {
      ToastError({ message: 'Invalid file type. Please upload a PDF or DOC file.' });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      ToastError({ message: 'File size exceeds 2MB limit.' });
      return;
    }

    setIsLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (resumeUrl) {
        const oldFilePath = resumeUrl.split(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/userresumes/`
        )[1];

        if (oldFilePath) {
          await supabase.storage.from('userresumes').remove([`${oldFilePath}`]);
        }
      }

      const fileExt = file.name.split('.').pop();
      const filePath = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('userresumes')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('userresumes').getPublicUrl(filePath);

      await supabase
        .from('profiles')
        .update({
          resume_url: data.publicUrl,
        })
        .eq('id', user?.id);

      setResumeUrl(data.publicUrl);
      router.refresh();
      ToastSuccess({ message: 'Resume uploaded.' });
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
    if (file) {
      handleFile(file);
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
      <h3 className="text-base lg:text-lg font-semibold text-foreground mb-3">Your Resume</h3>

      {isLoading ? (
        <div className="w-24 aspect-square rounded-lg border-2 flex items-center justify-center border-dashed border-foreground/30 bg-muted opacity-80">
          <Loader2 className="w-6 h-6 text-foreground/60 animate-spin" />
        </div>
      ) : resumeUrl ? (
        <div className="relative">
          <iframe
            src={resumeUrl}
            title="PDF Preview"
            className="w-24 h-24 rounded-lg border border-muted/30"
          />
          <Button
            onClick={() => {
              if (!isLoading) document.getElementById('resumeInput')?.click();
            }}
            disabled={isLoading}
            size="icon"
            className="absolute top-[-10px] right-[-10px] z-10 rounded-full"
          >
            <Pencil />
          </Button>
        </div>
      ) : (
        <div
          onClick={() => document.getElementById('resumeInput')?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          role="button"
          tabIndex={0}
          aria-disabled={isLoading}
          className={`cursor-pointer transition-all w-24 aspect-square rounded-lg border-2 flex items-center justify-center ${
            isDragging
              ? 'border-primary/80 bg-primary/60 opacity-100'
              : 'border-dashed border-foreground/30 bg-muted opacity-60 hover:opacity-80'
          }`}
        >
          <FilePlus2 className="w-6 h-6 text-foreground/60" />
        </div>
      )}

      <input
        type="file"
        name="resume"
        id="resumeInput"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="hidden"
      />

      <p className="text-xs text-muted-foreground mt-3 text-center">Max size: 2MB</p>
      <p className="text-xs text-muted-foreground mt-1 text-center">Accepted: pdf, doc, docx</p>
    </div>
  );
};

export default ResumeComponent;
