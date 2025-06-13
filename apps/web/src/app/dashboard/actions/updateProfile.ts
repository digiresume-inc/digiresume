'use server';

import { createSClient } from '@/supabase/server';
import { profileUpdateSchema } from '@dr/schemas';
import { z } from 'zod';

export async function updateProfile(data: z.infer<typeof profileUpdateSchema>) {
  'use server';
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
      ...data,
    })
    .eq('id', user?.id);

  if (updateError) {
    return {
      success: false,
      message: `Profile Update error. ${updateError.message}`,
    };
  }

  return {
    success: true,
    message: 'Profile updated successfully',
  };
}
