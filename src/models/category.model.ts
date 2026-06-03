import mongoose from "mongoose";
import { auditSchemaFields, baseSchemaOptions } from "./baseSchema";

interface ICategory extends mongoose.Document {
  name: string;
  desc?: string;
  isActive: boolean;
  organizations: mongoose.Types.ObjectId[];
}

const categorySchema = new mongoose.Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    organizations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
      },
    ],
  },
  baseSchemaOptions
);

categorySchema.add(auditSchemaFields);

const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;
