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

const dateRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;

const educationSchema = z
  .object({
    university: z.string().min(1, 'University is required'),
    branch: z.string().min(1, 'Branch is required'),
    start_date: z
      .string()
      .min(1, 'Start date is required')
      .regex(dateRegex, 'Start date must be in MM/YYYY format'),
    end_date: z
      .string()
      .min(1, 'End date is required')
      .regex(dateRegex, 'End date must be in MM/YYYY format'),
  })
  .refine(
    (data) => {
      const [startMonth, startYear] = data.start_date.split('/').map(Number);
      const [endMonth, endYear] = data.end_date.split('/').map(Number);

      const start = new Date(startYear!, startMonth! - 1);
      const end = new Date(endYear!, endMonth! - 1);

      return start <= end;
    },
    {
      message: 'Start date must not be after end date',
      path: ['start_date'],
    }
  );

export const profileUpdateSchema = z.object({
  full_name: z.string().min(1, 'Full name must be at least 3 characters'),
  country: z.string().min(1, 'Please select your country'),
  skills: z.array(skillSchema),
  company: z.string().min(1, 'Please enter your company name'),
  education: educationSchema,
  headline: z
    .string()
    .min(1, 'Headline must be at least 3 characters')
    .max(100, 'Headline must be at most 100 characters'),
  shortbio: z
    .string()
    .min(1, 'Headline must be at least 3 characters')
    .max(250, 'Headline must be at most 100 characters'),
  profile_link: profileLinkSchema.optional(),
});
