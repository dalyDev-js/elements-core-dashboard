import { ApiResponse } from "@/lib/api/types";
import { requireManageUsers } from "@/lib/auth/permissions";
import { db } from "@/lib/db";
import { usersTable } from "@/lib/db/schema";
import { createKindeUser } from "@/lib/kinde/management-api";
import { UserRole } from "@/types";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse>> {
  try {
    await requireManageUsers();

    const body = await request.json();
    const {
      first_name,
      last_name,
      email,
      role,
      avatar_url,
      profilePictureUrl,
    } = body;

    if (!email || !first_name || !last_name || !role) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Validation failed",
          error: "Missing required fields: email, first_name, last_name, role",
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Validation failed",
          error: "Invalid email format",
        },
        { status: 400 }
      );
    }

    // Validate role
    const validRoles: UserRole[] = [
      "super_admin",
      "admin",
      "engineer",
      "viewer",
    ];
    if (!validRoles.includes(role)) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Validation failed",
          error: `Invalid role. Must be one of: ${validRoles.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Step 3: Check if user already exists in database

    const existingUsers = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (existingUsers.length > 0) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "User already exists",
          error: "A user with this email already exists",
        },
        { status: 409 } // 409 Conflict
      );
    }

    // Step 4: Create user in Kinde
    const kindeUser = await createKindeUser({
      profile: {
        given_name: first_name,
        family_name: last_name,
      },
      identities: [
        {
          type: "email",
          details: {
            email: email,
          },
        },
      ],
    });

    // Step 5: Create user in database

    const [newUser] = await db
      .insert(usersTable)
      .values({
        id: kindeUser.id,
        first_name,
        last_name,
        email,
        role,
        profilePictureUrl: profilePictureUrl || null,
        avatar_url: avatar_url || null,
      })
      .returning();

    // Step 6: Return success response
    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: newUser,
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error creating user:", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Failed to create user",
      },
      { status: 500 }
    );
  }
}
