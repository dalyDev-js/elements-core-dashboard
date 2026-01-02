import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        "h-10 w-full min-w-0 rounded-md px-3 py-1 text-base shadow-sm transition-colors outline-none md:text-sm",

        // Background and border
        "bg-input border border-border",
        "dark:bg-input dark:border-border",

        // Text and placeholder
        "text-foreground placeholder:text-muted-foreground",

        // Selection
        "selection:bg-primary selection:text-primary-foreground",

        // Focus state
        "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20",
        "dark:focus-visible:ring-ring/30",

        // Invalid state
        "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
        "dark:aria-invalid:ring-destructive/30",

        // File input
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",

        // Disabled state
        "disabled:cursor-not-allowed disabled:opacity-50",

        className
      )}
      {...props}
    />
  );
}

export { Input };
