import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

import Staff from "@/models/staff.model";

import { verifyPassword } from "@/lib/utils/password";
import { generateStaffAccessToken } from "@/lib/utils/jwt";

import { staffLoginSchema } from "@/validations/staffSchema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsedBody = staffLoginSchema.safeParse(body);

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

    const username = parsedBody.data.username.trim().toLowerCase();

    const { password } = parsedBody.data;

    const staff = await Staff.findOne({
      username,
      isDeleted: false,
    }).select("+passwordHash");

    // Prevent username enumeration
    if (!staff) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid username or password",
        },
        {
          status: StatusCodes.UNAUTHORIZED,
        },
      );
    }

    if (!staff.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: "Staff account is disabled",
        },
        {
          status: StatusCodes.FORBIDDEN,
        },
      );
    }

    const isPasswordValid = await verifyPassword(password, staff.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid username or password",
        },
        {
          status: StatusCodes.UNAUTHORIZED,
        },
      );
    }

    const accessToken = generateStaffAccessToken({
      staffId: staff._id.toString(),
      organizationId: staff.organization.toString(),
      locationId: staff.location.toString(),
      role: staff.role,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",

        staff: {
          id: staff._id,
          username: staff.username,
          role: staff.role,
          organizationId: staff.organization,
          locationId: staff.location,
        },
      },
      {
        status: StatusCodes.OK,
      },
    );

    response.cookies.set("staff-access-token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",

      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
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
