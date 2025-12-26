"use client";

import type { CustomFieldProps } from "../types";
import { cn } from "../utils/cn";

export function NumberField({
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
      <input
        id={name}
        type="number"
        value={(value as number) ?? 0}
        onChange={(e) => {
          onChange(Number(e.target.value));
        }}
        readOnly={readOnly}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          readOnly && "cursor-not-allowed opacity-50"
        )}
      />
    </div>
  );
}

