import { ComponentConfig, CustomField } from '@measured/puck';
import { Maximize } from 'lucide-react';
import { Section } from '../../components/section';
import { WithLayout, withLayout } from '../../components/layout';
import {
	sectionFields,
	type SectionStyleProps,
} from '../../config/sectionFields';
import { IconPickerField } from '../../fields/IconPickerField';
import { ColorPickerField } from '../../fields/ColorPickerField';
import { RemSliderField } from '../../fields/RemSliderField';
import * as LucideIcons from 'lucide-react';

export type IconProps = WithLayout<
	SectionStyleProps & {
		icon: string; // Icon name from lucide-react
		size: number; // Size in rem units
		color: string; // Hex color string from ColorPickerField
		align: 'left' | 'center' | 'right';
	}
>;

const IconInner: ComponentConfig<IconProps> = {
	fields: {
		icon: {
			type: 'custom',
			label: 'Icon',
			render: (props) => <IconPickerField {...props} />,
		} as CustomField<string>,
		size: {
			type: 'custom',
			label: 'Size',
			labelIcon: <Maximize size={16} />,
			render: (props) => <RemSliderField {...props} />,
			min: 0.5,
			max: 4,
			step: 0.1,
		} as CustomField<number>,
		color: {
			type: 'custom',
			label: 'Color',
			render: (props) => <ColorPickerField {...props} />,
			showInput: false, // Hide the hex input, show only the color picker button
		} as CustomField<string>,
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
		icon: 'Heart',
		size: 1.5, // 1.5rem (equivalent to ~24px)
		color: '#000000',
		align: 'center',
	},
	render: ({ icon, size, color, align, sectionStyle }) => {
		const backgroundColor =
			sectionStyle?.backgroundColor === 'custom'
				? sectionStyle?.backgroundColorCustom
				: sectionStyle?.backgroundColor;

		// Get the icon component from lucide-react
		const IconComponent = icon ? (LucideIcons as any)[icon] : null;

		// Convert rem to pixels for lucide-react size prop (default is 24px for 1rem)
		const iconSize = size ? Math.round(size * 24) : 36;

		// Parse color - handle hex colors from ColorPickerField
		const iconColor =
			!color || color === 'default'
				? 'currentColor'
				: color === 'muted'
				? 'var(--puck-color-grey-05)'
				: color;

		return (
			<Section
				backgroundColor={backgroundColor}
				paddingVertical={sectionStyle?.paddingVertical || '0rem'}
				alignItems={sectionStyle?.alignItems}
				maxWidth={sectionStyle?.maxWidth}
			>
				<div
					style={{
						display: 'flex',
						width: '100%',
						justifyContent:
							align === 'center'
								? 'center'
								: align === 'right'
								? 'flex-end'
								: 'flex-start',
					}}
				>
					{IconComponent ? (
						<IconComponent size={iconSize} color={iconColor} />
					) : (
						<div
							style={{
								width: `${iconSize}px`,
								height: `${iconSize}px`,
								border: '2px dashed #d1d5db',
								borderRadius: '4px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: '#9ca3af',
								fontSize: '12px',
							}}
						>
							?
						</div>
					)}
				</div>
			</Section>
		);
	},
};

export const IconBlock: ComponentConfig<IconProps> = withLayout(IconInner);
