import mongoose from "mongoose";
import { auditSchemaFields, baseSchemaOptions } from "./baseSchema";

interface ILocation extends mongoose.Document {
  name: string;
  address: string;
  city: string;
  country: string;
  staffs: mongoose.Types.ObjectId[];
  branch_owner: mongoose.Types.ObjectId;
  slug: string;
  qr_code: string;
  isPrimary: boolean;
}

const locationSchema = new mongoose.Schema<ILocation>(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    staffs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff",
      },
    ],
    branch_owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    qr_code: {
      type: String,
      default: "",
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
  },
  baseSchemaOptions,
);

locationSchema.add(auditSchemaFields);

const Location = mongoose.model<ILocation>("Location", locationSchema);

export default Location;
