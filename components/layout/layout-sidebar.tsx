import { getCurrentUser } from "@/lib/dal/user";
import { AppSidebar } from "../app-sidebar";
import BreadcrumbContainer from "../ui/breadcrumb-container";
import { Separator } from "../ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { redirect } from "next/navigation";
import UserProvider from "@/contexts/user-context";
import { User } from "@/types";

const LayoutSidebar = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();
  if (!user) redirect("/");
  return (
    <UserProvider user={user as User}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
            </div>
            <BreadcrumbContainer />
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </UserProvider>
  );
};

export default LayoutSidebar;
