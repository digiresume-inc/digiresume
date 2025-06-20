import { redirect } from 'next/navigation';
import React from 'react';
import OnboardingForm from './components/onboardingform';
import { createSClient } from '@/supabase/server';
import { GridGradient } from '@dr/ui/components/base/grid-gradient';
import { getUser } from '@/supabase/getUser';
import Image from 'next/image';

export default async function Onboarding() {
  const supabase = createSClient();
  const user = await getUser();

  const { data } = await supabase
    .from('profiles')
    .select('onboarding,username')
    .eq('id', user.id)
    .single();

  if (data?.onboarding !== 'pending') {
    redirect('/');
  }

  return (
    // <div className="flex flex-col items-start justify-start w-full h-screen relative overflow-hidden">
    //   <GridGradient className='h-[350px]'/>
    //   <OnboardingForm username={data.username} />
    // </div>

    <div className="h-screen w-full flex items-center justify-center bg-background overflow-hidden relative">
      <GridGradient className="h-[350px]" />
      <div className="flex w-full max-w-7xl mx-auto h-full">
        <div className="w-full lg:w-1/2 flex items-center justify-center relative">
          <OnboardingForm username={data.username} />
        </div>
        <div className="hidden lg:flex w-1/2 h-full items-center justify-center bg-transparent relative">
          <Image
            width={1024}
            height={1024}
            src="/product_showcase/onboarding_cover.png"
            alt="Cover"
            className="object-cover w-full h-full"
            priority
          />
        </div>
      </div>
    </div>
  );
}
