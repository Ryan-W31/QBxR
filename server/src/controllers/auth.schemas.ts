import { z } from "zod";

export const emailSchema = z.string().email();
export const passwordSchema = z.string().min(6);
export const verificationCodeSchema = z.string().min(1).max(24);
export const userRoleSchema = z.enum(["PLAYER", "NONPLAYER"]);

export const resetPasswordSchema = z.object({
  verificationCode: verificationCodeSchema,
  password: passwordSchema,
});

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
