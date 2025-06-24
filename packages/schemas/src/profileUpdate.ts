import {z} from "zod";
import { educationSchema, geoInfoSchema, profileLinkSchema, skillSchema} from "./general";


export const profileUpdateSchema = z.object({
  full_name: z.string().min(1, 'Full name must be at least 3 characters'),
  country: z.string().min(1, 'Please select your country'),
  geo_info: geoInfoSchema,
  skills: z.array(skillSchema),
  company: z.string().min(1, 'Please enter your company name'),
  education: educationSchema,
  headline: z
    .string()
    .min(1, 'Headline must be at least 3 characters')
    .max(100, 'Headline must be at most 100 characters'),
  shortbio: z
    .string()
    .min(1, 'Bio must be at least 3 characters')
    .max(300, 'Bio must be at most 100 characters'),
  profile_link: profileLinkSchema.optional(),
});