import { FlipWords } from '@/components/flipword';
import { cn } from '@lf/ui/lib/utils';
import { redirect } from 'next/navigation';
import React from 'react';
import OnboardingForm from '@/components/onboardingform';
import { createSClient } from '@/supabase/server';

const words = [
  'Startup ',
  'Project ',
  'Creation ',
  'Skills ',
  'Journey ',
  'Earnings ',
  'Blogs ',
  'Career ',
];

export default async function Onboarding() {
  const supabase = createSClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase.from('profiles').select('*').eq('id', user?.id).single();

  if (!user || data?.onboarding !== 'pending') {
    redirect('/');
  }

  return (
    <div className="flex flex-col items-start justify-start w-full h-screen relative overflow-hidden">
      <div className="absolute inset-0 z-[-1]">
        <div
          className={cn(
            'absolute inset-x-0 bottom-0 h-[350px]',
            '[background-size:20px_20px]',
            '[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]',
            'dark:[background-image:radial-gradient(#09090b_1px,transparent_1px)]',
            '[mask-image:linear-gradient(to_top,black,transparent)]',
            'dark:[mask-image:linear-gradient(to_top,black,transparent)]',
            'mask-image-[linear-gradient(to_top,black,transparent)]'
          )}
        />
        <div className="opacity-50 hidden lg:block">
          <FlipWords
            className="absolute top-1/4 right-1/12 text-5xl font-bold bricolage"
            words={words}
            duration={2000}
          />
        </div>
        <img
          className="absolute opacity-70 bottom-[-100px] right-0 hidden lg:block"
          src="/test/linkfolio_vertical_login.png"
        />
      </div>
      <OnboardingForm />
    </div>
  );
}
