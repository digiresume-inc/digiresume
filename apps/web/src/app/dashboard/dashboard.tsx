'use client';
import React, { useState } from 'react';
import AvatarComponent from './components/avatar';
import FaviconComponent from './components/favicon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@dr/ui/components/base/tabs';
import TemplateSelect from './components/templateSelect';
import ExperienceUpdate from './components/experienceUpdate';
import SocialsUpdate from './components/socialsUpdate';
import MobilePreview from './components/mobilePreview';
import ProfileUpdate from './components/profileUpdate';
import PreviewButton from './components/previewButton';
import AnalyticsCard from './components/analyticsCard';
import { ExternalLink, FolderKanban } from 'lucide-react';
import LogoutConfirmation from '@/modals/logoutconfirmation';
import Link from 'next/link';
import Navbar from './components/navbar';

import type { Theme, Profile, Startup, Project } from '@/lib/types/supabasetypes';
import type { User } from '@supabase/supabase-js';

// type Profile = Database['public']['Tables']['profiles']['Row'];
// type Startup = Database['public']['Tables']['startups']['Row'];
// type Project = Database['public']['Tables']['projects']['Row'];

const Dashboard = ({
  user,
  profile,
  startups,
  projects,
}: {
  user: User;
  profile: Profile;
  startups: Startup[];
  projects: Project[];
}) => {
  const [preview, setPreview] = useState(false);
  const [localTheme, setLocalTheme] = useState<Theme>(profile.theme);
  const [logoutModal, setLogoutModal] = useState(false);

  return (
    <>
      <LogoutConfirmation modal={logoutModal} setModal={setLogoutModal} />
      <div className="relative flex flex-col lg:flex-row h-screen w-full max-w-7xl mx-auto gap-4">
        <div className="lg:w-[60%] w-full h-screen overflow-y-auto px-4 py-6 no_scrollbar scrollbar-hidden relative">
          <Navbar user={user} setLogoutModel={setLogoutModal} />
          <PreviewButton setPreview={setPreview} />
          <div className="w-full grid grid-cols-4 md:grid-cols-3 items-center justify-center gap-4 mt-4 px-4">
            <AvatarComponent avatar_url={profile.avatar_url} />
            <FaviconComponent favicon_url={profile.favicon_url} />
            <AnalyticsCard />
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
                  value="projects_startups"
                >
                  Projects/Startups
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
            <TabsContent value="projects_startups" className="mt-4">
              <div className="w-full mt-1 lg:px-8 py-4">
                <div className="flex flex-col items-center justify-start gap-2">
                  <Link href={'/dashboard/projects'} className="cursor-pointer flex items-center justify-between w-full bg-muted rounded-md px-3 py-2 text-foreground/70 hover:text-foreground transition-colors duration-200">
                    <FolderKanban strokeWidth={1}/>
                    <p>Add or edit Projects here</p>
                    <ExternalLink strokeWidth={1}/>
                  </Link>
                  <Link href={'/dashboard/startups'} className="cursor-pointer flex items-center justify-between w-full bg-muted rounded-md px-3 py-2 text-foreground/70 hover:text-foreground transition-colors duration-200">
                    <FolderKanban strokeWidth={1}/>
                    <p>Add or edit Startups here</p>
                    <ExternalLink strokeWidth={1}/>
                  </Link>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="socials" className="mt-4">
              <SocialsUpdate profile={profile} />
            </TabsContent>
            <TabsContent value="themes" className="mt-4">
              <TemplateSelect localTheme={localTheme} setLocalTheme={setLocalTheme} templateInfo={profile.template_info} />
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

export default Dashboard;
