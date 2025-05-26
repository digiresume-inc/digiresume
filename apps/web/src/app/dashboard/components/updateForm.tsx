'use client';
import { Button } from '@lf/ui/components/base/button';
import {
  categoryOptions,
  countries,
  formatMonthShortYear,
  getLineHeightPercent,
  getMonthsDifference,
  NewTheme,
  NewThemes,
  profileUpdateSchema,
  Project,
  Skill,
  Startup,
  statusOptions,
  Theme,
  Themes,
} from '@lf/utils';
import {
  X,
  BatteryLow,
  SignalMedium,
  ExternalLink,
  Loader2,
  MapPin,
  User,
  IdCard,
  Mail,
  File,
  Save,
  Type,
  Link2,
  Info,
  University,
  Newspaper,
  Building2,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import AvatarComponent from './avatar';
import FaviconComponent from './favicon';
import ResumeComponent from './resume';
import { Input } from '@lf/ui/components/base/input';
import { CountryCombobox } from '@/components/countryselect';
import { Controller, useForm } from 'react-hook-form';
import Link from 'next/link';
import { BiRupee } from 'react-icons/bi';
import { SkillsSelect } from '@/components/skillselect';
import { updateProfile } from '../actions/updateProfile';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastSuccess } from '@/components/toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@lf/ui/components/base/tabs';
import ExperienceForm from './experienceForm';
import SocialsForm from './socialsForm';
import { iconMap } from '../utils/iconMap';
import MarkdownParser from '@/components/markdownparser';
import ThemeSelect from './themeSelect';

function getPlatformIcon(url: string) {
  try {
    const host = new URL(url).hostname.replace('www.', '');
    const platform = Object.keys(iconMap).find((key) => host.includes(key.toLowerCase()));
    const Icon = iconMap[platform || ''];
    return Icon ? <Icon size={15} /> : <Link2 size={15} />;
  } catch {
    return <Link2 size={15} />;
  }
}

const UpdateForm = ({
  profile,
  startups,
  projects,
}: {
  profile: any;
  startups: any;
  projects: any;
}) => {
  const [fetchLoading, setFetchLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const [localTheme, setLocalTheme] = useState<NewTheme | null>(profile.theme);

  const form = useForm<z.infer<typeof profileUpdateSchema>>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      full_name: '',
      country: '',
      skills: [] as Skill[],
      company: '',
      headline: '',
      education: '',
      profile_link: {
        url: '',
        text: '',
      },
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        full_name: profile.full_name || '',
        country: profile.country || '',
        skills: profile.skills || [],
        company: profile.company || '',
        headline: profile.headline || '',
        education: profile.education || '',
        profile_link: {
          url: profile.profile_link?.url || '',
          text: profile.profile_link?.text || '',
        },
      });

      setFetchLoading(false);
    }
  }, [profile, form]);

  const {
    control,
    formState: { isDirty, isSubmitting },
  } = form;

  const profileLink = form.watch('profile_link');
  const headline = form.watch('headline');
  const company = form.watch('company');
  const education = form.watch('education');
  const full_name = form.watch('full_name');
  const country = form.watch('country');

  return (
    <div className="relative flex flex-col lg:flex-row h-screen w-full max-w-7xl mx-auto gap-4">
      {/* Left: Scrollable Content */}
      {fetchLoading ? (
        <div className="lg:w-[60%] w-full h-screen overflow-y-auto px-4 py-6 no_scrollbar scrollbar-hidden">
          <div className="flex items-center justify-center h-full">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        </div>
      ) : (
        <div className="lg:w-[60%] w-full h-screen overflow-y-auto px-4 py-6 no_scrollbar scrollbar-hidden">
          <div className="w-full grid grid-cols-4 md:grid-cols-3 items-center justify-center gap-4">
            <AvatarComponent avatar_url={profile.avatar_url} />
            <FaviconComponent favicon_url={profile.favicon_url} />
            <ResumeComponent resume_url={profile.resume_url} />
          </div>
          <Tabs defaultValue="profile" className="w-full mt-12">
            <div className="overflow-x-auto">
              <TabsList className="flex w-fit gap-4 lg:gap-6 px-2 lg:px-3 bg-background rounded-none">
                <TabsTrigger
                  className="border-t-0 cursor-pointer border-r-0 border-l-0 border-b-[3px] border-transparent data-[state=active]:border-primary text-muted-foreground data-[state=active]:text-foreground pb-[18px] pt-4 text-sm font-bold tracking-[0.015em] bg-transparent rounded-none focus-visible:ring-0 focus-visible:outline-none"
                  value="profile"
                >
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  className="border-t-0 cursor-pointer border-r-0 border-l-0 border-b-[3px] border-transparent data-[state=active]:border-primary text-muted-foreground data-[state=active]:text-foreground pb-[18px] pt-4 text-sm font-bold tracking-[0.015em] bg-transparent rounded-none focus-visible:ring-0 focus-visible:outline-none"
                  value="experience"
                >
                  Experience
                </TabsTrigger>
                <TabsTrigger
                  className="border-t-0 cursor-pointer border-r-0 border-l-0 border-b-[3px] border-transparent data-[state=active]:border-primary text-muted-foreground data-[state=active]:text-foreground pb-[18px] pt-4 text-sm font-bold tracking-[0.015em] bg-transparent rounded-none focus-visible:ring-0 focus-visible:outline-none"
                  value="socials"
                >
                  Socials
                </TabsTrigger>
                <TabsTrigger
                  className="border-t-0 cursor-pointer border-r-0 border-l-0 border-b-[3px] border-transparent data-[state=active]:border-primary text-muted-foreground data-[state=active]:text-foreground pb-[18px] pt-4 text-sm font-bold tracking-[0.015em] bg-transparent rounded-none focus-visible:ring-0 focus-visible:outline-none"
                  value="themes"
                >
                  Themes
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="profile">
              <form
                onSubmit={form.handleSubmit(async (data) => {
                  const dirtyFields = form.formState.dirtyFields;
                  const changedData: Partial<typeof data> = {};

                  // Recursive function to extract changed fields only
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
                  console.log('changedData', changedData);
                  const result = await updateProfile(data);
                  ToastSuccess({ message: result.message });
                })}
                className="w-full"
              >
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
            </TabsContent>
            <TabsContent value="experience" className="mt-4">
              <ExperienceForm profile={profile} />
            </TabsContent>
            <TabsContent value="socials" className="mt-4">
              <SocialsForm profile={profile} />
            </TabsContent>
            <TabsContent value="themes" className="mt-4">
              <ThemeSelect theme={profile.theme} localTheme={localTheme} setLocalTheme={setLocalTheme} />
            </TabsContent>
          </Tabs>
          <div className="lg:hidden mt-6">
            <button
              onClick={() => setShowOverlay(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Open Panel
            </button>
          </div>
        </div>
      )}

      <div
        className={`${
          showOverlay ? 'flex' : 'hidden'
        } lg:flex lg:w-[40%] w-full h-screen p-4 fixed top-0 left-0 lg:static bg-background/50 backdrop-blur z-50`}
      >
        <Button
          onClick={() => setShowOverlay(false)}
          className="flex lg:hidden absolute top-4 right-4"
          size={'icon'}
          variant={'outline'}
        >
          <X />
        </Button>
        <div className="flex flex-col w-full items-center justify-center gap-4">
          <h2 className="text-lg lg:text-2xl font-bold">Preview</h2>
          <div className="relative w-[300px] h-[620px] rounded-[50px] bg-black shadow-2xl border-[14px] border-black flex items-center justify-center">
            {/* Dynamic Island (move out of overflow-hidden) */}
            <div className="absolute top-[-5px] left-1/2 -translate-x-1/2 bg-black rounded-t-2xl rounded-b-4xl w-[130px] h-[25px] z-20"></div>

            {/* Status Icons (Top Right) */}
            <div className="absolute top-1 right-8 flex z-30">
              <BatteryLow size={16} />
            </div>
            <div className="absolute top-[1px] right-12 flex items-center gap-2 z-30">
              <SignalMedium size={16} />
            </div>

            <div className="absolute top-1 left-8 flex items-center gap-2 z-30 text-xs">9:41</div>

            {/* Side Buttons */}
            <div className="absolute left-[-16px] top-[100px] w-[4px] h-[40px] rounded-full bg-black z-20"></div>
            <div className="absolute left-[-16px] top-[160px] w-[4px] h-[40px] rounded-full bg-black z-20"></div>
            <div className="absolute right-[-16px] top-[130px] w-[4px] h-[60px] rounded-full bg-black z-20"></div>

            {/* iPhone Screen */}
            {fetchLoading ? (
              <div className="w-[270px] h-[590px] bg-background rounded-[36px] overflow-y-auto z-10 py-4 scrollbar-hidden no_scrollbar">
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="animate-spin text-primary" size={32} />
                </div>
              </div>
            ) : (
              <div className="w-[270px] h-[590px] rounded-[36px] overflow-y-auto z-10 py-4 scrollbar-hidden no_scrollbar bg-background">
                {/* URL Bar */}

                {/* Content */}
                <div className="p-4 space-y-2">
                  <div className="w-full rounded-full h-6 flex items-center justify-between px-2 bg-secondary">
                    <img className="h-5 w-5 rounded-full" src={profile.favicon_url} />
                    <p className="text-xs">/{profile.username}</p>
                    <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/u/${profile.username}`}>
                      <ExternalLink strokeWidth={1.5} size={14} className="text-foreground" />
                    </Link>
                  </div>
                  <div className="h-1 w-full" />

                  <div className="flex items-center justify-center gap-2">
                    <div className="w-12 h-12 p-0.5 border border-dashed border-primary rounded-full">
                      <img className="w-full h-full rounded-full" src={profile.avatar_url} />
                    </div>
                    <div className="flex flex-col items-start justify-center gap-1">
                      <p className="text-sm font-semibold ml-1">{full_name}</p>
                      <p className="flex items-center text-xs font-medium gap-1">
                        <MapPin className="w-[12px] h-[12px] mr-[-2px]" />
                        {country.split('-')[0]}
                        <img
                          className="w-4"
                          src={`https://flagsapi.com/${country.split('-')[1]}/flat/64.png`}
                        />
                        <span className="h-[15px] w-px bg-primary mx-1" />
                        <span className="flex items-center">
                          <BiRupee strokeWidth={1} className="w-[12px] h-[12px]" />2 cr/m
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-2">
                    <h1 className="text-xs font-bold">{headline}</h1>
                    <p className="text-xxs text-muted-foreground">
                      at @{company} · {education} Alumni
                    </p>
                  </div>
                  <div className="flex items-center justify-center text-xxs gap-2 mb-3">
                    {profile.resume_url && (
                      <a
                        href={profile.resume_url}
                        target="_blank"
                        className="flex items-center gap-0.5 border-b-2 border-dashed text-foreground/80 border-primary/70 hover:border-primary hover:text-foreground transition"
                      >
                        <File strokeWidth={1} className="w-[11px] h-[11px]" />
                        Resume
                      </a>
                    )}
                    {profileLink?.url && profileLink.text && (
                      <a
                        target="_blank"
                        href={profileLink.url}
                        className="flex items-center gap-0.5 border-b-2 border-dashed text-foreground/80 border-primary/70 hover:border-primary hover:text-foreground transition"
                      >
                        <Link2 className="w-[12px] h-[12px]" />
                        {profileLink.text}
                      </a>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-1">
                    {form.getValues('skills')?.map((skill: Skill) => (
                      <div
                        key={skill.value}
                        className="flex items-center font-medium justify-center gap-1 bg-secondary rounded-full px-2 py-0.5 text-tiny"
                      >
                        <img src={skill.logo} alt={skill.label} className="h-2 w-2" />
                        {skill.label}
                      </div>
                    ))}
                  </div>
                  <Tabs defaultValue="experience" className="w-full mt-8">
                    <div className="relative rounded-sm overflow-x-scroll h-10 no_scrollbar scrollbar-hidden">
                      <TabsList className="absolute flex flex-row justify-stretch w-full bg-background">
                        <TabsTrigger
                          value="experience"
                          className="flex flex-col items-center justify-center border-t-0 border-r-0 border-l-0 border-b-[2.5px] border-transparent data-[state=active]:bg-transparent data-[state=active]:border-primary text-muted-foreground data-[state=active]:text-foreground pb-[5px] pt-2 text-xxs font-semibold tracking-[0.015em] bg-transparent rounded-none focus-visible:ring-0 focus-visible:outline-none"
                        >
                          Experience
                        </TabsTrigger>
                        <TabsTrigger
                          value="startups"
                          className="flex flex-col items-center justify-center border-t-0 border-r-0 border-l-0 border-b-[2.5px] border-transparent data-[state=active]:bg-transparent data-[state=active]:border-primary text-muted-foreground data-[state=active]:text-foreground pb-[5px] pt-2 text-xxs font-semibold tracking-[0.015em] bg-transparent rounded-none focus-visible:ring-0 focus-visible:outline-none"
                        >
                          Startups
                        </TabsTrigger>
                        <TabsTrigger
                          value="projects"
                          className="flex flex-col items-center justify-center border-t-0 border-r-0 border-l-0 border-b-[2.5px] border-transparent data-[state=active]:bg-transparent data-[state=active]:border-primary text-muted-foreground data-[state=active]:text-foreground pb-[5px] pt-2 text-xxs font-semibold tracking-[0.015em] bg-transparent rounded-none focus-visible:ring-0 focus-visible:outline-none"
                        >
                          Projects
                        </TabsTrigger>
                      </TabsList>
                    </div>
                    <TabsContent value="experience">
                      <div className="mt-2">
                        {profile.experience.map((company: any, companyIndex: any) => {
                          const lineHeight = getLineHeightPercent(company.roles.length);

                          return (
                            <div className="group relative mb-4" key={companyIndex}>
                              <div
                                style={{
                                  height: lineHeight,
                                }}
                                className="absolute w-[1.5px] bg-primary top-[34px] left-[15px]"
                              />
                              <div className="w-full flex justify-between">
                                <div className="flex items-center gap-1 relative">
                                  <img
                                    alt={company.company}
                                    className="cursor-pointer w-8 h-8 rounded-full flex justify-center items-center object-cover hover:opacity-90 transition-opacity border-primaryBorder flex-grow border"
                                    src={company.company_logo}
                                  />
                                  <p className="font-bold text-xs truncate">{company.company}</p>
                                  <Info
                                    strokeWidth={1}
                                    size={10}
                                    className="text-muted-foreground cursor-pointer"
                                  />
                                </div>
                              </div>

                              {company.roles.map((role: any, roleIndex: any) => (
                                <div
                                  key={roleIndex}
                                  className="relative w-full transition-colors duration-200 flex flex-col items-center py-2 pl-7"
                                >
                                  <div className="w-full flex relative">
                                    <div className="w-4 h-3 border-l-2 border-b-2 rounded-bl-lg absolute -left-[13px] border-primary" />
                                    <div className="w-full flex ml-2">
                                      <div className="group w-full duration-300 ease-in-out rounded-2xl outline-none transition-shadow group b-0 ">
                                        <div
                                          className="w-full group flex items-center relative text-left cursor-default p-0"
                                          role="none"
                                        >
                                          <div className="w-full flex flex-col gap-2">
                                            <div className="flex items-center justify-between w-full">
                                              <div className="w-full flex flex-col">
                                                <div className="flex items-center gap-2 truncate overflow-hidden">
                                                  <span className="flex items-center justify-start gap-1 truncate overflow-hidden whitespace-nowrap">
                                                    <p className="font-semibold text-xxs truncate max-w-46 sm:max-w-fit">
                                                      {role.headline}
                                                    </p>
                                                    <p>•</p>
                                                    <span className="text-tiny text-muted-foreground truncate max-w-16 lg:max-w-fit">
                                                      {role.employment_type}
                                                    </span>
                                                  </span>
                                                </div>
                                                <p className="text-muted-foreground font-normal text-tiny truncate overflow-hidden whitespace-nowrap max-w-58 sm:max-w-fit">
                                                  <strong className="truncate overflow-hidden">
                                                    {formatMonthShortYear(role.start_date)} -{' '}
                                                    {role.end_date
                                                      ? formatMonthShortYear(role.end_date)
                                                      : 'Present'}
                                                    {role.end_date && (
                                                      <span className="ml-0.5">
                                                        (
                                                        {getMonthsDifference(
                                                          role.start_date,
                                                          role.end_date
                                                        )}
                                                        )
                                                      </span>
                                                    )}
                                                    <span className="mx-0.5">•</span>
                                                    <span className="font-normal">
                                                      {role.location}, {role.location_type}
                                                    </span>
                                                  </strong>
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    </TabsContent>
                    <TabsContent value="startups">
                      <div className="space-y-2">
                        {startups.map((startup: Startup, index: number) => (
                          <div
                            key={index}
                            className="w-full bg-card rounded-lg border border-primary/60 h-fit px-3 py-2 flex flex-col gap-2 items-start justify-center"
                          >
                            <div className="flex items-center justify-center gap-2">
                              <img
                                src={`https://www.google.com/s2/favicons?sz=128&domain_url=${startup.url}`}
                                className="w-8 h-8 rounded-full"
                              />
                              <div className="flex flex-col items-start justify-center gap-1">
                                <p className="text-xs font-semibold">{startup.name}</p>
                                <div className="flex gap-2 items-center justify-start w-full">
                                  {(() => {
                                    const currentStatus = statusOptions.find(
                                      (s) => s.status === startup.status
                                    );
                                    return currentStatus ? (
                                      <span
                                        className={`flex items-center gap-0.5 px-1 py-0.5 rounded-full text-tiny bg-secondary`}
                                      >
                                        <span>{currentStatus.icon}</span>
                                        <span>{currentStatus.text}</span>
                                      </span>
                                    ) : (
                                      <span className="flex items-center gap-0.5 px-1 py-0.5 rounded-full text-tiny bg-secondary">
                                        {startup.status}
                                      </span>
                                    );
                                  })()}
                                  {(() => {
                                    const currentCategory = categoryOptions.find(
                                      (s) => s.category === startup.category
                                    );
                                    return currentCategory ? (
                                      <span
                                        className={`flex items-center gap-0.5 px-1 py-0.5 rounded-full text-tiny bg-secondary`}
                                      >
                                        <span>{currentCategory.icon}</span>
                                        <span>{currentCategory.text}</span>
                                      </span>
                                    ) : (
                                      <span className="flex items-center gap-0.5 px-1 py-0.5 rounded-full text-tiny bg-secondary">
                                        {startup.category}
                                      </span>
                                    );
                                  })()}
                                </div>
                              </div>
                            </div>
                            <div className="text-xxs font-medium">
                              <span className="line-clamp-3">
                                <MarkdownParser text={startup.description} />{' '}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="projects">
                      <div className="space-y-2">
                        {projects.map((project: Project, index: number) => (
                          <div
                            key={index}
                            className="w-full bg-card rounded-lg border border-primary/60 h-fit px-3 py-2 flex flex-col gap-2 items-start justify-center"
                          >
                            <div className="flex items-center justify-center gap-2">
                              <img
                                src={`https://www.google.com/s2/favicons?sz=128&domain_url=${project.url}`}
                                className="w-8 h-8 rounded-full"
                              />
                              <div className="flex flex-col items-start justify-center gap-1">
                                <p className="text-xs font-semibold">{project.name}</p>
                                <div className="flex gap-2 items-center justify-start w-full">
                                  {(() => {
                                    const currentCategory = categoryOptions.find(
                                      (s) => s.category === project.category
                                    );
                                    return currentCategory ? (
                                      <span
                                        className={`flex items-center gap-0.5 px-1 py-0.5 rounded-full text-tiny bg-secondary`}
                                      >
                                        <span>{currentCategory.icon}</span>
                                        <span>{currentCategory.text}</span>
                                      </span>
                                    ) : (
                                      <span className="flex items-center gap-0.5 px-1 py-0.5 rounded-full text-tiny bg-secondary">
                                        {project.category}
                                      </span>
                                    );
                                  })()}
                                </div>
                              </div>
                            </div>
                            <div className="text-xxs font-medium">
                              <span className="line-clamp-3">
                                <MarkdownParser text={project.description} />{' '}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                  <div className="gap-1 flex flex-wrap items-center justify-center p-2 mt-6">
                    {profile.socials.map((social: any, index: number) => {
                      const icon = getPlatformIcon(social.url);
                      return (
                        <a
                          target="_blank"
                          href={social.url}
                          key={index}
                          className="w-10 h-10 border border-primary/60 rounded-full p-2 flex items-center justify-center"
                        >
                          <>{icon}</>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
