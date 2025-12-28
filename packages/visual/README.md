# @puck-editor/visual

A modern, customizable visual editor component for Next.js built on top of [@measured/puck](https://puck.sh). Features a beautiful theme editor, drag-and-drop interface, and flexible layout options.

## Features

✨ **Visual Editor**: Drag-and-drop interface for building pages  
🎨 **Theme Editor**: Real-time theme customization with live preview  
🎯 **Pre-built Blocks**: Hero sections, features, cards, grids, and more  
⚙️ **Customizable**: Full TypeScript support with extensive configuration options  
💾 **Local Storage**: Optional automatic data persistence  
📱 **Responsive**: Mobile-friendly editor and preview modes  
🎭 **Theme System**: Comprehensive design tokens (colors, typography, spacing, shadows)

## Demo

![Puck Editor Demo](https://i.ibb.co/Fq3chLW5/demo.gif)

## Installation

```bash
npm install @puck-editor/visual @measured/puck react react-dom
```

or with pnpm:

```bash
pnpm add @puck-editor/visual @measured/puck react react-dom
```

## Quick Start

### Basic Setup in Next.js

Create a page component that uses the editor:

```tsx
'use client';

import { PuckEditor } from '@puck-editor/visual';
import '@puck-editor/visual/styles.css';
import { useState } from 'react';

export default function EditorPage() {
	const [data, setData] = useState({ root: {} });

	const handlePublish = async (newData: any) => {
		// Save your data to a database, API, or storage
		console.log('Published:', newData);
		// await fetch('/api/save', { method: 'POST', body: JSON.stringify(newData) });
	};

	return (
		<PuckEditor
			data={data}
			onPublish={handlePublish}
			options={{
				sidebarPosition: 'right',
				enableLocalStorage: true,
			}}
		/>
	);
}
```

## Configuration

### PuckEditor Props

```tsx
interface PuckEditorProps {
	data: any; // Current editor data
	onPublish: (data: any) => void | Promise<void>; // Called when user clicks Save
	options?: PuckOptions; // Configuration options
}

interface PuckOptions {
	sidebarPosition?: 'left' | 'right'; // Default: 'right'
	enableLocalStorage?: boolean; // Auto-save to localStorage
	localStorageKey?: string; // localStorage key (default: 'puck-editor-data')
	theme?: PuckThemeOptions; // Theme configuration
}
```

### Theme Customization

Customize colors, typography, spacing, and more:

```tsx
import { PuckEditor, defaultPuckTheme } from '@puck-editor/visual';

<PuckEditor
	data={data}
	onPublish={handlePublish}
	options={{
		theme: {
			theme: {
				...defaultPuckTheme,
				colors: {
					...defaultPuckTheme.colors,
					primary: '#5b21b6',
					secondary: '#0891b2',
					background: '#f8f8f8',
				},
				typography: {
					...defaultPuckTheme.typography,
					fontSans: "'Geist', sans-serif",
					fontSizeBase: '16px',
				},
				spacing: {
					...defaultPuckTheme.spacing,
					md: '20px',
				},
			},
			customCss: `
        body {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
      `,
		},
	}}
/>;
```

#### Theme Structure

The theme object contains:

**Colors** (20 properties)

- Primary, secondary, background variants
- Text colors (normal, secondary, tertiary)
- Border colors (normal, secondary, tertiary)
- Button colors (primary, secondary + text variants)
- Input colors (background, border, text)
- Preview and header colors

**Typography** (8 properties)

- Font families (sans, mono)
- Font sizes (base, small, large)
- Font weights (normal, medium, bold)

**Spacing** (5 properties)

- xs, sm, md, lg, xl

**Border Radius** (3 properties)

- sm, md, lg

**Shadows** (3 properties)

- sm, md, lg

### Theme Editor

Users can customize the theme in real-time using the built-in Theme Editor (accessible via the Palette button in the header).

**Features:**

- Live color picker with hex input
- All typography, spacing, and shadow values editable
- Changes persist to localStorage automatically
- Cancel button to discard changes

## Rendering Published Content

To render content created with the editor on your frontend:

```tsx
import { PuckRenderer } from '@puck-editor/visual';
import '@puck-editor/visual/styles.css';

export default function ViewPage() {
	const [data] = useState(/* your saved data */);

	return (
		<PuckRenderer
			data={data}
			options={{
				theme: {
					theme: yourCustomTheme,
				},
			}}
		/>
	);
}
```

## API Reference

### Exported Components & Utilities

```tsx
// Main components
export { PuckEditor } from '@puck-editor/visual';
export { PuckRenderer } from '@puck-editor/visual';

// Types
export type {
	PuckOptions,
	PuckEditorProps,
	PuckRendererProps,
	PuckTheme,
	PuckThemeOptions,
};

// Utilities
export { createPuckConfig } from '@puck-editor/visual';
export { defaultPuckTheme } from '@puck-editor/visual';
export { applyTheme, generateThemeCSS, mergeThemes } from '@puck-editor/visual';
export { ColorPickerField, ImageUploadField } from '@puck-editor/visual';
```

### Theme Utilities

**applyTheme(theme: PuckTheme): CSSProperties**  
Converts a theme object to CSS custom properties for styling.

**mergeThemes(base: PuckTheme, override: Partial<PuckTheme>): PuckTheme**  
Merges a partial theme with a base theme.

**generateThemeCSS(theme: PuckTheme): string**  
Generates CSS variable declarations from a theme.

## LocalStorage

When `enableLocalStorage` is enabled:

- Editor data auto-saves to localStorage on every change
- Theme changes are persisted to `puck-theme` key
- Data is keyed by `localStorageKey` (default: `puck-editor-data`)
- Pages refresh with previously saved data automatically

## Examples

### With Custom Blocks

The editor uses pre-built blocks. To extend with custom blocks, use the `createPuckConfig` function to define your own components:

```tsx
import { createPuckConfig, PuckEditor } from '@puck-editor/visual';

export default function Editor() {
	const config = createPuckConfig({
		/* options */
	});

	return (
		<PuckEditor
			data={data}
			onPublish={handlePublish}
			options={
				{
					/* ... */
				}
			}
		/>
	);
}
```

### Full-Page Editor Layout

```tsx
'use client';

import { PuckEditor } from '@puck-editor/visual';
import '@puck-editor/visual/styles.css';
import { useState } from 'react';

export default function EditorPage() {
	const [data, setData] = useState({ root: { children: [] } });

	return (
		<div style={{ height: '100vh' }}>
			<PuckEditor
				data={data}
				onPublish={async (newData) => {
					setData(newData);
					// Save to backend
					await fetch('/api/pages', {
						method: 'POST',
						body: JSON.stringify(newData),
					});
				}}
				options={{
					sidebarPosition: 'right',
					enableLocalStorage: true,
					localStorageKey: 'my-page-editor',
					theme: {
						theme: {
							/* your theme */
						},
					},
				}}
			/>
		</div>
	);
}
```

## Styling

The package includes default styles. Import them in your app:

```tsx
import '@puck-editor/visual/styles.css';
```

To customize editor styling, use CSS modules or override CSS variables.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please submit issues and pull requests to improve this package.

## License

MIT

## Support

For issues, questions, or feature requests, please visit the [GitHub repository](https://github.com/russstaylor/puck-editor).
