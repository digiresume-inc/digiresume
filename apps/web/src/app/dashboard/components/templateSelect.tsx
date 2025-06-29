'use client';
import { Themes, Themes1 } from '@dr/utils';
import React, { useState } from 'react';
import { updateTheme } from '../actions/updateTheme';
import { ToastError, ToastSuccess } from '@/components/general/toast';
import Image from 'next/image';

import type { TemplateInfo, Theme } from '@/lib/types/supabasetypes';
import { cn } from '@dr/ui/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@dr/ui/components/base/dialog';
import GridSingleForm from '@/templates/grid-single/forms/grid-single-form';
import { updateTemplate } from '../actions/updateTemplate';
import AdditionalInfoForm from '@/templates/additionalInfoForm';
import { Button } from '@dr/ui/components/base/button';
import { Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Tooltip, TooltipContent, TooltipTrigger } from '@dr/ui/components/base/tooltip';

const TemplateSelect = ({
  localTheme,
  setLocalTheme,
  templateInfo,
}: {
  localTheme: Theme;
  setLocalTheme: React.Dispatch<React.SetStateAction<Theme>>;
  templateInfo: TemplateInfo;
}) => {
  const [updating, setUpdating] = useState(false);
  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState<KnownTemplates>('default');
  const [actionType, setActionType] = useState<'add' | 'edit'>('add');
  const router = useRouter();

  type KnownTemplates = keyof TemplateInfo['templates'];

  const handleTemplateSwitch = async ({
    templateType,
    templateInfo,
  }: {
    templateType: KnownTemplates;
    templateInfo: TemplateInfo;
  }) => {
    if (templateInfo.activeTemplate === templateType) {
      ToastError({ message: 'true active is same' });
      return;
    }
    const data = templateInfo.templates[templateType];
    if (!data) {
      setFormType(templateType);
      setOpen(true);
      return;
    } else {
      const res = await updateTemplate(templateType, templateInfo);
      if (!res.success) {
        ToastError({ message: res.message });
        return;
      }
      if (res.success) {
        ToastSuccess({ message: res.message });
        router.refresh();
        return;
      }
    }
  };

  async function handleThemeChange(localTheme: Theme) {
    setUpdating(true);
    const result = await updateTheme(localTheme);
    if (result.success) {
      setLocalTheme(localTheme);
      ToastSuccess({ message: result.message });
    } else {
      ToastError({ message: result.message });
    }
    setUpdating(false);
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* {['default', 'light', 'dark'].map((type) => (
        <div key={type} className="mb-4 px-6 flex flex-col gap-2">
          <h3 className="text-foreground/80 text-sm font-semibold capitalize mb-2">{type}</h3>
          <div className="flex flex-wrap gap-4">
            {Themes.filter((t) => t.theme_type === type).map((t: Theme) => (
              <div key={t.id} className="flex items-center p-2">
                <input
                  id={`radio-${t.id}`}
                  aria-describedby={`radio-text-${t.id}`}
                  type="radio"
                  name="colorPalette"
                  checked={localTheme.id === Number(t.id)}
                  onChange={() => handleThemeChange(t)}
                  value={t.theme_type}
                  className="w-4 h-4 bg-gray-100 mr-2"
                  disabled={updating}
                />
                <label
                  htmlFor={`radio-${t.id}`}
                  className="flex rounded-lg overflow-hidden w-32 h-12 border border-lightsecondary-border dark:border-0"
                >
                  <div>{t.id}</div>
                  <div
                    className="w-[45%] h-full"
                    style={{ backgroundColor: t.theme_data.background }}
                  ></div>
                  <div
                    className="w-[30%] h-full"
                    style={{ backgroundColor: t.theme_data.secondary }}
                  ></div>
                  <div
                    className="w-[15%] h-full"
                    style={{ backgroundColor: t.theme_data.foreground }}
                  ></div>
                  <div
                    className="w-[10%] h-full"
                    style={{ backgroundColor: t.theme_data.primary }}
                  ></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      ))} */}
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full px-8 gap-4 items-start">
          <div className="flex flex-col gap-2 items-center justify-center col-span-1">
            <Image
              height={1080}
              width={1920}
              onClick={() =>
                handleTemplateSwitch({ templateInfo: templateInfo, templateType: 'default' })
              }
              className={cn(
                'w-full object-cover rounded-lg border cursor-pointer',
                templateInfo.activeTemplate === 'default' &&
                  'ring-2 ring-ring ring-offset-2 ring-offset-background'
              )}
              src="/templatepreviews/default.png"
              alt="Grid Single Preview"
            />
            <div
              className={cn(
                'grid grid-cols-8 gap-2 w-full',
                templateInfo.activeTemplate === 'default'
                  ? 'opacity-100'
                  : 'opacity-60 cursor-not-allowed'
              )}
            >
              {Themes1.map((t, index) => {
                const isSelected = localTheme.id === t.id;
                const isTemplateActive = templateInfo.activeTemplate === 'default';
                return (
                  <button
                    key={index}
                    onClick={() => {
                      if (updating || isSelected || !isTemplateActive) {
                        ToastError({ message: 'Please select Template first.' });
                        return;
                      }
                      handleThemeChange(t);
                    }}
                    disabled={updating}
                    aria-label={`Select theme ${t.id}`}
                    className={cn(
                      'flex cursor-pointer aspect-square h-full w-full col-span-1 rounded-full overflow-hidden border-2 transition-all',
                      isSelected ? 'border-primary/90 ring-2 ring-primary' : 'border-muted',
                      updating || !isTemplateActive
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:scale-[1.05]'
                    )}
                  >
                    <div
                      className="w-[50%] h-full"
                      style={{ backgroundColor: t.theme_data.background }}
                    />
                    <div
                      className="w-[30%] h-full"
                      style={{ backgroundColor: t.theme_data.foreground }}
                    />
                    <div
                      className="w-[20%] h-full"
                      style={{ backgroundColor: t.theme_data.primary }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center col-span-1 relative">
            <Image
              height={1080}
              width={1920}
              onClick={() =>
                handleTemplateSwitch({ templateInfo: templateInfo, templateType: 'grid-single' })
              }
              className={cn(
                'w-full object-cover rounded-lg border cursor-pointer',
                templateInfo.activeTemplate === 'grid-single' &&
                  'ring-2 ring-ring ring-offset-2 ring-offset-background'
              )}
              src="/templatepreviews/grid-single.png"
              alt="Grid Single Preview"
            />
            <div className="flex flex-wrap justify-start gap-2 text-xs w-full text-foreground/70">
              <p className="break-words">
                ⭐ Single page grid template ⭐ Github extensive template ⭐ Showcase Startups &
                Porjects
              </p>
            </div>
            {templateInfo.templates['grid-single'] &&
              templateInfo.activeTemplate === 'grid-single' && (
                <Tooltip delayDuration={600}>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => {
                        setActionType('edit');
                        setFormType('grid-single');
                        setOpen(true);
                      }}
                      variant={'outline'}
                      size={'icon'}
                      className="absolute top-2 right-2"
                    >
                      <Edit />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit Additional Info</p>
                  </TooltipContent>
                </Tooltip>
              )}
          </div>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[70vh] overflow-y-auto scrollbar-hidden no_scrollbar">
          <DialogHeader className="mb-4">
            <DialogTitle>Additional Info Required</DialogTitle>
          </DialogHeader>
          <AdditionalInfoForm
            actionType={actionType}
            formType={formType}
            templateInfo={templateInfo}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TemplateSelect;
