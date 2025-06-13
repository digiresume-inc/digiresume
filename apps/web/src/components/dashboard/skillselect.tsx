// components/SkillsSelect.tsx
'use client';

import { useState } from 'react';
import { skills as allSkills, Skill } from '@dr/utils';
import { Badge } from '@dr/ui/components/base/badge';
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from '@dr/ui/components/base/command';
import { CircleHelp, X } from 'lucide-react';

type Props = {
  value: Skill[];
  onChange: (skills: Skill[]) => void;
  className?: string;
  largeBadge?: boolean;
};

export function SkillsSelect({ value, onChange, className, largeBadge }: Props) {
  const [search, setSearch] = useState('');

  const filtered = allSkills.filter(
    (s) =>
      s.label.toLowerCase().includes(search.toLowerCase()) &&
      !value.some((v) => v.value === s.value)
  );

  const addSkill = (s: Skill) => onChange([...value, s]);
  const removeSkill = (s: Skill) => onChange(value.filter((v) => v.value !== s.value));

  return (
    <div className={`space-y-2 w-full ${className}`}>
      <div className="flex flex-wrap gap-2">
        {value.map((skill) => (
          <Badge
            key={skill.value}
            variant="secondary"
            className={`flex items-center gap-1 rounded-full ${largeBadge && 'px-2 py-1'}`}
          >
            {skill.logo ? (
              <img
                src={skill.logo}
                alt={skill.label}
                className={`${largeBadge ? 'h-4 w-4' : 'h-3 w-3'}`}
              />
            ) : (
              <CircleHelp className={`${largeBadge ? 'h-4 w-4' : 'h-3 w-3'}`} />
            )}
            {skill.label}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className={`ml-1 ${largeBadge ? 'h-4 w-4' : 'h-3 w-3'} flex items-center justify-center hover:opacity-70`}
            >
              <X className={`${largeBadge ? 'h-4 w-4' : 'h-3 w-3'}`} />
            </button>
          </Badge>
        ))}
      </div>

      <Command shouldFilter={false}>
        <CommandInput placeholder="Search skills…" value={search} onValueChange={setSearch} />
        {search.length > 0 && (
          <CommandList className="no_scrollbar">
            {filtered.map((skill) => (
              <CommandItem
                key={skill.value}
                onSelect={() => {
                  addSkill(skill);
                  setSearch('');
                }}
                className="flex items-center gap-2"
              >
                <img src={skill.logo} alt={skill.label} className="h-4 w-4" />
                {skill.label}
              </CommandItem>
            ))}
            <CommandEmpty>
              <div
                key={search}
                onClick={() => {
                  const newSkill: Skill = {
                    label: search,
                    value: search.toLowerCase().replace(/\s+/g, '-'),
                    logo: '',
                    category: 'Custom',
                  };
                  addSkill(newSkill);
                  setSearch('');
                }}
                className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none hover:bg-secondary"
              >
                <CircleHelp className="h-4 w-4" />
                Add `{search}`
              </div>
            </CommandEmpty>
          </CommandList>
        )}
      </Command>
    </div>
  );
}
