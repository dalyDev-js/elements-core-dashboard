import { Suspense } from "react";
import { AppSidebar } from "../app-sidebar";
import { NavMainAsync } from "@/components/nav-main-async";
import { NavUserAsync } from "@/components/nav-user-async";
import { NavMainSkeleton } from "@/components/skeletons/nav-main-skeleton";
import { NavUserSkeleton } from "@/components/skeletons/nav-user-skeleton";
import BreadcrumbContainer from "../ui/breadcrumb-container";
import { Separator } from "../ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { ModeToggle } from "../ui/theme-toggle";

const LayoutSidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar
        navMain={
          <Suspense fallback={<NavMainSkeleton />}>
            <NavMainAsync />
          </Suspense>
        }
        navUser={
          <Suspense fallback={<NavUserSkeleton />}>
            <NavUserAsync />
          </Suspense>
        }
      />
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
          <ModeToggle />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default LayoutSidebar;
