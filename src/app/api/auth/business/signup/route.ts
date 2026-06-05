import { hashPassword } from "@/lib/utils/password";
import { UserTypes } from "@/models/enums";
import User from "@/models/users.model";
import { businessSignupSchema } from "@/validations/signupSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsedBody = businessSignupSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body",
          error: parsedBody.error.issues,
        },
        { status: 400 },
      );
    }

    const { email, password, name } = parsedBody.data;

    // check if email exists
    const isUserExist = await User.findOne({ email });

    if (isUserExist && isUserExist.isVerifiedEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "User with email already exists",
        },
        { status: 400 },
      );
    }

    // if user exists but not verified, delete it and create new one
    if (isUserExist && !isUserExist.isVerifiedEmail) {
      await User.deleteOne({ email });
    }

    const passwordHash = await hashPassword(password);

    const user = await User.create({
      email,
      passwordHash,
      name,
      userType: UserTypes.BUSINESS,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        user,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 },
    );
  }
}
