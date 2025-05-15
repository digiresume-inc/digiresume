// components/SkillsSelect.tsx
'use client';

import { useState } from 'react';
import { skills as allSkills, Skill } from '@lf/utils';
import { Badge } from '@lf/ui/components/base/badge';
import {
  Command,
  CommandInput,
  CommandItem,
  CommandGroup,
  CommandList,
} from '@lf/ui/components/base/command';
import { X } from 'lucide-react';

type Props = {
  value: Skill[];
  onChange: (skills: Skill[]) => void;
};

export function SkillsSelect({ value, onChange }: Props) {
  const [search, setSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const filtered = allSkills.filter(
    (s) =>
      s.label.toLowerCase().includes(search.toLowerCase()) &&
      !value.some((v) => v.value === s.value)
  );

  const addSkill = (s: Skill) => onChange([...value, s]);
  const removeSkill = (s: Skill) => onChange(value.filter((v) => v.value !== s.value));

  return (
    <div className="space-y-2 w-full max-w-84">
      <div className="flex flex-wrap gap-2">
        {value.map((skill) => (
          <Badge key={skill.value} variant="secondary" className="flex items-center gap-1 rounded-full">
            <img src={skill.logo} alt={skill.label} className="h-3 w-3" />
            {skill.label}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="ml-1 h-3 w-3 flex items-center justify-center hover:opacity-70"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>

      <Command>
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
          </CommandList>
        )}
      </Command>
    </div>
  );
}
