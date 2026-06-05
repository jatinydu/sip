import { Resend } from "resend";
import { BusinessEmailOtp } from "@/emails/business-email-otp";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const sendBusinessSignupOtp = async ({
  email,
  name,
  otp,
}: {
  email: string;
  name: string;
  otp: string;
}) => {
  await resend.emails.send({
    from: process.env.EMAIL_FROM as string,
    to: email,
    subject: "Welcome to Sip! Verify Your Email",
    react: BusinessEmailOtp({ firstName: name, otp }),
  });
};
