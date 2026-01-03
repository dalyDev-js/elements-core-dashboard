import { Suspense } from "react";
import UsersTable from "../users/_components/users-table";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SkeletonTableBasic from "@/components/skeletons/table-skeleton";

const Projects = () => {
  return (
    <div className="container mx-auto py-6">
      {/* PAGE HEADER */}
      <div className="flex justify-between items-start gap-2 flex-col mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <Button asChild>
          <Link href="/projects/new">
            <PlusIcon /> Add Project
          </Link>
        </Button>
      </div>

      {/* DATA TABLE */}
      <Suspense fallback={<SkeletonTableBasic />}>
        <UsersTable />
      </Suspense>
    </div>
  );
};

export default Projects;
