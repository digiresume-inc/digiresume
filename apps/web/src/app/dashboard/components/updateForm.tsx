'use client';
import { Button } from '@lf/ui/components/base/button';
import {
  countries,
  experienceSchema,
  profileUpdateSchema,
  singleExperienceSchema,
  Skill,
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
  Plus,
  Pencil,
  ArrowRight,
  CornerDownRight,
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
import { Textarea } from '@lf/ui/components/base/textarea';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@lf/ui/components/base/hover-card';
import { SkillsSelect } from '@/components/skillselect';
import { updateProfile } from '../actions/updateProfile';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastSuccess } from '@/components/toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@lf/ui/components/base/tabs';
import ExperienceUpdate from './experienceUpdate';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@lf/ui/components/base/dialog';
import { updateExperience } from '../actions/updateExperience';
import { useRouter } from 'next/navigation';

type SingleExperience = z.infer<typeof singleExperienceSchema>;

const UpdateForm = ({ profile }: { profile: any }) => {
  const [preview, setPreview] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<SingleExperience | null>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleEdit = (exp: SingleExperience) => {
    setSelectedExperience(exp);
    setOpen(true);
  };

  const handleUpdate = async (updatedExp: SingleExperience) => {
    const updatedExperienceList = profile.experience.map((exp: any) =>
      exp.a === updatedExp.a ? { ...updatedExp } : exp
    );

    const result = await updateExperience(updatedExperienceList);

    if (result.success) {
      ToastSuccess({ message: result.message });

      setOpen(false);
      setSelectedExperience(null);

      router.refresh();
    }
  };

  const form = useForm<z.infer<typeof profileUpdateSchema>>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      full_name: '',
      country: '',
      skills: [] as Skill[],
      headline: '',
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
        headline: profile.headline || '',
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
            <TabsList className="flex w-full overflow-x-auto overflow-y-hidden bg-background rounded-none">
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
                value="startups"
              >
                Startups
              </TabsTrigger>
              <TabsTrigger
                className="border-t-0 cursor-pointer border-r-0 border-l-0 border-b-[3px] border-transparent data-[state=active]:border-primary text-muted-foreground data-[state=active]:text-foreground pb-[18px] pt-4 text-sm font-bold tracking-[0.015em] bg-transparent rounded-none focus-visible:ring-0 focus-visible:outline-none"
                value="projects"
              >
                Projects
              </TabsTrigger>
              <TabsTrigger
                className="border-t-0 cursor-pointer border-r-0 border-l-0 border-b-[3px] border-transparent data-[state=active]:border-primary text-muted-foreground data-[state=active]:text-foreground pb-[18px] pt-4 text-sm font-bold tracking-[0.015em] bg-transparent rounded-none focus-visible:ring-0 focus-visible:outline-none"
                value="links"
              >
                Links
              </TabsTrigger>
            </TabsList>
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
                    <div className="col-span-1 lg:col-span-2">
                      <div className="flex items-center justify-start">
                        <label className="block text-sm font-medium text-card-foreground/70 px-1 mb-0.5">
                          Headline
                        </label>
                        <HoverCard openDelay={250}>
                          <HoverCardTrigger className="text-xs font-medium text-lightprimary-text dark:text-primary-text cursor-pointer">
                            <button className="underline cursor-pointer text-card-foreground/80">
                              (*Markdown Guide*)
                            </button>
                          </HoverCardTrigger>
                          <HoverCardContent className="bg-secondary border rounded-md z-50">
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
                                  [link](https://mystartup.com)
                                </span>{' '}
                                →{' '}
                                <a
                                  href="https://mystartup.com"
                                  target="_blank"
                                  className="font-medium underline"
                                >
                                  link
                                </a>
                              </p>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </div>
                      <Textarea
                        id="headline"
                        rows={2}
                        placeholder="Headline..."
                        className="col-span-1 lg:col-span-2 text-sm"
                        {...form.register('headline')}
                      />
                      {form.formState.errors.headline && (
                        <p className="text-xs lg:text-sm text-destructive mt-1">
                          {form.formState.errors.headline.message}
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
            <TabsContent value="experience">
              {profile.experience.map((exp: any, index: number) => (
                <div key={index} className="w-full mt-4 p-4">
                  <div className="flex items-center justify-start gap-2">
                    <img src={exp.logo} className="w-8 h-8 rounded-full" />
                    <h3 className="text-lg font-semibold mr-2">{exp.company}</h3>
                    <Button
                      variant={'outline'}
                      size={'icon'}
                      className="p-1"
                      onClick={() => handleEdit(exp)}
                    >
                      <Pencil size={12} />
                    </Button>
                  </div>
                  {exp.roles.map((role: any, roleIndex: number) => (
                    <div
                      key={roleIndex}
                      className="flex items-center justify-start gap-2 mt-2 pl-4"
                    >
                      <CornerDownRight className="w-4 h-4 text-muted-foreground" />
                      <p className="text-sm font-medium">{role.title}</p>
                      <span className="text-xs text-muted-foreground">
                        ({role.start_date} - {role.end_date})
                      </span>
                    </div>
                  ))}
                </div>
              ))}
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Edit Experience</DialogTitle>
                  </DialogHeader>
                  {selectedExperience && (
                    <ExperienceUpdate
                      selectedExperience={selectedExperience}
                      onSubmit={handleUpdate}
                    />
                  )}
                </DialogContent>
              </Dialog>
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
              <div className="w-[270px] h-[590px] bg-secondary rounded-[36px] overflow-y-auto z-10 py-4 scrollbar-hidden no_scrollbar">
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="animate-spin text-primary" size={32} />
                </div>
              </div>
            ) : (
              <div className="w-[270px] h-[590px] bg-secondary rounded-[36px] overflow-y-auto z-10 py-4 scrollbar-hidden no_scrollbar">
                {/* URL Bar */}

                {/* Content */}
                <div className="p-4 space-y-2">
                  <div className="w-full bg-background rounded-full h-8 flex items-center justify-between px-2">
                    <img className="h-5 w-5 rounded-full" src={profile.favicon_url} />
                    <p className="text-xs">/{profile.username}</p>
                    <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/u/${profile.username}`}>
                      <ExternalLink strokeWidth={1.5} size={14} className="text-foreground" />
                    </Link>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <div className="w-12 h-12 p-0.5 border border-dashed border-primary rounded-full">
                      <img className="w-full h-full rounded-full" src={profile.avatar_url} />
                    </div>
                    <div className="flex flex-col items-start justify-center gap-1">
                      <p className="text-sm font-semibold ml-1">{full_name}</p>
                      <p className="flex text-xs font-medium gap-1">
                        <MapPin className="w-[14px] h-[14px] mr-[-2px]" />
                        {country.split('-')[0]}
                        <img
                          className="w-4"
                          src={`https://flagsapi.com/${country.split('-')[1]}/flat/64.png`}
                        />
                        <span className="h-[15px] w-px bg-primary mx-1" />
                        <span className="flex items-center">
                          <BiRupee className="w-4 h-4 mr-[-1px]" />2 cr/m
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="text-xxs font-medium text-center px-4">{headline}</div>
                  <div className="flex items-center justify-center text-xxs gap-2">
                    {profile.resume_url && (
                      <a
                        target="_blank"
                        className="flex items-center justify-center gap-0.5 underline underline-offset-1"
                        href={profile.resume_url}
                      >
                        <File className="w-[11px] h-[11px]" />
                        Resume
                      </a>
                    )}
                    {profileLink?.url && profileLink.text && (
                      <a
                        target="_blank"
                        href={profileLink.url}
                        className="flex items-center justify-center gap-0.5 underline underline-offset-1"
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
                        className="flex items-center font-medium justify-center gap-1 bg-primary/50 rounded-full px-2 py-0.5 text-tiny"
                      >
                        <img src={skill.logo} alt={skill.label} className="h-2 w-2" />
                        {skill.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    // <div className="flex gap-2 min-h-screen relative">
    //   <div className="lg:w-[60%] w-full lg:overflow-y-auto bg-lightprimary-bg dark:bg-primary-bg pt-4 px-0 lg:px-4"></div>
    //   <div className="flex justify-center items-center min-h-screen p-4">
    //     <div className="relative w-[300px] h-[620px] rounded-[50px] bg-black shadow-2xl overflow-hidden border-[14px] border-black">
    //       {/* Dynamic Island */}
    //       <div className="absolute top-[14px] left-1/2 -translate-x-1/2 bg-black rounded-full w-[100px] h-[20px] z-10"></div>

    //       {/* Side Buttons */}
    //       <div className="absolute left-[-6px] top-[100px] w-[4px] h-[40px] bg-gray-600 rounded-full"></div>
    //       <div className="absolute left-[-6px] top-[160px] w-[4px] h-[40px] bg-gray-600 rounded-full"></div>
    //       <div className="absolute right-[-6px] top-[130px] w-[4px] h-[60px] bg-gray-600 rounded-full"></div>

    //       {/* Screen */}
    //       <div className="w-full h-full bg-secondary rounded-[36px] overflow-hidden">
    //         {/* Browser URL Bar */}
    //         <div className="bg-secondary px-4 py-2 flex items-center space-x-2 text-sm">
    //           <div className="w-2 h-2 rounded-full bg-red-500"></div>
    //           <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
    //           <div className="w-2 h-2 rounded-full bg-green-500"></div>
    //           {/* <input
    //             type="text"
    //             value="https://example.com"
    //             className="ml-4 flex-1 bg-white border border-gray-300 rounded px-2 py-1 text-xs"
    //             readOnly
    //           /> */}
    //         </div>

    //         {/* Example content */}
    //         <div className="p-4 space-y-4">
    //           <h1 className="text-xl font-bold ">Welcome to Example</h1>
    //           <p className=" text-sm">
    //             This is a sample iPhone browser mockup. You can place your app preview or webpage
    //             here!
    //           </p>
    //           <button className="px-4 py-2 text-sm">Learn More</button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default UpdateForm;
