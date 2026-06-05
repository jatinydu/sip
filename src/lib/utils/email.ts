import { Resend } from "resend";
import { generateOtp } from "./otp";
import { BusinessEmailOtp } from "@/emails/business-email-otp";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const sendBusinessSignupOtp = async ({
  email,
  name,
}: {
  email: string;
  name: string;
}) => {
  const otp = generateOtp(6);

  await resend.emails.send({
    from: process.env.EMAIL_FROM as string,
    to: email,
    subject: "Welcome to Sip! Verify Your Email",
    react: BusinessEmailOtp({ firstName: name, otp }),
  });
};
