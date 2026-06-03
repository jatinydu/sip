import mongoose from "mongoose";
import { OtpPurpose } from "./enums";
import { auditSchemaFields, baseSchemaOptions } from "./baseSchema";

interface IOtp extends mongoose.Document {
  otp: string;
  phone: string;
  expiresAt: Date;
  purpose: OtpPurpose;
}

const otpSchema = new mongoose.Schema<IOtp>(
  {
    otp: {
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
  },
  baseSchemaOptions,
);

otpSchema.add(auditSchemaFields);

otpSchema.index({ phone: 1, purpose: 1, otp: 1, expiresAt: 1 });
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Otp = mongoose.model<IOtp>("Otp", otpSchema);

export default Otp;
