import type { CustomBlockProps } from "../types";
import { cn } from "../utils/cn";

interface ParagraphProps extends CustomBlockProps {
  text?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function Paragraph({
  text = "",
  align = "left",
  className,
}: ParagraphProps): JSX.Element {
  return (
    <p
      className={cn(
        "text-base leading-relaxed",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
    >
      {text}
    </p>
  );
}

