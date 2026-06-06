import mongoose from "mongoose";
import { verifyOtpHash } from "@/lib/utils/otp";
import { OtpChannel, OtpPurpose } from "@/models/enums";
import Otp from "@/models/otp.model";
import User from "@/models/users.model";
import { verifyOtpSchema } from "@/validations/otpSchema";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import { generateBusinessAccessToken, generateBusinessRefreshToken } from "@/lib/utils/jwt";

export async function POST(req: NextRequest) {
  const session = await mongoose.startSession();

  try {
    const {
      email,
      otp,
      purpose = OtpPurpose.SIGNUP,
      channel = OtpChannel.EMAIL,
    } = await req.json();

    const normalizedEmail = email?.trim()?.toLowerCase();

    const parsedBody = verifyOtpSchema.safeParse({
      email: normalizedEmail,
      otp,
      purpose,
      channel,
    });

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body",
          error: parsedBody.error.issues,
        },
        {
          status: StatusCodes.BAD_REQUEST,
        },
      );
    }

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Account does not exist",
        },
        {
          status: StatusCodes.NOT_FOUND,
        },
      );
    }

    if (purpose === OtpPurpose.SIGNUP && user.isVerifiedEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already verified",
        },
        {
          status: StatusCodes.CONFLICT,
        },
      );
    }

    if (purpose === OtpPurpose.RESET_PASSWORD && !user.isVerifiedEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Email not verified",
        },
        {
          status: StatusCodes.BAD_REQUEST,
        },
      );
    }

    const otpRecord = await Otp.findOne({
      email: normalizedEmail,
      purpose,
      isConsumed: false,
      expiresAt: {
        $gt: new Date(),
      },
    });

    if (!otpRecord) {
      return NextResponse.json(
        {
          success: false,
          message: "OTP expired or invalid",
        },
        {
          status: StatusCodes.BAD_REQUEST,
        },
      );
    }

    const isValidOtp = await verifyOtpHash(otp, otpRecord.otpHash);

    if (!isValidOtp) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid OTP",
        },
        {
          status: StatusCodes.BAD_REQUEST,
        },
      );
    }

    session.startTransaction();

    let accessToken = "";
    let refreshToken = "";

    let responseMsg = "Otp verified succesfully!";

    switch (purpose) {
      case OtpPurpose.SIGNUP: {
        user.isVerifiedEmail = true;

        await user.save({
          session,
        });

        accessToken = generateBusinessAccessToken({
          userId: user._id.toString(),
          userType: user.userType,
        });

        refreshToken = generateBusinessRefreshToken({
          userId: user._id.toString(),
          userType: user.userType,
        });

        responseMsg = "Signup email verified succesfully!";

        break;
      }

      case OtpPurpose.RESET_PASSWORD: {
        responseMsg = "Password reset verification succesafull!";
        break;
      }

      default:
        break;
    }

    otpRecord.isConsumed = true;
    otpRecord.verifiedAt = new Date();

    await otpRecord.save({
      session,
    });

    await session.commitTransaction();

    const userData =
      purpose === OtpPurpose.SIGNUP
        ? {
            email: user.email,
            userType: user.userType,
            id: user._id,
            isVerified: user.isVerifiedEmail,
          }
        : null;

    const response = NextResponse.json(
      {
        success: true,
        message: responseMsg,
        user: userData,
        ...(purpose === OtpPurpose.SIGNUP && {
          accessToken,
          nextStep: "business_onboarding",
        }),
        ...(purpose === OtpPurpose.RESET_PASSWORD && {
          canResetPassword: true,
        }),
      },
      {
        status: StatusCodes.OK,
      },
    );

    if (purpose === OtpPurpose.SIGNUP) {
      response.cookies.set("refresh-token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
    }

    return response;
  } catch (error) {
    await session.abortTransaction();

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
  } finally {
    session.endSession();
  }
}
