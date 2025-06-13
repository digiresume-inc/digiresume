'use server';

import { createSClient } from '@/supabase/server';
import { Startup } from '@dr/schemas';

export async function addStartup(data: Startup) {
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

  const {id, ...restData} = data

  const { error: addError } = await supabase.from('startups').insert({
    user_id: user?.id,
    ...restData,
  });

  if (addError) {
    return {
      success: false,
      message: `Startup entry error. ${addError.message}`,
    };
  }

  return {
    success: true,
    message: 'Startup entry successfull.',
  };
}
