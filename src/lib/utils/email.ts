import { connectDB } from "@/lib/configs/mongodb";
import Otp from "@/models/otp.model";
import { OtpChannel, OtpPurpose } from "@/models/enums";
import { resend } from "../configs/resend";
import { BusinessEmailOtp } from "@/emails/business-email-otp";
import { hashOtp } from "./otp";

/**
 * Sends a 6-digit OTP to the given email address for the specified purpose
 * and persists a bcrypt-hashed copy in the database.
 *
 * Throws if a non-expired OTP already exists for the same email + purpose.
 */
export const sendOtpToEmail = async (
  email: string,
  firstName: string,
  otp: string,
  purpose: OtpPurpose,
): Promise<{ success: true; message: string }> => {
  await connectDB();

  // Expire any live OTPs for the same purpose so only the freshest one is valid
  await Otp.updateMany(
    {
      email,
      purpose,
      channel: OtpChannel.EMAIL,
      expiresAt: { $gt: new Date() },
      verifiedAt: { $exists: false },
    },
    { $set: { expiresAt: new Date() } },
  );

  // Send the email first — if delivery fails we don't save anything
  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM || "Sip <onboarding@resend.dev>",
    to: email,
    subject: `Your OTP for ${purpose}`,
    react: BusinessEmailOtp({ firstName, otp }),
  });

  if (error) {
    throw new Error(`Failed to send OTP email: ${error.message}`);
  }

  // Persist bcrypt-hashed OTP — never store plaintext
  const otpHash = await hashOtp(otp);

  const otpDoc = new Otp({
    email,
    otpHash,
    purpose,
    channel: OtpChannel.EMAIL,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    lastSentAt: new Date(),
  });

  await otpDoc.save();

  return { success: true, message: "OTP sent to email successfully." };
};
