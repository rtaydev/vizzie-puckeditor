import { ComponentConfig, CustomField } from '@measured/puck';
import { Quote, Maximize } from 'lucide-react';
import { Section } from '../../components/section';
import { WithLayout, withLayout } from '../../components/layout';
import {
	sectionFields,
	type SectionStyleProps,
} from '../../config/sectionFields';
import { ColorPickerField } from '../../fields/ColorPickerField';
import { RemSliderField } from '../../fields/RemSliderField';

export type QuoteProps = WithLayout<
	SectionStyleProps & {
		quote: string;
		author?: string;
		style: 'border-left' | 'centered' | 'large';
		textColor: string;
		backgroundColor: string;
		fontSize: number;
	}
>;

const QuoteInner: ComponentConfig<QuoteProps> = {
	fields: {
		quote: {
			type: 'text',
			label: 'Quote',
			contentEditable: true,
		},
		author: {
			type: 'text',
			label: 'Author',
		},
		style: {
			type: 'select',
			label: 'Style',
			labelIcon: <Quote size={16} />,
			options: [
				{ label: 'Border Left', value: 'border-left' },
				{ label: 'Centered', value: 'centered' },
				{ label: 'Large Text', value: 'large' },
			],
		},
		fontSize: {
			type: 'custom',
			label: 'Font Size',
			labelIcon: <Maximize size={16} />,
			render: (props) => <RemSliderField {...props} />,
			min: 0.875,
			max: 2.5,
			step: 0.125,
		} as CustomField<number>,
		textColor: {
			type: 'custom',
			label: 'Text Color',
			render: (props) => <ColorPickerField {...props} />,
			showInput: false,
		} as CustomField<string>,
		backgroundColor: {
			type: 'custom',
			label: 'Background Color',
			render: (props) => <ColorPickerField {...props} />,
			showInput: false,
		} as CustomField<string>,
		...sectionFields,
	},
	defaultProps: {
		quote: 'This is a quote or testimonial.',
		author: '',
		style: 'border-left',
		textColor: '#000000',
		backgroundColor: 'transparent',
		fontSize: 1.25,
	},
	render: ({
		quote,
		author,
		style,
		textColor,
		backgroundColor,
		fontSize,
		sectionStyle,
	}) => {
		const sectionBackgroundColor =
			sectionStyle?.backgroundColor === 'custom'
				? sectionStyle?.backgroundColorCustom
				: sectionStyle?.backgroundColor;

		const getStyleStyles = () => {
			const baseStyles = {
				fontSize: `${fontSize}rem`,
				color: textColor || '#000000',
				background:
					backgroundColor === 'transparent' ? 'transparent' : backgroundColor,
				padding: '1.5rem',
				borderRadius: '6px',
				margin: 0,
			};

			switch (style) {
				case 'border-left':
					return {
						...baseStyles,
						borderLeft: `4px solid ${textColor || '#000000'}`,
						textAlign: 'left' as const,
					};
				case 'centered':
					return {
						...baseStyles,
						textAlign: 'center' as const,
					};
				case 'large':
					return {
						...baseStyles,
						fontSize: `${fontSize * 1.5}rem`,
						fontWeight: 300,
						textAlign: 'center' as const,
					};
				default:
					return baseStyles;
			}
		};

		const quoteStyles = getStyleStyles();

		return (
			<Section
				backgroundColor={sectionBackgroundColor}
				paddingHorizontal={sectionStyle?.paddingHorizontal || '0rem'}
				paddingVertical={sectionStyle?.paddingVertical || '0rem'}
				alignItems={sectionStyle?.alignItems}
				maxWidth={sectionStyle?.maxWidth}
			>
				<blockquote style={quoteStyles}>
					<div
						style={{ fontStyle: 'italic', marginBottom: author ? '1rem' : 0 }}
					>
						{quote}
					</div>
					{author && (
						<cite
							style={{
								display: 'block',
								fontStyle: 'normal',
								fontSize: `${fontSize * 0.875}rem`,
								opacity: 0.8,
								marginTop: '0.5rem',
							}}
						>
							— {author}
						</cite>
					)}
				</blockquote>
			</Section>
		);
	},
};

export const QuoteBlock: ComponentConfig<QuoteProps> = withLayout(QuoteInner);
