import bcrypt from "bcrypt";
import { OtpChannel, OtpPurpose, UserTypes } from "@/models/enums";
import { ISignupData } from "./auth";
import User from "@/models/users.model";
import { generateOtp } from "../utils/otp";
import { sendOtpToEmail } from "../utils/email";
import { connectDB } from "../configs/mongodb";

interface IBusinessSignupData extends Omit<ISignupData, "phone"> {
  channel: OtpChannel;
}

export const handleBusinessSignupWithOtp = async ({
  email,
  channel,
  name,
  userType,
  password,
}: IBusinessSignupData): Promise<{ success: true; message: string }> => {
  if (!email) {
    throw new Error("Email is required for business signup.");
  }

  if (!password) {
    throw new Error("Password is required for business signup.");
  }

  await connectDB();

  // Reject if a *verified* business with this email already exists
  const existingVerified = await User.findOne({ email, userType, isVerified: true });
  if (existingVerified) {
    throw new Error("A business with this email already exists.");
  }

  // Split "Full Name" → firstName / lastName
  const nameParts = name.trim().split(/\s+/);
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ") || firstName; // fallback

  // Upsert an *unverified* user so we hold the password hash ahead of OTP confirmation.
  // If a previous attempt exists (not yet verified) we just overwrite the password hash.
  const passwordHash = await bcrypt.hash(password, 10);

  await User.findOneAndUpdate(
    { email, userType },
    {
      $set: {
        firstName,
        lastName,
        passwordHash,
        isVerified: false,
        userType: UserTypes.BUSINESS,
      },
    },
    { upsert: true, new: true },
  );

  // Generate OTP and deliver via email
  const otp = generateOtp(6);

  await sendOtpToEmail(email, firstName, otp, OtpPurpose.SIGNUP);

  return {
    success: true,
    message:
      "OTP sent to your email. Please verify your email to complete signup.",
  };
};
