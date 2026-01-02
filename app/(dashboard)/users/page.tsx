import { Suspense } from "react";
import UsersTable from "./_components/users-table";
import SkeletonTableBasic from "@/components/skeletons/table-skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

export default async function UsersPage() {
  // Fetch data on the server
  "use cache";

  return (
    <div className="container mx-auto py-6">
      {/* PAGE HEADER */}
      <div className="flex justify-between items-start gap-2 flex-col mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <Button asChild>
          <Link href="/users/new">
            <PlusIcon /> Add User
          </Link>
        </Button>
      </div>

      {/* DATA TABLE */}
      <Suspense fallback={<SkeletonTableBasic />}>
        <UsersTable />
      </Suspense>
    </div>
  );
}
