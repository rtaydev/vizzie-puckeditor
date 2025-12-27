import type { Fields } from '@measured/puck';
import React from 'react';
import { AlignLeft, Maximize, Palette } from 'lucide-react';
import { spacingOptions } from './options';
import { ColorPickerField } from '../fields/ColorPickerField';

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
		label: 'Bg Color',
		labelIcon: React.createElement(Palette, { size: 16 }),
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
		type: 'custom',
		label: 'Custom Bg Color',
		// @ts-ignore
		render: ColorPickerField,
		// @ts-expect-error - TODO: fix this type error
		visible: (values: { sectionBackgroundColor: string }) =>
			values.sectionBackgroundColor === 'custom',
	},
	sectionPaddingTop: {
		type: 'select',
		label: 'Padding Top',
		labelIcon: React.createElement(Maximize, { size: 16 }),
		options: [{ label: '0px', value: '0px' }, ...spacingOptions],
	},
	sectionPaddingBottom: {
		type: 'select',
		label: 'Padding Bottom',
		labelIcon: React.createElement(Maximize, { size: 16 }),
		options: [{ label: '0px', value: '0px' }, ...spacingOptions],
	},
	sectionTextAlign: {
		type: 'radio',
		label: 'Alignment',
		labelIcon: React.createElement(AlignLeft, { size: 16 }),
		options: [
			{ label: 'Left', value: 'left' },
			{ label: 'Center', value: 'center' },
			{ label: 'Right', value: 'right' },
		],
	},
	sectionMaxWidth: {
		type: 'text',
		label: 'mWidth',
		labelIcon: React.createElement(Maximize, { size: 16 }),
		placeholder: 'e.g., 1280px, 100%',
	},
};
