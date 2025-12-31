import {
	ComponentConfig,
	CustomField,
	CustomFieldRender,
} from '@measured/puck';
import { Section } from '../../components/section';
import {
	sectionFields,
	type SectionStyleProps,
} from '../../config/sectionFields';
import { WithLayout, withLayout } from '../../components/layout';
import { useState } from 'react';
import styles from './styles.module.css';

// Types
export type DynamicItemProps = WithLayout<
	SectionStyleProps & {
		dataSourceUrl: string;
		selectedFields: string[];
		displayFormat: 'list' | 'grid' | 'table';
		itemsPerRow: number;
		productData: Record<string, any>[];
	}
>;

// Custom field for selecting data source and fields
const DataSourceFieldRender = (
	props: Parameters<CustomFieldRender<Record<string, any>[]>>[0]
) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<any[]>([]);
	const [availableFields, setAvailableFields] = useState<string[]>([]);

	const handleFetchData = async (url: string) => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch(url);
			if (!response.ok) throw new Error('HTTP error ' + response.status);
			const result = await response.json();
			const items = Array.isArray(result) ? result : result.items || [];
			setData(items);

			// Extract available fields from first item
			if (items.length > 0) {
				const fields = Object.keys(items[0]);
				setAvailableFields(fields);
			}

			props.onChange(items);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to fetch data');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
			<label style={{ fontSize: '14px', fontWeight: '500' }}>
				Data Source URL
			</label>
			<div style={{ display: 'flex', gap: '8px' }}>
				<input
					type="text"
					placeholder="https://api.example.com/products"
					style={{
						flex: 1,
						padding: '8px 12px',
						border: '1px solid #d1d5db',
						borderRadius: '6px',
						fontSize: '14px',
					}}
					onBlur={(e) => handleFetchData(e.target.value)}
				/>
				<button
					onClick={() =>
						handleFetchData(
							(document.querySelector('input') as HTMLInputElement)?.value
						)
					}
					style={{
						padding: '8px 16px',
						backgroundColor: '#3b82f6',
						color: 'white',
						border: 'none',
						borderRadius: '6px',
						cursor: 'pointer',
					}}
				>
					Fetch
				</button>
			</div>
			{loading && <p>Loading...</p>}
			{error && <p style={{ color: '#ef4444' }}>Error: {error}</p>}
			{availableFields.length > 0 && (
				<div>
					<label
						style={{
							fontSize: '14px',
							fontWeight: '500',
							display: 'block',
							marginBottom: '8px',
						}}
					>
						Available Fields
					</label>
					<div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
						{availableFields.map((field) => (
							<span
								key={field}
								style={{
									padding: '4px 12px',
									backgroundColor: '#e5e7eb',
									borderRadius: '4px',
									fontSize: '12px',
								}}
							>
								{field}
							</span>
						))}
					</div>
				</div>
			)}
			{data.length > 0 && (
				<p style={{ fontSize: '12px', color: '#6b7280' }}>
					Loaded {data.length} items
				</p>
			)}
		</div>
	);
};

// Main block configuration
const DynamicItemInner: ComponentConfig<DynamicItemProps> = {
	fields: {
		productData: {
			type: 'custom',
			label: 'Data Source',
			render: DataSourceFieldRender,
		} as CustomField<Record<string, any>[]>,
		selectedFields: {
			type: 'select',
			label: 'Fields to Display',
			options: [
				{ label: 'Name', value: 'name' },
				{ label: 'Description', value: 'description' },
				{ label: 'Price', value: 'price' },
				{ label: 'Image', value: 'image' },
				{ label: 'Category', value: 'category' },
			],
		},
		displayFormat: {
			type: 'radio',
			label: 'Display Format',
			options: [
				{ label: 'List', value: 'list' },
				{ label: 'Grid', value: 'grid' },
				{ label: 'Table', value: 'table' },
			],
		},
		itemsPerRow: {
			type: 'number',
			label: 'Items Per Row',
			min: 1,
			max: 6,
		},
		...sectionFields,
	},
	defaultProps: {
		productData: [],
		selectedFields: ['name', 'price'],
		displayFormat: 'grid',
		itemsPerRow: 3,
	},
	render: ({
		productData,
		selectedFields,
		displayFormat,
		itemsPerRow,
		sectionStyle,
	}) => {
		const backgroundColor =
			sectionStyle?.backgroundColor === 'custom'
				? sectionStyle?.backgroundColorCustom
				: sectionStyle?.backgroundColor;

		const renderItem = (item: Record<string, any>) => (
			<div
				key={item.id || Math.random()}
				style={{
					padding: '16px',
					border: '1px solid #e5e7eb',
					borderRadius: '8px',
				}}
			>
				{selectedFields.map((field) => (
					<div key={field} style={{ marginBottom: '12px' }}>
						<strong
							style={{ display: 'block', fontSize: '12px', color: '#6b7280' }}
						>
							{field}
						</strong>
						<p style={{ margin: '4px 0 0 0' }}>{item[field]}</p>
					</div>
				))}
			</div>
		);

		const containerStyle =
			displayFormat === 'grid'
				? styles.containerStyleGrid
				: displayFormat === 'table'
				? styles.containerStyleTable
				: styles.containerStyleFlex;

		return (
			<Section
				backgroundColor={backgroundColor}
				paddingHorizontal={sectionStyle?.paddingHorizontal}
				paddingVertical={sectionStyle?.paddingVertical}
				alignItems={sectionStyle?.alignItems}
				maxWidth={sectionStyle?.maxWidth}
			>
				{displayFormat === 'table' ? (
					<table className={containerStyle}>
						<thead>
							<tr>
								{selectedFields.map((field) => (
									<th
										key={field}
										style={{
											padding: '12px',
											textAlign: 'left',
											borderBottom: '2px solid #e5e7eb',
										}}
									>
										{field}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{productData.map((item) => (
								<tr key={item.id || Math.random()}>
									{selectedFields.map((field) => (
										<td
											key={field}
											style={{
												padding: '12px',
												borderBottom: '1px solid #e5e7eb',
											}}
										>
											{item[field]}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<div className={containerStyle}>{productData.map(renderItem)}</div>
				)}
			</Section>
		);
	},
};

export const DynamicItemBlock: ComponentConfig<DynamicItemProps> =
	withLayout(DynamicItemInner);
