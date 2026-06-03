import mongoose from "mongoose";
import { auditSchemaFields, baseSchemaOptions } from "./baseSchema";

interface IOrganization extends mongoose.Document {
  name: string;
  owner: mongoose.Types.ObjectId;
  logo: string;
  locations: mongoose.Types.ObjectId[];
  category: mongoose.Types.ObjectId;
  slug: string;
}

const organizationSchema = new mongoose.Schema<IOrganization>(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    logo: {
      type: String,
      default: "",
    },
    locations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  baseSchemaOptions,
);

organizationSchema.add(auditSchemaFields);

const Organization = mongoose.model<IOrganization>(
  "Organization",
  organizationSchema,
);

export default Organization;
