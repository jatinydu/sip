import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

import Reward from "@/models/reward.model";
import Organization from "@/models/organizations.model";

import { getBusinessAuthUser } from "@/lib/utils/jwt";

import { updateRewardSchema } from "@/validations/rewardSchema";

interface RouteParams {
  params: Promise<{
    rewardId: string;
  }>;
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    const authUser = getBusinessAuthUser(req);

    const { rewardId } = await params;

    if (!mongoose.Types.ObjectId.isValid(rewardId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid reward id",
        },
        {
          status: StatusCodes.BAD_REQUEST,
        },
      );
    }

    const body = await req.json();

    const parsedBody = updateRewardSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body",
          errors: parsedBody.error.issues,
        },
        {
          status: StatusCodes.BAD_REQUEST,
        },
      );
    }

    const organization = await Organization.findOne({
      owner: authUser.userId,
      isDeleted: false,
    }).lean();

    if (!organization) {
      return NextResponse.json(
        {
          success: false,
          message: "Organization not found",
        },
        {
          status: StatusCodes.NOT_FOUND,
        },
      );
    }

    const reward = await Reward.findOne({
      _id: rewardId,
      organization: organization._id,
      isDeleted: false,
    });

    if (!reward) {
      return NextResponse.json(
        {
          success: false,
          message: "Reward not found",
        },
        {
          status: StatusCodes.NOT_FOUND,
        },
      );
    }

    // If activating a reward,
    // ensure no other active reward exists
    if (parsedBody.data.isActive === true && reward.isActive === false) {
      const existingActiveReward = await Reward.findOne({
        organization: organization._id,
        isActive: true,
        isDeleted: false,
        _id: {
          $ne: reward._id,
        },
      }).lean();

      if (existingActiveReward) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Another active reward already exists. Deactivate it first.",
          },
          {
            status: StatusCodes.CONFLICT,
          },
        );
      }
    }

    const updatedReward = await Reward.findByIdAndUpdate(
      reward._id,
      {
        $set: parsedBody.data,
      },
      {
        new: true,
        runValidators: true,
      },
    ).lean();

    return NextResponse.json(
      {
        success: true,
        message: "Reward updated successfully",
        reward: updatedReward,
      },
      {
        status: StatusCodes.OK,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      },
    );
  }
}
