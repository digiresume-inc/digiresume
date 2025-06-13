'use client';
import MarkdownParser from '@/components/general/markdownparser';
import { Button } from '@dr/ui/components/base/button';
import { categoryOptions, Project } from '@dr/schemas';
import { BatteryLow, SignalMedium, X } from 'lucide-react';
import React, { useState } from 'react';
import { cn } from '@dr/ui/lib/utils';

const ProjectsPreviewComponent = ({
  projects,
  preview,
  setPreview,
}: {
  projects: any;
  preview: boolean;
  setPreview: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

  return (
    <div
      className={cn(
        'lg:flex lg:w-[40%] w-full h-screen p-4 fixed top-0 left-0 lg:static bg-background backdrop-blur z-50',
        {
          flex: preview,
          hidden: !preview,
        }
      )}
    >
      <Button
        onClick={() => setPreview(false)}
        className="flex lg:hidden absolute top-4 right-4"
        size={'icon'}
        variant={'outline'}
      >
        <X />
      </Button>
      <div className="flex flex-col w-full items-center justify-center gap-4 scale-90 lg:scale-100">
        <h2 className="text-lg lg:text-2xl font-bold">Preview</h2>
        <div className="relative w-[300px] h-[620px] rounded-[50px] bg-black shadow-2xl border-[14px] border-black flex items-center justify-center">
          {/* Dynamic Island (move out of overflow-hidden) */}
          <div className="absolute top-[-5px] left-1/2 -translate-x-1/2 bg-black rounded-t-2xl rounded-b-4xl w-[130px] h-[25px] z-20"></div>

          {/* Status Icons (Top Right) */}
          <div className="absolute top-1 right-8 flex z-30">
            <BatteryLow size={16} />
          </div>
          <div className="absolute top-[1px] right-12 flex items-center gap-2 z-30">
            <SignalMedium size={16} />
          </div>

          <div className="absolute top-1 left-8 flex items-center gap-2 z-30 text-xs">9:41</div>

          {/* Side Buttons */}
          <div className="absolute left-[-16px] top-[100px] w-[4px] h-[40px] rounded-full bg-black z-20"></div>
          <div className="absolute left-[-16px] top-[160px] w-[4px] h-[40px] rounded-full bg-black z-20"></div>
          <div className="absolute right-[-16px] top-[130px] w-[4px] h-[60px] rounded-full bg-black z-20"></div>

          {/* iPhone Screen */}
          <div className="w-[270px] h-[590px] bg-secondary rounded-[36px] overflow-y-auto z-10 py-4 scrollbar-hidden no_scrollbar">
            <div className="p-4 space-y-2">
              {projects.map((project: Project, index: number) => (
                <div
                  key={index}
                  className="w-full bg-card rounded-lg border border-primary/30 h-fit px-3 py-2 flex flex-col gap-2 items-start justify-center"
                >
                  <div className="flex items-center justify-center gap-2">
                    <img
                      src={`https://www.google.com/s2/favicons?sz=128&domain_url=${project.url}`}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex flex-col items-start justify-center gap-1">
                      <p className="text-xs font-semibold">{project.name}</p>
                      <div className="flex gap-2 items-center justify-start w-full">
                        {(() => {
                          const currentCategory = categoryOptions.find(
                            (s) => s.category === project.category
                          );
                          return currentCategory ? (
                            <span
                              className={`flex items-center gap-0.5 px-1 py-0.5 rounded-full text-tiny bg-secondary`}
                            >
                              <span>{currentCategory.icon}</span>
                              <span>{currentCategory.text}</span>
                            </span>
                          ) : (
                            <span className="flex items-center gap-0.5 px-1 py-0.5 rounded-full text-tiny bg-secondary">
                              {project.category}
                            </span>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-px bg-primary/30" />
                  <div className="text-xxs font-medium">
                    <span className="line-clamp-3">
                      {' '}
                      <MarkdownParser text={project.description} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPreviewComponent;
