import { z } from "zod";
export const userIdSchema = z.string().min(1).max(24);
export const vrScoreSchema = z.object({
  vrScore1: z.number(),
  vrScore2: z.number(),
  vrScore3: z.number(),
  vrScore4: z.number(),
  userId: userIdSchema,
});

export const webScoreSchema = z.object({
  webScore1: z.number(),
  webScore2: z.number(),
  webScore3: z.number(),
  webScore4: z.number(),
  userId: userIdSchema,
});
