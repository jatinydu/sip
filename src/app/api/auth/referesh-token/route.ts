import { cookies } from "next/headers";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

import { generateAccessToken, verifyRefreshToken } from "@/lib/utils/jwt";

export async function POST() {
  try {
    const refreshToken = (await cookies()).get("refresh-token")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Session expired. Please login again.",
        },
        {
          status: StatusCodes.UNAUTHORIZED,
        },
      );
    }

    const payload = verifyRefreshToken(refreshToken);

    const accessToken = generateAccessToken({
      userId: payload.userId,
      userType: payload.userType,
    });

    return NextResponse.json(
      {
        success: true,
        accessToken,
      },
      {
        status: StatusCodes.OK,
      },
    );
  } catch (error) {
    const errorMsg = error instanceof Error && error.message;
    console.log("/auth/referesh-token::: ", errorMsg);
    return NextResponse.json(
      {
        success: false,
        message: "Session expired. Please login again.",
      },
      {
        status: StatusCodes.UNAUTHORIZED,
      },
    );
  }
}
