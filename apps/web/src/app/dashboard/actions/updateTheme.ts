'use server';

import { Theme } from '@/lib/types/supabasetypes';
import { createSClient } from '@/supabase/server';

export async function updateTheme(data: Theme) {
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
      theme: data,
    })
    .eq('id', user?.id);

  if (updateError) {
    return {
      success: false,
      message: `Theme Update error. ${updateError.message}`,
    };
  }

  return {
    success: true,
    message: 'Theme updated successfully',
  };
}
