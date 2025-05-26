'use server';

import { createSClient } from '@/supabase/server';
import { Project } from '@lf/utils';

export async function updateProject(data: Project) {
  const supabase = await createSClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error: updateError } = await supabase
    .from('projects')
    .update({
      ...data,
    })
    .eq('id', data.id)
    .eq('user_id', user?.id);

  if (updateError) {
    return {
      success: false,
      message: `Project update error. ${updateError.message}`,
    };
  }

  return {
    success: true,
    message: 'Project update successfull.',
  };
}
