import type { Fields } from '@measured/puck';
import { SectionStyleField } from '../fields/SectionStyleField';

export type SectionStyleValue = {
	backgroundColor?: string;
	backgroundColorCustom?: string;
	backgroundImage?: string;
	backgroundSize?: 'cover' | 'contain' | 'auto' | 'initial';
	backgroundRepeat?: 'repeat-x' | 'repeat-y' | 'no-repeat' | 'repeat';
	backgroundPosition?: 'left' | 'center' | 'top' | 'right' | 'bottom';
	paddingHorizontal?: string;
	paddingVertical?: string;
	alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
	maxWidth?: string;
};

export type SectionStyleProps = {
	sectionStyle?: SectionStyleValue;
};

export const sectionFields: Fields<SectionStyleProps> = {
	sectionStyle: {
		type: 'custom',
		label: 'Section Styles',
		// @ts-ignore
		render: SectionStyleField,
	},
};
