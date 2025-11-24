import { PageSkeleton } from "@/components/skeletons/page-skeleton";
import { Suspense } from "react";

/**
 * Dashboard page with Suspense Boundary #3
 *
 * Pattern:
 * - Page wrapper renders immediately with title
 * - Suspense boundary wraps async DashboardContent
 * - DashboardContent fetches data and streams in when ready
 */
export default function Dashboard() {
  return (
    <>
      {/* Title renders immediately */}
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Suspense Boundary #3: Page content */}
      <Suspense fallback={<PageSkeleton />}>
        <DashboardContent />
      </Suspense>
    </>
  );
}

/**
 * Async server component for dashboard content
 * Fetches data and renders when ready
 */
async function DashboardContent() {
  // Simulate async data fetching - REMOVE IN PRODUCTION
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Example data
  const stats = [
    { label: "Total Projects", value: "24" },
    { label: "Active Clients", value: "12" },
    { label: "Total Users", value: "48" },
    { label: "Tasks Completed", value: "156" },
  ];

  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border bg-card p-6 shadow-sm">
            <p className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <p className="text-muted-foreground">
          Your recent activity will appear here.
        </p>
      </div>
    </div>
  );
}
