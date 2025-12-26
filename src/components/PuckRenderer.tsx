"use client";

import { Render } from "@measured/puck";
import type { Config } from "@measured/puck";
import type { PuckRendererProps } from "../types";
import { cn } from "../utils/cn";

export function PuckRenderer<C extends Config = Config>({
  config,
  data,
  className,
  styleOverrides,
  unstyled = false,
}: PuckRendererProps<C>): JSX.Element {
  const styles = unstyled
    ? {}
    : {
        ...styleOverrides,
      };

  return (
    <div className={cn(!unstyled && "puck-renderer-wrapper", className)} style={styles}>
      <Render config={config} data={data} />
    </div>
  );
}

