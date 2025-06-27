import { z } from 'zod';

const categoryValues = z.enum([
  'artificial-intelligence',
  'productivity',
  'education',
  'no-code',
  'social-media',
  'e-commerce',
  'analytics',
  'web3',
  'design-tools',
  'developer-tools',
  'marketing',
  'finance',
  'electronics',
  'healthtech',
  'gaming',
  'saas',
  'other',
]);

export const projectSchema = z.object({
  id: z.string(),
  index: z.number().nonnegative(),
  name: z.string().min(1, { message: 'Project Name is required' }),
  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .max(300, { message: 'Max length exceeded' }),
  url: z
    .string()
    .url({ message: 'Please enter a valid Project URL' })
    .refine((val) => val.startsWith('https://'), {
      message: 'Only HTTPS URLs are allowed',
    }),
  category: categoryValues.refine((val) => categoryValues.options.includes(val), {
    message: 'Please select a valid category',
  }),
  show_on_profile: z.boolean(),
});

export type Project = z.infer<typeof projectSchema>;
