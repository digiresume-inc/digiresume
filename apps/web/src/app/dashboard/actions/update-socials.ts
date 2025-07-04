'use server';
import { createSClient } from '@/supabase/server';

import type { Social } from '@/lib/types/supabase-types';



export async function updateSocials(data: Social[]) {
  const supabase = createSClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: `Authentication error. User not found.`,
    };
  }

  const { error: updateError } = await supabase
    .from('profiles')
    .update({
      socials: data,
    })
    .eq('id', user?.id);

  if (updateError) {
    return {
      success: false,
      message: `Socials Update error. ${updateError.message}`,
    };
  }

  return {
    success: true,
    message: 'Socials updated successfully',
  };
}
