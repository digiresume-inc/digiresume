import { z } from 'zod';

const skillSchema = z.object({
  label: z.string(),
  value: z.string(),
  logo: z.string().url().or(z.string()),
  category: z.enum(['Language', 'Framework', 'Tool', 'Database', 'Design', 'Cloud', 'Custom']),
});

const profileLinkSchema = z.object({
  url: z.union([z.string().url({ message: 'Invalid URL' }), z.literal('')]).optional(),

  text: z
    .union([
      z
        .string()
        .min(3, 'Text must be at least 3 characters')
        .max(50, 'Text must be at most 50 characters'),
      z.literal(''),
    ])
    .optional(),
});

export const profileUpdateSchema = z.object({
  full_name: z.string().min(3, 'Full name must be at least 3 characters'),
  country: z.string().min(3, 'Country must be at least 3 characters'),
  skills: z.array(skillSchema),
  company: z.string().min(1, 'Please enter your company name'),
  education: z.string().min(1, 'Please enter your education details'),
  headline: z
    .string()
    .min(3, 'Headline must be at least 3 characters')
    .max(100, 'Headline must be at most 100 characters'),
  shortbio: z
    .string()
    .min(3, 'Headline must be at least 3 characters')
    .max(250, 'Headline must be at most 100 characters'),
  profile_link: profileLinkSchema.optional(),
});
