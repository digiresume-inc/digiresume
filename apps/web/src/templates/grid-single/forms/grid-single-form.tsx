'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Input } from '@dr/ui/components/base/input';
import { Button } from '@dr/ui/components/base/button';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@dr/ui/components/base/select';
import { Badge } from '@dr/ui/components/base/badge';
import { X } from 'lucide-react';
import { gridSingleSchema, GridSingleFormType } from '@dr/schemas';
import { SkillsSelect } from '@/components/dashboard/skillselect'; // your custom component
import { TemplateInfo } from '@/lib/types/supabasetypes';

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
}: {
  data: GridSingle;
  actionType: 'add' | 'edit';
}) {
  const defaultValues: GridSingleFormType =
    actionType === 'edit' && data
      ? data
      : {
          techstack: [],
          flipwords: [],
          languages: [],
          timezone: '',
          nature: { type: 'Learner', icon: '📚' },
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
    formState: { errors },
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
      setValue(key, [...current, val]);
      key === 'flipwords' ? setFlipInput('') : setLangInput('');
    }
  };

  const removeFromArray = (key: 'flipwords' | 'languages', val: string) => {
    console.log('removing from', key, val);
    const current = getValues(key);
    setValue(
      key,
      current.filter((item) => item !== val)
    );
  };

  const onSubmit = (data: GridSingleFormType) => {
    console.log(data);
  };

  const nature = watch('nature');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-xl">
      <Input className="text-sm" placeholder="Timezone" {...register('timezone')} />
      <Input
        className="text-sm"
        placeholder="Education (short)"
        {...register('educationInShort')}
      />
      <Input
        className="text-sm"
        placeholder="University (short)"
        {...register('universityInShort')}
      />
      <Input className="text-sm" placeholder="Headline" {...register('healineInShort')} />
      <Input
        className="text-sm"
        placeholder="Meeting Link"
        type="url"
        {...register('meetingScheduleLink')}
      />
      <Input className="text-sm" placeholder="Quote" {...register('quote')} />

      {/* Techstack */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Tech Stack</label>
        <SkillsSelect
          value={watch('techstack')}
          onChange={(v) => setValue('techstack', v, { shouldDirty: true })}
          largeBadge
        />
      </div>

      {/* Flipwords */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Flipwords</label>
        <Input
          className="text-sm"
          placeholder="Press enter to add"
          value={flipInput}
          onChange={(e) => setFlipInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addToArray('flipwords', flipInput);
            }
          }}
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {flipwords.map((word) => (
            <Badge key={word} className="flex items-center gap-1 pr-1">
              {word}
              <button
                type="button"
                onClick={() => removeFromArray('flipwords', word)}
                className="ml-1 hover:text-red-500"
              >
                <X className="w-3 h-3 cursor-pointer" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Languages (max 2)</label>
        <Input
          className="text-sm"
          placeholder="Press enter to add"
          value={langInput}
          onChange={(e) => setLangInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addToArray('languages', langInput);
            }
          }}
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {languages.map((lang) => (
            <Badge key={lang} className="flex items-center gap-1 pr-1">
              {lang}
              <button
                type="button"
                onClick={() => removeFromArray('languages', lang)}
                className="ml-1 hover:text-red-500"
              >
                <X className="w-3 h-3 cursor-pointer" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Nature</label>
        <Select
          value={nature.type}
          onValueChange={(val) => {
            const option = NATURE_OPTIONS.find((n) => n.type === val);
            if (option) setValue('nature', option);
          }}
        >
          <SelectTrigger className="w-full">
            <span className="flex items-center gap-2">
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

      <Button type="submit">Submit</Button>
    </form>
  );
}
