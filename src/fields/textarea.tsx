"use client";

import type { CustomFieldProps } from "../types";
import { cn } from "../utils/cn";

export function TextareaField({
  name,
  label,
  value,
  onChange,
  readOnly = false,
  className,
}: CustomFieldProps): JSX.Element {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium">
          {label}
        </label>
      )}
      <textarea
        id={name}
        value={(value as string) ?? ""}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        readOnly={readOnly}
        rows={4}
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          readOnly && "cursor-not-allowed opacity-50"
        )}
      />
    </div>
  );
}

