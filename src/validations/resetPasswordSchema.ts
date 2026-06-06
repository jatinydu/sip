import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    email: z.email().trim().toLowerCase(),

    password: z.string().min(8).max(100),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
