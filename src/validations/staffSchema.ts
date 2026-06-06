import { z } from "zod";
import { StaffRoles } from "@/models/enums";

export const createStaffSchema = z.object({
  username: z.string().trim().min(3).max(30).toLowerCase(),

  password: z.string().min(6).max(100),

  locationId: z.string(),

  role: z.enum(StaffRoles),
});

export const updateStaffSchema = z.object({
  password: z.string().min(6).max(100).optional(),

  role: z.enum(StaffRoles).optional(),

  isActive: z.boolean().optional(),
});

export const staffLoginSchema = z.object({
  username: z.string().trim().toLowerCase(),

  password: z.string().min(1),
});
