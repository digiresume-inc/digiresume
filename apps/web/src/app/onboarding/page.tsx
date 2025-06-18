import { redirect } from 'next/navigation';
import React from 'react';
import OnboardingForm from './components/onboardingform';
import { createSClient } from '@/supabase/server';
import {GridGradient} from "@dr/ui/components/base/grid-gradient"
import { getUser } from '@/supabase/getUser';

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
    <div className="flex flex-col items-start justify-start w-full h-screen relative overflow-hidden">
      <GridGradient className='h-[350px]'/>
      <OnboardingForm username={data.username} />
    </div>
  );
}
