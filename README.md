# Puck Editor

A modern, customizable visual editor for building web pages. Built on [@measured/puck](https://puck.sh) with an intuitive theme editor and drag-and-drop interface.

[![bhpaQ.gif](https://s12.gifyu.com/images/bhpaQ.gif)](https://gifyu.com/image/bhpaQ)

## What is Puck Editor?

Puck Editor is a visual page builder that gives you:

- ✨ **Drag-and-drop interface** for building pages visually
- 🎨 **Theme editor** with real-time color and typography customization
- 🎯 **Pre-built blocks** including heroes, features, cards, grids, and more
- ⚙️ **Full TypeScript support** with comprehensive configuration
- 💾 **LocalStorage persistence** for automatic data saving
- 📱 **Responsive design** that works on all devices
- 🎭 **Design tokens system** for colors, typography, spacing, and shadows

## Packages

This is a monorepo containing:

### [@puck-editor/visual](./packages/visual)

The main visual editor component library. A React component for Next.js that provides a complete page builder experience.

**Install:**

```bash
npm install @puck-editor/visual @measured/puck react react-dom
```

**Quick Start:**

```tsx
import { PuckEditor } from '@puck-editor/visual';
import '@puck-editor/visual/styles.css';

export default function Editor() {
	return (
		<PuckEditor
			data={{ root: {} }}
			onPublish={(data) => console.log(data)}
			options={{ sidebarPosition: 'right' }}
		/>
	);
}
```

See [packages/visual/README.md](./packages/visual/README.md) for full documentation.

## Development

This project uses **pnpm workspaces**.

### Install Dependencies

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Runs all packages in development mode.

### Build

```bash
pnpm build
```

### Lint & Type Check

```bash
pnpm lint
pnpm typecheck
```

## Publishing

To publish a new version to npm:

```bash
cd packages/visual
pnpm version patch  # or minor/major
pnpm build
pnpm publish
```

## License

MIT

## Support

For issues, questions, or feature requests, please open an issue on GitHub.
