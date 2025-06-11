'use server';
import { z } from 'zod';
import { onboardingSchema, usernameSchema } from '@lf/utils';
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
      full_name: data.full_name,
      headline: data.headline,
      company: data.company,
      country: data.country,
      education: data.education,
      socials: data.socials,
      skills: data.skills,
      onboarding: 'completed',
    })
    .eq('id', user?.id);

  if (onboardError) {
    return {
      success: false,
      message: 'Profile Update error.',
    };
  }

  if (data.startups && data.startups.length > 0) {
    const startupData = data.startups.map((startup: any) => ({
      user_id: user?.id,
      name: startup.name,
      url: startup.url,
      description: startup.description,
    }));

    const { error: startupInsertError } = await supabase.from('startups').insert(startupData);

    if (startupInsertError) {
      return {
        success: false,
        message: 'Failed to save startup details.',
      };
    }
  }

  return {
    success: true,
    message: 'Form Submit Successful.',
  };
}

export async function updateUsername(data: z.infer<typeof usernameSchema>) {
  const supabase = createSClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
