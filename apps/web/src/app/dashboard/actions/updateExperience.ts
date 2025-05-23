'use server';
import { createSClient } from '@/supabase/server';
import { experienceSchema } from '@lf/utils';
import { z } from 'zod';

export async function updateExperience(data: z.infer<typeof experienceSchema>) {
  'use server';
  const supabase = createSClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
