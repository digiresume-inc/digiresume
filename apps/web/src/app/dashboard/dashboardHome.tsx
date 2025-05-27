'use client';
import { NewTheme } from '@lf/utils';
import React, { useState } from 'react';
import AvatarComponent from './components/avatar';
import FaviconComponent from './components/favicon';
import ResumeComponent from './components/resume';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@lf/ui/components/base/tabs';
import ThemeSelect from './components/themeSelect';
import ExperienceUpdate from './components/experienceUpdate';
import SocialsUpdate from './components/socialsUpdate';
import MobilePreview from './components/mobilePreview';
import ProfileUpdate from './components/profileUpdate';
import { Eye } from 'lucide-react';

const DashboardHome = ({
  profile,
  startups,
  projects,
}: {
  profile: any;
  startups: any;
  projects: any;
}) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [localTheme, setLocalTheme] = useState<NewTheme | null>(profile.theme);

  return (
    <div className="relative flex flex-col lg:flex-row h-screen w-full max-w-7xl mx-auto gap-4">
      {/* Left: Scrollable Content */}
      <div className="lg:w-[60%] w-full h-screen overflow-y-auto px-4 py-6 no_scrollbar scrollbar-hidden relative">
        <div
          onClick={() => setShowOverlay(true)}
          className="lg:hidden font-bold py-1 px-2 inline-flex items-center justify-center  rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border w-[120px] bottom-6 fixed left-1/2 translate-x-[-50%] z-[48]"
        >
          <Eye
            strokeWidth={1}
            className="mr-1"
          />
          <p className="font-semibold text-base">
            Preview
          </p>
        </div>
        <div className="w-full grid grid-cols-4 md:grid-cols-3 items-center justify-center gap-4">
          <AvatarComponent avatar_url={profile.avatar_url} />
          <FaviconComponent favicon_url={profile.favicon_url} />
          <ResumeComponent resume_url={profile.resume_url} />
        </div>
        <Tabs defaultValue="profile" className="w-full mt-12 mb-12">
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
            <ProfileUpdate profile={profile} />
          </TabsContent>
          <TabsContent value="experience" className="mt-4">
            <ExperienceUpdate profile={profile} />
          </TabsContent>
          <TabsContent value="socials" className="mt-4">
            <SocialsUpdate profile={profile} />
          </TabsContent>
          <TabsContent value="themes" className="mt-4">
            <ThemeSelect
              theme={profile.theme}
              localTheme={localTheme}
              setLocalTheme={setLocalTheme}
            />
          </TabsContent>
        </Tabs>
      </div>
      <MobilePreview
        showOverlay={showOverlay}
        setShowOverlay={setShowOverlay}
        profile={profile}
        startups={startups}
        projects={projects}
        theme={localTheme}
      />
    </div>
  );
};

export default DashboardHome;
