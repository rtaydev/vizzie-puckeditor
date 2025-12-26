import type { Config } from '@measured/puck';
import { Heading } from './heading';
import { Paragraph } from './paragraph';
import { ImageBlock } from './image';
import { Container } from './container';

export const defaultBlocks: Config['components'] = {
	Heading: {
		fields: {
			text: {
				type: 'text',
				label: 'Text',
			},
			level: {
				type: 'number',
				label: 'Level',
			},
			align: {
				type: 'select',
				label: 'Alignment',
				options: [
					{ label: 'Left', value: 'left' },
					{ label: 'Center', value: 'center' },
					{ label: 'Right', value: 'right' },
				],
			},
		},
		defaultProps: {
			text: 'Heading',
			level: 1,
			align: 'left',
		},
		render: Heading,
	},
	Paragraph: {
		fields: {
			text: {
				type: 'text',
				label: 'Text',
			},
			align: {
				type: 'select',
				label: 'Alignment',
				options: [
					{ label: 'Left', value: 'left' },
					{ label: 'Center', value: 'center' },
					{ label: 'Right', value: 'right' },
				],
			},
		},
		defaultProps: {
			text: 'Paragraph text',
			align: 'left',
		},
		render: Paragraph,
	},
	Image: {
		fields: {
			src: {
				type: 'text',
				label: 'Image URL',
			},
			alt: {
				type: 'text',
				label: 'Alt Text',
			},
			width: {
				type: 'number',
				label: 'Width',
			},
			height: {
				type: 'number',
				label: 'Height',
			},
		},
		defaultProps: {
			src: '',
			alt: '',
			width: 800,
			height: 600,
		},
		render: ImageBlock,
	},
	Container: {
		fields: {
			padding: {
				type: 'select',
				label: 'Padding',
				options: [
					{ label: 'None', value: 'none' },
					{ label: 'Small', value: 'sm' },
					{ label: 'Medium', value: 'md' },
					{ label: 'Large', value: 'lg' },
					{ label: 'Extra Large', value: 'xl' },
				],
			},
			maxWidth: {
				type: 'select',
				label: 'Max Width',
				options: [
					{ label: 'Small', value: 'sm' },
					{ label: 'Medium', value: 'md' },
					{ label: 'Large', value: 'lg' },
					{ label: 'Extra Large', value: 'xl' },
					{ label: '2XL', value: '2xl' },
					{ label: 'Full', value: 'full' },
				],
			},
		},
		defaultProps: {
			padding: 'md',
			maxWidth: 'xl',
		},
		render: Container,
	},
};

export { Heading, Paragraph, ImageBlock, Container };
