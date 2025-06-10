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
  Calendar,
  GraduationCap,
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
import { extractDirty } from '../actions/extractDirty';
import { Textarea } from '@lf/ui/components/base/textarea';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@lf/ui/components/base/hover-card';

const ProfileUpdate = ({ profile }: { profile: any }) => {
  const form = useForm<z.infer<typeof profileUpdateSchema>>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: profile,
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty, isSubmitting },
  } = form;
  const onSubmit = async (data: z.infer<typeof profileUpdateSchema>) => {
    const dirtyFields = form.formState.dirtyFields;
    const changedData: Partial<typeof data> = {};
    extractDirty(dirtyFields, data, changedData);

    const result = await updateProfile(changedData as typeof data);

    if (result.success) {
      ToastSuccess({ message: result.message });
      reset(data);
      router.refresh();
    } else {
      ToastError({ message: result.message });
    }
  };

  const router = useRouter();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex flex-col items-start justify-center p-3 lg:p-4 rounded-lg w-full mt-4 gap-y-4">
        <div className="border rounded-lg p-4 w-full">
          <h3 className="text-lg font-semibold text-primary mb-4 pb-2 border-b">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
            <div className="col-span-1">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-card-foreground/70 px-1 mb-0.5"
              >
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
              <label
                htmlFor="email"
                className="block text-sm font-medium text-card-foreground/70 px-1 mb-0.5"
              >
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
              <label
                htmlFor="full_name"
                className="block text-sm font-medium text-card-foreground/70 px-1 mb-0.5"
              >
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
              {form.formState.errors.country && (
                <p className="text-xs lg:text-sm text-destructive mt-1">
                  {form.formState.errors.country.message}
                </p>
              )}
            </div>
            <div className="col-span-1 lg:col-span-2">
              <label className="block text-sm font-medium text-card-foreground/70 px-1 mb-0.5">
                Geographical Info
              </label>

              <div className="flex flex-col gap-2 lg:flex-row lg:items-start">
                {/* Country (readonly) */}
                <div className="w-full lg:w-1/3">
                  <span className="flex items-center gap-2 text-sm p-2 rounded-md border">
                    {form.watch('country')}
                    <img className="w-4" src={`https://flagsapi.com/${form.watch('country').split('-')[1]}/flat/64.png`} />
                  </span>
                </div>

                {/* State */}
                <div className="w-full lg:w-1/3">
                  <Input
                    type="text"
                    placeholder="State"
                    {...form.register('geo_info.state')}
                    className="text-sm"
                  />
                  {form.formState.errors.geo_info?.state && (
                    <p className="text-xs text-destructive mt-1">
                      {form.formState.errors.geo_info.state.message}
                    </p>
                  )}
                </div>

                {/* City */}
                <div className="w-full lg:w-1/3">
                  <Input
                    type="text"
                    placeholder="City"
                    {...form.register('geo_info.city')}
                    className="text-sm"
                  />
                  {form.formState.errors.geo_info?.city && (
                    <p className="text-xs text-destructive mt-1">
                      {form.formState.errors.geo_info.city.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="col-span-1 lg:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium text-card-foreground/70 px-1 mb-0.5">
                Short bio
                <HoverCard openDelay={250}>
                  <HoverCardTrigger>
                    <span className="text-xs underline text-foreground/80 font-medium cursor-pointer">
                      Markdown Guide *
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent className="bg-secondary border-foreground/20 rounded-md z-50">
                    <div className="flex flex-col p-2">
                      <p className="text-sm font-semibold text-lightprimary-text/80 dark:text-primary-text/80">
                        Markdown guide
                      </p>
                      <p className="text-xs text-lightprimary-text/80 dark:text-primary-text/80 mt-2">
                        <span className="text-lightaccent-text dark:text-accent-text">
                          **text**
                        </span>{' '}
                        → <span className="font-bold">text</span>
                      </p>
                      <p className="text-xs text-lightprimary-text/80 dark:text-primary-text/80">
                        <span className="text-lightaccent-text dark:text-accent-text">*text*</span>{' '}
                        → <span className="italic">text</span>
                      </p>
                      <p className="text-xs text-lightprimary-text/80 dark:text-primary-text/80">
                        <span className="text-lightaccent-text dark:text-accent-text">
                          [link](https://feature.com)
                        </span>{' '}
                        →{' '}
                        <a
                          href="https://feature.com"
                          target="_blank"
                          className="font-medium underline"
                        >
                          link
                        </a>
                      </p>
                      <p className="text-xs text-lightprimary-text/80 dark:text-primary-text/80">
                        <span className="text-lightaccent-text dark:text-accent-text">
                          ==text==
                        </span>{' '}
                        →{' '}
                        <mark className="bg-yellow-200/70 rounded px-0.5 shadow-[inset_0_-0.15em_0_rgba(253,224,71,0.6)]">
                          text
                        </mark>
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </label>
              <div className="relative">
                <Textarea
                  id="shortbio"
                  rows={2}
                  placeholder="Passionate about building meaningful digital experiences..."
                  autoComplete="off"
                  {...form.register('shortbio')}
                  className="py-2 text-sm"
                />
              </div>
              {form.formState.errors.shortbio && (
                <p className="text-xs lg:text-sm text-destructive mt-1">
                  {form.formState.errors.shortbio.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="border rounded-lg p-4 w-full">
          <h3 className="text-lg font-semibold text-primary mb-4 pb-2 border-b">
            Professional Information
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
            <div className="col-span-1">
              <label
                htmlFor="headline"
                className="block text-sm font-medium text-card-foreground/70 px-1 mb-0.5"
              >
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
              <label
                htmlFor="company"
                className="block text-sm font-medium text-card-foreground/70 px-1 mb-0.5"
              >
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
          </div>
        </div>
        <div className="border rounded-lg p-4 w-full">
          <h3 className="text-lg font-semibold text-primary mb-4 pb-2 border-b">
            Education Information
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
            <div className="col-span-1">
              <label
                htmlFor="education.university"
                className="block text-sm font-medium text-card-foreground/70 px-1 mb-0.5"
              >
                Education
              </label>
              <div className="relative">
                <span className="absolute top-[53%] -translate-y-1/2 left-3 flex items-center">
                  <University strokeWidth={1} size={18} />
                </span>
                <Input
                  id="education.university"
                  type="text"
                  placeholder="Jethalal Uni | IITkgp ..."
                  {...form.register('education.university')}
                  className="pl-9 py-2 text-sm"
                />
              </div>
              {form.formState.errors.education?.university && (
                <p className="text-xs lg:text-sm text-destructive mt-1">
                  {form.formState.errors.education?.university.message}
                </p>
              )}
            </div>
            <div className="col-span-1">
              <label
                htmlFor="education.branch"
                className="block text-sm font-medium text-card-foreground/70 px-1 mb-0.5"
              >
                Branch
              </label>
              <div className="relative">
                <span className="absolute top-[53%] -translate-y-1/2 left-3 flex items-center">
                  <GraduationCap strokeWidth={1} size={18} />
                </span>
                <Input
                  id="education.branch"
                  type="text"
                  placeholder="CS, AI, ECE, Math..."
                  {...form.register('education.branch')}
                  className="pl-9 py-2 text-sm"
                />
              </div>
              {form.formState.errors.education?.branch && (
                <p className="text-xs lg:text-sm text-destructive mt-1">
                  {form.formState.errors.education?.branch.message}
                </p>
              )}
            </div>
            <div className="col-span-1">
              <label
                htmlFor="education.start_date"
                className="block text-sm font-medium text-card-foreground/70 px-1 mb-0.5"
              >
                Start
              </label>
              <div className="relative">
                <span className="absolute top-[53%] -translate-y-1/2 left-3 flex items-center">
                  <Calendar strokeWidth={1} size={18} />
                </span>
                <Input
                  id="education.start_date"
                  type="text"
                  placeholder="MM/20YY..."
                  {...form.register('education.start_date')}
                  className="pl-9 py-2 text-sm"
                />
              </div>
              {form.formState.errors.education?.start_date && (
                <p className="text-xs lg:text-sm text-destructive mt-1">
                  {form.formState.errors.education?.start_date.message}
                </p>
              )}
            </div>
            <div className="col-span-1">
              <label
                htmlFor="education.end_date"
                className="block text-sm font-medium text-card-foreground/70 px-1 mb-0.5"
              >
                End
              </label>
              <div className="relative">
                <span className="absolute top-[53%] -translate-y-1/2 left-3 flex items-center">
                  <Calendar strokeWidth={1} size={18} />
                </span>
                <Input
                  id="education.end_date"
                  type="text"
                  placeholder="MM/20YY..."
                  {...form.register('education.end_date')}
                  className="pl-9 py-2 text-sm"
                />
              </div>
              {form.formState.errors.education?.end_date && (
                <p className="text-xs lg:text-sm text-destructive mt-1">
                  {form.formState.errors.education?.end_date.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="border rounded-lg p-4 w-full">
          <h3 className="text-lg font-semibold text-primary mb-4 pb-2 border-b">Link</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
            <div className="col-span-1">
              <label
                htmlFor="profile_link.text"
                className="block text-sm font-medium text-card-foreground/70 px-1 mb-0.5"
              >
                Profile Link Text
              </label>
              <div className="relative">
                <span className="absolute top-[53%] -translate-y-1/2 left-3 flex items-center">
                  <Type strokeWidth={1} size={18} />
                </span>
                <Input
                  id="profile_link.text"
                  type="text"
                  placeholder="My profile | My Webiste"
                  autoComplete="off"
                  {...form.register('profile_link.text')}
                  className="pl-9 py-2 text-sm"
                />
              </div>
              {form.formState.errors.profile_link?.text && (
                <p className="text-xs lg:text-sm text-destructive mt-1">
                  {form.formState.errors.profile_link.text.message}
                </p>
              )}
            </div>
            <div className="col-span-1">
              <label
                htmlFor="profile_link.url"
                className="block text-sm font-medium text-card-foreground/70 px-1 mb-0.5"
              >
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
              </div>
              {form.formState.errors.profile_link?.url && (
                <p className="text-xs lg:text-sm text-destructive mt-1">
                  {form.formState.errors.profile_link.url.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-4 flex flex-col items-start justify-center px-3 lg:px-4 rounded-lg">
        <p className="text-lg font-semibold mb-4 text-primary">Skills</p>
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
          className="mt-6 min-w-38"
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
