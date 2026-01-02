import { cache } from "react";
import { getCurrentUser, getCurrentUserRole } from "./session";

export const canManageUsers = cache(async (): Promise<boolean> => {
  try {
    const role = await getCurrentUserRole();
    if (!role) {
      return false;
    }
    return role === "super_admin" || role === "admin";
  } catch (error) {
    console.error(error);
    return false;
  }
});

export async function requireManageUsers(): Promise<void> {
  const canManage = await canManageUsers();

  if (!canManage) {
    const user = await getCurrentUser();

    if (!user) {
      throw new Error("Unauthorized: Please log in");
    }

    throw new Error(
      `Forbidden: Your role (${user.role}) doesn't have permission to manage users. Only admins and super admins can manage users.`
    );
  }
}
