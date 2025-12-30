import type { ComponentConfig } from '@measured/puck';
import { useMemo } from 'react';
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
			type: 'text',
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
	},
	render: ({ align, text, size, level, sectionStyle }) => {
		const backgroundColor = useMemo(() => {
			if (!sectionStyle?.backgroundColor) return undefined;
			return sectionStyle.backgroundColor === 'custom'
				? sectionStyle.backgroundColorCustom
				: sectionStyle.backgroundColor;
		}, [sectionStyle?.backgroundColor, sectionStyle?.backgroundColorCustom]);

		return (
			<Section
				backgroundColor={backgroundColor}
				backgroundImage={sectionStyle?.backgroundImage}
				backgroundSize={sectionStyle?.backgroundSize}
				backgroundRepeat={sectionStyle?.backgroundRepeat}
				backgroundPosition={sectionStyle?.backgroundPosition}
				paddingVertical={sectionStyle?.paddingVertical}
				alignItems={sectionStyle?.alignItems}
				maxWidth={sectionStyle?.maxWidth}
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
