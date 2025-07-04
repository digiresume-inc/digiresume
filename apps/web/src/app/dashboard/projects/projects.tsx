'use client';
import React, { useState } from 'react';
import ProjectsDisplay from './components/projects-display';
import ProjectsPreviewComponent from './components/projects-preview';
import PreviewButton from '../components/preview-button';
import { useIsMobile } from '@dr/ui/hooks/use-mobile';

export function ProjectsClient({ projects }: { projects: any }) {
  const [preview, setPreview] = useState(false);
  const isMobile = useIsMobile();
  return (
    <div className="relative flex flex-col lg:flex-row h-screen w-full max-w-7xl mx-auto gap-4">
      <div className="lg:w-[60%] w-full h-screen px-4 py-6 no_scrollbar scrollbar-hidden overflow-y-auto">
        {isMobile && <PreviewButton setPreview={setPreview} />}
        <ProjectsDisplay projects={projects} />
      </div>
      <ProjectsPreviewComponent projects={projects} preview={preview} setPreview={setPreview} />
    </div>
  );
}
