import type { ComponentConfig, Slot } from '@measured/puck';
import styles from './styles.module.css';
import { getClassNameFactory } from '../../utils';
import { Section } from '../../components/section';
import { withLayout } from '../../components/layout';

const getClassName = getClassNameFactory('Grid', styles);

export type GridProps = {
	numColumns: number;
	gap: number;
	items: Slot;
};

const CustomSlot = (props: any) => {
	return <span {...props} />;
};

export const GridInternal: ComponentConfig<GridProps> = {
	fields: {
		numColumns: {
			type: 'number',
			label: 'Number of columns',
			min: 1,
			max: 12,
		},
		gap: {
			label: 'Gap',
			type: 'number',
			min: 0,
		},
		items: {
			type: 'slot',
		},
	},
	defaultProps: {
		numColumns: 4,
		gap: 24,
		items: [],
	},
	render: ({ gap, numColumns, items: Items }) => {
		return (
			<Section>
				<Items
					as={CustomSlot}
					disallow={['Hero', 'Stats']}
					className={getClassName()}
					style={{
						gap,
						gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
					}}
				/>
			</Section>
		);
	},
};

export const Grid = withLayout(GridInternal);
