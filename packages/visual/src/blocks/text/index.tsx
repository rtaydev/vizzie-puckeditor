import { ComponentConfig } from '@measured/puck';
import { ALargeSmall, AlignLeft } from 'lucide-react';
import { Section } from '../../components/section';
import { WithLayout, withLayout } from '../../components/layout';
import {
	sectionFields,
	type SectionStyleProps,
} from '../../config/sectionFields';

export type TextProps = WithLayout<
	SectionStyleProps & {
		align: 'left' | 'center' | 'right';
		text?: string;
		padding?: string;
		size?: 's' | 'm';
		color: 'default' | 'muted';
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
			type: 'select',
			labelIcon: <ALargeSmall size={16} />,
			options: [
				{ label: 'S', value: 's' },
				{ label: 'M', value: 'm' },
			],
		},
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
			type: 'radio',
			options: [
				{ label: 'Default', value: 'default' },
				{ label: 'Muted', value: 'muted' },
			],
		},
		maxWidth: { type: 'text' },
		...sectionFields,
	},
	defaultProps: {
		align: 'left',
		text: 'Text',
		size: 'm',
		color: 'default',
	},
	render: ({ align, color, text, size, maxWidth, sectionStyle }) => {
		const backgroundColor =
			sectionStyle?.backgroundColor === 'custom'
				? sectionStyle?.backgroundColorCustom
				: sectionStyle?.backgroundColor;

		return (
			<Section
				backgroundColor={backgroundColor}
				paddingTop={sectionStyle?.paddingTop}
				paddingBottom={sectionStyle?.paddingBottom}
				alignItems={sectionStyle?.alignItems}
				maxWidth={sectionStyle?.maxWidth || maxWidth}
			>
				<span
					style={{
						color:
							color === 'default' ? 'inherit' : 'var(--puck-color-grey-05)',
						display: 'flex',
						textAlign: align,
						width: '100%',
						fontSize: size === 'm' ? '20px' : '16px',
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
