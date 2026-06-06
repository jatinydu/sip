import mongoose from "mongoose";
import { auditSchemaFields, baseSchemaOptions } from "./baseSchema";

interface IReward extends mongoose.Document {
  rewardValue: string;
  description?: string;

  requiredVisits: number;

  rules?: string[];

  organization: mongoose.Types.ObjectId;

  isActive: boolean;
}

const rewardSchema = new mongoose.Schema<IReward>(
  {
    rewardValue: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    requiredVisits: {
      type: Number,
      required: true,
    },
    rules: [
      {
        type: String,
        required: false,
      },
    ],
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

const Reward = mongoose.model<IReward>("Reward", rewardSchema);

export default Reward;
