import { z } from 'zod';


const startupSchema = z.object({
    name: z.string(),
    description: z.string(),
  });


export const onboardingSchema = z.object({
    name: z.string().min(3),
    country: z.string().min(3),
    links: z.array(z.string()).optional(),
    skills: z.array(z.string()).optional(),
    startups: z.array(startupSchema).optional(),
})