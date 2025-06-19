import { z } from 'zod';

export const monthYearRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;
export const usernameRegex = /^(?!.*[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9._]*[a-zA-Z0-9_])?$/;

export const educationSchema = z
  .object({
    university: z.string().min(1, 'University is required'),
    branch: z.string().min(1, 'Branch is required'),
    start_date: z
      .string()
      .min(1, 'Start date is required')
      .regex(monthYearRegex, 'Start date must be in MM/YYYY format'),
    end_date: z
      .string()
      .min(1, 'End date is required')
      .regex(monthYearRegex, 'End date must be in MM/YYYY format'),
    grade: z.string().min(1, 'Grade is required'),
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

export const socialSchema = z.object({
  url: z.string().min(1, 'URL is required').url('Please enter valid url'),
});

export const geoInfoSchema = z.object({
  state: z.string().min(1, 'State Required.'),
  city: z.string().min(1, 'City Required.'),
});

export const skillSchema = z.object({
  label: z.string(),
  value: z.string(),
  logo: z.string().url().or(z.string()),
  category: z.string().min(1, { message: 'Skill category is required' }),
});

export const usernameSchema = z.object({
  username: z
    .string()
    .min(1, 'Username must be at least 1 character')
    .max(30, 'Username can be maximum 30 characters long.')
    .regex(
      usernameRegex,
      'Only letters, numbers, underscores, and dots allowed. No ending or consecutive dots.'
    ),
});

export const profileLinkSchema = z.object({
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

export const socialLinkSchema = z.object({
  url: z
    .string()
    .url({ message: 'Invalid URL format' })
    .refine((url) => url.startsWith('https://'), {
      message: 'URL must start with https://',
    }),
});
