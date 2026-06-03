import mongoose from "mongoose";
import { UserTypes } from "./enums";
import { auditSchemaFields, baseSchemaOptions } from "./baseSchema";

interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  phone: string;
  isPhoneVerified: boolean;
  userType: UserTypes;
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
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    userType: {
      type: String,
      enum: UserTypes,
      default: UserTypes.CUSTOMER,
    },
  },
  baseSchemaOptions,
);

userSchema.add(auditSchemaFields);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
