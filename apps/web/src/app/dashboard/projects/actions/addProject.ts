'use server';

import { createSClient } from '@/supabase/server';
import { Project } from '@dr/schemas';

export async function addProject(data: Project) {
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

  const { id, ...restData } = data;

  const { error: addError } = await supabase.from('projects').insert({
    user_id: user.id,
    ...restData,
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
