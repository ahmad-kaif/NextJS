import {z} from 'zod';

export const verifySchema = z.object({
    code: z.string().length(6, "verification must of 6 digits");
})