import jwt from "jsonwebtoken";
import { UserTypes } from "@/models/enums";
import { NextRequest } from "next/server";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export interface TokenPayload {
  userId: string;
  userType: UserTypes;
}

export const generateAccessToken = (payload: TokenPayload) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (payload: TokenPayload) => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET) as TokenPayload;
};

export const getAuthUser = (req: NextRequest): TokenPayload => {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  if (!token)
    throw new Error(
      "Unauthorized",
    );

  return verifyAccessToken(token);
};
