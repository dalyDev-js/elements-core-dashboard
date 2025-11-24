"use client";

import { User } from "@/types";
import { createContext, useContext } from "react";

export const UserContext = createContext<User | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
  user: User;
}
export default function UserProvider({ children, user }: UserProviderProps) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser(): User {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
