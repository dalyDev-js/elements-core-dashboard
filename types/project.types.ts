import { Client } from "./client.types";
import { Task } from "./task.types";
import { ResourceType } from "./resources.types";

export const PROJECT_STATUS = {
  PLANNING: "planning",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
  ON_HOLD: "on-hold",
} as const;
export type ProjectStatus =
  (typeof PROJECT_STATUS)[keyof typeof PROJECT_STATUS];

export interface ProjectResource {
  projectId: string;
  resourceType: ResourceType;
  resourceId: string;
  createdAt: Date;
}

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  createdAt: Date;
  endedAt: Date;
  client: Client;
  tasks: Task[];
  budget: number;
  resources?: ProjectResource[];
}
