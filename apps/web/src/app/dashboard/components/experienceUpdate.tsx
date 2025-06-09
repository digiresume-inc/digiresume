'use client';
import { formatMonthYear, singleExperienceSchema } from '@lf/utils';
import React, { useState } from 'react';
import { z } from 'zod';
import { updateExperience } from '../actions/updateExperience';
import { ToastError, ToastSuccess } from '@/components/toast';
import { Button } from '@lf/ui/components/base/button';
import { BriefcaseBusiness, CornerDownRight, Loader2, Pencil, Plus, Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@lf/ui/components/base/dialog';
import ExperienceForm from '../forms/experienceForm';
import { useRouter } from 'next/navigation';

type SingleExperience = z.infer<typeof singleExperienceSchema>;

const ExperienceUpdate = ({ profile }: { profile: any }) => {
  const [selectedExperience, setSelectedExperience] = useState<SingleExperience | null>(null);
  const [deletingA, setDeletingA] = useState<number | null>(null);
  const [actionType, setActionType] = useState('Add');
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const emptyExperience: SingleExperience = {
    a: profile.experience ? profile.experience.length + 1 : 1,
    company: '',
    company_link: '',
    contribution: '',
    roles: [
      {
        headline: '',
        employment_type: 'Full-time',
        start_date: '',
        end_date: '',
        location: '',
        location_type: 'On-site',
        currently_working: false,
      },
    ],
  };

  const handleEdit = (exp: SingleExperience) => {
    setActionType('Edit');
    setSelectedExperience(exp);
    setOpen(true);
  };

  const handleNewExperience = (exp: SingleExperience) => {
    setActionType('Add');
    setSelectedExperience(exp);
    setOpen(true);
  };

  const handleDelete = async (expToDelete: SingleExperience) => {
    setDeletingA(expToDelete.a);

    const updatedExperienceList = profile.experience.filter(
      (exp: SingleExperience) => exp.a !== expToDelete.a
    );

    const result = await updateExperience(updatedExperienceList);

    if (result.success) {
      ToastSuccess({ message: 'Experience deleted.' });
      setOpen(false);
      router.refresh();
    } else {
      ToastError({ message: result.message || 'Failed to delete experience.' });
    }

    setDeletingA(null);
  };

  const handleUpdate = async (updatedExp: SingleExperience) => {
    const isUpdate = profile.experience.some((exp: SingleExperience) => exp.a === updatedExp.a);

    // Check for duplicate company_link if it's a new addition
    if (!isUpdate) {
      const isDuplicateCompany = profile.experience.some(
        (exp: SingleExperience) => exp.company_link === updatedExp.company_link
      );

      if (isDuplicateCompany) {
        ToastError({ message: 'Experience with this company link already exists.' });
        return;
      }
    }

    const updatedExperienceList = isUpdate
      ? profile.experience.map((exp: SingleExperience) =>
          exp.a === updatedExp.a ? { ...updatedExp } : exp
        )
      : [...profile.experience, updatedExp];

    const result = await updateExperience(updatedExperienceList);

    if (result.success) {
      ToastSuccess({ message: result.message });
      setOpen(false);
      router.refresh();
    } else {
      ToastError({ message: result.message || 'Something went wrong' });
    }
  };

  return (
    <>
      {profile.experience.length > 0 ? (
        <div>
          {profile.experience.map((exp: any, index: number) => (
            <div key={index} className="w-full mt-1 lg:px-8 py-4">
              <div className="flex items-center justify-start gap-2">
                <img
                  src={
                    exp.company_link
                      ? `https://www.google.com/s2/favicons?sz=128&domain_url=${exp.company_link}`
                      : '/company.png'
                  }
                  className="w-8 h-8 rounded-full"
                />
                <h3 className="text-lg font-semibold mr-2">{exp.company}</h3>
                <Button
                  variant={'outline'}
                  size={'icon'}
                  className="p-1"
                  onClick={() => handleEdit(exp)}
                >
                  <Pencil size={12} />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  className="p-1"
                  onClick={() => handleDelete(exp)}
                  disabled={deletingA === exp.a}
                >
                  {deletingA === exp.a ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash size={12} />
                  )}
                </Button>
              </div>
              {exp.roles.map((role: any, roleIndex: number) => (
                <div key={roleIndex} className="flex items-start justify-start gap-2 mt-2 pl-4">
                  <CornerDownRight className="w-4 h-4 text-muted-foreground" />
                  <div className="flex flex-col items-start justify-center">
                    <span className="flex items-center justify-start gap-1">
                      <p className="text-sm font-medium">{role.headline}</p>
                      <p>&#183;</p>
                      <span className="text-xs text-muted-foreground">{role.employment_type}</span>
                    </span>
                    <span className="flex items-center justify-start gap-1">
                      <span className="text-xs text-muted-foreground">
                        ({formatMonthYear(role.start_date)} -{' '}
                        {role.end_date ? formatMonthYear(role.end_date) : 'Present'})
                      </span>
                      <p>&#183;</p>
                      <span className="text-xs text-muted-foreground">{role.location}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}

          <div className="lg:px-12">
            <Button
              onClick={() => {
                handleNewExperience(emptyExperience);
              }}
              variant={'outline'}
              className="w-full"
            >
              Add Experience <Plus />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center bg-muted/40 rounded-2xl p-6 shadow-sm h-[300px] border border-dashed border-border transition-colors">
          <BriefcaseBusiness size={64} className="text-muted-foreground mb-4 opacity-60" />
          <h1 className="text-lg font-semibold text-muted-foreground mb-2 opacity-60">
            No Experience added yet
          </h1>
          <p className="text-sm text-muted-foreground mb-4 max-w-xs opacity-60">
            You haven't added experience to your profile yet.
          </p>
          <Button
            onClick={() => handleNewExperience(emptyExperience)}
            variant="outline"
            className="flex items-center gap-2 opacity-100"
          >
            <Plus className="w-4 h-4" />
            Add Experience
          </Button>
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[70vh] overflow-y-auto scrollbar-hidden no_scrollbar">
          <DialogHeader className="mb-4">
            <DialogTitle>{actionType} Experience</DialogTitle>
          </DialogHeader>
          {selectedExperience && (
            <ExperienceForm
              selectedExperience={selectedExperience}
              onSubmit={handleUpdate}
              actionType={actionType}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExperienceUpdate;
