import { z } from 'zod';
import { socialLinkSchema } from './general';

export const socialsSchema = z.object({
  links: z.array(socialLinkSchema).min(1),
});

export type SocialsSchema = z.infer<typeof socialsSchema>;
