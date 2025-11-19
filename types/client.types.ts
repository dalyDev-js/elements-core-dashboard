import { Project } from "./project.types";

export interface Client {
  id: string;
  userId?: string;
  name: string;
  email: string;
  createdAt: Date;
  projects: Project[];
}
