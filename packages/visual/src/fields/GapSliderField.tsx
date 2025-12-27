'use client';

import type { CustomFieldRender } from '@measured/puck';
import { Maximize } from 'lucide-react';

export const GapSliderField: CustomFieldRender<number> = (props) => {
	const { value = 0, onChange, field } = props;
	const min = (field as any).min ?? 0;
	const max = (field as any).max ?? 100;

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
				{field.label || 'Gap'}
			</label>
			<div
				style={{ display: 'flex', gap: '12px', alignItems: 'center', flex: 1 }}
			>
				<input
					type='range'
					min={min}
					max={max}
					value={value}
					onChange={(e) => onChange(parseInt(e.target.value, 10))}
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
					{value}px
				</span>
			</div>
		</div>
	);
};
