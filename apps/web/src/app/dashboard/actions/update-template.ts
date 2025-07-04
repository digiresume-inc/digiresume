'use server';
import { GridSingleInfo, TemplateInfo } from '@/lib/types/supabase-types';
import { createSClient } from '@/supabase/server';

type KnownTemplates = keyof TemplateInfo['templates'];

export async function updateTemplate(templateType: KnownTemplates, templateInfo: TemplateInfo) {
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

  const updatedTemplateInfo: TemplateInfo = {
    ...templateInfo,
    activeTemplate: templateType,
  };

  const { error: updateError } = await supabase
    .from('profiles')
    .update({
      template_info: updatedTemplateInfo,
    })
    .eq('id', user?.id);

  if (updateError) {
    return {
      success: false,
      message: `Template Update error. ${updateError.message}`,
    };
  }

  return {
    success: true,
    message: 'Template updated successfully',
  };
}

export async function addInfoUpdateTemplate(
  templateType: KnownTemplates,
  pastInfo: TemplateInfo,
  toBeUpdated: any
) {
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

  const updatedTemplateInfo: TemplateInfo = {
    activeTemplate: templateType,
    templates: {
      ...pastInfo.templates,
      [templateType]: toBeUpdated,
    },
  };

  const { error: updateError } = await supabase
    .from('profiles')
    .update({
      template_info: updatedTemplateInfo,
    })
    .eq('id', user?.id);

  if (updateError) {
    return {
      success: false,
      message: `Template Update error. ${updateError.message}`,
    };
  }

  return {
    success: true,
    message: 'Template updated successfully',
  };
}
