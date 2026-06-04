import mongoose from "mongoose";
import { OtpPurpose } from "./enums";
import { auditSchemaFields, baseSchemaOptions } from "./baseSchema";

interface IOtp extends mongoose.Document {
  otpHash: string;
  phone: string;
  expiresAt: Date;
  purpose: OtpPurpose;
  attempts: number;
  varifiedAt?: Date;
  resendCount: number;
}

const otpSchema = new mongoose.Schema<IOtp>(
  {
    otpHash: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    purpose: {
      type: String,
      enum: OtpPurpose,
      required: true,
    },
    attempts: {
      type: Number,
      required: true,
      default: 0,
    },
    varifiedAt: {
      type: Date,
      required: false,
    },
    resendCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  baseSchemaOptions,
);

otpSchema.add(auditSchemaFields);

otpSchema.index({ phone: 1, purpose: 1, otpHash: 1, expiresAt: 1 });
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Otp = mongoose.model<IOtp>("Otp", otpSchema);

export default Otp;
