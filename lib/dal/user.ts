import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { cache } from "react";
import { db } from "../db";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";

export const getCurrentUser = cache(async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) return null;
  const kindeUser = await getUser();
  if (!kindeUser?.id) return null;

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, kindeUser.id))
    .limit(1);
  return user ?? null;
});

export const getAllUsers = cache(async () => {
  const users = await db.select().from(usersTable);
  return users ?? [];
});
