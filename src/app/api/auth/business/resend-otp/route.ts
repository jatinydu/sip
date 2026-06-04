import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/configs/mongodb";
import User from "@/models/users.model";
import { UserTypes, OtpPurpose } from "@/models/enums";
import { generateOtp } from "@/lib/utils/otp";
import { sendOtpToEmail } from "@/lib/utils/email";

const resendSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email({ message: "Please enter a valid email address." })),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = resendSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid email address." },
        { status: 400 },
      );
    }

    const { email } = parsed.data;

    await connectDB();

    // Make sure an unverified business user exists for this email
    const user = await User.findOne({
      email,
      userType: UserTypes.BUSINESS,
      isVerified: false,
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message:
            "No pending signup found for this email. Please start the signup process again.",
        },
        { status: 404 },
      );
    }

    const otp = generateOtp(6);
    await sendOtpToEmail(email, user.firstName, otp, OtpPurpose.SIGNUP);

    return NextResponse.json(
      { success: true, message: "A new OTP has been sent to your email." },
      { status: 200 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
