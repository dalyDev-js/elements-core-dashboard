import { Engineer } from "./engineer.types";
import { Project } from "./project.types";

export type Status = "planning" | "in-progress" | "completed";
export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  startDate: Date;
  endDate: Date;
  project: Project;
  createdAt: Date;
  assignedTo: Engineer[];
}
