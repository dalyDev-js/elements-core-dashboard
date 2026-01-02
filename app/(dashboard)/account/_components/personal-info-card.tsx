import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { User } from "@/types";

export async function PersonalInfoCard({ user }: { user: User }) {
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Personal Information</h3>
        <Button variant="default" size="sm" className="gap-2">
          Edit <Pencil className="h-3 w-3" />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* First Name */}
        <div>
          <label className="text-xs text-muted-foreground">First Name</label>
          <p className="mt-1 text-sm font-medium">
            {user.first_name.charAt(0).toUpperCase() +
              user.first_name?.slice(1)}
          </p>
        </div>

        {/* Last Name */}
        <div>
          <label className="text-xs text-muted-foreground">Last Name</label>
          <p className="mt-1 text-sm font-medium">
            {user.last_name.charAt(0).toUpperCase() + user.last_name?.slice(1)}
          </p>
        </div>

        {/* Email Address */}
        <div>
          <label className="text-xs text-muted-foreground">Email Address</label>
          <p className="mt-1 text-sm font-medium">{user.email}</p>
        </div>

        {/* Phone Number */}
        <div>
          <label className="text-xs text-muted-foreground">Phone Number</label>
          <p className="mt-1 text-sm font-medium">{user.phone_number}</p>
        </div>

        {/* User Role */}
        <div>
          <label className="text-xs text-muted-foreground">User Role</label>
          <p className="mt-1 text-sm font-medium">{user.role}</p>
        </div>
      </div>
    </Card>
  );
}
