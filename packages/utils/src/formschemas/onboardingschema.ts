import { z } from 'zod';


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
      path: ['start_date'], // Show error under start_date field
    }
  );
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
  category:   z.string().min(1, { message: 'Skill category is required' }),
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
  full_name: z.string().min(1, 'Name must be at least 3 characters long.'),
  headline: z.string().min(1, 'Headline is required.'),
  company: z.string().min(1, 'Company is required.'),
  country: z.string().min(1, 'Please select your country.'),
  education: educationSchema,
  socials: z.array(socialSchema).optional(),
  skills: z.array(skillSchema).optional(),
  startups: z.array(startupSchema).optional(),
});
