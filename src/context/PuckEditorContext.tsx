"use client";

import { createContext, useContext, type ReactNode } from "react";
import { cn } from "../utils/cn";

interface PuckEditorContextValue {
  unstyled?: boolean;
  className?: string;
  styleOverrides?: Record<string, string>;
}

const PuckEditorContext = createContext<PuckEditorContextValue | undefined>(undefined);

interface PuckEditorProviderProps {
  children: ReactNode;
  unstyled?: boolean;
  className?: string;
  styleOverrides?: Record<string, string>;
}

export function PuckEditorProvider({
  children,
  unstyled = false,
  className,
  styleOverrides,
}: PuckEditorProviderProps): JSX.Element {
  const value: PuckEditorContextValue = {
    unstyled,
    className,
    styleOverrides,
  };

  return (
    <PuckEditorContext.Provider value={value}>
      <div className={cn(!unstyled && "puck-editor-provider", className)} style={styleOverrides}>
        {children}
      </div>
    </PuckEditorContext.Provider>
  );
}

export function usePuckEditorContext(): PuckEditorContextValue {
  const context = useContext(PuckEditorContext);
  if (context === undefined) {
    throw new Error("usePuckEditorContext must be used within a PuckEditorProvider");
  }
  return context;
}

