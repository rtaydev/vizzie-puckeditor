import type { CustomBlockProps } from "../types";
import { cn } from "../utils/cn";

interface HeadingProps extends CustomBlockProps {
  text?: string;
  level?: number;
  align?: "left" | "center" | "right";
  className?: string;
}

export function Heading({
  text = "",
  level = 1,
  align = "left",
  className,
}: HeadingProps): JSX.Element {
  const validLevel = Math.max(1, Math.min(6, level || 1)) as 1 | 2 | 3 | 4 | 5 | 6;
  const Tag = `h${validLevel}` as keyof JSX.IntrinsicElements;
  return (
    <Tag
      className={cn(
        "font-bold",
        validLevel === 1 && "text-4xl",
        validLevel === 2 && "text-3xl",
        validLevel === 3 && "text-2xl",
        validLevel === 4 && "text-xl",
        validLevel === 5 && "text-lg",
        validLevel === 6 && "text-base",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
    >
      {text}
    </Tag>
  );
}

