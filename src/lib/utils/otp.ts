import bcrypt from "bcrypt";
import crypto from "crypto";

const SALT_ROUNDS = 10;

export const generateOtp = (length: number = 6): string => {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;

  const otp = crypto.randomInt(min, max + 1);
  return otp.toString();
};

/** Hash a plain-text OTP before persisting it. */
export const hashOtp = (otp: string): Promise<string> => {
  return bcrypt.hash(otp, SALT_ROUNDS);
};

/** Compare a plain-text OTP against a stored hash. */
export const verifyOtpHash = (
  plainOtp: string,
  hash: string,
): Promise<boolean> => {
  return bcrypt.compare(plainOtp, hash);
};
