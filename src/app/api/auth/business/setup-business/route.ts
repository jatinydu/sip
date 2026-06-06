import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

import User from "@/models/users.model";
import Organization from "@/models/organizations.model";
import Location from "@/models/location.model";

import { BusinessOnboardingStatus, UserTypes } from "@/models/enums";

import { getBusinessAuthUser } from "@/lib/utils/jwt";

import { businessOnboardingSchema } from "@/validations/businessOnboardingSchema";

import { generateSlug } from "@/lib/utils";
import { generateQrImage } from "@/lib/utils/qr";
import { uploadQrCode } from "@/lib/utils/uploadToCloudinary";

export async function POST(req: NextRequest) {
  const session = await mongoose.startSession();

  try {
    const authUser = getBusinessAuthUser(req);

    const body = await req.json();

    const parsedBody = businessOnboardingSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body",
          errors: parsedBody.error.issues,
        },
        {
          status: StatusCodes.BAD_REQUEST,
        },
      );
    }

    const user = await User.findById(authUser.userId);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: StatusCodes.NOT_FOUND,
        },
      );
    }

    if (user.userType !== UserTypes.BUSINESS) {
      return NextResponse.json(
        {
          success: false,
          message: "Only business accounts can access this resource",
        },
        {
          status: StatusCodes.FORBIDDEN,
        },
      );
    }

    if (!user.isVerifiedEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Email verification required",
        },
        {
          status: StatusCodes.FORBIDDEN,
        },
      );
    }

    if (user.businessOnboardingStatus === BusinessOnboardingStatus.COMPLETED) {
      return NextResponse.json(
        {
          success: false,
          message: "Business onboarding already completed",
        },
        {
          status: StatusCodes.CONFLICT,
        },
      );
    }

    const {
      organizationName,
      categoryId,
      logo,
      locationName,
      address,
      city,
      country,
    } = parsedBody.data;

    session.startTransaction();

    const orgSlug = generateSlug(organizationName);

    const [organization] = await Organization.create(
      [
        {
          name: organizationName,
          owner: user._id,
          category: categoryId,
          logo: logo ?? "",
          slug: orgSlug,
        },
      ],
      {
        session,
      },
    );

    const locationSlug = generateSlug(locationName);

    const qrValue = `${process.env.NEXT_PUBLIC_APP_URL}/checkin/${organization.slug}/${locationSlug}`;

    const qrImageBase64 = await generateQrImage(qrValue);

    const qrUpload = await uploadQrCode(qrImageBase64);

    const [location] = await Location.create(
      [
        {
          name: locationName,
          address,
          city,
          country,

          organization: organization._id,

          branch_owner: user._id,

          slug: locationSlug,

          qr_code: qrUpload.secure_url,

          qr_value: qrValue,

          isPrimary: true,
        },
      ],
      {
        session,
      },
    );

    organization.locations = [location._id];

    await organization.save({
      session,
    });

    user.businessOnboardingStatus = BusinessOnboardingStatus.COMPLETED;

    await user.save({
      session,
    });

    await session.commitTransaction();

    return NextResponse.json(
      {
        success: true,
        message: "Business onboarding completed successfully",

        organization: {
          id: organization._id,
          name: organization.name,
          slug: organization.slug,
        },

        location: {
          id: location._id,
          name: location.name,
          slug: location.slug,
          qrCode: location.qr_code,
          qrValue: location.qr_value,
        },

        nextStep: "dashboard",
      },
      {
        status: StatusCodes.CREATED,
      },
    );
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      },
    );
  } finally {
    session.endSession();
  }
}
