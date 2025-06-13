'use client';
import React, { useState } from 'react';
import StartupsDisplay from './components/startupsDisplay';
import StartupsPreviewComponent from './components/startupsPreviewComponent';
import PreviewButton from '../components/previewButton';

export function StartupsClient({ startups }: { startups: any }) {
  const [preview, setPreview] = useState(false);
  return (
    <div className="relative flex flex-col lg:flex-row h-screen w-full max-w-7xl mx-auto gap-4">
      <div className="lg:w-[60%] w-full h-screen px-4 py-6 no_scrollbar scrollbar-hidden overflow-y-auto">
        <PreviewButton setPreview={setPreview} />
        <StartupsDisplay startups={startups} />
      </div>
      <StartupsPreviewComponent startups={startups} preview={preview} setPreview={setPreview} />
    </div>
  );
}
