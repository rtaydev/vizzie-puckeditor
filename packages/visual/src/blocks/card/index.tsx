import { ComponentConfig, CustomField } from '@measured/puck';
import { Square, Maximize } from 'lucide-react';
import { Section } from '../../components/section';
import { WithLayout, withLayout } from '../../components/layout';
import {
	sectionFields,
	type SectionStyleProps,
} from '../../config/sectionFields';
import { ColorPickerField } from '../../fields/ColorPickerField';
import { RemSliderField } from '../../fields/RemSliderField';

export type CardProps = WithLayout<
	SectionStyleProps & {
		title?: string;
		content: string;
		footer?: string;
		borderRadius: number;
		borderColor: string;
		backgroundColor: string;
		shadow: 'none' | 'small' | 'medium' | 'large';
		padding: number;
	}
>;

const CardInner: ComponentConfig<CardProps> = {
	fields: {
		title: {
			type: 'text',
			label: 'Title',
		},
		content: {
			type: 'text',
			label: 'Content',
			contentEditable: true,
		},
		footer: {
			type: 'text',
			label: 'Footer',
		},
		borderRadius: {
			type: 'custom',
			label: 'Border Radius',
			labelIcon: <Square size={16} />,
			render: (props) => <RemSliderField {...props} />,
			min: 0,
			max: 2,
			step: 0.125,
		} as CustomField<number>,
		borderColor: {
			type: 'custom',
			label: 'Border Color',
			render: (props) => <ColorPickerField {...props} />,
			showInput: false,
		} as CustomField<string>,
		backgroundColor: {
			type: 'custom',
			label: 'Background Color',
			render: (props) => <ColorPickerField {...props} />,
			showInput: false,
		} as CustomField<string>,
		shadow: {
			type: 'select',
			label: 'Shadow',
			options: [
				{ label: 'None', value: 'none' },
				{ label: 'Small', value: 'small' },
				{ label: 'Medium', value: 'medium' },
				{ label: 'Large', value: 'large' },
			],
		},
		padding: {
			type: 'custom',
			label: 'Padding',
			labelIcon: <Maximize size={16} />,
			render: (props) => <RemSliderField {...props} />,
			min: 0,
			max: 4,
			step: 0.25,
		} as CustomField<number>,
		...sectionFields,
	},
	defaultProps: {
		title: '',
		content: 'Card content goes here.',
		footer: '',
		borderRadius: 0.5,
		borderColor: '#e5e7eb',
		backgroundColor: '#ffffff',
		shadow: 'medium',
		padding: 1.5,
	},
	render: ({
		title,
		content,
		footer,
		borderRadius,
		borderColor,
		backgroundColor,
		shadow,
		padding,
		sectionStyle,
	}) => {
		const sectionBackgroundColor =
			sectionStyle?.backgroundColor === 'custom'
				? sectionStyle?.backgroundColorCustom
				: sectionStyle?.backgroundColor;

		const shadowStyles = {
			none: 'none',
			small: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
			medium:
				'0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
			large:
				'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
		};

		return (
			<Section
				backgroundColor={sectionBackgroundColor}
				paddingHorizontal={sectionStyle?.paddingHorizontal}
				paddingVertical={sectionStyle?.paddingVertical}
				alignItems={sectionStyle?.alignItems}
				maxWidth={sectionStyle?.maxWidth}
			>
				<div
					style={{
						backgroundColor: backgroundColor || '#ffffff',
						border: `1px solid ${borderColor || '#e5e7eb'}`,
						borderRadius: `${borderRadius}rem`,
						boxShadow: shadowStyles[shadow],
						padding: `${padding}rem`,
						width: '100%',
					}}
				>
					{title && (
						<h3
							style={{
								margin: 0,
								marginBottom: '1rem',
								fontSize: '1.5rem',
								fontWeight: 600,
							}}
						>
							{title}
						</h3>
					)}
					<div
						style={{
							marginBottom: footer ? '1rem' : 0,
							lineHeight: 1.6,
						}}
					>
						{content}
					</div>
					{footer && (
						<div
							style={{
								marginTop: '1rem',
								paddingTop: '1rem',
								borderTop: `1px solid ${borderColor || '#e5e7eb'}`,
								fontSize: '0.875rem',
								color: '#6b7280',
							}}
						>
							{footer}
						</div>
					)}
				</div>
			</Section>
		);
	},
};

export const CardBlock: ComponentConfig<CardProps> = withLayout(CardInner);
