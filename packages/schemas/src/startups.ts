import { z } from 'zod';

export const statusOptions = [
  {
    status: 'active',
    text: 'Active',
    icon: '✅',
    color: 'bg-green-100/80 text-green-800',
  },
  {
    status: 'discontinued',
    text: 'Discontinued',
    icon: '❌',
    color: 'bg-red-100/80 text-red-800',
  },
  {
    status: 'pending',
    text: 'Pending',
    icon: '⏳',
    color: 'bg-yellow-100/80 text-yellow-800',
  },
  {
    status: 'break',
    text: 'On Hold',
    icon: '⏸️',
    color: 'bg-blue-100/80 text-blue-800',
  },
  {
    status: 'building',
    text: 'Building',
    icon: '🏗️',
    color: 'bg-gray-100/80 text-gray-800',
  },
  {
    status: 'for-sale',
    text: 'For Sale',
    icon: '🤝',
    color: 'bg-purple-100/80 text-purple-800',
  },
  {
    status: 'acquired',
    text: 'Acquired',
    icon: '💰',
    color: 'bg-indigo-200/80 text-indigo-800',
  },
  // Add more statuses as needed
];

export const categoryOptions = [
  {
    category: 'artificial-intelligence',
    text: 'Artificial Intelligence',
    icon: '🤖',
    color: 'bg-green-100/80 text-green-800',
  },
  {
    category: 'productivity',
    text: 'Productivity',
    icon: '✍️',
    color: 'bg-blue-100/80 text-blue-800',
  },
  {
    category: 'education',
    text: 'Education',
    icon: '📚',
    color: 'bg-orange-100/80 text-orange-800',
  },
  {
    category: 'no-code',
    text: 'No Code',
    icon: '🐲',
    color: 'bg-pink-100/80 text-pink-800',
  },
  {
    category: 'social-media',
    text: 'Social Media',
    icon: '💬',
    color: 'bg-purple-100/80 text-purple-800',
  },
  {
    category: 'e-commerce',
    text: 'E-Commerce',
    icon: '🛍️',
    color: 'bg-teal-100/80 text-teal-800',
  },
  {
    category: 'analytics',
    text: 'Analytics',
    icon: '📈',
    color: 'bg-yellow-100/80 text-yellow-800',
  },
  {
    category: 'web3',
    text: 'Web 3',
    icon: '🦇',
    color: 'bg-indigo-100/80 text-indigo-800',
  },
  {
    category: 'design-tools',
    text: 'Design Tools',
    icon: '👓',
    color: 'bg-red-100/80 text-red-800',
  },
  {
    category: 'developer-tools',
    text: 'Developer Tools',
    icon: '🧑‍💻',
    color: 'bg-gray-100/80 text-gray-800',
  },
  {
    category: 'marketing',
    text: 'Marketing',
    icon: '📊',
    color: 'bg-lime-100/80 text-lime-800',
  },
  {
    category: 'finance',
    text: 'Finance',
    icon: '💰',
    color: 'bg-green-100/80 text-green-800',
  },
    {
    category: 'electronics',
    text: 'Electronics',
    icon: '🔌',
    color: 'bg-green-100/80 text-green-800',
  },
  {
    category: 'other',
    text: 'Others',
    icon: '🔮',
    color: 'bg-cyan-100/80 text-cyan-800',
  },
  // Add more statuses as needed
];

const statusValues = z.enum([
  'active',
  'discontinued',
  'pending',
  'break',
  'building',
  'for-sale',
  'acquired',
]);

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
  'other',
]);

export const startupSchema = z.object({
  id: z.string(),
  index: z.number().nonnegative(),
  name: z.string().min(1, { message: 'Startup Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }).max(300,{ message: 'Max length exceeded' } ),
  url: z
    .string()
    .url({ message: 'Please enter a valid URL' })
    .refine((val) => val.startsWith('https://'), {
      message: 'Only HTTPS URLs are allowed',
    }),
  revenue: z
    .number({ message: 'Enter a valid number' })
    .nonnegative({ message: 'Revenue must be a positive number' }),
  status: statusValues.refine((val) => statusValues.options.includes(val), {
    message: 'Please select a valid status',
  }),
  show_status: z.boolean(),
  category: categoryValues.refine((val) => categoryValues.options.includes(val), {
    message: 'Please select a valid category',
  }),
  verified: z.boolean(),
  show_on_profile: z.boolean(),
});

export type Startup = z.infer<typeof startupSchema>;

