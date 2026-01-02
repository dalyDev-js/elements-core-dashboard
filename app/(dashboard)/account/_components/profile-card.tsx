import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { User } from "@/types";

export async function ProfileCard({ user }: { user: User }) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user.avatar_url || user.profilePictureUrl || ""} />
          <AvatarFallback>
            {user.first_name.charAt(0).toUpperCase()}
            {user.last_name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">
            {user?.first_name?.charAt(0).toUpperCase() +
              user?.first_name?.slice(1)}{" "}
            {user?.last_name?.charAt(0).toUpperCase() +
              user?.last_name?.slice(1)}
          </h2>
          <p className="text-sm text-muted-foreground">{user.role}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>
    </Card>
  );
}
