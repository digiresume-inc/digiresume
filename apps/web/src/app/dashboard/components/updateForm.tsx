'use client';
import { Button } from '@lf/ui/components/base/button';
import { countries, Skill } from '@lf/utils';
import {
  X,
  BatteryLow,
  SignalMedium,
  ExternalLink,
  Link,
  FileUser,
  Loader2,
  Cross,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import AvatarComponent from './avatar';
import FaviconComponent from './favicon';
import ResumeComponent from './resume';
import { Input } from '@lf/ui/components/base/input';
import { CountryCombobox } from '@/components/countryselect';
import { Controller, useForm } from 'react-hook-form';

const UpdateForm = ({ profile }: { profile: any }) => {
  const [preview, setPreview] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const form = useForm({
    defaultValues: {
      full_name: '',
      username: '',
      email: '',
      country: '',
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        full_name: profile.full_name || '',
        username: profile.username || '',
        email: profile.email || '',
        country: profile.country || '',
      });
    }
  }, [profile, form]);

  const { control } = form;

  return (
    <div className="relative flex flex-col lg:flex-row min-h-screen w-full max-w-7xl mx-auto gap-4">
      {/* Left: Scrollable Content */}
      <div className="lg:w-[60%] w-full h-screen overflow-y-auto px-4 py-6 no_scrollbar scrollbar-hidden">
        <div className="w-full grid grid-cols-4 lg:grid-cols-3 items-center justify-center gap-4">
          <AvatarComponent avatar_url={profile.avatar_url} />
          <FaviconComponent favicon_url={profile.favicon_url} />
          <ResumeComponent resume_url={profile.resume_url} />
        </div>
        <form>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
            <Input
              id="username"
              type="text"
              placeholder="Username"
              autoComplete="off"
              {...form.register('username')}
              readOnly
            />
            <Input
              id="email"
              type="email"
              placeholder="Email address"
              autoComplete="off"
              {...form.register('email')}
              readOnly
            />
            <Input
              id="full_name"
              type="text"
              placeholder="Full name"
              autoComplete="off"
              {...form.register('full_name')}
            />
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
            <Button type="submit" variant={'outline'}>
              Submit
            </Button>
          </div>
        </form>
        {/* Mobile: Toggle overlay button */}
        <div className="lg:hidden mt-6">
          <button
            onClick={() => setShowOverlay(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Open Panel
          </button>
        </div>
      </div>

      <div
        className={`${
          showOverlay ? 'flex' : 'hidden'
        } lg:flex lg:w-[40%] w-full h-screen p-4 fixed top-0 left-0 lg:static bg-background/50 backdrop-blur`}
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
            <div className="w-[270px] h-[590px] bg-secondary rounded-[36px] overflow-y-auto z-10 py-4 scrollbar-hidden no_scrollbar">
              {/* URL Bar */}

              {/* Content */}
              <div className="p-4 space-y-4">
                <div className="w-full bg-background rounded-full h-8 flex items-center justify-between px-2">
                  <img
                    className="h-5 w-5 rounded-full"
                    src="https://randomuser.me/api/portraits/men/4.jpg"
                  />
                  <p className="text-xs">/prasadreddy03</p>
                  <ExternalLink strokeWidth={1.5} size={14} className="text-foreground" />
                </div>

                <h1 className="text-xl font-bold">Welcome to Example</h1>
                <p className="text-sm">
                  This is a sample iPhone browser mockup. You can place your app preview or webpage
                  here!
                </p>
                <button className="px-4 py-2 text-sm bg-primary text-white rounded">
                  Learn More
                </button>
                <h1 className="text-xl font-bold">Welcome to Example</h1>
                <p className="text-sm">
                  This is a sample iPhone browser mockup. You can place your app preview or webpage
                  here!
                </p>
                <button className="px-4 py-2 text-sm bg-primary text-white rounded">
                  Learn More
                </button>
                <h1 className="text-xl font-bold">Welcome to Example</h1>
                <p className="text-sm">
                  This is a sample iPhone browser mockup. You can place your app preview or webpage
                  here!
                </p>
                <button className="px-4 py-2 text-sm bg-primary text-white rounded">
                  Learn More
                </button>
                <h1 className="text-xl font-bold">Welcome to Example</h1>
                <p className="text-sm">
                  This is a sample iPhone browser mockup. You can place your app preview or webpage
                  here!
                </p>
                <button className="px-4 py-2 text-sm bg-primary text-white rounded">
                  Learn More
                </button>
              </div>
            </div>
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
