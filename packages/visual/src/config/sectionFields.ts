import type { Fields } from '@measured/puck';
import { SectionStyleField } from '../fields/SectionStyleField';

export type SectionStyleValue = {
	backgroundColor?: string;
	backgroundColorCustom?: string;
	paddingTop?: string;
	paddingBottom?: string;
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
