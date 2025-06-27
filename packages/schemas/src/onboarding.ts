import {z} from "zod";
import { geoInfoSchema, educationSchema, socialSchema, skillSchema, certificationSchema } from "./general";


export const onboardingSchema = z.object({
  full_name: z.string().min(1, 'Name must be at least 3 characters long.'),
  headline: z.string().min(1, 'Headline is required.'),
  shortbio: z.string().min(1, 'Short bio is required.'),
  company: z.string().min(1, 'Company is required.'),
  country: z.string().min(1, 'Please select your country.'),
  geo_info: geoInfoSchema,
  education: educationSchema,
  socials: z.array(socialSchema).optional(),
  skills: z.array(skillSchema).optional(),
  certifications: z.array(certificationSchema).optional(),
});
