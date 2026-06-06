import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import { MongoServerError } from "mongodb";

import User from "@/models/users.model";
import Staff from "@/models/staff.model";
import Location from "@/models/location.model";
import Organization from "@/models/organizations.model";

import { hashPassword } from "@/lib/utils/password";
import { getBusinessAuthUser } from "@/lib/utils/jwt";

import { createStaffSchema } from "@/validations/staffSchema";

import {
  BusinessOnboardingStatus,
  StaffRoles,
  UserTypes,
} from "@/models/enums";

export async function POST(req: NextRequest) {
  try {
    const authUser = getBusinessAuthUser(req);

    const body = await req.json();

    const parsedBody = createStaffSchema.safeParse(body);

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

    const { username, password, locationId, role } = parsedBody.data;

    let organizationId: string;

    /**
     * BUSINESS OWNER FLOW
     */
    if (authUser.userType === UserTypes.BUSINESS) {
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

      if (
        user.businessOnboardingStatus !== BusinessOnboardingStatus.COMPLETED
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "Complete onboarding first",
          },
          {
            status: StatusCodes.FORBIDDEN,
          },
        );
      }

      const organization = await Organization.findOne({
        owner: user._id,
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

      organizationId = organization._id.toString();
    } else {
      /**
       * BRANCH ADMIN FLOW
       */
      const admin = await Staff.findById(authUser.userId).lean();

      if (!admin) {
        return NextResponse.json(
          {
            success: false,
            message: "Staff not found",
          },
          {
            status: StatusCodes.NOT_FOUND,
          },
        );
      }

      if (!admin.isActive) {
        return NextResponse.json(
          {
            success: false,
            message: "Staff account disabled",
          },
          {
            status: StatusCodes.FORBIDDEN,
          },
        );
      }

      if (admin.role !== StaffRoles.BRANCH_ADMIN) {
        return NextResponse.json(
          {
            success: false,
            message: "Only branch admins can create staff",
          },
          {
            status: StatusCodes.FORBIDDEN,
          },
        );
      }

      /**
       * Branch admin cannot create another branch admin
       */
      if (role === StaffRoles.BRANCH_ADMIN) {
        return NextResponse.json(
          {
            success: false,
            message: "Branch admins cannot create other branch admins",
          },
          {
            status: StatusCodes.FORBIDDEN,
          },
        );
      }

      /**
       * Branch admin can create staff only
       * in their own location
       */
      if (locationId !== admin.location.toString()) {
        return NextResponse.json(
          {
            success: false,
            message: "You can only create staff for your own location",
          },
          {
            status: StatusCodes.FORBIDDEN,
          },
        );
      }

      organizationId = admin.organization.toString();
    }

    const location = await Location.findOne({
      _id: locationId,
      organization: organizationId,
      isDeleted: false,
    }).lean();

    if (!location) {
      return NextResponse.json(
        {
          success: false,
          message: "Location not found",
        },
        {
          status: StatusCodes.NOT_FOUND,
        },
      );
    }

    const passwordHash = await hashPassword(password);

    try {
      const staff = await Staff.create({
        username: username.trim().toLowerCase(),
        passwordHash,
        role,

        organization: organizationId,
        location: location._id,

        isActive: true,
      });

      return NextResponse.json(
        {
          success: true,
          message: "Staff created successfully",

          staff: {
            id: staff._id,
            username: staff.username,
            role: staff.role,
            organization: staff.organization,
            location: staff.location,
            isActive: staff.isActive,
          },
        },
        {
          status: StatusCodes.CREATED,
        },
      );
    } catch (error: unknown) {
      if (error instanceof MongoServerError && error.code === 11000) {
        return NextResponse.json(
          {
            success: false,
            message: "Username already exists",
          },
          {
            status: StatusCodes.CONFLICT,
          },
        );
      }

      throw error;
    }
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
