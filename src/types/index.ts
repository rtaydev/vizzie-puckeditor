import type { Config, Data } from '@measured/puck';

export interface PuckEditorProps<C extends Config = Config> {
	config: C;
	data: Data;
	onPublish?: (data: Data) => void;
	onChange?: (data: Data) => void;
	headerTitle?: string;
	headerPath?: string;
	className?: string;
	styleOverrides?: Record<string, string>;
	unstyled?: boolean;
}

export interface PuckRendererProps<C extends Config = Config> {
	config: C;
	data: Data;
	className?: string;
	styleOverrides?: Record<string, string>;
	unstyled?: boolean;
}

export interface CustomFieldProps {
	name: string;
	label?: string;
	value: unknown;
	onChange: (value: unknown) => void;
	readOnly?: boolean;
	className?: string;
}

export interface CustomBlockProps {
	id: string;
	[key: string]: unknown;
}

export type CustomFieldComponent = React.ComponentType<CustomFieldProps>;
export type CustomBlockComponent = React.ComponentType<CustomBlockProps>;

export interface FieldDefinition {
	type: string;
	label?: string;
	component: CustomFieldComponent;
}

export interface BlockDefinition {
	type: string;
	label: string;
	defaultProps?: Record<string, unknown>;
	fields?: Record<string, FieldDefinition>;
	component: CustomBlockComponent;
}

export interface PuckEditorConfig<C extends Config = Config> {
	config: C;
	defaultBlocks?: BlockDefinition[];
	defaultFields?: FieldDefinition[];
}

// Export styling types
export type { CommonStylingProps } from '../lib/styling-fields';

export * from '@measured/puck';
