import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import parsePhoneNumber from "libphonenumber-js";
import { UserTypes } from "@/models/enums";
import { handleSignupRouting } from "@/lib/server/auth";

export const signupSchema = z.object({
  // 1. Validated natively via Zod v4 (Internal compiled engine)
  email: z
    .string()
    .trim()
    .toLowerCase()
    .transform((val) => (val === "" ? undefined : val))
    .pipe(z.email({ message: "Please enter a valid email address." }))
    .optional(),

  // 2. Validated via pure JavaScript string analysis methods
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters long." })
    .refine((val) => val.split("").some((char) => char >= "A" && char <= "Z"), {
      message: "Password must contain at least one uppercase letter.",
    })
    .refine((val) => val.split("").some((char) => char >= "0" && char <= "9"), {
      message: "Password must contain at least one number.",
    }),

  // 3. Validated via Google's phone parser library framework
  phone: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .pipe(
      z.string().transform((val, ctx) => {
        // Automatically checks global length, country prefixes, and structural logic
        const parsed = parsePhoneNumber(val, { defaultCountry: "IN" }); // You can set a default country if needed

        if (!parsed || !parsed.isValid()) {
          ctx.addIssue({
            code: "custom",
            message: "Please enter a valid phone number (e.g., +919287738***).",
          });
          return z.NEVER;
        }

        // Returns the standardized E.164 string format back to your object
        return parsed.number;
      }),
    )
    .optional(),

  name: z.string().trim().min(1, { message: "Name is required." }),

  userType: z.enum([UserTypes.BUSINESS, UserTypes.CUSTOMER]),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedBody = signupSchema.safeParse(body);
    if (!validatedBody.success) {
      const treeErros = z.treeifyError(validatedBody.error);

      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: treeErros,
        },
        { status: 400 },
      );
    }

    const { email, password, phone, name, userType } = validatedBody.data;

    const signupRes = await handleSignupRouting({
      email,
      phone,
      name,
      userType,
      password,
    });

    return NextResponse.json(signupRes, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";

    // Surface known conflict errors as 409 so the client can act on them
    const isConflict =
      message.includes("already exists") || message.includes("already been sent");

    return NextResponse.json(
      { success: false, message },
      { status: isConflict ? 409 : 500 },
    );
  }
}
