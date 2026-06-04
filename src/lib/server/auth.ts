import { OtpChannel, UserTypes } from "@/models/enums";
import { handleBusinessSignupWithOtp } from "./business-auth";
import { handleCustomerSignupWithOtp } from "./customer-auth";

export interface ISignupData {
  email?: string;
  phone?: string;
  name: string;
  userType: UserTypes;
  password?: string;
}
export const handleSignupRouting = async ({
  email,
  phone,
  name,
  userType,
  password,
}: ISignupData) => {
  const channel: OtpChannel =
    userType === UserTypes.BUSINESS ? OtpChannel.EMAIL : OtpChannel.PHONE;

  if (channel === OtpChannel.EMAIL && !email) {
    throw new Error("Email is required for business signup.");
  }

  if (channel === OtpChannel.PHONE && !phone) {
    throw new Error("Phone number is required for customer signup.");
  }

  let result;

  if (channel === OtpChannel.EMAIL) {
    // Handle email-based signup logic here
    result = await handleBusinessSignupWithOtp({
      email: email!,
      name,
      userType,
      channel,
      password,
    });
  } else {
    // Handle phone-based signup logic here
    result = await handleCustomerSignupWithOtp({
      phone: phone!,
      name,
      userType,
      channel,
    });
  }

  return result;
};
