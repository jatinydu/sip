import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

import { UserTypes } from "@/models/enums";

export async function POST(req: NextRequest) {
  try {
    const { userType } = await req.json();

    const response = NextResponse.json(
      {
        success: true,
        message: "Logged out successfully",
      },
      {
        status: StatusCodes.OK,
      },
    );

    switch (userType) {
      case UserTypes.BUSINESS: {
        response.cookies.set("refresh-token", "", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          expires: new Date(0),
        });

        break;
      }

      case "staff": {
        response.cookies.set("staff-access-token", "", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          expires: new Date(0),
        });

        break;
      }

      default: {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid user type",
          },
          {
            status: StatusCodes.BAD_REQUEST,
          },
        );
      }
    }

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
