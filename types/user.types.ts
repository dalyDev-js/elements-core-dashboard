export type UserRole = "super_admin" | "admin" | "engineer" | "viewer";
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  profilePictureUrl?: string;
  full_name?: string;
}
