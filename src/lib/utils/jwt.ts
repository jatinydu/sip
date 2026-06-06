import jwt from "jsonwebtoken";
import { UserTypes } from "@/models/enums";
import { NextRequest } from "next/server";
import { StaffRoles } from "@/models/enums";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export interface BusinessTokenPayload {
  userId: string;
  userType: UserTypes;
}

export interface StaffTokenPayload {
  staffId: string;
  organizationId: string;
  locationId: string;
  role: StaffRoles;
}

export const generateBusinessAccessToken = (payload: BusinessTokenPayload) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

export const generateBusinessRefreshToken = (payload: BusinessTokenPayload) => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

export const verifyBusinessAccessToken = (
  token: string,
): BusinessTokenPayload => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET) as BusinessTokenPayload;
};

export const verifyBusinessRefreshToken = (
  token: string,
): BusinessTokenPayload => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET) as BusinessTokenPayload;
};

export const getBusinessAuthUser = (req: NextRequest): BusinessTokenPayload => {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) throw new Error("Unauthorized");

  return verifyBusinessAccessToken(token);
};

export const generateStaffAccessToken = (payload: StaffTokenPayload) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyStaffAccessToken = (token: string): StaffTokenPayload => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET) as StaffTokenPayload;
};

export const getAuthStaff = (req: NextRequest): StaffTokenPayload => {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new Error("Unauthorized");
  }

  return verifyStaffAccessToken(token);
};
