import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/configs/mongodb";
import Otp from "@/models/otp.model";
import User from "@/models/users.model";
import { OtpChannel, OtpPurpose, UserTypes } from "@/models/enums";
import { verifyOtp } from "@/lib/utils/otp";
import { createSession } from "@/lib/server/session";

const verifySchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email({ message: "Please enter a valid email address." })),
  otp: z
    .string()
    .length(6, { message: "OTP must be exactly 6 digits." })
    .regex(/^\d+$/, { message: "OTP must contain only digits." }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = verifySchema.safeParse(body);

    if (!parsed.success) {
      const treeErrors = z.treeifyError(parsed.error);
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: treeErrors },
        { status: 400 },
      );
    }

    const { email, otp } = parsed.data;

    await connectDB();

    // Find the most recent unexpired OTP for this email + signup purpose
    const otpDoc = await Otp.findOne({
      email,
      purpose: OtpPurpose.SIGNUP,
      channel: OtpChannel.EMAIL,
      expiresAt: { $gt: new Date() },
      verifiedAt: { $exists: false }, // not already consumed
    }).sort({ createdAt: -1 });

    if (!otpDoc) {
      return NextResponse.json(
        {
          success: false,
          message:
            "No valid OTP found. It may have expired — please request a new one.",
        },
        { status: 400 },
      );
    }

    // Guard against brute-force: max 5 attempts per OTP doc
    if (otpDoc.attempts >= 5) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Too many incorrect attempts. Please request a new OTP.",
        },
        { status: 429 },
      );
    }

    const isMatch = await verifyOtp(otp, otpDoc.otpHash);

    if (!isMatch) {
      // Increment attempts
      otpDoc.attempts += 1;
      await otpDoc.save();

      const remaining = 5 - otpDoc.attempts;
      return NextResponse.json(
        {
          success: false,
          message: `Invalid OTP. ${remaining} attempt${remaining !== 1 ? "s" : ""} remaining.`,
        },
        { status: 400 },
      );
    }

    // Mark OTP as consumed
    otpDoc.verifiedAt = new Date();
    await otpDoc.save();

    // Activate the pending user
    const user = await User.findOneAndUpdate(
      { email, userType: UserTypes.BUSINESS },
      { $set: { isVerified: true } },
      { new: true },
    );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message:
            "User record not found. Please restart the signup process.",
        },
        { status: 404 },
      );
    }

    // Issue a session cookie
    await createSession({
      userId: (user._id as unknown as { toString(): string }).toString(),
      email: user.email!,
      userType: user.userType,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Email verified successfully. Welcome to Sip!",
      },
      { status: 200 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
