'use client';
import { ToastSuccess } from '@/components/toast';
import { createClient } from '@/supabase/client';
import { Button } from '@lf/ui/components/base/button';
import { Input } from '@lf/ui/components/base/input';
import { redirect } from 'next/navigation';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@lf/ui/components/base/select';
import { Link, Plus, Projector, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@lf/ui/components/base/card';
import { Textarea } from '@lf/ui/components/base/textarea';
import { SiLinkedin } from 'react-icons/si';
import { BiEdit } from 'react-icons/bi';

const OnboardingForm = () => {
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
  return (
    <div className="w-full h-full px-6 py-12 lg:px-30 lg:py-24">
      <header className="mb-6">
        <h1 className="text-2xl lg:text-4xl font-bold">Welcome to Onboarding</h1>
      </header>
      <div className="absolute top-[80px] lg:top-[140px] w-full lg:max-w-2xl left-12 right-12 h-36 pointer-events-none bg-gradient-to-b from-background/80 to-transparent z-10" />
      <main className="w-full max-w-2xl flex-1 overflow-y-auto h-full no_scrollbar scrollbar-hidden relative">
        <div className="flex items-start justify-start gap-3 mb-4 h-fit relative">
          <div className="absolute w-px h-full bg-border left-5 top-4"></div>
          <div className="w-full h-8 bg-transparent"></div>
        </div>
        <div className="flex items-start justify-start gap-3 mb-4 h-fit relative">
          <div className="min-w-10 min-h-10 bg-transparent rounded-full border flex items-center justify-center">
            1
          </div>
          <div className="absolute w-px h-[calc(100%-25px)] bg-border left-5 top-10"></div>
          <div className="flex flex-col items-start justify start px-3 py-2 gap-4">
            <h1 className="text-lg lg:text-xl font-semibold">Select onboarding type</h1>
            <Button className="min-w-58">
              Import from Linkedin <SiLinkedin />
            </Button>
            <Button className="min-w-58">
              Start from scratch <BiEdit />
            </Button>
          </div>
        </div>
        <div className="flex items-start justify-start gap-3 mb-4 h-fit relative w-full">
          <div className="min-w-10 min-h-10 bg-transparent rounded-full border flex items-center justify-center">
            2
          </div>
          <div className="absolute w-px h-[calc(100%-25px)] bg-border left-5 top-10"></div>
          <div className="flex flex-col items-start justify start px-3 py-2 gap-4 w-full">
            <h1 className="text-lg lg:text-xl font-semibold flex gap-2 items-center justify-center">
              Profile information <User />
            </h1>
            <Input
              className="bg-secondary w-full max-w-64"
              type="text"
              placeholder="Enter your name"
            />
            <Input
              className="bg-secondary w-full max-w-64"
              type="text"
              placeholder="Select your country"
            />
          </div>
        </div>
        <div className="flex items-start justify-start gap-3 mb-4 h-fit relative w-full">
          <div className="min-w-10 min-h-10 bg-transparent rounded-full border flex items-center justify-center">
            3
          </div>
          <div className="absolute w-px h-[calc(100%-25px)] bg-border left-5 top-10"></div>
          <div className="flex flex-col items-start justify start px-3 py-2 gap-4 w-full">
            <h1 className="text-lg lg:text-xl font-semibold flex gap-2 items-center justify-center">
              Any important Links <Link />
            </h1>
            <Input
              className="bg-secondary w-full max-w-74"
              type="text"
              placeholder="https://yourlink.com/username"
            />
            <Button className="w-full max-w-74" variant={'outline'} size={'sm'}>
              Add more <Plus />
            </Button>
          </div>
        </div>
        <div className="flex items-start justify-start gap-3 mb-4 h-fit relative w-full">
          <div className="min-w-10 min-h-10 bg-transparent rounded-full border flex items-center justify-center">
            4
          </div>
          <div className="absolute w-px h-[calc(100%-25px)] bg-border left-5 top-10"></div>
          <div className="flex flex-col items-start justify start px-3 py-2 gap-4 w-full">
            <h1 className="text-lg lg:text-xl font-semibold">Skills</h1>
            <Select>
              <SelectTrigger className="w-full max-w-74 bg-secondary">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-start justify-start gap-3 mb-4 h-fit relative w-full">
          <div className="min-w-10 min-h-10 bg-transparent rounded-full border flex items-center justify-center">
            5
          </div>
          <div className="absolute w-px h-[calc(100%-25px)] bg-border left-5 top-10"></div>
          <div className="flex flex-col items-start justify start px-3 py-2 gap-4 w-full">
            <h1 className="text-lg lg:text-xl font-semibold flex items-center justify-center gap-2">
              Startups/Projects <Projector />
            </h1>
            <Card className="w-full">
              <CardHeader>Startup1</CardHeader>
              <CardContent>
                <Input
                  className="bg-secondary w-full max-w-64"
                  type="text"
                  placeholder="Enter your startup name"
                />
                <Textarea
                  rows={3}
                  placeholder="HOw crazy is your startup"
                  className="bg-secondary w-full max-w-64"
                />
              </CardContent>
            </Card>
          </div>
        </div>
        {/* <Button onClick={updateOnboardStatus} className="cursor-pointer" variant={'default'}>
        Skip Onboarding
      </Button> */}
        {/* <MultiStepForm /> */}
      </main>
      <footer className="onboarding-footer">
        <p>&copy; {new Date().getFullYear()} Linkfolio</p>
      </footer>
    </div>
  );
};

export default OnboardingForm;
