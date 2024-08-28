import { z } from "zod";

export const emailSchema = z.string().email();
const passwordSchema = z.string().min(6);

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  userAgent: z.string().optional(),
});

export const signUpSchema = loginSchema.extend({
  role: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  school_organization: z.string(),
});
