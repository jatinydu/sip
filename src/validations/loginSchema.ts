// validations/loginSchema.ts

import { z } from "zod";

export const businessLoginSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(8).max(100),
});

export type BusinessLoginInput = z.infer<typeof businessLoginSchema>;
