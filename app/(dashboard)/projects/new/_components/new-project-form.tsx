"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import {
  CreateProjectInput,
  CreateProjectSchema,
} from "@/lib/validations/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

const NewProjectForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<CreateProjectInput>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "on-hold",
      budget: 0,
      startAt: new Date(),
      endAt: new Date(),
      clientId: "",
      userId: "",
    },
  });

  const createProjectMutation = useMutation({
    mutationFn: {},
  });

  return (
    <div className="container   py-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <UserPlus className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">Create New User</CardTitle>
              <CardDescription className="mt-1">
                Add a new user to your organization
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">Personal Information</h3>
                <p className="text-xs text-muted-foreground">
                  Basic details about the user
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
                {/* First Name */}
                <div className="col-span-1 space-y-2">
                  <label htmlFor="first_name" className="text-sm font-medium">
                    First Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="first_name"
                    type="text"
                    placeholder="John"
                    className="h-10"
                    disabled={isLoading}
                    value={firstNameValue}
                    {...register("first_name")}
                  />
                  {errors.first_name && (
                    <p className="text-sm text-red-600">
                      {errors.first_name.message}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div className="col-span-1 space-y-2">
                  <label htmlFor="last_name" className="text-sm font-medium">
                    Last Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="last_name"
                    {...register("last_name")}
                    placeholder="Doe"
                    className="h-10"
                    value={lastNameValue}
                    disabled={isLoading}
                  />
                  {errors.last_name && (
                    <p className="text-sm text-red-600">
                      {errors.last_name.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
                <div className="col-span-1 space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="email"
                    value={emailValue}
                    type="email"
                    {...register("email")}
                    placeholder="john.doe@example.com"
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              {/* Role Section */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
                <div className="col-span-1 space-y-2">
                  <Label htmlFor="role">
                    Role <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={roleValue}
                    onValueChange={(value) =>
                      setValue("role", value as UserRole)
                    }
                    disabled={isLoading}>
                    <SelectTrigger id="role" className="h-10 w-full">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="viewer">Viewer</SelectItem>
                      <SelectItem value="engineer">Engineer</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="super_admin">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && (
                    <p className="text-sm text-red-600">
                      {errors.role.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 border-t pt-6">
              <Button
                onClick={() => router.push("/users")}
                disabled={isLoading}
                type="button"
                variant="outline"
                size="lg">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                size="lg"
                className="gap-2">
                <UserPlus className="h-4 w-4" />
                {isLoading ? "Creating..." : "Create User"}
              </Button>
            </div>
            {/* Error Display */}
            {createUserMutation.isError && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
                <p className="font-semibold">Error:</p>
                <p>{createUserMutation.error.message}</p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewProjectForm;
