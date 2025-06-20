'use server';
import { z } from 'zod';
import { onboardingSchema, usernameSchema } from '@dr/schemas';
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

  if (!user) {
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

export async function updateLinkedinData(data: any, updateAvatar: boolean,avatar_url: string) {
  

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
      ...data,
      onboarding: 'completed',
      avatar_url: avatar_url,
      ...(updateAvatar && { avatar_url }),
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

export async function getAvatarUrl(avatarUrl: string) {
  
  if(avatarUrl === '' || !avatarUrl){
    return {
      success: false,
      message: `Invalid avatar url`,
    };
  }

  const supabase = createSClient();

  const response = await fetch(avatarUrl);
  const blob = await response.blob();


  const contentType = blob.type;
  const ext = contentType.split('/')[1] || 'jpg';


  const filePath = `${Date.now()}.${ext}`;

  // Upload to Supabase bucket
  const { error: uploadError } = await supabase.storage.from('userimages').upload(filePath, blob, {
    contentType: blob.type,
    upsert: true,
  });

  if (uploadError) {
    return {
      success: false,
      message: `Image upload error. ${uploadError.message}`,
    };
  }

  // Get the public URL
  const { data: publicUrlData } = supabase.storage.from('userimages').getPublicUrl(filePath);

  const publicUrl = publicUrlData.publicUrl;

  return{
    success: true,
    message: publicUrl,
  }
}
