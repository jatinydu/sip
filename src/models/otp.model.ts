import mongoose from "mongoose";
import { OtpChannel, OtpPurpose } from "./enums";
import { auditSchemaFields, baseSchemaOptions } from "./baseSchema";

export interface IOtp extends mongoose.Document {
  otpHash: string;
  channel: OtpChannel;
  phone?: string;
  email?: string;
  ipAddress?: string;
  expiresAt: Date;
  purpose: OtpPurpose;
  attempts: number;
  verifiedAt?: Date;
  lastSentAt?: Date;
  resendCount: number;
  createdBy?: mongoose.Types.ObjectId;
  updatedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
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
    ipAddress: {
      type: String,
      required: false,
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
    verifiedAt: {
      type: Date,
      required: false,
    },
    lastSentAt: {
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

otpSchema.index({ email: 1, purpose: 1, channel: 1, expiresAt: 1 });
otpSchema.index({ phone: 1, purpose: 1, channel: 1, expiresAt: 1 });
otpSchema.index({ ipAddress: 1, purpose: 1, channel: 1, createdAt: 1 });
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Otp =
  (mongoose.models.Otp as mongoose.Model<IOtp> | undefined) ||
  mongoose.model<IOtp>("Otp", otpSchema);

export default Otp;
