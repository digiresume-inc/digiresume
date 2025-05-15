'use client';
import { ToastSuccess } from '@/components/toast';
import { createClient } from '@/supabase/client';
import { Button } from '@lf/ui/components/base/button';
import { Input } from '@lf/ui/components/base/input';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import {
  FolderKanban,
  Globe,
  IdCard,
  Link,
  Link2,
  ListChecks,
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
import { processFormData } from '@lf/utils';

const OnboardingForm = () => {
  const [onboardingType, setOnboardingType] = useState('none');
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
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
    const supabase = createClient();
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
      redirect('/');
    }
  };

  const showOnboarding = onboardingType === 'scratch';
  const showFirstStep = onboardingType === 'none';

  return (
    <div className="w-full h-full px-6 py-12 lg:px-52 lg:py-24">
      <header className="mb-6">
        <div className="flex items-center justify-between lg:justify-start gap-4 w-full">
          <h1 className="text-2xl lg:text-4xl font-bold">Onboarding</h1>
          <Button onClick={updateOnboardStatus} size={'sm'} variant={'outline'}>
            Skip
          </Button>
        </div>
      </header>
      <div className="absolute top-[80px] lg:top-[140px] w-full lg:max-w-4xl lg:left-12 lg:right-12 h-36 pointer-events-none bg-gradient-to-b from-background/80 to-transparent z-10" />
      <main className="w-full max-w-2xl flex-1 overflow-y-auto h-full no_scrollbar scrollbar-hidden relative">
        <div className="flex items-start justify-start gap-3 mb-4 h-fit relative">
          <div className="absolute w-px h-full bg-border left-5 top-4"></div>
          <div className="w-full h-8 bg-transparent"></div>
        </div>
        <form
          onSubmit={form.handleSubmit((data) => {
            setLoading(true);
            const newData = processFormData(data);
            setTimeout(() => {
              console.log(newData);
              setLoading(false);
            }, 1000);
          })}
          className="space-y-4"
        >
          {showFirstStep && (
            <div className="flex items-start justify-start gap-1.5 lg:gap-3 mb-4 h-fit relative">
              <div className="min-w-10 min-h-10 bg-transparent rounded-full border flex items-center justify-center">
                1
              </div>
              {showOnboarding && (
                <div className="absolute w-px h-[calc(100%-25px)] bg-border left-5 top-10"></div>
              )}
              <div className="flex flex-col items-start justify start px-3 py-2 gap-4">
                <h1 className="text-lg lg:text-xl font-semibold">Select onboarding type</h1>
                <Button onClick={() => setOnboardingType('linkedin')} className="min-w-58">
                  Import from Linkedin <SiLinkedin />
                </Button>
                <Button onClick={() => setOnboardingType('scratch')} className="min-w-58">
                  Start from scratch <BiEdit />
                </Button>
              </div>
            </div>
          )}
          {showOnboarding && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col items-start justify-start"
            >
              <div className="flex items-start justify-start gap-1.5 lg:gap-3 mb-4 h-fit relative w-full">
                <div className="min-w-10 min-h-10 bg-transparent rounded-full border flex items-center justify-center">
                  2
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
                        className="bg-secondary w-full text-sm lg:text-base"
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
                  3
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
                  4
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
                  5
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
              <div className="w-full flex items-center justify-center mb-12 gap-4">
                <SubmitButton
                  className="w-full max-w-48 lg:max-w-64 items-center justify-center text-sm lg:text-lg font-medium lg:font-semibold"
                  pending={loading}
                  loadingText="Finishing up..."
                >
                  Finish
                  <ListChecks className="w-4 lg:w-6 h-4 lg:h-6" />
                </SubmitButton>
                <Button className='max-w-48 text-sm lg:text-lg font-medium lg:font-semibold' variant={'outline'}>Skip</Button>
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
