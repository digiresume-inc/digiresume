// ExperienceUpdate.tsx
'use client';
import React from 'react';
import { singleExperienceSchema } from '@dr/schemas';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@dr/ui/components/base/button';
import { Label } from '@dr/ui/components/base/label';
import { Input } from '@dr/ui/components/base/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@dr/ui/components/base/select';
import { Switch } from '@dr/ui/components/base/switch';
import { Check, Save } from 'lucide-react';
import { Textarea } from '@dr/ui/components/base/textarea';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@dr/ui/components/base/hover-card';
import { SkillsSelect } from '@/components/dashboard/skillselect';
import Loader from '@/components/general/loader';

import type { Experience } from '@/lib/types/supabasetypes';
import { useIsMobile } from '@dr/ui/hooks/use-mobile';
import { cn } from '@dr/ui/lib/utils';
type SingleExperience = z.infer<typeof singleExperienceSchema>;

const ExperienceForm = ({
  selectedExperience,
  onSubmit,
  actionType,
}: {
  selectedExperience: Experience;
  onSubmit: (data: Experience) => void;
  actionType: String;
}) => {
  const isMobile = useIsMobile();

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
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 relative">
      {/* Company Info */}
      <div className="flex flex-col gap-1 lg:grid lg:grid-cols-4 lg:items-center lg:gap-2">
        <Label htmlFor="company" className="lg:text-right text-xs lg:text-sm">
          Company
        </Label>
        <Input {...register('company')} id="company" className="lg:col-span-3 text-xs lg:text-sm" />
        {errors.company && (
          <p className="text-destructive text-xs lg:col-start-2 lg:col-span-3">
            {errors.company.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1 lg:grid lg:grid-cols-4 lg:items-center lg:gap-2">
        <Label htmlFor="company_link" className="lg:text-right text-xs lg:text-sm">
          Company Link
        </Label>
        <Input
          {...register('company_link')}
          id="company_link"
          className="lg:col-span-3 text-xs lg:text-sm"
        />
        {errors.company_link && (
          <p className="text-destructive text-xs lg:col-start-2 lg:col-span-3">
            {errors.company_link.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1.5 lg:grid lg:grid-cols-4 lg:items-center lg:gap-2">
        <Label
          htmlFor="contribution"
          className="flex flex-col items-start justify-center lg:text-right text-xs lg:text-sm"
        >
          <span>Contribution</span>
          <HoverCard openDelay={250}>
            <HoverCardTrigger>
              <span className="text-xs underline text-primary font-medium cursor-pointer">
                Markdown Guide *
              </span>
            </HoverCardTrigger>
            <HoverCardContent className="bg-secondary border-foreground/20 rounded-md z-50">
              <div className="flex flex-col p-2 space-y-2 text-xs text-muted-foreground">
                <p className="font-semibold text-foreground">Markdown guide</p>
                <p>
                  <span className="text-accent-foreground">**text**</span> → <b>text</b>
                </p>
                <p>
                  <span className="text-accent-foreground">*text*</span> → <i>text</i>
                </p>
                <p>
                  <span className="text-accent-foreground">[link](https://example.com)</span> →{' '}
                  <a href="https://example.com" target="_blank" className="underline font-medium">
                    link
                  </a>
                </p>
                <p>
                  <span className="text-accent-foreground">==text==</span> →{' '}
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
          className="lg:col-span-3 text-xs lg:text-sm"
          placeholder="Describe your role, key contributions, and the impact you made…"
        />

        {errors.contribution && (
          <p className="text-destructive text-xs lg:col-start-2 lg:col-span-3">
            {errors.contribution.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5 lg:grid lg:grid-cols-4 lg:items-center lg:gap-2 mt-2 lg:mt-0">
        <Label htmlFor="company_link" className="lg:text-right text-xs lg:text-sm">
          Skills used
        </Label>

        <div className="lg:col-span-3">
          <SkillsSelect
            value={form.watch('skills_used') ?? []}
            onChange={(v) => form.setValue('skills_used', v, { shouldDirty: true })}
            largeBadge={!isMobile}
          />
        </div>

        {errors.skills_used && (
          <p className="text-destructive text-xs lg:col-start-2 lg:col-span-3">
            {errors.skills_used.message}
          </p>
        )}
      </div>

      {/* Roles Field Array */}
      <div className="mt-2 space-y-2">
        <h3 className="text-md font-semibold">Roles</h3>
        {errors.roles && <p className="text-destructive text-xs">{errors.roles.message}</p>}

        {fields.map((role, index) => {
          const currently_working = form.watch(`roles.${index}.currently_working`);
          const end_date = form.watch(`roles.${index}.end_date`);
          return (
            <div key={role.id} className="p-3 border rounded-lg space-y-3">
              {/* Headline */}
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 lg:items-center">
                <Label
                  htmlFor={`roles.${index}.headline`}
                  className="lg:text-right text-xs lg:text-sm"
                >
                  Headline
                </Label>
                <Input
                  id={`roles.${index}.headline`}
                  {...register(`roles.${index}.headline`)}
                  className="col-span-3 text-xs lg:text-sm"
                />
                {errors.roles?.[index]?.headline && (
                  <p className="text-destructive text-xs lg:col-start-2 lg:col-span-3">
                    {errors.roles[index]?.headline?.message}
                  </p>
                )}
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 lg:items-center">
                <Label
                  htmlFor={`roles.${index}.location`}
                  className="lg:text-right text-xs lg:text-sm"
                >
                  Location
                </Label>
                <Input
                  id={`roles.${index}.location`}
                  {...register(`roles.${index}.location`)}
                  className="col-span-3 text-xs lg:text-sm"
                />
                {errors.roles?.[index]?.location && (
                  <p className="text-destructive text-xs lg:col-start-2 lg:col-span-3">
                    {errors.roles[index]?.location?.message}
                  </p>
                )}
              </div>

              {/* Location Type */}
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 lg:items-center">
                <Label className="lg:text-right text-xs lg:text-sm">Location Type</Label>
                <div className="col-span-3">
                  <Controller
                    control={control}
                    name={`roles.${index}.location_type`}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full text-xs lg:text-sm">
                          <SelectValue placeholder="Select location type" />
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
                  <p className="text-destructive text-xs lg:col-start-2 lg:col-span-3">
                    {errors.roles[index]?.location_type?.message}
                  </p>
                )}
              </div>

              {/* Employment Type */}
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 lg:items-center">
                <Label className="lg:text-right text-xs lg:text-sm">Type</Label>
                <div className="col-span-3">
                  <Controller
                    control={control}
                    name={`roles.${index}.employment_type`}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full text-xs lg:text-sm">
                          <SelectValue placeholder="Select employment type" />
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
                  <p className="text-destructive text-xs lg:col-start-2 lg:col-span-3">
                    {errors.roles[index]?.employment_type?.message}
                  </p>
                )}
              </div>

              {/* Start Date */}
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 lg:items-center">
                <Label
                  htmlFor={`roles.${index}.start_date`}
                  className="lg:text-right text-xs lg:text-sm"
                >
                  Start
                </Label>
                <Input
                  id={`roles.${index}.start_date`}
                  {...register(`roles.${index}.start_date`)}
                  className="col-span-3 text-xs lg:text-sm"
                />
                {errors.roles?.[index]?.start_date && (
                  <p className="text-destructive text-xs lg:col-start-2 lg:col-span-3">
                    {errors.roles[index]?.start_date?.message}
                  </p>
                )}
              </div>

              {/* End Date (conditionally shown) */}
              {!currently_working && (
                <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 lg:items-center">
                  <Label
                    htmlFor={`roles.${index}.end_date`}
                    className="lg:text-right text-xs lg:text-sm"
                  >
                    End
                  </Label>
                  <Input
                    id={`roles.${index}.end_date`}
                    {...register(`roles.${index}.end_date`)}
                    className="col-span-3 text-xs lg:text-sm"
                  />
                  {errors.roles?.[index]?.end_date && (
                    <p className="text-destructive text-xs lg:col-start-2 lg:col-span-3">
                      {errors.roles[index]?.end_date?.message}
                    </p>
                  )}
                </div>
              )}

              {/* Currently Working Switch (conditionally shown) */}
              {!end_date && (
                <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 lg:items-center">
                  <Label className="lg:text-right text-xs lg:text-sm">Still Working</Label>
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

              {/* Remove Button */}
              <div className="flex justify-end">
                <Button
                  className="text-xs lg:text-sm"
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  Remove Role
                </Button>
              </div>
            </div>
          );
        })}

        <Button
          type="button"
          variant="outline"
          className="w-full text-xs lg:text-sm"
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
      <div className="w-full mt-2 sticky bottom-0 left-0 right-0">
        <Button
          disabled={!isDirty || isSubmitting}
          type="submit"
          className={cn('w-full', !isDirty ? 'hidden' : 'flex')}
        >
          {isSubmitting ? (
            <>
              <Loader /> {actionType === 'Add' ? 'Adding...' : 'Saving...'}
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
