'use server';

import { createSClient } from '@/supabase/server';
import { Project } from '@lf/utils';

export async function addProject(data: Project) {
  const supabase = await createSClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error: addError } = await supabase.from('projects').insert({
    user_id: user?.id,
    ...data,
  });

  if (addError) {
    return {
      success: false,
      message: `Project entry error. ${addError.message}`,
    };
  }

  return {
    success: true,
    message: 'Project entry successfull.',
  };
}
