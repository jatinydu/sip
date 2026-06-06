import { z } from "zod";

export const createRewardSchema = z.object({
  rewardTitle: z.string().trim().min(2, "Reward title is required").max(100),

  description: z.string().trim().max(500).optional(),

  requiredVisits: z.number().int().min(1).max(100),

  rules: z.array(z.string().trim().max(200)).optional(),
});

export type CreateRewardSchema = z.infer<typeof createRewardSchema>;
