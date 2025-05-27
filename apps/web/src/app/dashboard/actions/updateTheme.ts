'use server';

import { createSClient } from '@/supabase/server';
import { Theme } from '@lf/utils';

export async function updateTheme(data: Theme) {
  const supabase = createSClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
