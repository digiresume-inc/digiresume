'use server';

import { createSClient } from '@/supabase/server';
import { SocialsSchema } from '@lf/utils';

type links = SocialsSchema['links'];
export async function updateSocials(data: links) {
  const supabase = createSClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
