import mongoose from "mongoose";
import { auditSchemaFields, baseSchemaOptions } from "./baseSchema";

interface IReward extends mongoose.Document {
  title: string;
  desc?: string;
  stepsRequired: number;
  organization: mongoose.Types.ObjectId;
  isActive: boolean;
}

const rewardSchema = new mongoose.Schema<IReward>(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: false,
    },
    stepsRequired: {
      type: Number,
      required: true,
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

const Reward = mongoose.model<IReward>("Reward", rewardSchema);

export default Reward;
