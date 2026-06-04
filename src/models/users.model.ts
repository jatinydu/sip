import mongoose from "mongoose";
import { BusinessOnboardingStatus, UserTypes } from "./enums";
import { auditSchemaFields, baseSchemaOptions } from "./baseSchema";

export interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  passwordHash?: string;
  isVerified: boolean;
  userType: UserTypes;
  businessOnboardingStatus?: BusinessOnboardingStatus;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: false,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: false,
      select: false, // never returned in queries unless explicitly projected
    },
    email: {
      type: String,
      required: false,
      lowercase: true,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    userType: {
      type: String,
      enum: UserTypes,
      default: UserTypes.CUSTOMER,
    },
    businessOnboardingStatus: {
      type: String,
      enum: BusinessOnboardingStatus,
      required: false,
    },
  },
  baseSchemaOptions,
);

userSchema.add(auditSchemaFields);

userSchema.index({ phone: 1 }, { unique: true, sparse: true });
userSchema.index({ email: 1 }, { unique: true, sparse: true });
userSchema.index({ userType: 1, businessOnboardingStatus: 1 });

const User =
  (mongoose.models.User as mongoose.Model<IUser> | undefined) ||
  mongoose.model<IUser>("User", userSchema);

export default User;
