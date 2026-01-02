import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function SkeletonTableBasic() {
  return (
    <div className="space-y-4">
      {/* TOOLBAR */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-1 items-center space-x-2">
          {/* Search Input Skeleton */}
          <Skeleton className="h-8 w-full" />
        </div>
        {/* Columns Button Skeleton */}
        <Skeleton className="h-8 w-[100px]" />
      </div>

      {/* TABLE */}
      <div className="rounded-2xl border">
        <Table>
          <TableHeader>
            <TableRow>
              {/* Checkbox */}
              <TableHead className="w-[40px]">
                <Skeleton className="h-4 w-4 rounded" />
              </TableHead>
              {/* Name */}
              <TableHead>
                <Skeleton className="h-4 w-[80px]" />
              </TableHead>
              {/* Email */}
              <TableHead>
                <Skeleton className="h-4 w-[60px]" />
              </TableHead>
              {/* Role */}
              <TableHead>
                <Skeleton className="h-4 w-[50px]" />
              </TableHead>
              {/* Actions */}
              <TableHead className="w-[60px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                {/* Checkbox Cell */}
                <TableCell>
                  <Skeleton className="h-4 w-4 rounded" />
                </TableCell>
                {/* Name Cell with Avatar */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-[120px]" />
                  </div>
                </TableCell>
                {/* Email Cell */}
                <TableCell>
                  <Skeleton className="h-4 w-[180px]" />
                </TableCell>
                {/* Role Badge Cell */}
                <TableCell>
                  <Skeleton className="h-5 w-[80px] rounded-full" />
                </TableCell>
                {/* Actions Cell */}
                <TableCell>
                  <Skeleton className="h-8 w-8 rounded-md" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between px-2">
        <Skeleton className="h-4 w-[150px]" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-[80px]" />
          <Skeleton className="h-8 w-[60px]" />
        </div>
      </div>
    </div>
  );
}
