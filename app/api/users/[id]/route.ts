import { ApiResponse } from "@/lib/api/types";
import { requireManageUsers } from "@/lib/auth/permissions";
import { db } from "@/lib/db";
import { usersTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { deleteKindeUser } from "@/lib/kinde/management-api"; // ✅ Import
import { User } from "@/types";
import { getCurrentUser } from "@/lib/auth/session";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check permissions
    await requireManageUsers();

    // Await params
    const { id } = await params;

    // Validate ID
    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { success: false, message: "Invalid user ID" },
        { status: 400 }
      );
    }

    // Prevent self-deletion
    const currentUserId = (await getCurrentUser())?.id;

    if (id === currentUserId) {
      return NextResponse.json(
        {
          success: false,
          error: "You cannot delete yourself",
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Delete from database first
    const result = await db
      .delete(usersTable)
      .where(eq(usersTable.id, id))
      .returning();

    // Check if user existed
    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: "User not found" } as ApiResponse,
        { status: 404 }
      );
    }

    const deletedUser = result[0];

    // ✅ Delete from Kinde (complete deletion)
    try {
      await deleteKindeUser(id);
      console.log("✅ User deleted from both database and Kinde");
    } catch (kindeError) {
      // User already deleted from DB, but Kinde deletion failed
      console.error("⚠️ Failed to delete from Kinde:", kindeError);
      console.error("⚠️ Kinde error details:", {
        name: kindeError instanceof Error ? kindeError.name : "Unknown",
        message:
          kindeError instanceof Error ? kindeError.message : String(kindeError),
        stack: kindeError instanceof Error ? kindeError.stack : undefined,
      });

      // Still return success since DB deletion worked
      // Log this for monitoring
      return NextResponse.json(
        {
          success: true,
          message:
            "User deleted from database, but failed to delete from Kinde",
          data: deletedUser,
          kindeError:
            kindeError instanceof Error
              ? kindeError.message
              : String(kindeError),
        } as ApiResponse<User>,
        { status: 200 }
      );
    }

    console.log("✅ User fully deleted:", deletedUser.id, deletedUser.email);

    return NextResponse.json(
      {
        success: true,
        message: "User deleted successfully",
        data: deletedUser,
      } as ApiResponse<User>,
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error deleting user:", error);

    if (error instanceof Error) {
      if (
        error.message.includes("Unauthorized") ||
        error.message.includes("Forbidden")
      ) {
        return NextResponse.json(
          { success: false, error: "Permission denied" },
          { status: 403 }
        );
      }
    }

    return NextResponse.json(
      { success: false, error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
