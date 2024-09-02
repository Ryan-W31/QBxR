import { z } from "zod";

export const emailSchema = z.string().email();
export const passwordSchema = z.string().min(8, "Password must be at least 8 characters long.");
export const roleEnum = z.enum(["NONPLAYER", "PLAYER"]);

export const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerFormSchema = loginFormSchema
  .extend({
    role: roleEnum,
    firstname: z.string(),
    lastname: z.string(),
    school_organization: z.string(),
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const verifyEmailSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
