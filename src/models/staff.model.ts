import mongoose from "mongoose";
import { auditSchemaFields, baseSchemaOptions } from "./baseSchema";

interface IStaff extends mongoose.Document {
  username: string;
  password: string;
  location: mongoose.Types.ObjectId;
  organization: mongoose.Types.ObjectId;
  isActive: boolean;
}

const staffSchema = new mongoose.Schema<IStaff>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
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

staffSchema.index({ organization: 1, location: 1, isActive: 1 });

const Staff = mongoose.model<IStaff>("Staff", staffSchema);

export default Staff;
