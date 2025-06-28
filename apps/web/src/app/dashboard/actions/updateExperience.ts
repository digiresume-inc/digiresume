'use server';
import { createSClient } from '@/supabase/server';

import type { Experience } from '@/lib/types/supabasetypes';

export async function updateExperience(data: Experience[]) {
  'use server';
  const supabase = createSClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if(!user){
    return {
      success: false,
      message: `Authentication error. User not found.`,
    };
  }

  const { error: updateError } = await supabase
    .from('profiles')
    .update({
      experience: data,
    })
    .eq('id', user?.id)

  if (updateError) {
    return {
      success: false,
      message: `Experience Update error. ${updateError.message}`,
    };
  }

  return {
    success: true,
    message: 'Experience updated successfully',
  };
}
