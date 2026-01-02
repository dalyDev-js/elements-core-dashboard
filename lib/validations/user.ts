import { z } from "zod";

export const validators = {
  first_name: z
    .string()
    .min(2, "First name is required")
    .max(50, "First name must be less than 50 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Can only contain letters, spaces, hyphens, and apostrophes"
    )
    .transform((val) => val.trim()),
  last_name: z
    .string()
    .min(2, "Last name is required")
    .max(50, "Last name must be less than 50 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Can only contain letters, spaces, hyphens, and apostrophes"
    )
    .transform((val) => val.trim()),
  email: z
    .string()
    .min(1, "Email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address")
    .toLowerCase()
    .trim()
    // Block temporary email providers
    .refine(
      (email) => {
        const blockedDomains = [
          "tempmail.com",
          "guerrillamail.com",
          "10minutemail.com",
          "throwaway.email",
        ];
        const domain = email.split("@")[1];
        return !blockedDomains.includes(domain);
      },
      { message: "Temporary email addresses are not allowed" }
    )
    // Block common typos in email domains
    .refine(
      (email) => {
        const commonTypos = [
          "gmial.com",
          "gmai.com",
          "yahooo.com",
          "hotmial.com",
        ];
        const domain = email.split("@")[1];
        return !commonTypos.includes(domain);
      },
      { message: "Please check your email domain for typos" }
    ),

  role: z.enum(["super_admin", "admin", "engineer", "viewer"], {
    message: "Please select a valid role" as const,
  }),
  phone_number: z.string().optional(),
  avatar_url: z.string().optional(),
};

export const createUserSchema = z.object({
  first_name: validators.first_name,
  last_name: validators.last_name,
  email: validators.email,
  role: validators.role,
  phone_number: validators.phone_number,
  avatar_url: validators.avatar_url,
});

export type createUserInput = z.infer<typeof createUserSchema>;
