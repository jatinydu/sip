import { OtpChannel, OtpPurpose, UserTypes } from "@/models/enums";
import { z } from "zod";

export const sendOtpSchema = z
  .object({
    channel: z.enum(OtpChannel),

    purpose: z.enum(OtpPurpose),

    userType: z.enum(UserTypes),

    email: z.email().optional(),

    phone: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.channel === OtpChannel.EMAIL && !data.email) {
      ctx.addIssue({
        code: "custom",
        message: "Email is required",
      });
    }

    if (data.channel === OtpChannel.PHONE && !data.phone) {
      ctx.addIssue({
        code: "custom",
        message: "Phone is required",
      });
    }
  });

export const verifyOtpSchema = z
  .object({
    channel: z.enum(OtpChannel),

    purpose: z.enum(OtpPurpose),

    email: z.email().optional(),

    phone: z.string().optional(),

    otp: z.string().length(6),
  })
  .superRefine((data, ctx) => {
    if (data.channel === OtpChannel.EMAIL && !data.email) {
      ctx.addIssue({
        code: "custom",
        message: "Email required",
      });
    }

    if (data.channel === OtpChannel.PHONE && !data.phone) {
      ctx.addIssue({
        code: "custom",
        message: "Phone required",
      });
    }
  });
