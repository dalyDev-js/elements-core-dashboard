import { Project } from "./project.types";
import { Task } from "./task.types";

export interface Engineer {
  id: string;
  userId?: string;
  name: string;
  email: string;
  projects: Project[];
  tasks: Task[];
}
