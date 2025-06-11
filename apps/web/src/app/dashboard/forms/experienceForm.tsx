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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@lf/ui/components/base/select';
import { Switch } from '@lf/ui/components/base/switch';
import { Check, Loader2, Save, X } from 'lucide-react';
import { Textarea } from '@lf/ui/components/base/textarea';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@lf/ui/components/base/hover-card';
import { SkillsSelect } from '@/components/skillselect';

type SingleExperience = z.infer<typeof singleExperienceSchema>;

const ExperienceForm = ({
  selectedExperience,
  onSubmit,
  actionType,
}: {
  selectedExperience: SingleExperience;
  onSubmit: (data: SingleExperience) => void;
  actionType: String;
}) => {
  const form = useForm<SingleExperience>({
    resolver: zodResolver(singleExperienceSchema),
    defaultValues: selectedExperience,
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
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
        <Input {...register('company')} id="company" className="col-span-3 " />
        {errors.company && (
          <p className="text-red-500 col-start-2 col-span-3 text-sm">{errors.company.message}</p>
        )}
      </div>

      <div className="grid grid-cols-4 items-center gap-2">
        <Label htmlFor="company_link" className="text-right">
          Company Link
        </Label>
        <Input {...register('company_link')} id="company_link" className="col-span-3" />
        {errors.company_link && (
          <p className="text-red-500 col-start-2 col-span-3 text-sm">
            {errors.company_link.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-4 items-center gap-2">
        <Label
          htmlFor="contribution"
          className="text-right flex flex-col items-start justify-center"
        >
          <span>Contribution</span>
          <HoverCard openDelay={250}>
            <HoverCardTrigger>
              <span className="text-xs underline text-primary font-medium cursor-pointer">
                Markdown Guide *
              </span>
            </HoverCardTrigger>
            <HoverCardContent className="bg-secondary border-foreground/20 rounded-md z-50">
              <div className="flex flex-col p-2">
                <p className="text-sm font-semibold text-lightprimary-text/80 dark:text-primary-text/80">
                  Markdown guide
                </p>
                <p className="text-xs text-lightprimary-text/80 dark:text-primary-text/80 mt-2">
                  <span className="text-lightaccent-text dark:text-accent-text">**text**</span> →{' '}
                  <span className="font-bold">text</span>
                </p>
                <p className="text-xs text-lightprimary-text/80 dark:text-primary-text/80">
                  <span className="text-lightaccent-text dark:text-accent-text">*text*</span> →{' '}
                  <span className="italic">text</span>
                </p>
                <p className="text-xs text-lightprimary-text/80 dark:text-primary-text/80">
                  <span className="text-lightaccent-text dark:text-accent-text">
                    [link](https://feature.com)
                  </span>{' '}
                  →{' '}
                  <a href="https://feature.com" target="_blank" className="font-medium underline">
                    link
                  </a>
                </p>
                <p className="text-xs text-lightprimary-text/80 dark:text-primary-text/80">
                  <span className="text-lightaccent-text dark:text-accent-text">==text==</span> →{' '}
                  <mark className="bg-yellow-200/70 rounded px-0.5 shadow-[inset_0_-0.15em_0_rgba(253,224,71,0.6)]">
                    text
                  </mark>
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </Label>
        <Textarea
          rows={2}
          {...register('contribution')}
          id="contribution"
          className="col-span-3"
          placeholder="Describe your role, key contributions, and the impact you made…"
        />
        {errors.contribution && (
          <p className="text-red-500 col-start-2 col-span-3 text-sm">
            {errors.contribution.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-4 items-center gap-2">
        <Label htmlFor="company_link">Skills used</Label>
        <div className="col-span-4">
          <SkillsSelect
            value={form.watch('skills_used') ?? []}
            onChange={(v) => form.setValue('skills_used', v, { shouldDirty: true })}
            largeBadge
          />
        </div>
        {errors.skills_used && (
          <p className="text-red-500 col-start-2 col-span-3 text-sm">
            {errors.skills_used.message}
          </p>
        )}
      </div>

      {/* Roles Field Array */}
      <div className="mt-2 space-y-2">
        <h3 className="text-md font-semibold">Roles</h3>
        {errors.roles && <p className="text-red-500 text-sm">{errors.roles.message}</p>}

        {fields.map((role, index) => {
          const currently_working = form.watch(`roles.${index}.currently_working`);
          const end_date = form.watch(`roles.${index}.end_date`);
          return (
            <div key={role.id} className="p-3 border rounded-lg space-y-2">
              <div className="grid grid-cols-4 items-center gap-2">
                {errors.roles?.[index]?.start_date && (
                  <p className="text-red-500 col-start-2 col-span-3 text-sm">
                    {errors.roles[index]?.start_date?.message}
                  </p>
                )}
                <Label htmlFor={`roles.${index}.headline`} className="text-right">
                  Headline
                </Label>
                <Input
                  id={`roles.${index}.headline`}
                  {...register(`roles.${index}.headline`)}
                  className="col-span-3"
                />
                {errors.roles?.[index]?.headline && (
                  <p className="text-red-500 col-start-2 col-span-3 text-sm">
                    {errors.roles[index]?.headline?.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor={`roles.${index}.location`} className="text-right">
                  Location
                </Label>
                <Input
                  id={`roles.${index}.location`}
                  {...register(`roles.${index}.location`)}
                  className="col-span-3"
                />
                {errors.roles?.[index]?.location && (
                  <p className="text-red-500 col-start-2 col-span-3 text-sm">
                    {errors.roles[index]?.location?.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-4 items-center gap-2">
                <Label className="text-right">Location Type</Label>
                <div className="col-span-3">
                  <Controller
                    control={control}
                    name={`roles.${index}.location_type`}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select role type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="On-site">On-site</SelectItem>
                          <SelectItem value="Hybrid">Hybrid</SelectItem>
                          <SelectItem value="Remote">Remote</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                {errors.roles?.[index]?.location_type && (
                  <p className="text-red-500 col-start-2 col-span-3 text-sm">
                    {errors.roles[index]?.location_type?.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-4 items-center gap-2">
                <Label className="text-right">Type</Label>
                <div className="col-span-3">
                  <Controller
                    control={control}
                    name={`roles.${index}.employment_type`}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
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
                {errors.roles?.[index]?.employment_type && (
                  <p className="text-red-500 col-start-2 col-span-3 text-sm">
                    {errors.roles[index]?.employment_type?.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor={`roles.${index}.start_date`} className="text-right">
                  Start
                </Label>
                <Input
                  id={`roles.${index}.start_date`}
                  {...register(`roles.${index}.start_date`)}
                  className="col-span-3"
                />
                {errors.roles?.[index]?.start_date && (
                  <p className="text-red-500 col-start-2 col-span-3 text-sm">
                    {errors.roles[index]?.start_date?.message}
                  </p>
                )}
              </div>

              {!currently_working && (
                <div className="grid grid-cols-4 items-center gap-2">
                  <Label htmlFor={`roles.${index}.end_date`} className="text-right">
                    End
                  </Label>
                  <Input
                    id={`roles.${index}.end_date`}
                    {...register(`roles.${index}.end_date`)}
                    className="col-span-3"
                  />
                  {errors.roles?.[index]?.end_date && (
                    <p className="text-red-500 col-start-2 col-span-3 text-sm">
                      {errors.roles[index]?.end_date?.message}
                    </p>
                  )}
                </div>
              )}

              {!end_date && (
                <div className="grid grid-cols-4 items-center gap-2">
                  <Label className="text-right">Still working</Label>
                  <Controller
                    control={control}
                    name={`roles.${index}.currently_working`}
                    render={({ field }) => (
                      <Switch
                        id={`roles.${index}.currently_working`}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </div>
              )}

              <div className="flex justify-end">
                <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}>
                  Remove Role
                </Button>
              </div>
            </div>
          );
        })}

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() =>
            append({
              headline: '',
              employment_type: 'Full-time',
              start_date: '',
              end_date: '',
              location: '',
              location_type: 'On-site',
              currently_working: false,
            })
          }
        >
          + Add Role
        </Button>
      </div>

      {/* Submit */}
      <div className="flex justify-end mt-2">
        <Button disabled={!isDirty || isSubmitting} type="submit">
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />{' '}
              {actionType === 'Add' ? 'Adding...' : 'Saving...'}
            </>
          ) : actionType === 'Add' ? (
            <>
              Add Experience <Check />
            </>
          ) : (
            <>
              {' '}
              Save changes <Save />
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ExperienceForm;
