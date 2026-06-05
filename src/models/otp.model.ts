import mongoose from "mongoose";
import { OtpChannel, OtpPurpose } from "./enums";
import { auditSchemaFields, baseSchemaOptions } from "./baseSchema";

export interface IOtp extends mongoose.Document {
  otpHash: string;
  channel: OtpChannel;
  phone?: string;
  email?: string;
  expiresAt: Date;
  purpose: OtpPurpose;
  verifiedAt?: Date;
  isConsumed: boolean;
}

const otpSchema = new mongoose.Schema<IOtp>(
  {
    otpHash: {
      type: String,
      required: true,
      trim: true,
    },
    channel: {
      type: String,
      enum: OtpChannel,
      required: true,
    },
    phone: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: false,
      lowercase: true,
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
    verifiedAt: {
      type: Date,
      required: false,
    },
    isConsumed: {
      type: Boolean,
      default: false,
    },
  },
  baseSchemaOptions,
);

otpSchema.add(auditSchemaFields);

otpSchema.index({ phone: 1, purpose: 1, channel: 1, expiresAt: 1 });
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
// unique constraint to prevent multiple otp for same user for same purpose
otpSchema.index(
  {
    email: 1,
    purpose: 1,
    channel: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      isConsumed: false,
    },
  },
);

const Otp =
  (mongoose.models.Otp as mongoose.Model<IOtp> | undefined) ||
  mongoose.model<IOtp>("Otp", otpSchema);

export default Otp;
