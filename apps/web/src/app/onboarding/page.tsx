import { FlipWords } from '@/components/homepage/flipword';
import { cn } from '@dr/ui/lib/utils';
import { redirect } from 'next/navigation';
import React from 'react';
import OnboardingForm from './components/onboardingform';
import { createSClient } from '@/supabase/server';
import Image from 'next/image';

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
  if (!user) {
    redirect('/signin');
  }
  const { data, error } = await supabase
    .from('profiles')
    .select('onboarding,username')
    .eq('id', user?.id)
    .single();

  if (data?.onboarding !== 'pending') {
    redirect('/');
  }

  return (
    <div className="flex flex-col items-start justify-start w-full h-screen relative overflow-hidden">
      <div className="absolute inset-0 z-[-1]">
        <div
          className={cn(
            'absolute inset-x-0 bottom-0 h-[350px]',
            '[background-size:40px_40px]',
            '[background-image:linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)]',
            '[mask-image:linear-gradient(to_top,black,transparent)]',
            'dark:[mask-image:linear-gradient(to_top,black,transparent)]',
            'mask-image-[linear-gradient(to_top,black,transparent)]'
          )}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-background"></div>
      <OnboardingForm username={data.username} />
    </div>
  );
}
