import { ComponentConfig, CustomField } from '@measured/puck';
import { ALargeSmall, AlignLeft, Maximize } from 'lucide-react';
import { Section } from '../../components/section';
import { WithLayout, withLayout } from '../../components/layout';
import {
	sectionFields,
	type SectionStyleProps,
} from '../../config/sectionFields';
import { ColorPickerField } from '../../fields/ColorPickerField';
import { RemSliderField } from '../../fields/RemSliderField';

export type TextProps = WithLayout<
	SectionStyleProps & {
		align: 'left' | 'center' | 'right';
		text?: string;
		padding?: string;
		size: number; // Size in rem units
		color: string; // Hex color string from ColorPickerField
		maxWidth?: string;
	}
>;

const TextInner: ComponentConfig<TextProps> = {
	fields: {
		text: {
			type: 'text',
			contentEditable: true,
		},
		size: {
			type: 'custom',
			label: 'Size',
			labelIcon: <Maximize size={16} />,
			render: (props) => <RemSliderField {...props} />,
			min: 0.5,
			max: 4,
			step: 0.1,
		} as CustomField<number>,
		align: {
			type: 'radio',
			labelIcon: <AlignLeft size={16} />,
			options: [
				{ label: 'Left', value: 'left' },
				{ label: 'Center', value: 'center' },
				{ label: 'Right', value: 'right' },
			],
		},
		color: {
			type: 'custom',
			label: 'Color',
			render: (props) => <ColorPickerField {...props} />,
			showInput: false, // Hide the hex input, show only the color picker button
		} as CustomField<string>,
		maxWidth: { type: 'text' },
		...sectionFields,
	},
	defaultProps: {
		align: 'left',
		text: 'Text',
		size: 1.25, // 1.25rem (equivalent to ~20px)
		color: '#000000',
	},
	render: ({ align, color, text, size, maxWidth, sectionStyle }) => {
		const backgroundColor =
			sectionStyle?.backgroundColor === 'custom'
				? sectionStyle?.backgroundColorCustom
				: sectionStyle?.backgroundColor;

		return (
			<Section
				backgroundColor={backgroundColor}
				paddingVertical={sectionStyle?.paddingVertical}
				alignItems={sectionStyle?.alignItems}
				maxWidth={sectionStyle?.maxWidth || maxWidth}
			>
				<span
					style={{
						color:
							!color || color === 'default'
								? 'inherit'
								: color === 'muted'
								? 'var(--puck-color-grey-05)'
								: color, // Use hex color from ColorPickerField
						display: 'flex',
						textAlign: align,
						width: '100%',
						fontSize: size ? `${size}rem` : '1.25rem',
						fontWeight: 300,
						maxWidth,
						justifyContent:
							align === 'center'
								? 'center'
								: align === 'right'
								? 'flex-end'
								: 'flex-start',
					}}
				>
					{text}
				</span>
			</Section>
		);
	},
};

export const TextBlock: ComponentConfig<TextProps> = withLayout(TextInner);
