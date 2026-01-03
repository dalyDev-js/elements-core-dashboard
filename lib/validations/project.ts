import { z } from "zod";
import { PROJECT_STATUS } from "@/types/project.types";

export const validators = {
  name: z
    .string()
    .min(2, "Project name is required")
    .max(50, "Project name must be less than 50 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Can only contain letters, spaces, hyphens, and apostrophes"
    )
    .transform((val) => val.trim()),

  description: z
    .string()
    .min(10, "Project description must be at least 10 characters")
    .max(500, "Project description must be less than 500 characters")
    .transform((val) => val.trim())
    .optional()
    .or(z.literal("")),

  status: z.enum(
    [
      PROJECT_STATUS.PLANNING,
      PROJECT_STATUS.IN_PROGRESS,
      PROJECT_STATUS.COMPLETED,
      PROJECT_STATUS.ON_HOLD,
    ],
    {
      message: "Please select a valid project status",
    }
  ),

  budget: z
    .number({ message: "Budget must be a valid number" })
    .positive("Budget must be greater than 0")
    .max(999999999.99, "Budget exceeds maximum allowed value")
    .refine(
      (val) => {
        // Ensure only 2 decimal places
        const decimalPlaces = (val.toString().split(".")[1] || "").length;
        return decimalPlaces <= 2;
      },
      { message: "Budget can only have up to 2 decimal places" }
    ),

  clientId: z
    .string()
    .min(1, "Client is required")
    .max(255, "Client ID is too long"),

  userId: z.string().min(1, "User is required").max(255, "User ID is too long"),

  startAt: z.date().optional(),

  endAt: z.date().optional(),
};

export const CreateProjectSchema = z
  .object({
    project_name: validators.name,
    project_description: validators.description,
    project_status: validators.status,
    project_budget: validators.budget,
    client_id: validators.clientId,
    user_id: validators.userId,
    start_date: validators.startAt,
    end_date: validators.endAt,
  })
  .refine(
    (data) => {
      // If both dates are provided, ensure end_date is after start_date
      if (data.start_date && data.end_date) {
        return data.end_date > data.start_date;
      }
      return true;
    },
    {
      message: "End date must be after start date",
      path: ["end_date"],
    }
  );

export const updateProjectSchema = CreateProjectSchema.partial();

export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
