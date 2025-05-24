import { z } from 'zod';

// Custom date regex: MM/YYYY (e.g. 08/2023)
const monthYearRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;

export const employmentTypeEnum = z.enum([
  'Full-time',
  'Part-time',
  'Self-employed',
  'Freelance',
  'Internship',
  'Trainee',
]);

export const locationTypeEnum =  z.enum([
  'On-site',
  'Hybrid',
  'Remote',
])

// Role schema with conditional logic
const roleSchema = z
  .object({
    headline: z.string().min(1, 'Headline is required'),
    employment_type: employmentTypeEnum,
    start_date: z
      .string()
      .regex(monthYearRegex, { message: 'Start date must be in MM/YYYY format' }),
    end_date: z
      .string()
      .optional()
      .refine((val) => !val || monthYearRegex.test(val), {
        message: 'End date must be in MM/YYYY format',
      }),
    location: z.string().min(1, 'Location is required'),
    location_type: locationTypeEnum,
    currently_working: z.boolean().optional(),
  })
  .refine((data) => data.currently_working || !!data.end_date, {
    message: 'End date is required if not currently working',
    path: ['end_date'],
  })
  .refine(
    (data) => {
      if (data.currently_working || !data.start_date || !data.end_date) return true;

      const [startMonthStr, startYearStr] = data.start_date.split('/');
      const [endMonthStr, endYearStr] = data.end_date.split('/');

      const startMonth = Number(startMonthStr);
      const startYear = Number(startYearStr);
      const endMonth = Number(endMonthStr);
      const endYear = Number(endYearStr);


      if (isNaN(startMonth) || isNaN(startYear) || isNaN(endMonth) || isNaN(endYear)) {
        return false;
      }

      const start = new Date(startYear, startMonth - 1);
      const end = new Date(endYear, endMonth - 1);

      return start <= end;
    },
    {
      message: 'Start date cannot be after end date',
      path: ['start_date'],
    }
  );

export const singleExperienceSchema = z.object({
  a: z.number(),
  company: z.string({ message: 'Company name is required' }),
  company_link: z.string().url({ message: 'Invalid company link URL' }),
  company_logo: z.string().url({ message: 'Invalid logo URL' }),
  contribution: z.string().min(10, { message: 'Some contribution info is required' }),
  roles: z.array(roleSchema).min(1, { message: 'At least one role is required' }),
});

export const experienceSchema = z.object({
  experience: z.array(singleExperienceSchema),
});
