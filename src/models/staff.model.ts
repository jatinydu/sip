import mongoose from "mongoose";
import { auditSchemaFields, baseSchemaOptions } from "./baseSchema";
import { StaffRoles } from "./enums";

export interface IStaff extends mongoose.Document {
  username: string;
  passwordHash: string;
  role: StaffRoles;
  location: mongoose.Types.ObjectId;
  organization: mongoose.Types.ObjectId;
  isActive: boolean;
}

const staffSchema = new mongoose.Schema<IStaff>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    passwordHash: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: StaffRoles,
      default: StaffRoles.STAFF,
    },

    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },

    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  baseSchemaOptions,
);

staffSchema.add(auditSchemaFields);

staffSchema.index(
  {
    username: 1,
  },
  {
    unique: true,
  },
);

staffSchema.index({
  organization: 1,
  location: 1,
  isActive: 1,
});

export default (mongoose.models.Staff as mongoose.Model<IStaff>) ||
  mongoose.model<IStaff>("Staff", staffSchema);
