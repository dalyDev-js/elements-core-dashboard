import { apiClient } from "../client";
import { ApiResponse } from "../types";
import { User } from "@/types";
import { createUserInput } from "@/lib/validations/user";

// User API client functions
export const usersApi = {
  // Create a new user
  create: async (data: createUserInput): Promise<User> => {
    const response = await apiClient.post<ApiResponse<User>>("/users", data);

    if (!response.data.success) {
      throw new Error(response.data.error || "Failed to create user");
    }

    return response.data.data!;
  },

  // Get all users
  getAll: async (): Promise<User[]> => {
    const response = await apiClient.get<ApiResponse<User[]>>("/users");

    if (!response.data.success) {
      throw new Error(response.data.error || "Failed to fetch users");
    }

    return response.data.data!;
  },

  // Get a single user by ID
  getById: async (id: string): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.error || "Failed to fetch user");
    }

    return response.data.data!;
  },

  // Update a user
  update: async (id: string, data: Partial<createUserInput>): Promise<User> => {
    const response = await apiClient.put<ApiResponse<User>>(
      `/users/${id}`,
      data
    );

    if (!response.data.success) {
      throw new Error(response.data.error || "Failed to update user");
    }

    return response.data.data!;
  },

  // Delete a user
  delete: async (id: string): Promise<void> => {
    const response = await apiClient.delete<ApiResponse>(`/users/${id}`);
    console.log(response);
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to delete user");
    }
  },
};
