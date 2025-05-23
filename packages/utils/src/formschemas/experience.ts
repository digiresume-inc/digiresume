import { z } from 'zod';

export const singleExperienceSchema = z.object({
  a: z.number(),
  company: z.string(),
  company_link: z.string(),
  logo: z.string(),
  roles: z.array(
    z.object({
      title: z.string(),
      type: z.string(),
      start_date: z.string(),
      end_date: z.string().optional(),
      location: z.string(),
      is_current: z.boolean().optional(),
    })
  ),
});

export const experienceSchema = z.object({
  experience: z.array(singleExperienceSchema),
});
