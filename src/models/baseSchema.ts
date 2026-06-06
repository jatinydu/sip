import mongoose from "mongoose";

export interface IBaseDocument extends mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  createdBy: mongoose.Types.ObjectId;
  updatedBy: mongoose.Types.ObjectId;
}

export const auditSchemaFields = new mongoose.Schema(
  {
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export const baseSchemaOptions = {
  timestamps: true,
};
