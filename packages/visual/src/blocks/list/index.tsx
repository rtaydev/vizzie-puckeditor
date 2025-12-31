import { ComponentConfig, CustomField } from '@measured/puck';
import { List as ListIcon, Maximize } from 'lucide-react';
import { Section } from '../../components/section';
import { WithLayout, withLayout } from '../../components/layout';
import {
	sectionFields,
	type SectionStyleProps,
} from '../../config/sectionFields';
import { ColorPickerField } from '../../fields/ColorPickerField';
import { RemSliderField } from '../../fields/RemSliderField';
import styles from './styles.module.css';

export type ListProps = WithLayout<
	SectionStyleProps & {
		listType: 'ordered' | 'unordered';
		items: Array<{ value: string }>;
		size: number; // Size in rem units
		color: string; // Hex color string
	}
>;

const ListInner: ComponentConfig<ListProps> = {
	fields: {
		listType: {
			type: 'select',
			label: 'List Type',
			labelIcon: <ListIcon size={16} />,
			options: [
				{ label: 'Unordered (Bullets)', value: 'unordered' },
				{ label: 'Ordered (Numbers)', value: 'ordered' },
			],
		},
		items: {
			type: 'array',
			label: 'List Items',
			getItemSummary: (item: { value?: string }) => item?.value || 'New item',
			arrayFields: {
				value: {
					type: 'text',
					label: 'Item',
				},
			},
			defaultItemProps: {
				value: 'List item',
			},
		},
		size: {
			type: 'custom',
			label: 'Font Size',
			labelIcon: <Maximize size={16} />,
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
		...sectionFields,
	},
	defaultProps: {
		listType: 'unordered',
		items: [
			{ value: 'First item' },
			{ value: 'Second item' },
			{ value: 'Third item' },
		],
		size: 1,
		color: '#000000',
	},
	render: ({ listType, items, size, color, sectionStyle }) => {
		const backgroundColor =
			sectionStyle?.backgroundColor === 'custom'
				? sectionStyle?.backgroundColorCustom
				: sectionStyle?.backgroundColor;

		const ListTag = listType === 'ordered' ? 'ol' : 'ul';

		return (
			<Section
				backgroundColor={backgroundColor}
				paddingHorizontal={sectionStyle?.paddingHorizontal || '0rem'}
				paddingVertical={sectionStyle?.paddingVertical || '0rem'}
				alignItems={sectionStyle?.alignItems}
				maxWidth={sectionStyle?.maxWidth}
			>
				<ListTag
					className={styles.list}
					style={{
						fontSize: `${size}rem`,
						color: color || '#000000',
						margin: 0,
						paddingLeft: listType === 'ordered' ? '1.5rem' : '1.25rem',
					}}
				>
					{items.map((item, index) => (
						<li key={index} style={{ marginBottom: '0.5rem' }}>
							{item?.value || 'List item'}
						</li>
					))}
				</ListTag>
			</Section>
		);
	},
};

export const ListBlock: ComponentConfig<ListProps> = withLayout(ListInner);
