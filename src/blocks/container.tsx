import type { CustomBlockProps } from "../types";
import { cn } from "../utils/cn";

interface ContainerProps extends CustomBlockProps {
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  className?: string;
}

export function Container({
  padding = "md",
  maxWidth = "xl",
  className,
}: ContainerProps): JSX.Element {
  return (
    <div
      className={cn(
        "mx-auto",
        padding === "none" && "p-0",
        padding === "sm" && "p-4",
        padding === "md" && "p-6",
        padding === "lg" && "p-8",
        padding === "xl" && "p-12",
        maxWidth === "sm" && "max-w-sm",
        maxWidth === "md" && "max-w-md",
        maxWidth === "lg" && "max-w-lg",
        maxWidth === "xl" && "max-w-xl",
        maxWidth === "2xl" && "max-w-2xl",
        maxWidth === "full" && "max-w-full",
        className
      )}
    />
  );
}

