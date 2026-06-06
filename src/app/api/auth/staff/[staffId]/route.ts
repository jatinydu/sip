import { getAuthStaff } from "@/lib/utils/jwt";
import { hashPassword } from "@/lib/utils/password";
import { StaffRoles } from "@/models/enums";
import staffModel from "@/models/staff.model";
import { updateStaffSchema } from "@/validations/staffSchema";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ staffId: string }> },
) {
  try {
    const authStaff = getAuthStaff(req);

    if (authStaff.role !== StaffRoles.BRANCH_ADMIN) {
      return NextResponse.json({
        success: false,
        message: "Only Branch Admin can update Staff!",
      });
    }

    const { staffId } = await params;

    const body = await req.json();

    const parsedBody = updateStaffSchema.safeParse(body);

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

    const staff = await staffModel.findOne({
      _id: staffId,
      organization: authStaff.organizationId,
      location: authStaff.locationId,
      isDeleted: false,
    });

    if (!staff) {
      return NextResponse.json(
        {
          success: false,
          message: "Staff not found",
        },
        {
          status: StatusCodes.NOT_FOUND,
        },
      );
    }

    if (staff._id.toString() === authStaff.staffId) {
      return NextResponse.json(
        {
          success: false,
          message: "You cannot update yourself",
        },
        {
          status: StatusCodes.FORBIDDEN,
        },
      );
    }

    if (parsedBody.data.username) {
      staff.username = parsedBody.data.username.trim().toLowerCase();
    }

    if (parsedBody.data.password) {
      staff.passwordHash = await hashPassword(parsedBody.data.password);
    }

    if (typeof parsedBody.data.isActive === "boolean") {
      staff.isActive = parsedBody.data.isActive;
    }

    await staff.save();

    return NextResponse.json(
      {
        success: true,
        message: "Staff updated successfully",
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ staffId: string }> },
) {
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

    const { staffId } = await params;

    const staff = await staffModel.findOne({
      _id: staffId,
      organization: authStaff.organizationId,
      location: authStaff.locationId,
      isDeleted: false,
    });

    if (!staff) {
      return NextResponse.json(
        {
          success: false,
          message: "Staff not found",
        },
        {
          status: StatusCodes.NOT_FOUND,
        },
      );
    }

    if (staff._id.toString() === authStaff.staffId) {
      return NextResponse.json(
        {
          success: false,
          message: "You cannot delete yourself",
        },
        {
          status: StatusCodes.FORBIDDEN,
        },
      );
    }

    staff.isActive = false;
    staff.isDeleted = true;

    await staff.save();

    return NextResponse.json(
      {
        success: true,
        message: "Staff disabled successfully",
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
