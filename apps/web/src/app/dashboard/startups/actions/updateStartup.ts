'use server';

import { createSClient } from '@/supabase/server';
import { Startup } from '@lf/schemas';

export async function updateStartup(data: Startup) {
  const supabase = await createSClient();
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
    .from('startups')
    .update({
      ...data,
    })
    .eq('id', data.id)
    .eq('user_id', user?.id);

  if (updateError) {
    return {
      success: false,
      message: `Startup update error. ${updateError.message}`,
    };
  }

  return {
    success: true,
    message: 'Startup update successfull.',
  };
}
