"use client";

import type { CustomFieldProps } from "../types";
import { cn } from "../utils/cn";

export function ColorField({
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
      <div className="flex items-center gap-2">
        <input
          id={name}
          type="color"
          value={(value as string) ?? "#000000"}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          disabled={readOnly}
          className={cn(
            "h-10 w-20 cursor-pointer rounded-md border border-input disabled:cursor-not-allowed disabled:opacity-50",
            readOnly && "cursor-not-allowed opacity-50"
          )}
        />
        <input
          type="text"
          value={(value as string) ?? "#000000"}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          readOnly={readOnly}
          className={cn(
            "flex h-10 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            readOnly && "cursor-not-allowed opacity-50"
          )}
        />
      </div>
    </div>
  );
}

