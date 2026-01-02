import { Engineer } from "./engineer.types";
import { Project } from "./project.types";
import { Resource, ResourceAssignment } from "./resources.types";

export const TASK_STATUS = {
  PLANNING: "planning",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
} as const;
export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];
export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  startDate: Date | null;
  endDate: Date | null;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskWithProject extends Task {
  project: Project;
}

export interface TaskWithEngineers extends Task {
  assignedResources: Resource[];
}

// Task Inputs

// 1- Create Task Input

export interface CreateTaskInput {
  title: string;
  description?: string;
  status?: TaskStatus;
  projectId: string;
  startDate?: Date;
  endDate?: Date;
  resourceAssignments?: ResourceAssignment[];
}

// 2- Update Task Input
export interface UpdateTaskInput {
  title?: string;
  description?: string | null;
  status?: TaskStatus;
  startDate?: Date | null;
  endDate?: Date | null;
}

// Display Tasks

export interface TaskListItem {
  id: string;
  title: string;
  status: TaskStatus;
  startDate: Date | null;
  endDate: Date | null;
  projectId: string;
  projectName: string;
  assignedResourceCount: number;
}

export interface TaskCardData {
  id: string;
  title: string;
  status: TaskStatus;
  startDate: Date | null;
  endDate: Date | null;
  project: {
    id: string;
    name: string;
    status: string;
  };
}
