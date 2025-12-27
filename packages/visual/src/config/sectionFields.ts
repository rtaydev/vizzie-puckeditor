import type { Fields } from '@measured/puck';
import { spacingOptions } from './options';

export type SectionStyleProps = {
	sectionBackgroundColor?: string;
	sectionBackgroundColorCustom?: string;
	sectionPaddingTop?: string;
	sectionPaddingBottom?: string;
	sectionTextAlign?: 'left' | 'center' | 'right';
	sectionMaxWidth?: string;
};

export const sectionFields: Fields<SectionStyleProps> = {
	sectionBackgroundColor: {
		type: 'select',
		label: 'Background Color',
		options: [
			{ label: 'None', value: '' },
			{ label: 'White', value: 'white' },
			{ label: 'Gray', value: 'gray' },
			{ label: 'Gray Dark', value: 'gray-dark' },
			{ label: 'Black', value: 'black' },
			{ label: 'Custom', value: 'custom' },
		],
	},
	sectionBackgroundColorCustom: {
		type: 'text',
		label: 'Custom Background Color',
		placeholder: 'e.g., #ff0000, rgb(255,0,0), blue',
		// @ts-expect-error - TODO: fix this type error
		visible: (values: { sectionBackgroundColor: string }) =>
			values.sectionBackgroundColor === 'custom',
	},
	sectionPaddingTop: {
		type: 'select',
		label: 'Padding Top',
		options: [{ label: '0px', value: '0px' }, ...spacingOptions],
	},
	sectionPaddingBottom: {
		type: 'select',
		label: 'Padding Bottom',
		options: [{ label: '0px', value: '0px' }, ...spacingOptions],
	},
	sectionTextAlign: {
		type: 'radio',
		label: 'Text Alignment',
		options: [
			{ label: 'Left', value: 'left' },
			{ label: 'Center', value: 'center' },
			{ label: 'Right', value: 'right' },
		],
	},
	sectionMaxWidth: {
		type: 'text',
		label: 'Max Width',
		placeholder: 'e.g., 1280px, 100%',
	},
};
