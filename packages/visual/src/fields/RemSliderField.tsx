'use client';

import { useEffect } from 'react';
import type { CustomFieldRender } from '@measured/puck';
import { Maximize } from 'lucide-react';

export const RemSliderField: CustomFieldRender<number> = (props) => {
	const { value, onChange, field } = props;
	const min = (field as any).min ?? 0.5;
	const max = (field as any).max ?? 4;
	const step = (field as any).step ?? 0.1;

	// Convert old string values ('s', 'm') or invalid values to numbers
	const normalizeValue = (val: any): number => {
		if (typeof val === 'number' && !isNaN(val)) {
			return val;
		}
		// Handle legacy string values
		if (val === 's') return 1; // ~16px
		if (val === 'm') return 1.25; // ~20px
		// Default fallback
		return 1.25;
	};

	const numericValue = normalizeValue(value ?? 1.25);

	// Auto-convert old string values to numbers on mount
	useEffect(() => {
		if (
			typeof value === 'string' ||
			(value !== undefined && typeof value !== 'number')
		) {
			const converted = normalizeValue(value);
			if (converted !== value) {
				onChange(converted);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			style={{
				width: '100%',
				display: 'flex',
				flexDirection: 'row',
				gap: '8px',
				alignItems: 'center',
			}}
		>
			<label
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '8px',
					fontSize: '12px',
					fontWeight: '500',
					color: '#6b7280',
				}}
			>
				<Maximize size={16} />
				{field.label || 'Size'}
			</label>
			<div
				style={{ display: 'flex', gap: '12px', alignItems: 'center', flex: 1 }}
			>
				<input
					type='range'
					min={min}
					max={max}
					step={step}
					value={numericValue}
					onChange={(e) => onChange(parseFloat(e.target.value))}
					style={{
						flex: 1,
						height: '6px',
						borderRadius: '3px',
						background: '#e5e7eb',
						outline: 'none',
						cursor: 'pointer',
					}}
				/>
				<span
					style={{
						minWidth: '20px',
						fontSize: '12px',
						color: '#6b7280',
						textAlign: 'right',
					}}
				>
					{numericValue}rem
				</span>
			</div>
		</div>
	);
};
