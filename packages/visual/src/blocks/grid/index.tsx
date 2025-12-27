import type { ComponentConfig, Slot } from '@measured/puck';
import { CSSProperties } from 'react';
import styles from './styles.module.css';
import { getClassNameFactory } from '../../utils';
import { Section } from '../../components/section';
import {
	sectionFields,
	type SectionStyleProps,
} from '../../config/sectionFields';
import { GapSliderField } from '../../fields/GapSliderField';

const getClassName = getClassNameFactory('Grid', styles);

export type GridProps = SectionStyleProps & {
	numColumns: number;
	gap: number;
	items: Slot;
};

export const GridBlock: ComponentConfig<GridProps> = {
	fields: {
		numColumns: {
			type: 'number',
			label: 'Number of columns',
			min: 1,
			max: 12,
		},
		gap: {
			type: 'custom',
			label: 'Gap',
			render: GapSliderField,
		},
		items: {
			type: 'slot',
		},
		...sectionFields,
	},
	defaultProps: {
		numColumns: 4,
		gap: 24,
		items: [],
	},
	render: ({ gap, numColumns, items: Items, sectionStyle }) => {
		const backgroundColor =
			sectionStyle?.backgroundColor === 'custom'
				? sectionStyle?.backgroundColorCustom
				: sectionStyle?.backgroundColor;

		const gridStyle: CSSProperties = {
			display: 'grid',
			gap: `${gap}px`,
			gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
			width: '100%',
		};

		return (
			<Section
				backgroundColor={backgroundColor}
				paddingTop={sectionStyle?.paddingTop}
				paddingBottom={sectionStyle?.paddingBottom}
				alignItems={sectionStyle?.alignItems}
				maxWidth={sectionStyle?.maxWidth}
			>
				<Items
					disallow={['Hero', 'Stats']}
					className={getClassName()}
					style={gridStyle}
					minEmptyHeight={256}
				/>
			</Section>
		);
	},
};
