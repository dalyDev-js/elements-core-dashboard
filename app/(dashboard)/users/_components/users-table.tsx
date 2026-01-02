"use cache";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./users-columns";
import { User } from "@/types";
import { getAllUsers } from "@/lib/dal/user";

async function getUsers(): Promise<User[]> {
  const users = await getAllUsers();

  return users;
}

const UsersTable = async () => {
  const users = await getUsers();
  return (
    <>
      <DataTable
        columns={columns}
        data={users}
        searchKey="email"
        searchPlaceholder="Search by email..."
      />
    </>
  );
};

export default UsersTable;
