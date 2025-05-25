import { z } from 'zod';

export const socialLinkSchema = z.object({
  url: z
    .string()
    .url({ message: 'Invalid URL format' })
    .refine((url) => url.startsWith('https://'), {
      message: 'URL must start with https://',
    }),
});

export const socialsSchema = z.object({
  links: z.array(socialLinkSchema).min(1),
});

export type SocialsSchema = z.infer<typeof socialsSchema>;
