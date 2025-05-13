'use client';
import { ToastSuccess } from '@/components/toast';
import { createClient } from '@/supabase/client';
import { Button } from '@lf/ui/components/base/button';
import { redirect } from 'next/navigation';
import React from 'react';

const Onboarding = () => {
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
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-20 mx-auto">
      <header className="onboarding-header">
        <h1>Welcome to Onboarding</h1>
      </header>
      <main className="p-4">
        <Button onClick={updateOnboardStatus} className="cursor-pointer" variant={'default'}>
          Skip Onboarding
        </Button>
      </main>
      <footer className="onboarding-footer">
        <p>&copy; {new Date().getFullYear()} Linkfolio</p>
      </footer>
    </div>
  );
};

export default Onboarding;
