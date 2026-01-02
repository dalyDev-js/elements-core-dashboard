"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import { ApiResponse } from "@/lib/api/types";
import { usersApi } from "@/lib/api/users";
import { User } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function UserTableActions({ user }: { user: User }) {
  const { confirm, ConfirmDialog } = useConfirm();
  const router = useRouter();
  const queryClient = useQueryClient();

  // ✅ Mutation WITHOUT onSuccess/onError (no toasts here)
  const deleteUserMutation = useMutation({
    mutationFn: usersApi.delete,
  });

  const handleDeleteUser = async () => {
    const confirmed = await confirm({
      title: "Delete User",
      description: `Are you sure you want to delete ${user.first_name} ${user.last_name}? This action cannot be undone.`,
      confirmText: "Delete",
      variant: "destructive",
    });

    if (!confirmed) return;

    toast.promise(deleteUserMutation.mutateAsync(user.id), {
      loading: `Deleting ${user.first_name} ${user.last_name}...`,
      success: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        router.refresh();
        return `${user.first_name} ${user.last_name} has been deleted`;
      },
      error: (error: AxiosError<ApiResponse<void>>) => {
        const res = error?.response?.data as ApiResponse<void> | undefined;
        return res?.error || "Failed to delete user";
      },
    });
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(user.id);
    toast.success("User ID copied to clipboard");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            disabled={deleteUserMutation.isPending}>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleCopyId}>
            Copy user ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push(`/users/${user.id}`)}>
            View details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/users/${user.id}/edit`)}>
            Edit user
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive"
            disabled={deleteUserMutation.isPending}
            onClick={handleDeleteUser}>
            {deleteUserMutation.isPending ? "Deleting..." : "Delete user"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDialog />
    </>
  );
}
