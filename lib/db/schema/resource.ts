// src/db/schema/project-resource.ts
import {
  pgTable,
  varchar,
  timestamp,
  primaryKey,
  index,
} from "drizzle-orm/pg-core";
import { projectsTable } from "./project";
import { ResourceType } from "@/types/resources.types";

export const projectResourcesTable = pgTable(
  "project_resources",
  {
    projectId: varchar("project_id", { length: 255 })
      .notNull()
      .references(() => projectsTable.id, { onDelete: "cascade" }),

    resourceType: varchar("resource_type", { length: 50 })
      .notNull()
      .$type<ResourceType>(),

    resourceId: varchar("resource_id", { length: 255 }).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.projectId, table.resourceType, table.resourceId],
    }),
    index("project_resources_project_id_idx").on(table.projectId),
    index("project_resources_resource_idx").on(
      table.resourceType,
      table.resourceId
    ),
  ]
);
