import { sendBusinessSignupOtp, sendResetPasswordOtp } from "@/lib/utils/email";
import { generateOtp, hashOtp } from "@/lib/utils/otp";
import { OtpChannel, OtpPurpose, UserTypes } from "@/models/enums";
import Otp from "@/models/otp.model";
import User from "@/models/users.model";
import { sendOtpSchema } from "@/validations/otpSchema";
import { StatusCodes } from "http-status-codes";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      email,
      userType = UserTypes.BUSINESS,
      purpose = OtpPurpose.SIGNUP,
      channel = OtpChannel.EMAIL,
    } = await req.json();

    const normalizedEmail = email?.toLowerCase()?.trim();

    const parsedBody = sendOtpSchema.safeParse({
      email: normalizedEmail,
      userType,
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
        { status: StatusCodes.BAD_REQUEST },
      );
    }

    //     body -> purpose, email, channel, userType
    const user = await User.findOne({
      email: normalizedEmail,
    }).lean();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Account not exist!",
        },
        { status: StatusCodes.NOT_FOUND },
      );
    }

    if (purpose === OtpPurpose.SIGNUP && user.isVerifiedEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "You are already verified, login to access platform!",
        },
        { status: StatusCodes.CONFLICT },
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

    const existingOtp = await Otp.findOne({
      email: normalizedEmail,
      purpose,
      isConsumed: false,
      expiresAt: {
        $gt: new Date(),
      },
    }).lean();

    if (existingOtp) {
      return NextResponse.json(
        {
          success: false,
          message: "otp already sent, use that otp!",
        },
        { status: StatusCodes.CONFLICT },
      );
    }

    const otp = generateOtp(6);
    const otpHash = await hashOtp(otp);

    try {
      await Otp.create({
        email: normalizedEmail,
        purpose,
        channel,
        otpHash,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      });
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "error while saving otp";
      console.log("/business/send-otp :: ", errorMsg);
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

    try {
      if (purpose === OtpPurpose.SIGNUP) {
        await sendBusinessSignupOtp({
          email: normalizedEmail,
          name: user.name,
          otp,
        });
      } else if (purpose === OtpPurpose.RESET_PASSWORD) {
        await sendResetPasswordOtp({
          email: normalizedEmail,
          name: user.name,
          otp,
        });
      } else {
        throw Error("wrong purpose passed!");
      }
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Error sending otp!";
      console.log("/business/sendotp :: ", errorMsg);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send OTP. Please try again.",
        },
        {
          status: StatusCodes.INTERNAL_SERVER_ERROR,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Otp sent successfully",
      },
      { status: StatusCodes.OK },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: StatusCodes.INTERNAL_SERVER_ERROR },
    );
  }
}
