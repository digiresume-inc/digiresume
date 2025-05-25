'use client';

import React from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2, Link2, Plus, Save, Loader2 } from 'lucide-react';
import { Input } from '@lf/ui/components/base/input';
import { Button } from '@lf/ui/components/base/button';
import { socialsSchema, SocialsSchema } from '@lf/utils'; // Import your schema
import { iconMap } from '../utils/iconMap';
import { updateSocials } from '../actions/updateSocials';
import { ToastError, ToastSuccess } from '@/components/toast';
import { useRouter } from 'next/navigation';

function getPlatformIcon(url: string) {
  try {
    const host = new URL(url).hostname.replace('www.', '');
    const platform = Object.keys(iconMap).find((key) => host.includes(key.toLowerCase()));
    const Icon = iconMap[platform || ''];
    return Icon ? <Icon size={18} /> : <Link2 size={18} />;
  } catch {
    return <Link2 size={18} />;
  }
}

const SocialsUpdate = ({
  profile,
  setOpen,
}: {
  profile: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<SocialsSchema>({
    resolver: zodResolver(socialsSchema),
    defaultValues: {
      links: profile.socials,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  });

  const watchedLinks = useWatch({ control, name: 'links' });
  const router = useRouter();

  const onSubmit = async (data: SocialsSchema) => {
    const result = await updateSocials(data.links);
    if (result.success) {
      ToastSuccess({ message: result.message });
      setOpen(false);
      router.refresh();
    } else {
      ToastError({ message: result.message });
      setOpen(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        {fields.map((field, index) => {
          const url = watchedLinks?.[index]?.url || '';
          const Icon = getPlatformIcon(url);

          return (
            <div key={field.id} className="flex flex-col gap-1 w-full">
              <div className="flex items-center gap-2 w-full">
                <div className="w-6 h-6 text-foreground/60">{Icon}</div>
                <Input
                  {...register(`links.${index}.url`)}
                  placeholder="Enter social URL"
                  className="w-full text-sm"
                />
                <Button type="button" size="icon" variant="ghost" onClick={() => remove(index)}>
                  <Trash2 size={16} />
                </Button>
              </div>
              {errors.links?.[index]?.url && (
                <p className="pl-8 text-xs text-destructive mt-1">
                  {errors.links[index]?.url?.message}
                </p>
              )}
            </div>
          );
        })}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ url: '' })}
          className="w-full"
        >
          <Plus className="mr-1" /> Add More
        </Button>
      </div>

      <Button
        disabled={!isDirty || isSubmitting}
        className="ml-auto"
        variant="outline"
        type="submit"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" /> Saving...
          </>
        ) : (
          <>
            {' '}
            <Save className="mr-1" /> Save Changes
          </>
        )}
      </Button>
    </form>
  );
};

export default SocialsUpdate;
