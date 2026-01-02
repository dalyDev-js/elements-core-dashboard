// src/db/schema/task.ts
import {
  pgTable,
  varchar,
  text,
  timestamp,
  primaryKey,
  index,
} from "drizzle-orm/pg-core";
import { projectsTable } from "./project";
import { ResourceType } from "@/types/resources.types";
import { TaskStatus, TASK_STATUS } from "@/types/task.types";

export const tasksTable = pgTable(
  "tasks",
  {
    id: varchar("id", { length: 255 }).primaryKey().notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),

    status: varchar("status", { length: 50 })
      .notNull()
      .$type<TaskStatus>() // ← Use imported type
      .default(TASK_STATUS.PLANNING), // ← Use imported constant

    projectId: varchar("project_id", { length: 255 })
      .references(() => projectsTable.id, { onDelete: "cascade" })
      .notNull(),

    startDate: timestamp("start_date"),
    endDate: timestamp("end_date"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("tasks_project_id_idx").on(table.projectId),
    index("tasks_status_idx").on(table.status),
    index("tasks_project_status_idx").on(table.projectId, table.status),
  ]
);

export const taskResourcesTable = pgTable(
  "task_resources",
  {
    taskId: varchar("task_id", { length: 255 })
      .references(() => tasksTable.id, { onDelete: "cascade" })
      .notNull(),

    resourceType: varchar("resource_type", { length: 50 })
      .notNull()
      .$type<ResourceType>(),

    resourceId: varchar("resource_id", { length: 255 }).notNull(),

    assignedAt: timestamp("assigned_at").defaultNow().notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.taskId, table.resourceType, table.resourceId],
    }),

    index("task_resources_resource_idx").on(
      table.resourceType,
      table.resourceId
    ),

    index("task_resources_task_id_idx").on(table.taskId),
  ]
);
