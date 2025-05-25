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
import { startupSchema, statusOptions, categoryOptions } from '@lf/utils'; // your Zod schema
import { Startup } from '@lf/utils'; // your types
import { Switch } from '@lf/ui/components/base/switch';
import { Check, Loader2, Save } from 'lucide-react';
import { addStartup } from '../actions/addStartup';
import { ToastError, ToastSuccess } from '@/components/toast';
import { updateStartup } from '../actions/updateStartup';

type StartupFormData = z.infer<typeof startupSchema>;

export default function StartupForm({
  startup,
  actionType,
  setOpen,
}: {
  startup: Startup | null;
  actionType: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<StartupFormData>({
    resolver: zodResolver(startupSchema),
    defaultValues: startup!,
  });

  const onSubmit = async (data: StartupFormData) => {
    const result = actionType === "Add" ? await addStartup(data) : await updateStartup(data);

    if (result.success) {
      ToastSuccess({ message: result.message });
      setOpen(false);
    } else {
      ToastError({ message: result.message });
      setOpen(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1 text-sm lg:text-base text-foreground/70">Name</label>
        <Input {...register('name')} placeholder="Startup name" className="text-sm lg:text-base" />
        {errors.name && <p className="text-sm text-destructive mt-0.5">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block mb-1 text-sm lg:text-base text-foreground/70">Description</label>
        <Textarea
          {...register('description')}
          placeholder="What's your startup about?"
          className="text-sm lg:text-base"
        />
        {errors.description && (
          <p className="text-sm text-destructive mt-0.5">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm lg:text-base text-foreground/70">URL</label>
        <Input {...register('url')} placeholder="https://..." className="text-sm lg:text-base" />
        {errors.url && <p className="text-sm text-destructive mt-0.5">{errors.url.message}</p>}
      </div>

      <div>
        <label className="block mb-1 text-sm lg:text-base text-foreground/70">Revenue</label>
        <Input
          type="number"
          {...register('revenue', { valueAsNumber: true })}
          placeholder="1000"
          className="text-sm lg:text-base"
        />
        {errors.revenue && (
          <p className="text-sm text-destructive mt-0.5">{errors.revenue.message}</p>
        )}
      </div>

      <div className="flex items-center justify-center gap-2">
        <div className="w-[70%]">
          <label className="block mb-1 text-sm lg:text-base text-foreground/70">Status</label>
          <Select
            value={watch('status')}
            onValueChange={(val) => setValue('status', val as StartupFormData['status'])}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((s) => (
                <SelectItem key={s.status} value={s.status}>
                  <div className={`flex items-center gap-2 rounded p-1 ${s.color}`}>
                    <span>{s.icon}</span>
                    <span>{s.text}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.status && (
            <p className="text-sm text-destructive mt-0.5">{errors.status.message}</p>
          )}
        </div>
        <div className="w-[30%]">
          <label className="flex items-center gap-2 text-xs lg:text-base text-foreground/70">
            Show Status
          </label>
          <div className="flex p-3">
            <Switch
              checked={watch('show_status')}
              onCheckedChange={(val) => setValue('show_status', !!val)}
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm lg:text-base text-foreground/70">Category</label>
        <Select
          value={watch('category')}
          onValueChange={(val) => setValue('category', val as StartupFormData['category'])}
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

      <label className="flex items-center gap-2 cursor-pointer text-sm lg:text-base">
        <Checkbox
          checked={watch('show_on_profile')}
          onCheckedChange={(val) => setValue('show_on_profile', !!val)}
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
              Add Startup <Check />
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
