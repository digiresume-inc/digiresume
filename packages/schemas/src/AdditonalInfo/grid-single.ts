// src/lib/validators/gridSingleSchema.ts

import { z } from "zod";
import { skillSchema } from "../general";

export const gridSingleSchema = z.object({
  techstack: z.array(skillSchema),
  timezone: z.string().min(1),
  nature: z.object({
    type: z.enum([
      "Active",
      "Passive",
      "Builder",
      "Thinker",
      "Hacker",
      "Designer",
      "Leader",
      "Supporter",
      "Learner",
      "Explorer",
      "Visionary",
      "Community",
    ]),
    icon: z.string(), // e.g., '⚡️'
  }),
  educationInShort: z.string().min(1),
  universityInShort: z.string().min(1),
  healineInShort: z.string().min(1),
  flipwords: z.array(z.string()).min(1),
  languages: z.array(z.string()).min(1),
  meetingScheduleLink: z.string().url(),
  quote: z.string().min(1),
});

export type GridSingleFormType = z.infer<typeof gridSingleSchema>;
