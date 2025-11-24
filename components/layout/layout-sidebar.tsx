import { Suspense } from "react";
import { AppSidebar } from "../app-sidebar";
import { NavMainAsync } from "@/components/nav-main-async";
import { NavUserAsync } from "@/components/nav-user-async";
import { NavMainSkeleton } from "@/components/skeletons/nav-main-skeleton";
import { NavUserSkeleton } from "@/components/skeletons/nav-user-skeleton";
import BreadcrumbContainer from "../ui/breadcrumb-container";
import { Separator } from "../ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";

/**
 * LayoutSidebar - Provides structure with Suspense boundaries
 *
 * Structure:
 * - SidebarProvider (wrapper)
 * - AppSidebar (client component that receives server components as props)
 *   - navMain: Server component wrapped in Suspense
 *   - navUser: Server component wrapped in Suspense
 * - Header with SidebarTrigger and breadcrumbs
 * - Main content area for page children
 *
 * Authentication and data fetching happen in server components:
 * - NavUserAsync handles auth redirect
 * - NavMainAsync handles navigation data
 * - Each page handles its own data
 */
const LayoutSidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      {/* AppSidebar receives server components as props */}
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
        {/* Header - renders immediately */}
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
        {/* Main content area - page children handle their own Suspense */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default LayoutSidebar;
