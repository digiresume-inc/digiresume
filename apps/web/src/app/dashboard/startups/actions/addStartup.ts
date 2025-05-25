'use server';

import { createSClient } from '@/supabase/server';
import { Startup } from '@lf/utils';

export async function addStartup(data: Startup) {
  const supabase = await createSClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error: addError } = await supabase.from('startups').insert({
    user_id: user?.id,
    ...data,
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
