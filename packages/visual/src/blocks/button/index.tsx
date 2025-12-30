import { ComponentConfig, CustomField } from '@measured/puck';
import { AlignLeft, ExternalLink } from 'lucide-react';
import { Section } from '../../components/section';
import { WithLayout, withLayout } from '../../components/layout';
import {
	sectionFields,
	type SectionStyleProps,
} from '../../config/sectionFields';
import { ColorPickerField } from '../../fields/ColorPickerField';
import { RemSliderField } from '../../fields/RemSliderField';
import styles from './styles.module.css';

export type ButtonProps = WithLayout<
	SectionStyleProps & {
		text: string;
		link?: string;
		variant: 'primary' | 'secondary' | 'outline' | 'ghost';
		size: 'small' | 'medium' | 'large';
		color: string;
		align: 'left' | 'center' | 'right';
		fullWidth: boolean;
		fontSize: number;
	}
>;

const ButtonInner: ComponentConfig<ButtonProps> = {
	fields: {
		text: {
			type: 'text',
			label: 'Button Text',
			contentEditable: true,
		},
		link: {
			type: 'text',
			label: 'Link URL',
			labelIcon: <ExternalLink size={16} />,
		},
		variant: {
			type: 'select',
			label: 'Variant',
			options: [
				{ label: 'Primary', value: 'primary' },
				{ label: 'Secondary', value: 'secondary' },
				{ label: 'Outline', value: 'outline' },
				{ label: 'Ghost', value: 'ghost' },
			],
		},
		size: {
			type: 'select',
			label: 'Size',
			options: [
				{ label: 'Small', value: 'small' },
				{ label: 'Medium', value: 'medium' },
				{ label: 'Large', value: 'large' },
			],
		},
		fontSize: {
			type: 'custom',
			label: 'Font Size',
			render: (props) => <RemSliderField {...props} />,
			min: 0.75,
			max: 2,
			step: 0.1,
		} as CustomField<number>,
		color: {
			type: 'custom',
			label: 'Color',
			render: (props) => <ColorPickerField {...props} />,
			showInput: false,
		} as CustomField<string>,
		align: {
			type: 'radio',
			label: 'Alignment',
			labelIcon: <AlignLeft size={16} />,
			options: [
				{ label: 'Left', value: 'left' },
				{ label: 'Center', value: 'center' },
				{ label: 'Right', value: 'right' },
			],
		},
		fullWidth: {
			type: 'radio',
			label: 'Full Width',
			options: [
				{ label: 'Yes', value: true },
				{ label: 'No', value: false },
			],
		},
		...sectionFields,
	},
	defaultProps: {
		text: 'Button',
		link: '',
		variant: 'primary',
		size: 'medium',
		color: 'var(--puck-color-button-primary)',
		align: 'center',
		fullWidth: false,
		fontSize: 1,
	},
	render: ({
		text,
		link,
		variant,
		size,
		color,
		align,
		fullWidth,
		fontSize,
		sectionStyle,
	}) => {
		const backgroundColor =
			sectionStyle?.backgroundColor === 'custom'
				? sectionStyle?.backgroundColorCustom
				: sectionStyle?.backgroundColor;

		// Size styles
		const sizeStyles = {
			small: { fontSize: `${fontSize * 0.875}rem` },
			medium: { fontSize: `${fontSize}rem` },
			large: { fontSize: `${fontSize * 1.125}rem` },
		};

		// Variant styles
		const getVariantStyles = () => {
			const baseColor = color || 'var(--puck-color-button-primary)';
			switch (variant) {
				case 'primary':
					return {
						background: baseColor,
						color: '#ffffff',
						border: `2px solid ${baseColor}`,
					};
				case 'secondary':
					return {
						background: 'transparent',
						color: baseColor,
						border: `2px solid ${baseColor}`,
					};
				case 'outline':
					return {
						background: 'transparent',
						color: baseColor,
						border: `2px solid ${baseColor}`,
					};
				case 'ghost':
					return {
						background: 'transparent',
						color: baseColor,
						border: '2px solid transparent',
					};
				default:
					return {
						background: baseColor,
						color: '#ffffff',
						border: `2px solid ${baseColor}`,
					};
			}
		};

		const variantStyles = getVariantStyles();
		const currentSizeStyles = sizeStyles[size];

		const buttonElement = (
			<button
				type="button"
				style={{
					...currentSizeStyles,
					...variantStyles,
				}}
				className={styles.button}
				onMouseEnter={(e) => {
					if (variant === 'primary') {
						e.currentTarget.style.opacity = '0.9';
					} else {
						e.currentTarget.style.opacity = '0.8';
					}
				}}
				onMouseLeave={(e) => {
					e.currentTarget.style.opacity = '1';
				}}
			>
				{text}
			</button>
		);

		return (
			<Section
				backgroundColor={backgroundColor}
				paddingVertical={sectionStyle?.paddingVertical}
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
					{link ? (
						<a href={link} className={styles.button}>
							{buttonElement}
						</a>
					) : (
						buttonElement
					)}
				</div>
			</Section>
		);
	},
};

export const ButtonBlock: ComponentConfig<ButtonProps> =
	withLayout(ButtonInner);
