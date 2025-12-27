import type { ComponentConfig } from '@measured/puck';
import { withLayout, type WithLayout } from '../../components/layout';
import { Section } from '../../components/section';
import {
	Heading as _Heading,
	type HeadingProps as _HeadingProps,
} from '../../components/heading';
import {
	sectionFields,
	type SectionStyleProps,
} from '../../config/sectionFields';
import { useRef } from 'react';

export type HeadingProps = WithLayout<
	SectionStyleProps & {
		align: 'left' | 'center' | 'right';
		text?: string;
		level?: _HeadingProps['rank'];
		size: _HeadingProps['size'];
	}
>;

const sizeOptions = [
	{ value: 'xxxl', label: 'XXXL' },
	{ value: 'xxl', label: 'XXL' },
	{ value: 'xl', label: 'XL' },
	{ value: 'l', label: 'L' },
	{ value: 'm', label: 'M' },
	{ value: 's', label: 'S' },
	{ value: 'xs', label: 'XS' },
];

const levelOptions = [
	{ label: '', value: '' },
	{ label: '1', value: '1' },
	{ label: '2', value: '2' },
	{ label: '3', value: '3' },
	{ label: '4', value: '4' },
	{ label: '5', value: '5' },
	{ label: '6', value: '6' },
];

const HeadingInternal: ComponentConfig<HeadingProps> = {
	fields: {
		text: {
			type: 'textarea',
			contentEditable: true,
		},
		size: {
			type: 'select',
			options: sizeOptions,
		},
		level: {
			type: 'select',
			options: levelOptions,
		},
		align: {
			type: 'radio',
			options: [
				{ label: 'Left', value: 'left' },
				{ label: 'Center', value: 'center' },
				{ label: 'Right', value: 'right' },
			],
		},
		...sectionFields,
	},
	defaultProps: {
		align: 'left',
		text: 'Heading',
		size: 'm',
		layout: {
			padding: '8px',
		},
	},
	render: ({
		align,
		text,
		size,
		level,
		sectionBackgroundColor,
		sectionBackgroundColorCustom,
		sectionPaddingTop,
		sectionPaddingBottom,
		sectionTextAlign,
		sectionMaxWidth,
	}) => {
		const dragRef = useRef<HTMLDivElement>(null);
		const backgroundColor =
			sectionBackgroundColor === 'custom'
				? sectionBackgroundColorCustom
				: sectionBackgroundColor;

		return (
			<Section
				backgroundColor={backgroundColor}
				paddingTop={sectionPaddingTop}
				paddingBottom={sectionPaddingBottom}
				textAlign={sectionTextAlign}
				maxWidth={sectionMaxWidth}
				ref={dragRef}
			>
				<_Heading size={size} rank={level as any}>
					<span style={{ display: 'block', textAlign: align, width: '100%' }}>
						{text}
					</span>
				</_Heading>
			</Section>
		);
	},
};

export const HeadingBlock: ComponentConfig<HeadingProps> =
	withLayout(HeadingInternal);
