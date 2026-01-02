import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./user";

export const clientsTable = pgTable("clients", {
  id: varchar("id", { length: 255 }).primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  userId: varchar("userId", { length: 255 })
    .references(() => usersTable.id)
    .notNull(),
});
