"use client";

import { PuckEditor, defaultBlocks, usePuckEditor } from "@puck-editor/nextjs";
import type { Config, Data } from "@measured/puck";
import { useState, useEffect } from "react";

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
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load saved content on mount
  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch('/api/content');
        if (response.ok) {
          const savedContent = await response.json();
          if (savedContent) {
            setData(savedContent);
            setSavedData(savedContent);
          }
        }
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadContent();
  }, [setData]);

  const handlePublish = async (publishedData: Data): Promise<void> => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(publishedData),
      });

      if (response.ok) {
        setSavedData(publishedData);
        console.log("Published data:", publishedData);
      } else {
        console.error('Failed to save content');
      }
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-muted-foreground">Loading editor...</p>
        </div>
      </div>
    );
  }

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
        {isSaving && (
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Saving content...
            </p>
          </div>
        )}
        {savedData && !isSaving && (
          <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-green-800 dark:text-green-200">
              Content published successfully! View it on the{" "}
              <a href="/renderer" className="underline font-medium">
                renderer page
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

