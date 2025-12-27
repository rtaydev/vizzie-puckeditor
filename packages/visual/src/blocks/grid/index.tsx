import type { ComponentConfig, Slot } from '@measured/puck';
import { CSSProperties, useRef } from 'react';
import styles from './styles.module.css';
import { getClassNameFactory } from '../../utils';
import { Section } from '../../components/section';
import {
	sectionFields,
	type SectionStyleProps,
} from '../../config/sectionFields';

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
			label: 'Gap (px)',
			type: 'number',
			min: 0,
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
	render: ({
		gap,
		numColumns,
		items: Items,
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

		const gridStyle: CSSProperties = {
			display: 'grid',
			gap: `${gap}px`,
			gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
			width: '100%',
		};

		return (
			<Section
				backgroundColor={backgroundColor}
				paddingTop={sectionPaddingTop}
				paddingBottom={sectionPaddingBottom}
				textAlign={sectionTextAlign}
				maxWidth={sectionMaxWidth}
				ref={dragRef}
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
