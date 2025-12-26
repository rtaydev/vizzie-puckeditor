# @puck-editor/nextjs

A visual rich text editor for Next.js 16+ based on [Puck Editor](https://puckeditor.com/) with custom fields, blocks, and types. This library provides a flexible, type-safe editor that works seamlessly with Next.js Server Components and the App Router.

## Features

- 🎨 **Visual Editor**: Drag-and-drop interface for building content
- 🧩 **Custom Blocks**: Extensible block system with default blocks included
- 📝 **Custom Fields**: Flexible field types (text, number, select, color, textarea)
- 🎭 **Hybrid Styling**: Default Tailwind CSS + shadcn/ui styles with full customization support
- ⚡ **Next.js 16+**: Full support for Server Components and App Router
- 📦 **TypeScript**: Fully typed with comprehensive type definitions
- 🔧 **Flexible**: Use default styles or bring your own

## Installation

```bash
npm install @puck-editor/nextjs
```

## Peer Dependencies

This library requires the following peer dependencies:

- `next >= 16.0.0`
- `react >= 18.0.0`
- `react-dom >= 18.0.0`

## Quick Start

### 1. Import Styles

In your `app/layout.tsx` or global CSS file:

```tsx
import "@puck-editor/nextjs/styles";
```

Or if using a CSS file:

```css
@import "@puck-editor/nextjs/styles";
```

### 2. Basic Usage

#### Client Component (Editor)

```tsx
"use client";

import { PuckEditor, defaultBlocks } from "@puck-editor/nextjs";
import type { Config, Data } from "@measured/puck";

const config: Config = {
  components: defaultBlocks,
};

const initialData: Data = {
  root: { props: {} },
  content: [],
};

export default function EditorPage() {
  const handlePublish = (data: Data) => {
    console.log("Published:", data);
    // Save to your database/API
  };

  return (
    <PuckEditor
      config={config}
      data={initialData}
      onPublish={handlePublish}
    />
  );
}
```

#### Server Component (Renderer)

```tsx
import { PuckRendererServer, defaultBlocks } from "@puck-editor/nextjs/server";
import type { Config, Data } from "@measured/puck";

const config: Config = {
  components: defaultBlocks,
};

// Fetch data from your database/API
const data: Data = {
  root: { props: {} },
  content: [
    {
      id: "block-1",
      type: "Heading",
      props: {
        text: "Hello World",
        level: 1,
      },
    },
  ],
};

export default async function Page() {
  return <PuckRendererServer config={config} data={data} />;
}
```

## Default Blocks

The library includes several default blocks:

- **Heading**: H1-H6 headings with alignment options
- **Paragraph**: Text paragraphs with alignment
- **Image**: Image blocks with alt text
- **Container**: Flexible container with padding and max-width options

## Custom Blocks

Create your own custom blocks:

```tsx
import type { Config } from "@measured/puck";
import { PuckEditor } from "@puck-editor/nextjs";

const MyCustomBlock = ({ title, description }: { title: string; description: string }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

const config: Config = {
  components: {
    ...defaultBlocks,
    MyCustomBlock: {
      fields: {
        title: {
          type: "text",
          label: "Title",
        },
        description: {
          type: "textarea",
          label: "Description",
        },
      },
      defaultProps: {
        title: "My Title",
        description: "My description",
      },
      render: MyCustomBlock,
    },
  },
};
```

## Custom Fields

The library includes default field types:

- `text`: Text input
- `number`: Number input
- `textarea`: Multi-line text input
- `select`: Dropdown select
- `color`: Color picker

You can also create custom field components:

```tsx
import type { CustomFieldProps } from "@puck-editor/nextjs";

function MyCustomField({ name, value, onChange }: CustomFieldProps) {
  return (
    <input
      type="text"
      value={value as string}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
```

## Styling

### Default Styling (Tailwind CSS + shadcn/ui)

The library includes default styles based on Tailwind CSS and shadcn/ui. Simply import the styles:

```tsx
import "@puck-editor/nextjs/styles";
```

### Custom Styling

You can customize styles using the `className` and `styleOverrides` props:

```tsx
<PuckEditor
  config={config}
  data={data}
  className="my-custom-class"
  styleOverrides={{
    "--primary": "220 47% 11%",
    "--background": "0 0% 100%",
  }}
/>
```

### Unstyled Mode

For complete control, use the `unstyled` prop:

```tsx
<PuckEditor
  config={config}
  data={data}
  unstyled
  className="my-complete-styling"
/>
```

## Hooks

### usePuckEditor

Manage editor state with the provided hook:

```tsx
"use client";

import { usePuckEditor } from "@puck-editor/nextjs";

export default function EditorPage() {
  const { data, setData, updateData, resetData } = usePuckEditor(initialData);

  return (
    <PuckEditor
      config={config}
      data={data}
      onChange={setData}
    />
  );
}
```

## Context Provider

Use the `PuckEditorProvider` for global styling configuration:

```tsx
"use client";

import { PuckEditorProvider } from "@puck-editor/nextjs";

export default function Layout({ children }) {
  return (
    <PuckEditorProvider
      className="global-editor-styles"
      styleOverrides={{
        "--radius": "0.75rem",
      }}
    >
      {children}
    </PuckEditorProvider>
  );
}
```

## TypeScript

The library is fully typed. Import types as needed:

```tsx
import type {
  PuckEditorProps,
  PuckRendererProps,
  CustomFieldProps,
  CustomBlockProps,
} from "@puck-editor/nextjs";
```

## Important Notes

### Content IDs

When creating Puck data programmatically, always include a unique `id` field for each content item:

```tsx
const data: Data = {
  root: { props: {} },
  content: [
    {
      id: "unique-id-1", // Required!
      type: "Heading",
      props: { text: "Hello", level: 1 },
    },
  ],
};
```

The Puck Editor automatically generates IDs when you create blocks in the editor, but you must provide them when creating data manually.

### Development Warnings

You may see React key warnings in development when using `PuckEditor` or `PuckRendererServer`. These warnings come from Puck's internal rendering components (specifically `LayerTree` and `DropZoneRender`) and are known issues in the Puck library itself.

**These warnings:**
- Only appear in development mode
- Do not affect functionality
- Are not present in production builds
- Can be safely ignored

This is a known limitation of the underlying Puck library and cannot be fixed from this wrapper library. The warnings will be resolved when Puck addresses them in future versions.

## API Reference

### Components

#### `PuckEditor`

Main editor component for creating and editing content.

**Props:**
- `config: Config` - Puck configuration object
- `data: Data` - Initial editor data
- `onPublish?: (data: Data) => void` - Callback when content is published
- `onChange?: (data: Data) => void` - Callback when content changes
- `headerTitle?: string` - Custom header title
- `headerPath?: string` - Custom header path
- `className?: string` - Additional CSS classes
- `styleOverrides?: Record<string, string>` - CSS variable overrides
- `unstyled?: boolean` - Disable default styles

#### `PuckRenderer`

Client-side renderer for displaying saved content.

**Props:**
- `config: Config` - Puck configuration object
- `data: Data` - Content data to render
- `className?: string` - Additional CSS classes
- `styleOverrides?: Record<string, string>` - CSS variable overrides
- `unstyled?: boolean` - Disable default styles

#### `PuckRendererServer`

Server Component renderer for displaying saved content.

**Props:** Same as `PuckRenderer`

### Hooks

#### `usePuckEditor(initialData: Data)`

Returns:
- `data: Data` - Current editor data
- `setData: (data: Data) => void` - Set editor data
- `updateData: (updater: (data: Data) => Data) => void` - Update data with function
- `resetData: () => void` - Reset to initial data

## Examples

An example Next.js application is included in the `example/` directory. To run it:

1. Build the library:
   ```bash
   npm run build
   ```

2. Install example dependencies:
   ```bash
   cd example
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

The example includes:
- Basic editor usage
- Server Component renderer
- Custom blocks and fields

See the [example README](./example/README.md) for more details.

## Development

When developing the library locally:

1. Run the library watcher (from root):
   ```bash
   npm run dev
   ```

2. In another terminal, run the example app:
   ```bash
   npm run example:dev
   ```

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

