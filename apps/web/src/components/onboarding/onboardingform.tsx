'use client';
import { ToastError, ToastSuccess } from '@/components/general/toast';
import { createClient } from '@/supabase/client';
import { Button } from '@lf/ui/components/base/button';
import { Input } from '@lf/ui/components/base/input';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
  AtSign,
  FolderKanban,
  Globe,
  IdCard,
  Link2,
  ListChecks,
  Pencil,
  Plus,
  ThumbsUp,
  University,
  User,
  Wrench,
  X,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@lf/ui/components/base/card';
import { Textarea } from '@lf/ui/components/base/textarea';
import { SiLinkedin } from 'react-icons/si';
import { SkillsSelect } from '@/components/dashboard/skillselect';
import { blurFade, blurUpFade, countries, onboardingSchema } from '@lf/utils';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitButton } from '@/components/general/submitbutton';
import { motion } from 'motion/react';
import { CountryCombobox } from '@/components/dashboard/countryselect';
import { onboardUser } from '@/app/onboarding/action';
import { socialIconMap } from '@/lib/utils/iconMap';
import LinkedinImport from '@/modals/linkedinimport';
import UsernameSet from '@/components/onboarding/usernameset';

function getPlatformIcon(url: string) {
  try {
    const host = new URL(url).hostname.replace('www.', '');
    const platform = Object.keys(socialIconMap).find((key) => host.includes(key.toLowerCase()));
    const Icon = socialIconMap[platform || ''];
    return Icon ? <Icon size={18} /> : <Link2 size={18} />;
  } catch {
    return <Link2 size={18} />;
  }
}

const OnboardingForm = ({ username }: { username: string }) => {
  const supabase = createClient();
  const router = useRouter();
  const [onboardingType, setOnboardingType] = useState('none');
  const [step, setStep] = useState(username ? 2 : 1);

  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      full_name: '',
      headline: '',
      company: '',
      country: '',
      education: {
        university: '',
        branch: '',
        start_date: '',
        end_date: '',
      },
      socials: [],
      skills: [],
      startups: [],
    },
  });

  const { control, register } = form;

  const {
    fields: socialFields,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({
    control,
    name: 'socials',
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

  return (
    <div className="w-full h-full px-6 py-12 lg:px-52 lg:py-24">
      <LinkedinImport modal={onboardingType === 'linkedin'} setModal={setOnboardingType} />
      <motion.header
        variants={blurFade}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between lg:justify-start gap-4 w-full">
          <h1 className="text-2xl lg:text-4xl font-bold">Onboarding</h1>
          <Button
            disabled={form.formState.isSubmitting || step === 1}
            onClick={updateOnboardStatus}
            size={'sm'}
            variant={'outline'}
          >
            Skip
          </Button>
        </div>
      </motion.header>
      <div className="absolute top-[80px] lg:top-[140px] w-full lg:max-w-4xl lg:left-12 lg:right-12 h-36 pointer-events-none bg-gradient-to-b from-background/80 to-transparent z-10" />
      <main className="w-full max-w-2xl flex-1 overflow-y-auto h-full no_scrollbar scrollbar-hidden relative">
        <motion.div
          variants={blurUpFade}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="flex items-start justify-start gap-3 mb-4 h-fit relative"
        >
          <div className="absolute w-px h-full bg-border left-5 top-4"></div>
          <div className="w-full h-8 bg-transparent"></div>
        </motion.div>
        {step === 1 && (
          <motion.div
            variants={blurUpFade}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex items-start justify-start gap-1.5 lg:gap-3 mb-4 h-fit relative w-full"
          >
            <div className="min-w-10 min-h-10 bg-transparent rounded-full border flex items-center justify-center">
              1
            </div>
            <UsernameSet setStep={setStep} />
          </motion.div>
        )}
        <form
          onSubmit={form.handleSubmit(async (data) => {
            const result = await onboardUser(data);
            if (!result.success) {
              ToastError({ message: result.message });
              return;
            }

            router.push('/dashboard');
          })}
          className="space-y-4"
        >
          {step === 2 && (
            <motion.div
              variants={blurUpFade}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="flex items-start justify-start gap-1.5 lg:gap-3 mb-4 h-fit relative"
            >
              <div className="min-w-10 min-h-10 bg-transparent rounded-full border flex items-center justify-center">
                2
              </div>
              <div className="flex flex-col items-start justify start px-3 py-2 gap-4">
                <h1 className="text-lg lg:text-xl font-semibold mb-2">Select onboarding type</h1>
                <div className="relative inline-block">
                  <Button
                    onClick={() => {
                      setOnboardingType('linkedin');
                    }}
                    className="min-w-58 py-4"
                  >
                    Import from LinkedIn <SiLinkedin />
                  </Button>
                  <span className="border border-primary bg-gradient-to-r from-popover via-primary/40 to-popover flex place-items-center justify-center gap-1 absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-secondary text-foreground px-2 py-0.5 rounded-full shadow-md">
                    Recommended <ThumbsUp strokeWidth={1} size={13} />
                  </span>
                </div>

                <Button
                  onClick={() => {
                    setOnboardingType('scratch');
                    setStep(3);
                  }}
                  className="min-w-58"
                >
                  Start from scratch <Pencil />
                </Button>
              </div>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div
              variants={blurUpFade}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="flex flex-col items-start justify-start"
            >
              <div className="flex items-start justify-start gap-1.5 lg:gap-3 mb-4 h-fit relative w-full">
                <div className="min-w-10 min-h-10 bg-transparent rounded-full border flex items-center justify-center">
                  {step}{' '}
                  <div className="absolute w-px h-[calc(100%-25px)] bg-border left-5 top-10"></div>
                </div>
                <div className="absolute w-px h-[calc(100%-25px)] bg-border left-5 top-10"></div>
                <div className="flex flex-col items-start justify start px-3 py-2 gap-4 w-full">
                  <h1 className="text-lg lg:text-xl font-semibold flex gap-2 items-center justify-center">
                    <User className="w-4 h-4 lg:w-6 lg:h-6" strokeWidth={1} /> Profile information
                  </h1>
                  <div className="flex flex-col gap-4 w-full max-w-98">
                    <div>
                      <Input
                        id="full_name"
                        className="bg-secondary w-full text-sm"
                        type="text"
                        placeholder="Enter your Name"
                        {...form.register('full_name')}
                      />
                      {form.formState.errors.full_name && (
                        <p className="text-xs lg:text-sm text-destructive mt-1">
                          {form.formState.errors.full_name.message}
                        </p>
                      )}
                    </div>
                    <div className="flex items-start justify-start gap-2">
                      <div className="flex flex-col items-start justify-center">
                        {' '}
                        <Input
                          id="headline"
                          className="bg-secondary w-full text-sm"
                          type="text"
                          placeholder="Headline - Developer | Engineer..."
                          {...form.register('headline')}
                        />
                        {form.formState.errors.headline && (
                          <p className="text-xs lg:text-sm text-destructive mt-1">
                            {form.formState.errors.headline.message}
                          </p>
                        )}
                      </div>
                      <AtSign size={16} className="text-foreground/70 mt-2.5" />
                      <div className="flex flex-col items-start justify-center">
                        {' '}
                        <Input
                          id="company"
                          className="bg-secondary w-full text-sm"
                          type="text"
                          placeholder="@Google, @X..."
                          {...form.register('company')}
                        />
                        {form.formState.errors.company && (
                          <p className="text-xs lg:text-sm text-destructive mt-1">
                            {form.formState.errors.company.message}
                          </p>
                        )}
                      </div>
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
                              className="bg-secondary max-w-98"
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
                  {step + 1}
                </div>
                <div className="absolute w-px h-[calc(100%-25px)] bg-border left-5 top-10"></div>
                <div className="flex flex-col items-start justify-start px-3 py-2 gap-4 w-full">
                  <h1 className="text-lg lg:text-xl font-semibold flex gap-2 items-center justify-center">
                    <University className="w-4 h-4 lg:w-6 lg:h-6" strokeWidth={1} /> Education
                  </h1>
                  <div className="flex flex-col gap-2 w-full max-w-98">
                    <div>
                      <label className="text-sm font-medium text-foreground/70" htmlFor='education.university'>University</label>
                      <Input
                        id="education.university"
                        className="bg-secondary w-full text-sm"
                        type="text"
                        placeholder="Education: IITKGP, Popat Uni..."
                        {...form.register('education.university')}
                      />
                      {form.formState.errors.education?.university && (
                        <p className="text-xs lg:text-sm text-destructive mt-1">
                          {form.formState.errors.education?.university.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground/70" htmlFor='education.branch'>Branch</label>
                      <Input
                        id="education.branch"
                        className="bg-secondary w-full text-sm"
                        type="text"
                        placeholder="CS, AI, ECE, Math..."
                        {...form.register('education.branch')}
                      />
                      {form.formState.errors.education?.branch && (
                        <p className="text-xs lg:text-sm text-destructive mt-1">
                          {form.formState.errors.education?.branch.message}
                        </p>
                      )}
                    </div>
                    <div className="flex items-start justify-start gap-2">
                      <div className="flex flex-col items-start justify-center">
                        {' '}
                        <label className="text-sm font-medium text-foreground/70" htmlFor='education.start_date'>Start</label>
                        <Input
                          id="education.start_date"
                          className="bg-secondary w-full text-sm"
                          type="text"
                          placeholder="MM/20YY..."
                          {...form.register('education.start_date')}
                        />
                        {form.formState.errors.education?.start_date && (
                          <p className="text-xs lg:text-sm text-destructive mt-1">
                            {form.formState.errors.education?.start_date.message}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-start justify-center">
                        {' '}
                        <label className="text-sm font-medium text-foreground/70" htmlFor='education.end_date'>End</label>
                        <Input
                          id="education.end_date"
                          className="bg-secondary w-full text-sm"
                          type="text"
                          placeholder="MM/20YY..."
                          {...form.register('education.end_date')}
                        />
                        {form.formState.errors.education?.end_date && (
                          <p className="text-xs lg:text-sm text-destructive mt-1">
                            {form.formState.errors.education?.end_date.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-start justify-start gap-1.5 lg:gap-3 mb-4 h-fit relative w-full">
                <div className="min-w-10 min-h-10 bg-transparent rounded-full border flex items-center justify-center">
                  {step + 2}
                </div>
                <div className="absolute w-px h-[calc(100%-25px)] bg-border left-5 top-10"></div>
                <div className="flex flex-col items-start justify-start px-3 py-2 gap-4 w-full">
                  <h1 className="text-lg lg:text-xl font-semibold flex gap-2 items-center justify-center">
                    <Globe className="w-4 h-4 lg:w-6 lg:h-6" strokeWidth={1} /> Socials
                  </h1>

                  {socialFields.map((field, index) => {
                    const currentUrl = form.watch(`socials.${index}.url`) || '';
                    return (
                      <div
                        key={field.id}
                        className="flex flex-col items-start justify-start gap-1 w-full max-w-98"
                      >
                        <div className="flex items-center gap-2 w-full">
                          {getPlatformIcon(currentUrl)}
                          <Input
                            className="bg-secondary flex-1"
                            type="text"
                            placeholder="https://yourlink.com/username"
                            {...register(`socials.${index}.url`)}
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
                        {form.formState.errors.socials?.[index]?.url && (
                          <p className="text-xs lg:text-sm text-destructive mt-1">
                            {form.formState.errors.socials[index]?.url?.message}
                          </p>
                        )}
                      </div>
                    );
                  })}

                  <Button
                    type="button"
                    className="w-full max-w-98"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      appendLink({
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
                  {step + 3}
                </div>
                <div className="absolute w-px h-[calc(100%-25px)] bg-border left-5 top-10"></div>
                <div className="flex flex-col items-start justify start px-3 py-2 gap-4 w-full">
                  <h1 className="text-lg lg:text-xl font-semibold flex items-center justify-center gap-2">
                    <Wrench className="w-4 h-4 lg:w-6 lg:h-6" strokeWidth={1} /> Skills
                  </h1>
                  <SkillsSelect
                    value={form.watch('skills') ?? []}
                    onChange={(v) => form.setValue('skills', v)}
                    className="max-w-98"
                  />
                </div>
              </div>
              <div className="flex items-start justify-start gap-1.5 lg:gap-3 mb-4 h-fit relative w-full">
                <div className="min-w-10 min-h-10 bg-transparent rounded-full border flex items-center justify-center">
                  {step + 3}
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
        <p>&copy; {new Date().getFullYear()} Linkfolio INC</p>
      </footer>
    </div>
  );
};

export default OnboardingForm;
