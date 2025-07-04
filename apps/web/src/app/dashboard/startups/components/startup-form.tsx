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
import { startupSchema, statusOptions, categoryOptions, Startup } from '@dr/schemas';
import { Switch } from '@dr/ui/components/base/switch';
import { Check, Save } from 'lucide-react';
import { addStartup } from '../actions/add-startup';
import { ToastError, ToastSuccess } from '@/components/general/toast';
import { updateStartup } from '../actions/update-startup';
import { useRouter } from 'next/navigation';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@dr/ui/components/base/hover-card';
import Loader from '@/components/general/loader';

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

  const router = useRouter();

  const onSubmit = async (data: StartupFormData) => {
    const result = actionType === 'Add' ? await addStartup(data) : await updateStartup(data);

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
        <label className="block mb-1 text-xs lg:text-sm text-foreground/70">Name</label>
        <Input {...register('name')} placeholder="Startup name" className="text-xs lg:text-sm" />
        {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="mb-1 text-xs lg:text-sm text-foreground/70 flex items-center gap-2">
          Description
          <HoverCard openDelay={250}>
            <HoverCardTrigger className="text-xs font-medium text-lightprimary-text dark:text-primary-text cursor-pointer">
              <span className="underline cursor-pointer text-card-foreground/80">
                (*Markdown Guide*)
              </span>
            </HoverCardTrigger>
            <HoverCardContent className="bg-secondary border rounded-md z-50">
              <div className="flex flex-col p-2">
                <p className="text-xs lg:text-sm font-semibold text-lightprimary-text/80 dark:text-primary-text/80">
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
                    [tmkoc](https://tmkoc.com)
                  </span>{' '}
                  →{' '}
                  <a href="https://tmkoc.com" target="_blank" className="font-medium underline">
                    tmkoc
                  </a>
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </label>
        <div className="relative">
          <Textarea
            {...register('description')}
            placeholder="How crazy is your startup?"
            className="text-xs lg:text-sm pb-6"
            maxLength={300}
          />
          <p className="absolute bottom-1.5 right-3 text-xxs text-muted-foreground">
            {(watch('description') || '').length}/300
          </p>
        </div>
        {errors.description && (
          <p className="text-xs text-destructive mt-1">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-xs lg:text-sm text-foreground/70">URL</label>
        <Input
          {...register('url')}
          placeholder="https://popatmatch.com"
          className="text-xs lg:text-sm"
        />
        {errors.url && <p className="text-xs text-destructive mt-1">{errors.url.message}</p>}
      </div>

      <div>
        <label className="block mb-1 text-xs lg:text-sm text-foreground/70">
          Estimated Revenue
        </label>
        <Input
          type="number"
          {...register('revenue', { valueAsNumber: true })}
          placeholder="Estimated startup revenue"
          className="text-xs lg:text-sm"
        />
        {errors.revenue && (
          <p className="text-xs text-destructive mt-1">{errors.revenue.message}</p>
        )}
      </div>

      <div className="flex items-center justify-center gap-2">
        <div className="w-[70%] lg:w-[80%]">
          <label className="block mb-1 text-xs lg:text-sm text-foreground/70">Status</label>
          <Select
            value={watch('status')}
            onValueChange={(val) =>
              setValue('status', val as StartupFormData['status'], { shouldDirty: true })
            }
          >
            <SelectTrigger className="w-full text-xs lg:text-sm">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((s) => (
                <SelectItem
                  className="data-[state=checked]:bg-background/30"
                  key={s.status}
                  value={s.status}
                >
                  <div className={`flex items-center gap-2 rounded p-1 ${s.color}`}>
                    <img className="w-4 h-4" src={`/startupStatus/${s.status}.png`} />
                    <span>{s.text}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.status && (
            <p className="text-xs text-destructive mt-1">{errors.status.message}</p>
          )}
        </div>
        <div className="w-[30%] lg:w-[20%]">
          <label className="flex items-center gap-2 text-xs lg:text-sm text-foreground/70">
            Show Status
          </label>
          <div className="flex p-3">
            <Switch
              checked={watch('show_status')}
              onCheckedChange={(val) => setValue('show_status', !!val, { shouldDirty: true })}
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block mb-1 text-xs lg:text-sm text-foreground/70">Category</label>
        <Select
          value={watch('category')}
          onValueChange={(val) =>
            setValue('category', val as StartupFormData['category'], { shouldDirty: true })
          }
        >
          <SelectTrigger className="w-full text-xs lg:text-sm">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map((c) => (
              <SelectItem
                className="data-[state=checked]:bg-background/30"
                key={c.category}
                value={c.category}
              >
                <div className={`flex items-center gap-2 rounded p-1 ${c.color}`}>
                  <img className="w-4 h-4" src={`/startupCategory/${c.category}.png`} />
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

      <label className="flex items-center gap-2 cursor-pointer text-xs lg:text-sm">
        <Checkbox
          checked={watch('show_on_profile')}
          onCheckedChange={(val) => setValue('show_on_profile', !!val, { shouldDirty: true })}
        />
        Show on Profile
      </label>

      <div className="w-full mt-2">
        <Button disabled={!isDirty || isSubmitting} type="submit" className="w-full">
          {isSubmitting ? (
            <>
              <Loader /> {actionType === 'Add' ? 'Adding...' : 'Saving...'}
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
