'use client';
import { Themes } from '@dr/utils';
import React, { useState } from 'react';
import { updateTheme } from '../actions/updateTheme';
import { ToastError, ToastSuccess } from '@/components/general/toast';
import Image from 'next/image';
import { cn } from '@dr/ui/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@dr/ui/components/base/dialog';
import { updateTemplate } from '../actions/updateTemplate';
import AdditionalInfoForm from '@/templates/additionalInfoForm';
import { Button } from '@dr/ui/components/base/button';
import { Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Tooltip, TooltipContent, TooltipTrigger } from '@dr/ui/components/base/tooltip';

import type { TemplateInfo, Theme } from '@/lib/types/supabasetypes';
import Loader from '@/components/general/loader';

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
  const [templateUpdating, setTemplateUpdating] = useState<{
    loading: boolean;
    templateType: KnownTemplates;
  }>({ loading: false, templateType: 'default' });
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
      return;
    }
    if (templateUpdating.loading) return;
    const data = templateInfo.templates[templateType];
    if (!data) {
      setFormType(templateType);
      setOpen(true);
      return;
    } else {
      setTemplateUpdating({ loading: true, templateType: templateType });
      const res = await updateTemplate(templateType, templateInfo);
      if (!res.success) {
        setTemplateUpdating({ loading: false, templateType: templateType });
        ToastError({ message: res.message });
        return;
      }
      if (res.success) {
        setTemplateUpdating({ loading: false, templateType: templateType });
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
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full px-4 lg:px-8 gap-4 items-start">
          <div className="flex flex-col gap-3 items-center justify-center col-span-1">
            <div className="relative">
              <Image
                height={1080}
                width={1920}
                onClick={() =>
                  handleTemplateSwitch({ templateInfo: templateInfo, templateType: 'default' })
                }
                className={cn(
                  'w-full lg:h-38 object-cover rounded-lg border cursor-pointer',
                  templateInfo.activeTemplate === 'default'
                    ? 'ring-2 ring-ring ring-offset-2 ring-offset-background opacity-100'
                    : 'opacity-70',
                  templateUpdating.loading && templateUpdating.templateType === 'default'
                    ? 'opacity-70'
                    : 'opacity-100'
                )}
                src="/templatepreviews/default.png"
                alt="Grid Single Preview"
              />
              {templateUpdating.loading && templateUpdating.templateType === 'default' && (
                <Loader className="absolute top-1/2 right-1/2 w-16 h-16 translate-x-1/2 -translate-y-1/2 opacity-70" />
              )}
            </div>
            <div
              className={cn(
                'grid grid-cols-8 gap-2 w-full',
                templateInfo.activeTemplate === 'default'
                  ? 'opacity-100'
                  : 'opacity-60 cursor-not-allowed'
              )}
            >
              {Themes.map((t, index) => {
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
                      if(templateUpdating.loading){
                        ToastError({message: "Hold on for a sec."});
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
          <div className="flex flex-col gap-3 items-center justify-center col-span-1 relative">
            <div className="relative">
              <Image
                height={1080}
                width={1920}
                onClick={() =>
                  handleTemplateSwitch({ templateInfo: templateInfo, templateType: 'grid-single' })
                }
                className={cn(
                  'w-full lg:h-38 object-cover rounded-lg border cursor-pointer',
                  templateInfo.activeTemplate === 'grid-single'
                    ? 'ring-2 ring-ring ring-offset-2 ring-offset-background opacity-100'
                    : 'opacity-70',
                  templateUpdating.loading && templateUpdating.templateType === 'grid-single'
                    ? 'opacity-70'
                    : 'opacity-100'
                )}
                src="/templatepreviews/grid-single.png"
                alt="Grid Single Preview"
              />
              {templateUpdating.loading && templateUpdating.templateType === 'grid-single' && (
                <Loader className="absolute top-1/2 right-1/2 w-16 h-16 translate-x-1/2 -translate-y-1/2 opacity-70" />
              )}
            </div>
            <div className="flex flex-wrap justify-start gap-2 text-xs w-full text-foreground/70">
              <p className="break-words">
                ⭐ Single page grid template ⭐ Github extensive template ⭐ Showcase Startups &
                Projects
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
            <DialogTitle>
              {actionType === 'add' ? 'Additional Info Required' : 'Edit Additional Info'}
            </DialogTitle>
          </DialogHeader>
          <AdditionalInfoForm
            actionType={actionType}
            formType={formType}
            templateInfo={templateInfo}
            setModalOpen={setOpen}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TemplateSelect;
