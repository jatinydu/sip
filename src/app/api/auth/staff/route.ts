import { getAuthStaff } from "@/lib/utils/jwt";
import { StaffRoles } from "@/models/enums";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import staffModel from "@/models/staff.model";

export async function GET(req: NextRequest) {
  try {
    const authStaff = getAuthStaff(req);

    if (authStaff.role !== StaffRoles.BRANCH_ADMIN) {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied",
        },
        {
          status: StatusCodes.FORBIDDEN,
        },
      );
    }

    const staffs = await staffModel.find({
      organization: authStaff.organizationId,
      location: authStaff.locationId,
      isDeleted: false,
    })
      .select("-passwordHash")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        staffs,
      },
      {
        status: StatusCodes.OK,
      },
    );
  } catch (error) {
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
  }
}