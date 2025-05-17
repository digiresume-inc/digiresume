'use client';
import { ToastError, ToastSuccess } from '@/components/toast';
import { createClient } from '@/supabase/client';
import { Button } from '@lf/ui/components/base/button';
import { Input } from '@lf/ui/components/base/input';
import { redirect, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
  Check,
  FolderKanban,
  Globe,
  IdCard,
  Link,
  Link2,
  ListChecks,
  Loader2,
  Pencil,
  Plus,
  User,
  Wrench,
  X,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@lf/ui/components/base/card';
import { Textarea } from '@lf/ui/components/base/textarea';
import { SiLinkedin } from 'react-icons/si';
import { BiEdit } from 'react-icons/bi';
import { SkillsSelect } from './skillselect';
import { countries, onboardingSchema } from '@lf/utils';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitButton } from './submitbutton';
import { motion } from 'motion/react';
import { CountryCombobox } from './countryselect';
import { onboardUser } from '@/app/onboarding/action';
import { LoadingButton } from './loadingbutton';

const OnboardingForm = ({ username }: { username: string }) => {
  const supabase = createClient();
  const router = useRouter();
  const [onboardingType, setOnboardingType] = useState('none');
  const [linkedinLoading, setLinkedinLoading] = useState(false);

  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      username: '',
      name: '',
      country: '',
      links: [],
      skills: [],
      startups: [],
    },
  });

  const { control, register } = form;

  const {
    fields: linkFields,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({
    control,
    name: 'links',
  });

  const {
    fields: startupFields,
    append: appendStartup,
    remove: removeStartup,
  } = useFieldArray({
    control,
    name: 'startups',
  });

  const updateOnboardStatus = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase
      .from('profiles')
      .update({
        onboarding: 'skipped',
      })
      .eq('id', user?.id);
    if (!error) {
      ToastSuccess({ message: 'Onboarding skipped' });
      router.push('/dashboard/home');
    }
  };

  const showOnboarding = onboardingType === 'scratch';
  const showFirstStep = onboardingType === 'none' || onboardingType === 'linkedin';
  const stepStart = username ? 2 : 3;

  return (
    <div className="w-full h-full px-6 py-12 lg:px-52 lg:py-24">
      <header className="mb-6">
        <div className="flex items-center justify-between lg:justify-start gap-4 w-full">
          <h1 className="text-2xl lg:text-4xl font-bold">Onboarding</h1>
          <Button
            disabled={linkedinLoading || form.formState.isSubmitting}
            onClick={updateOnboardStatus}
            size={'sm'}
            variant={'outline'}
          >
            Skip
          </Button>
        </div>
      </header>
      <div className="absolute top-[80px] lg:top-[140px] w-full lg:max-w-4xl lg:left-12 lg:right-12 h-36 pointer-events-none bg-gradient-to-b from-background/80 to-transparent z-10" />
      <main className="w-full max-w-2xl flex-1 overflow-y-auto h-full no_scrollbar scrollbar-hidden relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="flex items-start justify-start gap-3 mb-4 h-fit relative"
        >
          <div className="absolute w-px h-full bg-border left-5 top-4"></div>
          <div className="w-full h-8 bg-transparent"></div>
        </motion.div>
        <form
          onSubmit={form.handleSubmit(async (data) => {
            if (!username && !data.username) {
              form.setError('username', {
                type: 'required',
                message: 'username is required',
              });
              form.setFocus('username');
              return;
            }
            const result = await onboardUser(data);
            if (result?.field && !result.success) {
              form.setError(result.field as any, {
                type: 'server',
                message: result.message,
              });
              form.setFocus(result.field as any);
              return;
            }

            router.push('/dashboard/home');
          })}
          className="space-y-4"
        >
          {showFirstStep && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="flex items-start justify-start gap-1.5 lg:gap-3 mb-4 h-fit relative"
            >
              <div className="min-w-10 min-h-10 bg-transparent rounded-full border flex items-center justify-center">
                1
              </div>
              {showOnboarding && (
                <div className="absolute w-px h-[calc(100%-25px)] bg-border left-5 top-10"></div>
              )}
              <div className="flex flex-col items-start justify start px-3 py-2 gap-4">
                <h1 className="text-lg lg:text-xl font-semibold">Select onboarding type</h1>
                <LoadingButton
                  onClick={() => {
                    setOnboardingType('linkedin');
                    setLinkedinLoading(true);
                  }}
                  pending={linkedinLoading}
                  loadingText="Fetching..."
                  className="min-w-58"
                >
                  Import from Linkedin <SiLinkedin />
                </LoadingButton>
                <Button
                  disabled={linkedinLoading}
                  onClick={() => setOnboardingType('scratch')}
                  className="min-w-58"
                >
                  Start from scratch <BiEdit />
                </Button>
              </div>
            </motion.div>
          )}
          {showOnboarding && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col items-start justify-start"
            >
              {!username && (
                <div className="flex items-start justify-start gap-1.5 lg:gap-3 mb-4 h-fit relative w-full">
                  <div className="min-w-10 min-h-10 bg-transparent rounded-full border flex items-center justify-center">
                    2
                    <div className="absolute w-px h-[calc(100%-25px)] bg-border left-5 top-10"></div>
                  </div>
                  <div className="flex flex-col items-start justify start px-3 py-2 gap-4 w-full">
                    <h1 className="text-lg lg:text-xl font-semibold flex gap-2 items-center justify-center">
                      <IdCard className="w-4 h-4 lg:w-6 lg:h-6" strokeWidth={1} /> Select Username
                    </h1>
                    <div className="w-full max-w-74">
                      <div className="flex items-center justify-start border rounded-md">
                        <span className="text-sm font-medium text-muted-foreground bg-secondary px-2 py-2 rounded-l-md border-muted border-r">
                          linkfolio.page
                        </span>
                        <Input
                          id="username"
                          type="text"
                          placeholder="username"
                          {...form.register('username')}
                          className="w-full text-sm rounded-none rounded-r-md bg-secondary"
                        />
                      </div>
                      {form.formState.errors.username && (
                        <p className="text-xs lg:text-sm text-destructive mt-1">
                          {form.formState.errors.username.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-start justify-start gap-1.5 lg:gap-3 mb-4 h-fit relative w-full">
                <div className="min-w-10 min-h-10 bg-transparent rounded-full border flex items-center justify-center">
                  {stepStart}
                </div>
                <div className="absolute w-px h-[calc(100%-25px)] bg-border left-5 top-10"></div>
                <div className="flex flex-col items-start justify start px-3 py-2 gap-4 w-full">
                  <h1 className="text-lg lg:text-xl font-semibold flex gap-2 items-center justify-center">
                    <User className="w-4 h-4 lg:w-6 lg:h-6" strokeWidth={1} /> Profile information
                  </h1>
                  <div className="flex flex-col gap-4 w-full max-w-74">
                    <div>
                      <Input
                        id="name"
                        className="bg-secondary w-full text-sm"
                        type="text"
                        placeholder="Enter your name"
                        {...form.register('name')}
                      />
                      {form.formState.errors.name && (
                        <p className="text-xs lg:text-sm text-destructive mt-1">
                          {form.formState.errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
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
                            />
                            {form.formState.errors.country && (
                              <p className="text-xs text-destructive mt-1">
                                {form.formState.errors.country.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-start justify-start gap-1.5 lg:gap-3 mb-4 h-fit relative w-full">
                <div className="min-w-10 min-h-10 bg-transparent rounded-full border flex items-center justify-center">
                  {stepStart + 1}
                </div>
                <div className="absolute w-px h-[calc(100%-25px)] bg-border left-5 top-10"></div>
                <div className="flex flex-col items-start justify-start px-3 py-2 gap-4 w-full">
                  <h1 className="text-lg lg:text-xl font-semibold flex gap-2 items-center justify-center">
                    <Link className="w-4 h-4 lg:w-6 lg:h-6" strokeWidth={1} /> Any important Links
                  </h1>

                  {linkFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex flex-col items-start justify-start gap-1 w-full max-w-74"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <Input
                          className="bg-secondary flex-1"
                          type="text"
                          placeholder="https://yourlink.com/username"
                          {...register(`links.${index}.url`)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeLink(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      {form.formState.errors.links?.[index]?.url && (
                        <p className="text-xs lg:text-sm text-destructive mt-1">
                          {form.formState.errors.links[index]?.url?.message}
                        </p>
                      )}
                    </div>
                  ))}

                  <Button
                    type="button"
                    className="w-full max-w-74"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      appendLink({
                        type: '',
                        url: '',
                      })
                    }
                  >
                    Add <Plus />
                  </Button>
                </div>
              </div>
              <div className="flex items-start justify-start gap-1.5 lg:gap-3 mb-4 h-fit relative w-full">
                <div className="min-w-10 min-h-10 bg-transparent rounded-full border flex items-center justify-center">
                  {stepStart + 2}
                </div>
                <div className="absolute w-px h-[calc(100%-25px)] bg-border left-5 top-10"></div>
                <div className="flex flex-col items-start justify start px-3 py-2 gap-4 w-full">
                  <h1 className="text-lg lg:text-xl font-semibold flex items-center justify-center gap-2">
                    <Wrench className="w-4 h-4 lg:w-6 lg:h-6" strokeWidth={1} /> Skills
                  </h1>
                  <SkillsSelect
                    value={form.watch('skills') ?? []}
                    onChange={(v) => form.setValue('skills', v)}
                  />
                </div>
              </div>
              <div className="flex items-start justify-start gap-1.5 lg:gap-3 mb-4 h-fit relative w-full">
                <div className="min-w-10 min-h-10 bg-transparent rounded-full border flex items-center justify-center">
                  {stepStart + 3}
                </div>
                <div className="flex flex-col items-start justify start px-3 py-2 gap-4 w-full">
                  <h1 className="text-lg lg:text-xl font-semibold flex items-center justify-center gap-2">
                    <FolderKanban className="w-4 h-4 lg:w-6 lg:h-6" strokeWidth={1} />{' '}
                    Startups/Projects
                  </h1>
                  {startupFields.map((field, index) => (
                    <Card
                      key={field.id}
                      className="w-full max-w-md shadow-md border-muted bg-muted"
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-base lg:text-lg font-semibold">
                            <Pencil className="h-4 w-4 text-muted-foreground" />
                            Entry {index + 1}
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeStartup(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="flex flex-col gap-4 px-4 lg:px-6">
                        {/* Startup Name */}
                        <div className="flex flex-col gap-1">
                          <label className="text-xs lg:text-sm flex items-center gap-1">
                            <IdCard className="h-4 w-4 text-muted-foreground" />
                            Startup Name
                          </label>
                          <Input
                            {...register(`startups.${index}.name`)}
                            placeholder="e.g., Popat Match"
                            className="bg-secondary text-sm"
                          />
                        </div>

                        {/* Website */}
                        <div className="flex flex-col gap-1">
                          <label className="text-xs lg:text-sm flex items-center gap-1">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            Website
                          </label>
                          <Input
                            {...register(`startups.${index}.url`)}
                            placeholder="https://yourstartup.com"
                            className="bg-secondary text-sm"
                            type="url"
                          />
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-1">
                          <label className="text-smtext-xs lg:text-sm flex items-center gap-1">
                            <Link2 className="h-4 w-4 text-muted-foreground" />
                            Description
                          </label>
                          <Textarea
                            {...register(`startups.${index}.description`)}
                            rows={3}
                            placeholder="Tell us about your startup idea…"
                            className="bg-secondary text-sm"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button
                    type="button"
                    className="w-full max-w-md"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      appendStartup({
                        name: '',
                        url: '',
                        description: '',
                      })
                    }
                  >
                    Add <Plus />
                  </Button>
                </div>
              </div>
              <div className="w-full max-w-md flex mb-15">
                <SubmitButton
                  className="ml-auto w-full max-w-[85%] items-center justify-center text-sm lg:text-lg font-medium lg:font-semibold"
                  pending={form.formState.isSubmitting}
                  loadingText="Finishing up..."
                >
                  Finish
                  <ListChecks className="w-4 lg:w-6 h-4 lg:h-6" />
                </SubmitButton>
              </div>
            </motion.div>
          )}
        </form>
      </main>
      <footer className="onboarding-footer">
        <p>&copy; {new Date().getFullYear()} Linkfolio</p>
      </footer>
    </div>
  );
};

export default OnboardingForm;
