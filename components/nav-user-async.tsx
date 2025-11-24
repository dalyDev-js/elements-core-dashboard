import { getCurrentUser } from "@/lib/dal/user";
import { redirect } from "next/navigation";
import { NavUser } from "./nav-user";
import { User } from "@/types";

export async function NavUserAsync() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  return <NavUser user={user as User} />;
}
