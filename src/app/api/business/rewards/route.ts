import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

import Reward from "@/models/reward.model";
import Organization from "@/models/organizations.model";
import User from "@/models/users.model";

import { getAuthUser } from "@/lib/utils/jwt";

import { createRewardSchema } from "@/validations/rewardSchema";

import { BusinessOnboardingStatus, UserTypes } from "@/models/enums";
import { MongoServerError } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const authUser = getAuthUser(req);

    const body = await req.json();

    const parsedBody = createRewardSchema.safeParse(body);

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

    const user = await User.findById(authUser.userId).lean();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: StatusCodes.NOT_FOUND,
        },
      );
    }

    if (user.userType !== UserTypes.BUSINESS) {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied",
        },
        {
          status: StatusCodes.FORBIDDEN,
        },
      );
    }

    if (user.businessOnboardingStatus !== BusinessOnboardingStatus.COMPLETED) {
      return NextResponse.json(
        {
          success: false,
          message: "Complete onboarding before creating rewards",
        },
        {
          status: StatusCodes.FORBIDDEN,
        },
      );
    }

    const organization = await Organization.findOne({
      owner: user._id,
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

    const {
      rewardTitle,
      description,
      requiredVisits,
      rules = [],
    } = parsedBody.data;

    const existingReward = await Reward.findOne({
      organization: organization._id,
      isActive: true,
    }).lean();

    if (existingReward) {
      return NextResponse.json(
        {
          success: false,
          message:
            "An active reward already exists. Deactivate it before creating a new reward.",
        },
        {
          status: StatusCodes.CONFLICT,
        },
      );
    }

    try {
      await Reward.create({
        rewardTitle,
        description,
        requiredVisits,
        rules,

        organization: organization._id,

        isActive: true,
      });
    } catch (error: unknown) {
      if (error instanceof MongoServerError && error.code === 11000) {
        return NextResponse.json(
          {
            success: false,
            message:
              "An active reward already exists. Deactivate it before creating a new reward.",
          },
          {
            status: StatusCodes.CONFLICT,
          },
        );
      }

      throw error;
    }

    return NextResponse.json(
      {
        success: true,
        message: "Reward created successfully",
      },
      {
        status: StatusCodes.CREATED,
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
