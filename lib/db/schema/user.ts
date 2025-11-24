import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: varchar("id", { length: 255 }).primaryKey().notNull(),
  first_name: varchar("first_name", { length: 255 }).notNull(),
  last_name: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  role: varchar("role", { length: 50 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  profilePictureUrl: varchar("profilePictureUrl", { length: 512 }),
});
