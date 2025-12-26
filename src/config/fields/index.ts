import { Field } from '@measured/puck';

// Icon field - simplified version (can be extended with lucide-react if needed)
export const icon = {
	type: 'select',
	options: [
		{ label: 'none', value: 'none' },
		{ label: 'check', value: 'check' },
		{ label: 'x', value: 'x' },
		{ label: 'arrow-right', value: 'arrow-right' },
		{ label: 'arrow-left', value: 'arrow-left' },
		{ label: 'star', value: 'star' },
		{ label: 'heart', value: 'heart' },
		{ label: 'image', value: 'image' },
		{ label: 'link', value: 'link' },
	],
} as const;

// Button object field
export const button = {
	type: 'object',
	objectFields: {
		label: { type: 'text' },
		url: { type: 'text' },
		variant: {
			type: 'select',
			options: [
				{ label: 'primary', value: 'default' },
				{ label: 'secondary', value: 'secondary' },
				{ label: 'outline-solid', value: 'outline-solid' },
				{ label: 'ghost', value: 'ghost' },
				{ label: 'link', value: 'link' },
				{ label: 'destructive', value: 'destructive' },
			],
		},
		size: {
			type: 'select',
			options: [
				{ label: 'default', value: 'default' },
				{ label: 'sm', value: 'sm' },
				{ label: 'lg', value: 'lg' },
				{ label: 'icon', value: 'icon' },
			],
		},
		icon,
	},
} as const;

const buttonDefaults = {
	label: 'Button',
	url: '',
	variant: 'default',
	size: 'default',
	icon: 'none',
} as const;

// Buttons array field
export const buttons = {
	type: 'array',
	max: 3,
	getItemSummary: (item: { label?: string }, index = 0) =>
		item.label || `Button ${index + 1}`,
	arrayFields: {
		...button.objectFields,
	},
	defaultItemProps: buttonDefaults,
} as const;

// Badge object field
export const badge = {
	type: 'object',
	objectFields: {
		label: { type: 'text' },
		url: { type: 'text' },
		variant: {
			type: 'select',
			options: [
				{ label: 'default', value: 'default' },
				{ label: 'secondary', value: 'secondary' },
				{ label: 'destructive', value: 'destructive' },
				{ label: 'outline-solid', value: 'outline-solid' },
			],
		},
	},
} as const;

// Image object field
export const image = {
	type: 'object',
	objectFields: {
		src: { type: 'text' },
		alt: { type: 'text' },
	},
} as const;

export const getPlaceholderImageUrl = (
	size: string,
	text = 'Placeholder Image'
) =>
	`https://dummyimage.com/${size}/f5f4f4/101010.png&text=${encodeURIComponent(
		text
	)}`;

export const image16x9Placeholder = {
	alt: '16/9 aspect ratio accessible description of the image',
	src: getPlaceholderImageUrl('1920x1080'),
};

export const image1x1Placeholder = {
	alt: '1/1 aspect ratio An accessible description of the image',
	src: getPlaceholderImageUrl('1000x1000'),
};

export const image9x16Placeholder = {
	alt: '9/16 accessible description of the image',
	src: getPlaceholderImageUrl('1080x1920'),
};

// Images array field
export const images = {
	type: 'array',
	max: 10,
	getItemSummary: (item: { alt?: string }, index = 0) => {
		if (item.alt) {
			return `${item.alt.slice(0, 12)}${item.alt.length > 12 ? '...' : ''}`;
		}
		return `Image ${index + 1}`;
	},
	arrayFields: {
		...image.objectFields,
	},
	defaultItemProps: image16x9Placeholder,
} as const;

// Padding level field
export const paddingLevel = {
	type: 'select',
	options: [
		{ label: 'none', value: 'none' },
		{ label: 'small', value: 'small' },
		{ label: 'medium', value: 'medium' },
		{ label: 'large', value: 'large' },
	],
} as const;

// Padding object field
export const padding = {
	type: 'object',
	objectFields: {
		top: paddingLevel,
		bottom: paddingLevel,
	},
} as const;

export const paddingDefaults = {
	top: 'medium',
	bottom: 'medium',
} as const;

// Heading text field
export const heading = {
	type: 'text',
	contentEditable: true,
} as const;

// Description textarea field
export const description = {
	type: 'textarea',
	contentEditable: true,
} as const;

// Features array field
export const features = {
	type: 'array',
	max: 5,
	getItemSummary: (item: { name?: string }, index = 0) =>
		item.name || `Feature ${index + 1}`,
	arrayFields: {
		icon,
		name: { type: 'text', contentEditable: true },
		description: { type: 'textarea', contentEditable: true },
	},
	defaultItemProps: {
		icon: 'check',
		name: 'Feature name',
		description: 'Description of the feature',
	},
} as const;

// Common content fields
export const contentFields = {
	heading,
	description,
	badge,
	buttons,
} as const;

// Content fields with features
export const contentFieldsWithFeatures = {
	heading,
	description,
	badge,
	features,
	buttons,
} as const;

// Card object field
export const card = {
	type: 'object',
	objectFields: {
		icon,
		heading,
		description,
		button,
	},
} as const;

// Cards array field
export const cards = {
	type: 'array',
	getItemSummary: (item: { heading?: string }, index = 0) =>
		item.heading || `Card ${index + 1}`,
	arrayFields: {
		...card.objectFields,
	},
	defaultItemProps: {
		icon: 'activity',
		heading: 'Heading',
		description: 'Description',
		button: buttonDefaults,
	},
} as const;

// Form field types
export const fieldTypes = [
	'text',
	'email',
	'password',
	'number',
	'tel',
	'url',
	'textarea',
	'select',
	'checkbox',
	'radio',
	'file',
	'date',
	'time',
	'datetime-local',
] as const;

// Field object for forms
export const field: Field = {
	type: 'object',
	objectFields: {
		label: { type: 'text', contentEditable: true },
		name: { type: 'text' },
		type: {
			type: 'select',
			options: fieldTypes.map((field) => ({ label: field, value: field })),
		},
	},
};

export interface CompoundFieldProps {
	label: string;
	type: string;
	name: string;
}

export const fieldDefaults: CompoundFieldProps = {
	label: 'Field Label',
	type: 'text',
	name: 'field_name',
};

// Form field
const { url, ...formButtonConfig } = button.objectFields;

export interface CompoundFormProps {
	title: string;
	fields: CompoundFieldProps[];
	action: string;
	method: 'get' | 'post' | 'put' | 'delete' | 'patch';
	button: {
		label: string;
		variant: string;
		size: string;
		icon: string;
	};
}

export const form: Field<CompoundFormProps> = {
	type: 'object',
	objectFields: {
		title: { type: 'text', contentEditable: true },
		fields: {
			type: 'array',
			min: 1,
			max: 10,
			arrayFields: field.objectFields as Record<string, Field<unknown>> & {
				label: Field<string>;
				type: Field<string>;
				name: Field<string>;
			},
			getItemSummary: (item: { label?: string }, index = 0) =>
				item.label || `Field ${index + 1}`,
			defaultItemProps: fieldDefaults,
		},
		action: { type: 'text', label: 'submit url' },
		method: {
			type: 'select',
			label: 'submit method',
			options: [
				{ label: 'get', value: 'get' },
				{ label: 'post', value: 'post' },
				{ label: 'put', value: 'put' },
				{ label: 'delete', value: 'delete' },
				{ label: 'patch', value: 'patch' },
			],
		},
		button: {
			...button,
			objectFields: {
				...formButtonConfig,
			},
		},
	},
};

export const formDefaults: CompoundFormProps = {
	title: 'Book a meeting',
	fields: [
		{ label: 'First name', type: 'text', name: 'first_name' },
		{ label: 'Last name', type: 'text', name: 'last_name' },
		{ label: 'Resume', type: 'file', name: 'resume' },
	],
	action: '/submit-form',
	method: 'post',
	button: {
		label: 'Book the meeting',
		variant: 'default',
		size: 'default',
		icon: 'arrow-right',
	},
};
