import { z } from "zod";

export const createRewardSchema = z.object({
  rewardTitle: z.string().trim().min(2, "Reward title is required").max(100),

  description: z.string().trim().max(500).optional(),

  requiredVisits: z.number().int().min(1).max(100),

  rules: z.array(z.string().trim().max(200)).optional(),
});

export const updateRewardSchema = z.object({
  rewardTitle: z.string().trim().min(2).max(100).optional(),

  description: z.string().trim().max(500).optional(),

  requiredVisits: z.number().int().min(1).max(100).optional(),

  rules: z.array(z.string().trim().max(200)).optional(),

  isActive: z.boolean().optional(),
});

export type UpdateRewardSchema = z.infer<typeof updateRewardSchema>;
export type CreateRewardSchema = z.infer<typeof createRewardSchema>;
