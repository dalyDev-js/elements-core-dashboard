// app/(dashboard)/users/page.tsx
import { DataTable } from "@/components/data-table/data-table";

import { User } from "@/types";
import { columns } from "./_components/users-columns";

// ============================================
// MOCK DATA (Replace with real API call)
// ============================================
async function getUsers(): Promise<User[]> {
  // TODO: Replace with your actual API call
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`)
  // if (!res.ok) throw new Error("Failed to fetch users")
  // return res.json()

  // Mock data for now
  return [
    {
      id: "1",
      first_name: "Ahmed",
      last_name: "Hassan",
      email: "ahmed.hassan@example.com",
      role: "admin",
      createdAt: new Date("2024-01-15"),
      profilePictureUrl:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
    },
    {
      id: "2",
      first_name: "Fatima",
      last_name: "Ali",
      email: "fatima.ali@example.com",
      role: "engineer",
      createdAt: new Date("2024-02-20"),
      profilePictureUrl:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
    },
    {
      id: "3",
      first_name: "Mohamed",
      last_name: "Ibrahim",
      email: "mohamed.ibrahim@example.com",
      role: "super_admin",
      createdAt: new Date("2024-03-10"),
      profilePictureUrl:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohamed",
    },
    {
      id: "4",
      first_name: "Sara",
      last_name: "Khaled",
      email: "sara.khaled@example.com",
      role: "viewer",
      createdAt: new Date("2024-04-05"),
      profilePictureUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
    },
    {
      id: "5",
      first_name: "Omar",
      last_name: "Mahmoud",
      email: "omar.mahmoud@example.com",
      role: "engineer",
      createdAt: new Date("2024-05-12"),
      profilePictureUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar",
    },
  ];
}

// ============================================
// PAGE COMPONENT (Server Component)
// ============================================
export default async function UsersPage() {
  // Fetch data on the server
  const users = await getUsers();

  return (
    <div className="container mx-auto py-10">
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
      </div>

      {/* DATA TABLE */}
      <DataTable
        columns={columns}
        data={users}
        searchKey="email"
        searchPlaceholder="Search by email..."
      />
    </div>
  );
}
