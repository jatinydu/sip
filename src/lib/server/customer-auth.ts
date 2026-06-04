import { OtpChannel } from "@/models/enums";
import { ISignupData } from "./auth";

interface ICustomerSignupData extends Omit<ISignupData, "email" | "password" > {
  channel: OtpChannel;
}

export const handleCustomerSignupWithOtp = async ({
  phone,
  name,
  userType,
  channel,
}: ICustomerSignupData) => {
  console.log("Handling customer signup with OTP for:", {
    phone,
    name,
    userType,
    channel,
  });
};
