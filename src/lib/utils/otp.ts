import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const generateOtp = (length: number = 6): string => {
  const digits = "0123456789";

  let otp = "";

  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }

  return otp;
};

/** Hash a plain-text OTP before persisting it. */
export const hashOtp = (otp: string): Promise<string> => {
  return bcrypt.hash(otp, SALT_ROUNDS);
};

/** Compare a plain-text OTP against a stored hash. */
export const verifyOtp = (plainOtp: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(plainOtp, hash);
};
