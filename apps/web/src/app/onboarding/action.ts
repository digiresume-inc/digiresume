'use server';
import { z } from 'zod';
import { onboardingSchema, usernameSchema } from '@lf/schemas';
import { createSClient } from '@/supabase/server';

export async function onboardUser(data: z.infer<typeof onboardingSchema>) {
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


  const { error: onboardError } = await supabase
    .from('profiles')
    .update({
      ...data,
      onboarding: 'completed',
    })
    .eq('id', user?.id);

  if (onboardError) {
    console.log(onboardError);
    return {
      success: false,
      message: 'Profile Update error.',
    };
  }

  return {
    success: true,
    message: 'Onboarding Completed.',
  };
}

export async function updateUsername(data: z.infer<typeof usernameSchema>) {
  const supabase = createSClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if(!user){
    return {
      success: false,
      message: `Authentication error. User not found.`,
    };
  }
  const { data: existingUsers, error } = await supabase
    .from('profiles')
    .select('username')
    .eq('username', data.username);

  if (existingUsers && existingUsers.length > 0) {
    return {
      success: false,
      message: 'Sorry, username already taken. 😔',
    };
  }

  const { error: updateError } = await supabase
    .from('profiles')
    .update({
      username: data.username,
    })
    .eq('id', user?.id);

  if (updateError) {
    return {
      success: false,
      message: 'Username update error.',
    };
  }
  return {
    success: true,
    message: 'Username updated successfully.',
  };
}

export async function updateLinkedinData(data: any) {
  const supabase = createSClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

    if(!user){
    return {
      success: false,
      message: `Authentication error. User not found.`,
    };
  }

  const { error: updateError } = await supabase
    .from('profiles')
    .update({
      ...data,
      onboarding: 'completed',
    })
    .eq('id', user?.id);

  if (updateError) {
    return {
      success: false,
      message: `Linkedin update error. ${updateError.message}`,
    };
  }

  return {
    success: true,
    message: 'Profile updated successfully.',
  };
}
