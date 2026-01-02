import { ProjectStatus } from "@/types/project.types";
import {
  numeric,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { clientsTable } from "./client";
import { usersTable } from "./user";

export const projectsTable = pgTable("projects", {
  id: varchar("id", { length: 255 }).primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  status: varchar("status", { length: 255 })
    .notNull()
    .$type<ProjectStatus>()
    .default("in-progress"),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  startAT: timestamp("startAt"),
  endedAt: timestamp("endedAt"),
  clientId: varchar("clientId", { length: 255 })
    .references(() => clientsTable.id, { onDelete: "cascade" })
    .notNull(),
  userId: varchar("user_id", { length: 255 })
    .references(() => usersTable.id)
    .notNull(),
  budget: numeric("budget", { precision: 10, scale: 2 }).notNull(),
});
