import { z } from 'zod';

const socialSchema = z.object({
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
  category: z.enum(['Language', 'Framework', 'Tool', 'Database', 'Design', 'Cloud', 'Custom']),
});

export const usernameSchema = z.object({
  username: z
    .string()
    .min(1, 'Username must be at least 1 character')
    .max(30, 'Username can be maximum 30 characters long.')
    .regex(
      /^(?!.*[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9._]*[a-zA-Z0-9_])?$/,
      'Only letters, numbers, underscores, and dots allowed. No ending or consecutive dots.'
    ),
});

export const onboardingSchema = z.object({
  full_name: z.string().min(3, 'Name must be at least 3 characters long.'),
  headline: z.string().min(3, 'Headline is required.'),
  company: z.string().min(1, 'Company is required.'),
  country: z.string().min(2, 'Please select a country.'),
  education: z.string().min(2, 'Education is required.'),
  socials: z.array(socialSchema).optional(),
  skills: z.array(skillSchema).optional(),
  startups: z.array(startupSchema).optional(),
});
