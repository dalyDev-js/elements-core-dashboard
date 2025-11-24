import { getNavigationData } from "@/lib/dal/navigation";
import { NavMain } from "./nav-main";

export async function NavMainAsync() {
  const items = await getNavigationData();
  return <NavMain items={items} />;
}
