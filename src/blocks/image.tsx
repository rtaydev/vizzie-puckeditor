import type { CustomBlockProps } from "../types";
import { cn } from "../utils/cn";

interface ImageBlockProps extends CustomBlockProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

export function ImageBlock({
  src = "",
  alt = "",
  width = 800,
  height = 600,
  className,
}: ImageBlockProps): JSX.Element {
  if (!src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center border-2 border-dashed border-muted-foreground/25 bg-muted/10",
          className
        )}
        style={{ width, height }}
      >
        <span className="text-sm text-muted-foreground">No image selected</span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full object-cover"
      />
    </div>
  );
}

