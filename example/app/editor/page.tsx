"use client";

import { PuckEditor, defaultBlocks, usePuckEditor } from "@puck-editor/nextjs";
import type { Config, Data } from "@measured/puck";
import { useState } from "react";

const config: Config = {
  components: defaultBlocks,
};

const initialData: Data = {
  root: { props: {} },
  content: [],
};

export default function EditorPage(): JSX.Element {
  const { data, setData } = usePuckEditor(initialData);
  const [savedData, setSavedData] = useState<Data | null>(null);

  const handlePublish = (publishedData: Data): void => {
    setSavedData(publishedData);
    console.log("Published data:", publishedData);
    // In a real app, you would save this to your database/API
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Puck Editor</h1>
        <p className="text-muted-foreground mb-6">
          Use the editor below to create and edit content. Click "Publish" to save your changes.
        </p>
        <PuckEditor
          config={config}
          data={data}
          onChange={setData}
          onPublish={handlePublish}
          headerTitle="Content Editor"
        />
        {savedData && (
          <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-green-800 dark:text-green-200">
              Content published successfully! Check the console for the data structure.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

