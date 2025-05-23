// ExperienceUpdate.tsx
'use client';
import React from 'react';
import { singleExperienceSchema } from '@lf/utils';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@lf/ui/components/base/button';
import { Label } from '@lf/ui/components/base/label';
import { Input } from '@lf/ui/components/base/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@lf/ui/components/base/select';

type SingleExperience = z.infer<typeof singleExperienceSchema>;

const ExperienceUpdate = ({
  selectedExperience,
  onSubmit,
}: {
  selectedExperience: SingleExperience;
  onSubmit: (data: SingleExperience) => void;
}) => {
  const form = useForm<SingleExperience>({
    resolver: zodResolver(singleExperienceSchema),
    defaultValues: selectedExperience,
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'roles',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
      {/* Company Info */}
      <div className="grid grid-cols-4 items-center gap-2">
        <Label htmlFor="company" className="text-right">
          Company
        </Label>
        <Input {...register('company')} id="company" className="col-span-3" />
      </div>

      <div className="grid grid-cols-4 items-center gap-2">
        <Label htmlFor="company_link" className="text-right">
          Company Link
        </Label>
        <Input {...register('company_link')} id="company_link" className="col-span-3" />
      </div>

      <div className="grid grid-cols-4 items-center gap-2">
        <Label htmlFor="logo" className="text-right">
          Logo
        </Label>
        <Input {...register('logo')} id="logo" className="col-span-3" />
      </div>

      {/* Roles Field Array */}
      <div className="mt-1 space-y-1">
        <h3 className="text-md font-semibold">Roles</h3>
        {fields.map((role, index) => (
          <div key={role.id} className="p-1 border rounded-lg space-y-1">
            <div className="grid grid-cols-4 items-center gap-2">
              <Label className="text-right">Title</Label>
              <Input {...register(`roles.${index}.title`)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label className="text-right">Location</Label>
              <Input {...register(`roles.${index}.location`)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label className="text-right">Type</Label>
              <div className="col-span-3">
                <Controller
                  control={control}
                  name={`roles.${index}.type`}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Self-employed">Self-employed</SelectItem>
                        <SelectItem value="Freelance">Freelance</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                        <SelectItem value="Trainee">Trainee</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label className="text-right">Start</Label>
              <Input {...register(`roles.${index}.start_date`)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label className="text-right">End</Label>
              <Input {...register(`roles.${index}.end_date`)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label className="text-right">Is Current?</Label>
              <input
                type="checkbox"
                {...register(`roles.${index}.is_current`)}
                className="col-span-1"
              />
            </div>
            <div className="flex justify-end">
              <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}>
                Remove Role
              </Button>
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              title: '',
              type: '',
              start_date: '',
              end_date: '',
              location: '',
              is_current: false,
            })
          }
        >
          + Add Role
        </Button>
      </div>

      {/* Submit */}
      <div className="flex justify-end mt-2">
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  );
};

export default ExperienceUpdate;
