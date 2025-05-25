import { createSClient } from '@/supabase/server';
import { Button } from '@lf/ui/components/base/button';
import { Plus } from 'lucide-react';
import React from 'react';
import StartupsDisplay from './components/startupsDisplay';

export default async function Startups() {
  const supabase = createSClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: startups, error } = await supabase
    .from('startups')
    .select('*')
    .eq('user_id', user?.id)
    .order('index', {ascending: true});
  if (error) {
    return <div>error</div>;
  }
  return (
    <div className="relative flex flex-col lg:flex-row h-screen w-full max-w-7xl mx-auto gap-4">
      <div className="lg:w-[60%] w-full h-screen overflow-y-auto px-4 py-6 no_scrollbar scrollbar-hidden">
        <StartupsDisplay startups={startups} />
      </div>
    </div>
  );
}
