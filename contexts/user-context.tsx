// contexts/user-context.tsx
"use client";

import { User } from "@/types";
import { createContext, useContext } from "react";

export const UserContext = createContext<User | null>(null); // ✅ Allow null

interface UserProviderProps {
  children: React.ReactNode;
  user: User | null; // ✅ Allow null
}

export default function UserProvider({ children, user }: UserProviderProps) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser(): User | null {
  // ✅ Return null if no user
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context; // Can be null
}
