import { ComponentConfig, Slot } from '@measured/puck';
import styles from './styles.module.css';
import { getClassNameFactory } from '../../utils';
import { Section } from '../../components/section';
import { WithLayout, withLayout } from '../../components/layout';
import {
	sectionFields,
	type SectionStyleProps,
} from '../../config/sectionFields';

const getClassName = getClassNameFactory('Flex', styles);

export type FlexProps = WithLayout<
	SectionStyleProps & {
		justifyContent: 'start' | 'center' | 'end';
		direction: 'row' | 'column';
		gap: number;
		wrap: 'wrap' | 'nowrap';
		items: Slot;
	}
>;

const FlexInternal: ComponentConfig<FlexProps> = {
	fields: {
		direction: {
			label: 'Direction',
			type: 'radio',
			options: [
				{ label: 'Row', value: 'row' },
				{ label: 'Column', value: 'column' },
			],
		},
		justifyContent: {
			label: 'Align',
			type: 'radio',
			options: [
				{ label: 'Start', value: 'start' },
				{ label: 'Center', value: 'center' },
				{ label: 'End', value: 'end' },
			],
		},
		gap: {
			label: 'Gap',
			type: 'number',
			min: 0,
		},
		wrap: {
			label: 'Wrap',
			type: 'radio',
			options: [
				{ label: 'true', value: 'wrap' },
				{ label: 'false', value: 'nowrap' },
			],
		},
		items: {
			type: 'slot',
		},
		...sectionFields,
	},
	defaultProps: {
		justifyContent: 'start',
		direction: 'row',
		gap: 24,
		wrap: 'wrap',
		layout: {
			grow: true,
		},
		items: [],
	},
	render: ({
		justifyContent,
		direction,
		gap,
		wrap,
		items: Items,
		sectionBackgroundColor,
		sectionBackgroundColorCustom,
		sectionPaddingTop,
		sectionPaddingBottom,
		sectionTextAlign,
		sectionMaxWidth,
	}) => {
		const backgroundColor =
			sectionBackgroundColor === 'custom'
				? sectionBackgroundColorCustom
				: sectionBackgroundColor;

		return (
			<Section
				style={{ height: '100%' }}
				backgroundColor={backgroundColor}
				paddingTop={sectionPaddingTop}
				paddingBottom={sectionPaddingBottom}
				textAlign={sectionTextAlign}
				maxWidth={sectionMaxWidth}
			>
				<Items
					className={getClassName()}
					style={{
						justifyContent,
						flexDirection: direction,
						gap,
						flexWrap: wrap,
					}}
					disallow={['Hero', 'Stats']}
				/>
			</Section>
		);
	},
};

export const FlexBlock: ComponentConfig<FlexProps> = withLayout(FlexInternal);
