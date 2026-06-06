import mongoose from "mongoose";
import { auditSchemaFields, baseSchemaOptions } from "./baseSchema";

export interface IReward extends mongoose.Document {
  rewardTitle: string;
  description?: string;

  requiredVisits: number;

  rules: string[];

  organization: mongoose.Types.ObjectId;

  isActive: boolean;
}

const rewardSchema = new mongoose.Schema<IReward>(
  {
    rewardTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    requiredVisits: {
      type: Number,
      required: true,
      min: 1,
    },
    rules: {
      type: [String],
      default: [],
    },
    organization: {
      type: mongoose.Types.ObjectId,
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

rewardSchema.add(auditSchemaFields);

rewardSchema.index({ organization: 1, isActive: 1 });

const Reward =
  (mongoose.models.Reward as mongoose.Model<IReward> | undefined) ||
  mongoose.model<IReward>("Reward", rewardSchema);

export default Reward;
