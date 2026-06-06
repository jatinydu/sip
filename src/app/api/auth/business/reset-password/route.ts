import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

import User from "@/models/users.model";
import Otp from "@/models/otp.model";

import { hashPassword } from "@/lib/utils/password";

import { OtpPurpose } from "@/models/enums";

import { resetPasswordSchema } from "@/validations/resetPasswordSchema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsedBody = resetPasswordSchema.safeParse(body);

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

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+passwordHash");

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Account not found",
        },
        {
          status: StatusCodes.NOT_FOUND,
        },
      );
    }

    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

    const verifiedOtp = await Otp.findOne({
      email: normalizedEmail,
      purpose: OtpPurpose.RESET_PASSWORD,
      isConsumed: true,
      verifiedAt: {
        $gte: tenMinutesAgo,
      },
    });

    if (!verifiedOtp) {
      return NextResponse.json(
        {
          success: false,
          message: "Password reset verification required",
        },
        {
          status: StatusCodes.FORBIDDEN,
        },
      );
    }

    const passwordHash = await hashPassword(password);

    user.passwordHash = passwordHash;

    await user.save();

    await Otp.deleteMany({
      email: normalizedEmail,

      purpose: OtpPurpose.RESET_PASSWORD,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Password reset successfully",

        nextStep: "login",
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
