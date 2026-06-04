import "server-only";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SESSION_COOKIE = "sip_session";
const JWT_SECRET = process.env.JWT_SECRET!;
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET environment variable.");
}

export interface SessionPayload {
  userId: string;
  email: string;
  userType: string;
  iat?: number;
  exp?: number;
}

/** Sign a JWT and write it as an httpOnly, Secure cookie. */
export async function createSession(payload: Omit<SessionPayload, "iat" | "exp">) {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

/** Read and verify the session cookie. Returns null if missing/invalid. */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET) as SessionPayload;
  } catch {
    return null;
  }
}

/** Delete the session cookie (logout). */
export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
