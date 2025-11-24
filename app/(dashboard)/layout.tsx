import LayoutSidebar from "@/components/layout/layout-sidebar";
import { Suspense } from "react";

function LayoutSkeleton() {
  return (
    <div className="flex h-screen">
      <div className="w-64 border-r bg-sidebar animate-pulse" />
      <div className="flex-1">
        <div className="h-16 border-b animate-pulse" />
        <div className="p-4 space-y-4">
          <div className="h-8 bg-muted rounded animate-pulse" />
          <div className="h-32 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<LayoutSkeleton />}>
      <LayoutSidebar>{children}</LayoutSidebar>
    </Suspense>
  );
}
