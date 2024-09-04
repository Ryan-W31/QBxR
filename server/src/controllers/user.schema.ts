import { z } from "zod";
import { userIdSchema } from "./score.schema";

export const updateUserSchema = z.object({
  userId: userIdSchema,
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  email: z.string().email().optional(),
  school_organization: z.string().optional(),
  bio: z.string().optional().nullable(),
  birthday: z.date().optional().nullable(),
  phone_number: z.string().optional().nullable(),
  status: z.boolean().optional(),
  favorite: z.string().optional(),
});

export const updateUserPasswordSchema = z.object({
  newPassword: z.string(),
  userId: userIdSchema,
});

export const searchSchema = z.object({
  search: z.string(),
  filters: z.object({
    player: z.boolean().optional(),
    nonplayer: z.boolean().optional(),
    active: z.boolean().optional(),
    inactive: z.boolean().optional(),
    name: z.boolean().optional(),
    schoolOrg: z.boolean().optional(),
  }),
});
