import {z} from "zod";

export const linkedinUsernameRegex = /^(?!.*linkedin)[A-Za-z0-9-]{3,100}$/i;


export const linkedinUsernameSchema = z.object({
    username: z.string()
    .min(1, 'Username is required.')
    .regex(linkedinUsernameRegex, 'Invalid username format.'),
})
