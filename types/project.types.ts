import { Client } from "./client.types";
import { Task } from "./task.types";

export type ProjectStatus =
  | "planning"
  | "in-progress"
  | "completed"
  | "on-hold";

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  createdAt: Date;
  client: Client;
  tasks: Task[];
  budget: number;
}
