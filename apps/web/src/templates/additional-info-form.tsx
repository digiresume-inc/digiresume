import React, { JSX } from 'react';
import { TemplateInfo } from '@/lib/types/supabase-types';
import GridSingleForm from './grid-single/forms/grid-single-form';

type FormType = keyof TemplateInfo['templates'];

type Props= {
  formType: FormType;
  actionType: 'add' | 'edit',
  templateInfo: TemplateInfo;
  setModalOpen:  React.Dispatch<React.SetStateAction<boolean>>;
};

const AdditionalInfoForm = ({ formType, actionType, templateInfo, setModalOpen }: Props) => {
  const componentMap: Partial<Record<FormType, JSX.Element>> = {
    'grid-single': <GridSingleForm  data={templateInfo?.templates['grid-single']} actionType={actionType} fullData={templateInfo} setModalOpen={setModalOpen} />,
  };

  return componentMap[formType] ?? null;
};

export default AdditionalInfoForm;
