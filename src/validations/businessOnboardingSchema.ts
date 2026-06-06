// validations/businessOnboardingSchema.ts

import { z } from "zod";

export const businessOnboardingSchema = z.object({
  organizationName: z.string().trim().min(2).max(100),

  logo: z.url().optional().default(""),

  categoryId: z.string().trim(),

  locationName: z.string().trim().min(2).max(100),

  address: z.string().trim().min(5).max(500),

  city: z.string().trim().min(2).max(100),

  country: z.string().trim().min(2).max(100),
});

export type BusinessOnboardingInput = z.infer<typeof businessOnboardingSchema>;
