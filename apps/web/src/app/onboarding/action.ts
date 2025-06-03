'use server';
import { z } from 'zod';
import { onboardingSchema } from '@lf/utils';
import { createSClient } from '@/supabase/server';

export async function onboardUser(data: z.infer<typeof onboardingSchema>) {
  const supabase = createSClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (data.username) {
    const { data: existingUsers, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', data.username);

    if (error) {
      return {
        success: false,
        field: 'username',
        message: 'Failed to check username. Please try again later.',
      };
    }

    if (existingUsers && existingUsers.length > 0) {
      return {
        success: false,
        field: 'username',
        message: 'Username is already taken.',
      };
    }
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
      ...(data.username && { username: data.username }),
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
