import { useState, useCallback } from "react";
import type { Data } from "@measured/puck";

export interface UsePuckEditorReturn {
  data: Data;
  setData: (data: Data) => void;
  updateData: (updater: (data: Data) => Data) => void;
  resetData: () => void;
}

export function usePuckEditor(initialData: Data): UsePuckEditorReturn {
  const [data, setData] = useState<Data>(initialData);

  const updateData = useCallback((updater: (data: Data) => Data) => {
    setData((prevData) => updater(prevData));
  }, []);

  const resetData = useCallback(() => {
    setData(initialData);
  }, [initialData]);

  return {
    data,
    setData,
    updateData,
    resetData,
  };
}

