import { z } from 'zod';

const linkSchema = z.object({
  type: z.string(),
  url: z.string().min(1, 'URL is required').url('Please enter valid url'),
});

const startupSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  description: z.string(),
});

const skillSchema = z.object({
  label: z.string(),
  value: z.string(),
  logo: z.string().url().or(z.string()),
  category: z.enum(['Language', 'Framework', 'Tool', 'Database', 'Design', 'Cloud']),
});

export const onboardingSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long.'),
  country: z.string().min(2, 'Please select a country'),
  links: z.array(linkSchema).optional(),
  skills: z.array(skillSchema).optional(),
  startups: z.array(startupSchema).optional(),
});
