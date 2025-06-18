'use client';
import { ToastError, ToastSuccess } from '@/components/general/toast';
import { createClient } from '@/supabase/client';
import { Button } from '@dr/ui/components/base/button';
import { Input } from '@dr/ui/components/base/input';
import { redirect, useRouter } from 'next/navigation';
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
import { Textarea } from '@dr/ui/components/base/textarea';
import { SiLinkedin } from 'react-icons/si';
import { SkillsSelect } from '@/components/dashboard/skillselect';
import { blurFade, blurUpFade, countries } from '@dr/utils';
import { onboardingSchema } from '@dr/schemas';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitButton } from '@/components/general/submitbutton';
import { motion } from 'motion/react';
import { CountryCombobox } from '@/components/dashboard/countryselect';
import { onboardUser } from '@/app/onboarding/action';
import { socialIconMap } from '@/lib/utils/iconMap';
import LinkedinImport from '@/modals/linkedinimport';
import UsernameSet from '@/app/onboarding/components/usernameset';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@dr/ui/components/base/hover-card';
import { cn } from '@dr/ui/lib/utils';
import LinkedinURLImport from '@/modals/linkedinurlimport';

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
      shortbio: '',
      company: '',
      country: '',
      geo_info: {
        state: '',
        city: '',
      },
      education: {
        university: '',
        branch: '',
        start_date: '',
        end_date: '',
        grade: '',
      },
      socials: [],
      skills: [],
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

  const updateOnboardStatus = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect('/signin');
    }
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
      <LinkedinImport modal={onboardingType === 'linkedinpdf'} setModal={setOnboardingType} />
      <LinkedinURLImport modal={onboardingType === 'linkedinurl'} setModal={setOnboardingType} />
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
                      setOnboardingType('linkedinpdf');
                    }}
                    className="min-w-58 py-4"
                  >
                    Import from LinkedIn PDF <SiLinkedin />
                  </Button>
                  <span className="border border-primary bg-gradient-to-r from-popover via-primary/40 to-popover flex place-items-center justify-center gap-1 absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-secondary text-foreground px-2 py-0.5 rounded-full shadow-md">
                    Recommended <ThumbsUp strokeWidth={1} size={13} />
                  </span>
                </div>

                <div className="relative inline-block">
                  <Button
                    onClick={() => {
                      setOnboardingType('linkedinurl');
                    }}
                    className="min-w-58 py-4"
                  >
                    Import from LinkedIn URL <SiLinkedin />
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
                  <div className="flex flex-col gap-4 w-full max-w-112">
                    <div>
                      <Input
                        id="full_name"
                        className="bg-secondary w-full text-sm"
                        type="text"
                        placeholder="Enter your Name"
                        {...form.register('full_name')}
                      />
                      {form.formState.errors.full_name && (
                        <p className="text-xs lg:text-sm text-red-500 mt-1">
                          {form.formState.errors.full_name.message}
                        </p>
                      )}
                    </div>
                    <div className="flex items-start justify-start gap-2 w-full">
                      <div className="flex flex-col items-start justify-center w-full lg:w-[50%]">
                        {' '}
                        <Input
                          id="headline"
                          className="bg-secondary w-full text-sm"
                          type="text"
                          placeholder="Headline - Developer | Engineer..."
                          {...form.register('headline')}
                        />
                        {form.formState.errors.headline && (
                          <p className="text-xs lg:text-sm text-red-500 mt-1">
                            {form.formState.errors.headline.message}
                          </p>
                        )}
                      </div>
                      <AtSign size={16} className="text-foreground/70 mt-2.5" />
                      <div className="flex flex-col items-start justify-center w-full lg:w-[50%]">
                        {' '}
                        <Input
                          id="company"
                          className="bg-secondary w-full text-sm"
                          type="text"
                          placeholder="@Google, @X..."
                          {...form.register('company')}
                        />
                        {form.formState.errors.company && (
                          <p className="text-xs lg:text-sm text-red-500 mt-1">
                            {form.formState.errors.company.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-2 w-full items-start">
                      <div className="w-full lg:w-2/5">
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
                                <p className="text-xs lg:text-sm text-red-500 mt-1">
                                  {form.formState.errors.country.message}
                                </p>
                              )}
                            </div>
                          )}
                        />
                      </div>
                      <div className="flex flex-col items-start justify-center w-full lg:w-[30%]">
                        {' '}
                        <Input
                          id="state"
                          className="bg-secondary w-full text-sm"
                          type="text"
                          placeholder="State"
                          {...form.register('geo_info.state')}
                        />
                        {form.formState.errors.geo_info?.state && (
                          <p className="text-xs lg:text-sm text-red-500 mt-1">
                            {form.formState.errors.geo_info?.state.message}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-start justify-center w-full lg:w-[30%]">
                        {' '}
                        <Input
                          id="city"
                          className="bg-secondary w-full text-sm"
                          type="text"
                          placeholder="City"
                          {...form.register('geo_info.city')}
                        />
                        {form.formState.errors.geo_info?.city && (
                          <p className="text-xs lg:text-sm text-red-500 mt-1">
                            {form.formState.errors.geo_info?.city.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <HoverCard openDelay={250}>
                        <HoverCardTrigger>
                          <span className="text-xs underline text-foreground/80 font-medium cursor-pointer pl-1">
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
                              <span className="text-lightaccent-text dark:text-accent-text">
                                *text*
                              </span>{' '}
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
                      <Textarea
                        id="shortbio"
                        className="bg-secondary w-full text-sm"
                        rows={2}
                        placeholder="Enter your bio"
                        {...form.register('shortbio')}
                      />
                      {form.formState.errors.shortbio && (
                        <p className="text-xs lg:text-sm text-red-500 mt-1">
                          {form.formState.errors.shortbio.message}
                        </p>
                      )}
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
                      <label
                        className="text-sm font-medium text-foreground/70"
                        htmlFor="education.university"
                      >
                        University
                      </label>
                      <Input
                        id="education.university"
                        className="bg-secondary w-full text-sm"
                        type="text"
                        placeholder="Education: IITKGP, Popat Uni..."
                        {...form.register('education.university')}
                      />
                      {form.formState.errors.education?.university && (
                        <p className="text-xs lg:text-sm text-red-500 mt-1">
                          {form.formState.errors.education?.university.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className="text-sm font-medium text-foreground/70"
                        htmlFor="education.branch"
                      >
                        Branch
                      </label>
                      <Input
                        id="education.branch"
                        className="bg-secondary w-full text-sm"
                        type="text"
                        placeholder="CS, AI, ECE, Math..."
                        {...form.register('education.branch')}
                      />
                      {form.formState.errors.education?.branch && (
                        <p className="text-xs lg:text-sm text-red-500 mt-1">
                          {form.formState.errors.education?.branch.message}
                        </p>
                      )}
                    </div>
                    <div className="flex items-start justify-start gap-2">
                      <div className="flex flex-col items-start justify-center">
                        {' '}
                        <label
                          className="text-sm font-medium text-foreground/70"
                          htmlFor="education.start_date"
                        >
                          Start
                        </label>
                        <Input
                          id="education.start_date"
                          className="bg-secondary w-full text-sm"
                          type="text"
                          placeholder="MM/20YY..."
                          {...form.register('education.start_date')}
                        />
                        {form.formState.errors.education?.start_date && (
                          <p className="text-xs lg:text-sm text-red-500 mt-1">
                            {form.formState.errors.education?.start_date.message}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-start justify-center">
                        {' '}
                        <label
                          className="text-sm font-medium text-foreground/70"
                          htmlFor="education.end_date"
                        >
                          End
                        </label>
                        <Input
                          id="education.end_date"
                          className="bg-secondary w-full text-sm"
                          type="text"
                          placeholder="MM/20YY..."
                          {...form.register('education.end_date')}
                        />
                        {form.formState.errors.education?.end_date && (
                          <p className="text-xs lg:text-sm text-red-500 mt-1">
                            {form.formState.errors.education?.end_date.message}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-start justify-center">
                        {' '}
                        <label
                          className="text-sm font-medium text-foreground/70"
                          htmlFor="education.grade"
                        >
                          Grade
                        </label>
                        <Input
                          id="education.grade"
                          className="bg-secondary w-full text-sm"
                          type="text"
                          placeholder="MM/20YY..."
                          {...form.register('education.grade')}
                        />
                        {form.formState.errors.education?.grade && (
                          <p className="text-xs lg:text-sm text-red-500 mt-1">
                            {form.formState.errors.education?.grade.message}
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
                            variant="destructive"
                            size="icon"
                            onClick={() => removeLink(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        {form.formState.errors.socials?.[index]?.url && (
                          <p className="text-xs lg:text-sm text-red-500 mt-1">
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
      <footer
        className={cn(
          'relative z-20 px-3 py-2 rounded-md shadow-sm mb-3 text-foreground/70 w-fit text-sm',
          'bg-[linear-gradient(to_right,transparent,var(--text-background),transparent)]'
        )}
      >
        <p>&copy; {new Date().getFullYear()} Digiresume INC</p>
      </footer>
    </div>
  );
};

export default OnboardingForm;
