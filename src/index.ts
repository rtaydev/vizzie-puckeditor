// Client components
export { PuckEditor } from './components/PuckEditor';
export { PuckRenderer } from './components/PuckRenderer';
export { ErrorBoundary } from './components/error-boundary';
export { TextBlock, type TextBlockProps } from './components/text-block';
export {
	ContainerBlock,
	type ContainerBlockProps,
} from './components/container-block';

// Server components (also available from "./server")
export { PuckRendererServer } from './components/server/PuckRenderer.server';

// Client-only hooks and context
export {
	PuckEditorProvider,
	usePuckEditorContext,
} from './context/PuckEditorContext';
export {
	EditorModeProvider,
	useIsEditorMode,
} from './context/is-editor-mode-context';
export { usePuckEditor } from './hooks/usePuckEditor';

// Blocks (safe for both client and server)
export { defaultBlocks } from './blocks';
export { Heading, Paragraph, ImageBlock, Container } from './blocks';

// Fields (client components, but types are safe)
export { defaultFields } from './fields';
export {
	TextField,
	NumberField,
	SelectField,
	ColorField,
	TextareaField,
	ColorPickerField,
	ImageUploadField,
	BackgroundImageUploadField,
	SwitchField,
} from './fields';
export type { ColorPickerFieldProps, ImageUploadFieldProps } from './fields';

// Styling system
export {
	applyCommonStyles,
	getCommonStylingFields,
	TextGroup,
} from './lib/styling-fields';
export type { CommonStylingProps } from './lib/styling-fields';

// Config fields
export * from './config/fields';

// Utilities
export { cn } from './utils/cn';
export { getRandomAdjective } from './lib/utils';

// Types (safe for both client and server)
export * from './types';

// Import styles - users should import "@puck-editor/nextjs/styles" in their app
