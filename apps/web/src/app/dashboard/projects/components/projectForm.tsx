'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@lf/ui/components/base/input';
import { Textarea } from '@lf/ui/components/base/textarea';
import { Button } from '@lf/ui/components/base/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@lf/ui/components/base/select';
import { Checkbox } from '@lf/ui/components/base/checkbox';
import { startupSchema, statusOptions, categoryOptions, Project, projectSchema } from '@lf/utils'; // your Zod schema
import { Startup } from '@lf/utils'; // your types
import { Switch } from '@lf/ui/components/base/switch';
import { Check, Loader2, Save } from 'lucide-react';
import { ToastError, ToastSuccess } from '@/components/toast';
import { useRouter } from 'next/navigation';
import { addProject } from '../actions/addProject';
import { updateProject } from '../actions/updateProject';

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
        {errors.name && <p className="text-sm text-destructive mt-0.5">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block mb-1 text-sm text-foreground/70">Description</label>
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
          <p className="text-sm text-destructive mt-0.5">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm text-foreground/70">URL</label>
        <Input {...register('url')} placeholder="https://popatmatch.com" className="text-sm" />
        {errors.url && <p className="text-sm text-destructive mt-0.5">{errors.url.message}</p>}
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
                  <span>{c.icon}</span>
                  <span>{c.text}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-sm text-destructive mt-0.5">{errors.category.message}</p>
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
              <Loader2 className="animate-spin" />{' '}
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
