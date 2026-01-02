import { ProfileCard } from "./_components/profile-card";
import { PersonalInfoCard } from "./_components/personal-info-card";
import { getCurrentUser } from "@/lib/auth/session";

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }
  return (
    <div className="container mx-auto py-10">
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Account</h1>
      </div>

      {/* PROFILE CARDS */}
      <div className="space-y-6">
        {/* Profile Card */}
        <ProfileCard user={user} />

        {/* Personal Information Card */}
        <PersonalInfoCard user={user} />
      </div>
    </div>
  );
}
