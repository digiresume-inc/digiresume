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
import PreviewButton from './components/previewButton';
import AnalyticsCard from './components/analyticsCard';
import { Button } from '@lf/ui/components/base/button';
import { LogOut } from 'lucide-react';
import LogoutConfirmation from '@/modals/logoutconfiramtion';

const DashboardHome = ({
  profile,
  startups,
  projects,
}: {
  profile: any;
  startups: any;
  projects: any;
}) => {
  const [preview, setPreview] = useState(false);
  const [localTheme, setLocalTheme] = useState<NewTheme | null>(profile.theme);
    const [logoutModal, setLogoutModal] = useState(false);

  return (
    <>
      <LogoutConfirmation modal={logoutModal} setModal={setLogoutModal} />
      <div className="relative flex flex-col lg:flex-row h-screen w-full max-w-7xl mx-auto gap-4">
        <div className="lg:w-[60%] w-full h-screen overflow-y-auto px-4 py-6 no_scrollbar scrollbar-hidden relative">
          <PreviewButton setPreview={setPreview} />
          <div className="w-full grid grid-cols-4 md:grid-cols-3 items-center justify-center gap-4">
            <AvatarComponent avatar_url={profile.avatar_url} />
            <FaviconComponent favicon_url={profile.favicon_url} />
            <AnalyticsCard />
          </div>
          <Button
            onClick={() => {
              setLogoutModal(true);
            }}
            variant={'destructive'}
            className="w-64 cursor-pointer mt-4"
          >
            Logout <LogOut />
          </Button>
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
              <ThemeSelect localTheme={localTheme} setLocalTheme={setLocalTheme} />
            </TabsContent>
          </Tabs>
        </div>
        <MobilePreview
          preview={preview}
          setPreview={setPreview}
          profile={profile}
          startups={startups}
          projects={projects}
          theme={localTheme}
        />
      </div>
    </>
  );
};

export default DashboardHome;
