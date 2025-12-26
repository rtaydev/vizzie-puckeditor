"use client";

import type { CustomFieldProps } from "../types";
import { cn } from "../utils/cn";

interface SelectFieldProps extends CustomFieldProps {
  options?: Array<{ label: string; value: string }>;
}

export function SelectField({
  name,
  label,
  value,
  onChange,
  readOnly = false,
  className,
  options = [],
}: SelectFieldProps): JSX.Element {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium">
          {label}
        </label>
      )}
      <select
        id={name}
        value={(value as string) ?? ""}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        disabled={readOnly}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          readOnly && "cursor-not-allowed opacity-50"
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

