"use client";

import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";
import type { Config } from "@measured/puck";
import type { PuckEditorProps } from "../types";
import { cn } from "../utils/cn";

export function PuckEditor<C extends Config = Config>({
  config,
  data,
  onPublish,
  onChange,
  headerTitle,
  headerPath,
  className,
  styleOverrides,
  unstyled = false,
}: PuckEditorProps<C>): JSX.Element {
  const styles = unstyled
    ? {}
    : {
        ...styleOverrides,
      };

  return (
    <div className={cn(!unstyled && "puck-editor-wrapper", className)} style={styles}>
      <Puck
        config={config}
        data={data}
        onPublish={onPublish}
        onChange={onChange}
        headerTitle={headerTitle}
        headerPath={headerPath}
      />
    </div>
  );
}

