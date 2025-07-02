'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Input } from '@dr/ui/components/base/input';
import { Button } from '@dr/ui/components/base/button';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@dr/ui/components/base/select';
import { Badge } from '@dr/ui/components/base/badge';
import { Check, Info, Save, X } from 'lucide-react';
import { gridSingleSchema, GridSingleFormType } from '@dr/schemas';
import { SkillsSelect } from '@/components/dashboard/skillselect';
import { TemplateInfo } from '@/lib/types/supabasetypes';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@dr/ui/components/base/hover-card';
import Loader from '@/components/general/loader';
import { addInfoUpdateTemplate } from '@/app/dashboard/actions/updateTemplate';
import { ToastError, ToastSuccess } from '@/components/general/toast';
import { useIsMobile } from '@dr/ui/hooks/use-mobile';

const NATURE_OPTIONS = [
  { type: 'Active', icon: '⚡️' },
  { type: 'Passive', icon: '🌙' },
  { type: 'Builder', icon: '🏗️' },
  { type: 'Thinker', icon: '🧠' },
  { type: 'Hacker', icon: '💻' },
  { type: 'Designer', icon: '🎨' },
  { type: 'Leader', icon: '👑' },
  { type: 'Supporter', icon: '🤝' },
  { type: 'Learner', icon: '📚' },
  { type: 'Explorer', icon: '🧭' },
  { type: 'Visionary', icon: '🔭' },
  { type: 'Community', icon: '🏘️' },
] as const;

type GridSingle = TemplateInfo['templates']['grid-single'];

export default function GridSingleForm({
  data,
  actionType,
  fullData,
  setModalOpen,
}: {
  data: GridSingle;
  actionType: 'add' | 'edit';
  fullData: TemplateInfo;
  setModalOpen:  React.Dispatch<React.SetStateAction<boolean>>
}) {

  const isMobile = useIsMobile();
  const defaultValues: GridSingleFormType =
    actionType === 'edit' && data
      ? data
      : {
          techstack: [],
          flipwords: [],
          languages: [],
          timezone: '',
          nature: { type: 'Active', icon: '⚡️' },
          educationInShort: '',
          universityInShort: '',
          healineInShort: '',
          meetingScheduleLink: '',
          quote: '',
        };

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<GridSingleFormType>({
    resolver: zodResolver(gridSingleSchema),
    defaultValues,
  });

  const flipwords = watch('flipwords');
  const languages = watch('languages');

  const [flipInput, setFlipInput] = useState('');
  const [langInput, setLangInput] = useState('');

  const addToArray = (key: 'flipwords' | 'languages', val: string) => {
    if (!val.trim()) return;

    const current = getValues(key);
    if (key === 'languages' && current.length >= 2) return;

    if (!current.includes(val)) {
      setValue(key, [...current, val], {
        shouldValidate: true,
        shouldDirty: true,
      });

      // Reset input
      if (key === 'flipwords') {
        setFlipInput('');
      } else {
        setLangInput('');
      }
    }
  };

  const removeFromArray = (key: 'flipwords' | 'languages', val: string) => {
    const current = getValues(key);
    const updated = current.filter((item) => item !== val);

    setValue(key, updated, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onSubmit = async (data: GridSingleFormType) => {
    const res = await addInfoUpdateTemplate('grid-single', fullData, data);

    if(!res.success){
      ToastError({message: res.message});
      return
    }

    if(res.success){
      setModalOpen(false);
      ToastSuccess({message: res.message});
    }
  };

  const nature = watch('nature');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 lg:space-y-5 max-w-xl">
      <div className="w-full space-y-1.5">
        <label htmlFor="timezone" className="text-xs lg:text-sm font-medium text-muted-foreground">
          Your Timezone
        </label>
        <Input
          id="timezone"
          className="text-xs lg:text-sm"
          placeholder="e.g., Asia/Kolkata"
          {...register('timezone')}
        />
        {errors.timezone && (
          <p className="text-xs text-destructive mt-1">{errors.timezone.message}</p>
        )}
      </div>
      <div className="w-full space-y-3 lg:space-y-5">
        <div className="space-y-1.5">
          <label htmlFor="educationInShort" className="text-xs lg:text-sm font-medium text-muted-foreground">
            Education (Short)
          </label>
          <Input
            id="educationInShort"
            className="text-xs lg:text-sm"
            placeholder="e.g., ECE Undergrad, CS Major"
            {...register('educationInShort')}
          />
          {errors.educationInShort && (
            <p className="text-xs text-destructive mt-1">{errors.educationInShort.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="universityInShort" className="text-xs lg:text-sm font-medium text-muted-foreground">
            University (Short)
          </label>
          <Input
            id="universityInShort"
            className="text-xs lg:text-sm"
            placeholder="e.g., MIT, Stanford, NYU"
            {...register('universityInShort')}
          />
          {errors.universityInShort && (
            <p className="text-xs text-destructive mt-1">{errors.universityInShort.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="healineInShort" className="text-xs lg:text-sm font-medium text-muted-foreground">
            Headline
          </label>
          <Input
            id="healineInShort"
            className="text-xs lg:text-sm"
            placeholder="e.g., Frontend Dev, Data Scientist"
            {...register('healineInShort')}
          />
          {errors.healineInShort && (
            <p className="text-xs text-destructive mt-1">{errors.healineInShort.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="meetingScheduleLink"
            className="text-xs lg:text-sm font-medium text-muted-foreground"
          >
            Meeting Link
          </label>
          <Input
            id="meetingScheduleLink"
            type="url"
            className="text-xs lg:text-sm"
            placeholder="e.g., Calendly, Cal link"
            {...register('meetingScheduleLink')}
          />
          {errors.meetingScheduleLink && (
            <p className="text-xs text-destructive mt-1">{errors.meetingScheduleLink.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="quote" className="text-xs lg:text-sm font-medium text-muted-foreground">
            Quote
          </label>
          <Input
            id="quote"
            className="text-xs lg:text-sm"
            placeholder="A quote that inspires you"
            {...register('quote')}
          />
          {errors.quote && <p className="text-xs text-destructive mt-1">{errors.quote.message}</p>}
        </div>
      </div>

      {/* Techstack */}
      <div className="space-y-1">
        <label className="text-xs lg:text-sm font-medium text-muted-foreground">Tech Stack</label>
        <SkillsSelect
          value={watch('techstack')}
          onChange={(v) => setValue('techstack', v, { shouldDirty: true })}
          largeBadge={!isMobile}
        />
        {errors.techstack && (
          <p className="text-xs text-destructive mt-1">{errors.techstack.message}</p>
        )}
      </div>

      {/* Flipwords Field */}
      <div className="space-y-1.5">
        <label className="text-xs lg:text-sm font-medium text-muted-foreground flex items-center gap-1">
          Flipwords{' '}
          <HoverCard openDelay={250}>
            <HoverCardTrigger>
              <span className="text-muted-foreground cursor-pointer">
                <Info size={16} strokeWidth={2} />
              </span>
            </HoverCardTrigger>
            <HoverCardContent className="bg-secondary border-foreground/20 rounded-md z-50">
              <div className="flex flex-col p-2 text-xs text-muted-foreground">
                <p className="text-xs text-muted-foreground mb-2">
                  These are words that animate in certain duration in your hero section.
                </p>
                <span className="">
                  I'm a <span className="font-bold">Developer</span>
                </span>
                <span className="">
                  I'm a <span className="font-bold">Scientist</span>
                </span>
                <span className="">
                  I'm a <span className="font-bold">Dancer</span>
                </span>
              </div>
            </HoverCardContent>
          </HoverCard>
        </label>
        <Input
          className="text-xs lg:text-sm"
          placeholder="Press enter to add e.g., Developer"
          value={flipInput}
          onChange={(e) => setFlipInput(e.target.value)}
          disabled={flipwords.length === 6}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addToArray('flipwords', flipInput);
            }
          }}
        />
        {flipwords.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {flipwords.map((word) => (
              <Badge key={word} className="flex items-center gap-1 pr-1">
                {word}
                <button
                  type="button"
                  onClick={() => removeFromArray('flipwords', word)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
        {errors.flipwords && (
          <p className="text-xs text-destructive mt-1">{errors.flipwords.message}</p>
        )}
      </div>

      {/* Languages Field */}
      <div className="space-y-1.5">
        <label className="text-xs lg:text-sm font-medium text-muted-foreground">
          Spoken Languages (max 2)
        </label>
        <Input
          className="text-xs lg:text-sm"
          placeholder="Press enter to add e.g., English"
          value={langInput}
          onChange={(e) => setLangInput(e.target.value)}
          disabled={languages.length === 2}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addToArray('languages', langInput);
            }
          }}
        />
        {languages.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {languages.map((lang) => (
              <Badge key={lang} className="flex items-center gap-1 pr-1">
                {lang}
                <button
                  type="button"
                  onClick={() => removeFromArray('languages', lang)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
        {errors.languages && (
          <p className="text-xs text-destructive mt-1">{errors.languages.message}</p>
        )}
      </div>

      {/* Nature Field */}
      <div className="space-y-1.5">
        <label className="text-xs lg:text-sm font-medium text-muted-foreground">Nature</label>
        <Select
          value={nature.type}
          onValueChange={(val) => {
            const option = NATURE_OPTIONS.find((n) => n.type === val);
            if (option) setValue('nature', option);
          }}
        >
          <SelectTrigger className="w-full">
            <span className="flex items-center gap-2 text-xs lg:text-sm">
              <span>{nature.icon}</span>
              <span>{nature.type}</span>
            </span>
          </SelectTrigger>
          <SelectContent>
            {NATURE_OPTIONS.map(({ type, icon }) => (
              <SelectItem key={type} value={type}>
                {icon} {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button className="w-full" disabled={!isDirty || isSubmitting} type="submit">
        {isSubmitting ? (
          <>
            <Loader /> {actionType === 'add' ? 'Adding...' : 'Saving...'}
          </>
        ) : actionType === 'add' ? (
          <>
            Add Info <Check />
          </>
        ) : (
          <>
            {' '}
            Save changes <Save />
          </>
        )}
      </Button>
    </form>
  );
}
