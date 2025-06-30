'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@dr/ui/components/base/input';
import { Textarea } from '@dr/ui/components/base/textarea';
import { Button } from '@dr/ui/components/base/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@dr/ui/components/base/select';
import { Checkbox } from '@dr/ui/components/base/checkbox';
import {  categoryOptions, Project, projectSchema } from '@dr/schemas';
import { Check, Save } from 'lucide-react';
import { ToastError, ToastSuccess } from '@/components/general/toast';
import { useRouter } from 'next/navigation';
import { addProject } from '../actions/addProject';
import { updateProject } from '../actions/updateProject';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@dr/ui/components/base/hover-card';
import Loader from '@/components/general/loader';

type ProjectFormSchema = z.infer<typeof projectSchema>;

export default function ProjectForm({
  project,
  actionType,
  setOpen,
}: {
  project: Project | null;
  actionType: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ProjectFormSchema>({
    resolver: zodResolver(projectSchema),
    defaultValues: project!,
  });

  const router = useRouter();

  const onSubmit = async (data: ProjectFormSchema) => {
    const result = actionType === 'Add' ? await addProject(data) : await updateProject(data);

    if (result.success) {
      ToastSuccess({ message: result.message });
      router.refresh();
      setOpen(false);
    } else {
      ToastError({ message: result.message });
      setOpen(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1 text-sm text-foreground/70">Name</label>
        <Input {...register('name')} placeholder="Startup name" className="text-sm" />
        {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="mb-1 text-sm text-foreground/70 flex items-center gap-2">
          Description
          <HoverCard openDelay={250}>
            <HoverCardTrigger className="text-xs font-medium text-lightprimary-text dark:text-primary-text cursor-pointer">
              <span className="underline cursor-pointer text-card-foreground/80">
                (*Markdown Guide*)
              </span>
            </HoverCardTrigger>
            <HoverCardContent className="bg-secondary border rounded-md z-50">
              <div className="flex flex-col p-2">
                <p className="text-sm font-semibold text-lightprimary-text/80 dark:text-primary-text/80">
                  Markdown guide
                </p>
                <p className="text-xs text-lightprimary-text/80 dark:text-primary-text/80 mt-2">
                  <span className="text-lightaccent-text dark:text-accent-text">**text**</span> →{' '}
                  <span className="font-bold">text</span>
                </p>
                <p className="text-xs text-lightprimary-text/80 dark:text-primary-text/80">
                  <span className="text-lightaccent-text dark:text-accent-text">*text*</span> →{' '}
                  <span className="italic">text</span>
                </p>
                <p className="text-xs text-lightprimary-text/80 dark:text-primary-text/80">
                  <span className="text-lightaccent-text dark:text-accent-text">
                    [ab](https://ab.com)
                  </span>{' '}
                  →{' '}
                  <a href="https://ab.com" target="_blank" className="font-medium underline">
                    ab
                  </a>
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </label>
        <div className="relative">
          <Textarea
            {...register('description')}
            placeholder="How crazy is your project?"
            className="text-sm pb-6"
            maxLength={200}
          />
          <p className="absolute bottom-1.5 right-3 text-xxs text-muted-foreground">
            {(watch('description') || '').length}/200
          </p>
        </div>
        {errors.description && (
          <p className="text-xs text-destructive mt-1">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm text-foreground/70">URL</label>
        <Input {...register('url')} placeholder="https://popatmatch.com" className="text-sm" />
        {errors.url && <p className="text-xs text-destructive mt-1">{errors.url.message}</p>}
      </div>

      <div>
        <label className="block mb-1 text-sm text-foreground/70">Category</label>
        <Select
          value={watch('category')}
          onValueChange={(val) => setValue('category', val as ProjectFormSchema['category'], { shouldDirty: true })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map((c) => (
              <SelectItem key={c.category} value={c.category}>
                <div className={`flex items-center gap-2 rounded p-1 ${c.color}`}>
                  <img className='w-4 h-4' src={`/startupCategory/${c.category}.png`} />
                  <span>{c.text}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-xs text-destructive mt-1">{errors.category.message}</p>
        )}
      </div>
      {/* Optional api_info */}

      <label className="flex items-center gap-2 cursor-pointer text-sm">
        <Checkbox
          checked={watch('show_on_profile')}
          onCheckedChange={(val) => setValue('show_on_profile', !!val, { shouldDirty: true })}
        />
        Show on Profile
      </label>

      <div className="flex justify-end">
        <Button disabled={!isDirty || isSubmitting} type="submit">
          {isSubmitting ? (
            <>
              <Loader />{' '}
              {actionType === 'Add' ? 'Adding...' : 'Saving...'}
            </>
          ) : actionType === 'Add' ? (
            <>
              Add Project <Check />
            </>
          ) : (
            <>
              {' '}
              Save changes <Save />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
