'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { countries, profileUpdateSchema } from '@lf/utils';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { updateProfile } from '../actions/updateProfile';
import { ToastError, ToastSuccess } from '@/components/toast';
import { useRouter } from 'next/navigation';
import {
  Building2,
  IdCard,
  Link2,
  Loader2,
  Mail,
  Newspaper,
  Save,
  Type,
  University,
  User,
} from 'lucide-react';
import { Input } from '@lf/ui/components/base/input';
import { CountryCombobox } from '@/components/countryselect';
import { SkillsSelect } from '@/components/skillselect';
import { Button } from '@lf/ui/components/base/button';

const ProfileUpdate = ({ profile }: { profile: any }) => {
  const form = useForm<z.infer<typeof profileUpdateSchema>>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: profile,
  });

  const {
    control,
    formState: { isDirty, isSubmitting },
  } = form;
  const onSubmit = async (data: z.infer<typeof profileUpdateSchema>) => {
    const dirtyFields = form.formState.dirtyFields;
    const changedData: Partial<typeof data> = {};

    const extractDirty = (dirty: any, current: any, target: any) => {
      for (const key in dirty) {
        if (typeof dirty[key] === 'object' && !Array.isArray(dirty[key])) {
          target[key] = {};
          extractDirty(dirty[key], current[key], target[key]);
        } else {
          target[key] = current[key];
        }
      }
    };
    extractDirty(dirtyFields, data, changedData);
    const result = await updateProfile(data);

    if (result.success) {
      ToastSuccess({ message: result.message });
      router.refresh();
    } else {
      ToastError({ message: result.message });
    }
  };

  const router = useRouter();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <div className="flex flex-col items-start justify-center border p-3 lg:p-4 rounded-lg w-full mt-4">
        <p className="text-lg font-semibold mb-4">Profile</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-card-foreground/70 px-1 mb-0.5">
              Username
            </label>
            <div className="relative">
              <span className="absolute top-[53%] -translate-y-1/2 left-3 flex items-center">
                <IdCard strokeWidth={1} size={18} />
              </span>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                autoComplete="off"
                value={profile.username}
                className="focus:ring-0 focus-visible:ring-0 focus-visible:border-accent focus:oultine-none cursor-not-allowed pl-9 py-2 text-sm"
                readOnly
              />
            </div>
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-card-foreground/70 px-1 mb-0.5">
              Email
            </label>
            <div className="relative">
              <span className="absolute top-[53%] -translate-y-1/2 left-3 flex items-center">
                <Mail strokeWidth={1} size={18} />
              </span>
              <Input
                id="email"
                type="email"
                placeholder="Email address"
                autoComplete="off"
                value={profile.email}
                className="focus:ring-0 focus-visible:ring-0 focus-visible:border-accent focus:oultine-none cursor-not-allowed pl-9 py-2 text-sm"
                readOnly
              />
            </div>
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-card-foreground/70 px-1 mb-0.5">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute top-[53%] -translate-y-1/2 left-3 flex items-center">
                <User strokeWidth={1} size={18} />
              </span>
              <Input
                id="full_name"
                type="text"
                placeholder="Full name"
                autoComplete="off"
                {...form.register('full_name')}
                className="pl-9 py-2 text-sm"
              />
            </div>
            {form.formState.errors.full_name && (
              <p className="text-xs lg:text-sm text-destructive mt-1">
                {form.formState.errors.full_name.message}
              </p>
            )}
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-card-foreground/70 px-1 mb-0.5">
              Country
            </label>
            <Controller
              name="country"
              control={control}
              rules={{ required: 'Country is required' }}
              render={({ field }) => (
                <div>
                  <CountryCombobox
                    options={countries}
                    value={field.value}
                    onChange={field.onChange}
                    ref={field.ref}
                    className="bg-background"
                  />
                </div>
              )}
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-card-foreground/70 px-1 mb-0.5">
              Headline
            </label>
            <div className="relative">
              <span className="absolute top-[53%] -translate-y-1/2 left-3 flex items-center">
                <Newspaper strokeWidth={1} size={18} />
              </span>
              <Input
                id="headline"
                placeholder="Full Stack Dev | Data Engineer ..."
                className="col-span-1 lg:col-span-2 text-sm pl-9 py-2"
                {...form.register('headline')}
              />
            </div>
            {form.formState.errors.headline && (
              <p className="text-xs lg:text-sm text-destructive mt-1">
                {form.formState.errors.headline.message}
              </p>
            )}
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-card-foreground/70 px-1 mb-0.5">
              Current Company
            </label>
            <div className="relative">
              <span className="absolute top-[53%] -translate-y-1/2 left-3 flex items-center">
                <Building2 strokeWidth={1} size={18} />
              </span>
              <Input
                id="company"
                placeholder="Google | Meta ..."
                className="col-span-1 lg:col-span-2 text-sm pl-9 py-2"
                {...form.register('company')}
              />
            </div>
            {form.formState.errors.company && (
              <p className="text-xs lg:text-sm text-destructive mt-1">
                {form.formState.errors.company.message}
              </p>
            )}
          </div>
          <div className="col-span-1 lg:col-span-2">
            <label className="block text-sm font-medium text-card-foreground/70 px-1 mb-0.5">
              Education
            </label>
            <div className="relative">
              <span className="absolute top-[53%] -translate-y-1/2 left-3 flex items-center">
                <University strokeWidth={1} size={18} />
              </span>
              <Input
                id="education"
                type="text"
                placeholder="Jethalal Uni | IITkgp ..."
                autoComplete="off"
                {...form.register('education')}
                className="pl-9 py-2 text-sm"
              />
            </div>
            {form.formState.errors.education && (
              <p className="text-xs lg:text-sm text-destructive mt-1">
                {form.formState.errors.education.message}
              </p>
            )}
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-card-foreground/70 px-1 mb-0.5">
              Profile Link Text
            </label>
            <div className="relative">
              <span className="absolute top-[53%] -translate-y-1/2 left-3 flex items-center">
                <Type strokeWidth={1} size={18} />
              </span>
              <Input
                id="profile_link_text"
                type="text"
                placeholder="My profile | My Webiste"
                autoComplete="off"
                {...form.register('profile_link.text')}
                className="pl-9 py-2 text-sm"
              />
            </div>
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-card-foreground/70 px-1 mb-0.5">
              Profile Link
            </label>
            <div className="relative">
              <span className="absolute top-[53%] -translate-y-1/2 left-3 flex items-center">
                <Link2 strokeWidth={1} size={18} />
              </span>
              <Input
                id="profile_link"
                type="text"
                placeholder="https://mywebsite.com"
                autoComplete="off"
                {...form.register('profile_link.url')}
                className="pl-9 py-2 text-sm"
              />
              {form.formState.errors.profile_link && (
                <p className="text-xs lg:text-sm text-destructive mt-1">
                  {form.formState.errors.profile_link.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-8 flex flex-col items-start justify-center border p-3 lg:p-4 rounded-lg">
        <p className="text-lg font-semibold mb-4">Skills</p>
        <SkillsSelect
          value={form.watch('skills') ?? []}
          onChange={(v) => form.setValue('skills', v, { shouldDirty: true })}
          largeBadge
        />
      </div>
      <div className="w-full flex items-center justify-end">
        <Button
          type="submit"
          variant={'outline'}
          disabled={!isDirty || isSubmitting}
          className="mt-6"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" /> Saving...
            </>
          ) : (
            <>
              <Save /> Save changes
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ProfileUpdate;
