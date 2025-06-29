import React, { JSX } from 'react';
import { TemplateInfo } from '@/lib/types/supabasetypes';
import GridSingleForm from './grid-single/forms/grid-single-form';

type FormType = keyof TemplateInfo['templates'];

type Props= {
  formType: FormType;
  actionType: 'add' | 'edit',
  templateInfo?: TemplateInfo;
};

const AdditionalInfoForm = ({ formType, actionType, templateInfo }: Props) => {
  const componentMap: Partial<Record<FormType, JSX.Element>> = {
    'grid-single': <GridSingleForm data={templateInfo?.templates['grid-single']} actionType={actionType} />,
  };

  return componentMap[formType] ?? null;
};

export default AdditionalInfoForm;
