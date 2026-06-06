// app/api/auth/business/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

import User from "@/models/users.model";

import { generateAccessToken, generateRefreshToken } from "@/lib/utils/jwt";

import { verifyPassword } from "@/lib/utils/password";

import { businessLoginSchema } from "@/validations/loginSchema";

import { UserTypes, BusinessOnboardingStatus } from "@/models/enums";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const normalizedEmail = body?.email?.trim()?.toLowerCase();

    const parsedBody = businessLoginSchema.safeParse({
      email: normalizedEmail,
      password: body?.password,
    });

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

    const { email, password } = parsedBody.data;

    const user = await User.findOne({
      email,
      userType: UserTypes.BUSINESS,
    }).select("+passwordHash");

    // Prevent account enumeration
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        {
          status: StatusCodes.UNAUTHORIZED,
        },
      );
    }

    if (!user.passwordHash) {
      return NextResponse.json(
        {
          success: false,
          message: "Password login is not available for this account",
        },
        {
          status: StatusCodes.BAD_REQUEST,
        },
      );
    }

    const isPasswordValid = await verifyPassword(password, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        {
          status: StatusCodes.UNAUTHORIZED,
        },
      );
    }

    if (!user.isVerifiedEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Please verify your email before logging in",
          nextStep: "email_verification",
        },
        {
          status: StatusCodes.FORBIDDEN,
        },
      );
    }

    const accessToken = generateAccessToken({
      userId: user._id.toString(),
      userType: user.userType,
    });

    const refreshToken = generateRefreshToken({
      userId: user._id.toString(),
      userType: user.userType,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",

        accessToken,

        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          userType: user.userType,
          isVerified: user.isVerifiedEmail,
          businessOnboardingStatus: user.businessOnboardingStatus,
        },

        nextStep:
          user.businessOnboardingStatus === BusinessOnboardingStatus.COMPLETED
            ? "dashboard"
            : "business_onboarding",
      },
      {
        status: StatusCodes.OK,
      },
    );

    response.cookies.set("refresh-token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",

      sameSite: "strict",

      path: "/",

      maxAge: 60 * 60 * 24 * 30,
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
