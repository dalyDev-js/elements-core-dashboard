import { User } from "@/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { cache } from "react";
import { db } from "../db";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";

export const getCurrentUser = cache(async (): Promise<User | null> => {
  try {
    const { getUser, isAuthenticated } = getKindeServerSession();
    if (!isAuthenticated) {
      return null;
    }
    const kindeUser = await getUser();
    if (!kindeUser?.id) {
      return null;
    }
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, kindeUser.id))
      .limit(1);
    return user ?? null;
  } catch (error) {
    console.error("Error Getting Current User", error);
    return null;
  }
});

export const getCurrentUserRole = cache(async (): Promise<string | null> => {
  const user = await getCurrentUser();
  return user?.role ?? null;
});

export const isUserAuthenticated = cache(async (): Promise<boolean | null> => {
  const { isAuthenticated } = getKindeServerSession();
  return await isAuthenticated();
});
