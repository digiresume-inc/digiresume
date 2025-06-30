// src/lib/validators/gridSingleSchema.ts

import { z } from 'zod';
import { skillSchema } from '../general';

export const gridSingleSchema = z.object({
  techstack: z.array(skillSchema).min(2, 'Techstack is required, min(2)').max(6, 'Only 6 entries are allowed.'),
  timezone: z.string().min(1, 'Timezone is required.'),
  nature: z.object({
    type: z.enum([
      'Active',
      'Passive',
      'Builder',
      'Thinker',
      'Hacker',
      'Designer',
      'Leader',
      'Supporter',
      'Learner',
      'Explorer',
      'Visionary',
      'Community',
    ]),
    icon: z.string(),
  }),
  educationInShort: z.string().min(1, 'Education is required.'),
  universityInShort: z.string().min(1, 'University is required.'),
  healineInShort: z.string().min(1, 'Headline is required.'),
  flipwords: z.array(z.string()).min(2, 'Flipwords are required.').max(6,"Only 6 Flipwords are allowed."),
  languages: z
    .array(z.string())
    .min(1, 'Language is required.')
    .max(2, 'Only 2 languages allowed.'),
  meetingScheduleLink: z
    .string()
    .optional()
    .refine((val) => !val || /^https?:\/\/.+\..+/.test(val), {
      message: 'URL must be valid.',
    }),

  quote: z.string().min(1, 'Quote is required.'),
});

export type GridSingleFormType = z.infer<typeof gridSingleSchema>;
