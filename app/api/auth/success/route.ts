import { db } from "@/lib/db";
import { usersTable } from "@/lib/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  //if user is not found, throw an error
  if (!user || user === null) {
    throw new Error("Something Went Wrong with Authentication" + user);
  }
  const dbUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, user.id));
  //if user is not in the database, add them
  if (!dbUser || dbUser.length === 0) {
    await db.insert(usersTable).values({
      id: user.id,
      first_name: user.given_name ?? "",
      last_name: user.family_name ?? "",
      email: user.email ?? "",
      role: "engineer",
      profilePictureUrl: user.picture ?? "",
    });
  }
  return NextResponse.redirect("http://localhost:3000/dashboard");
}
