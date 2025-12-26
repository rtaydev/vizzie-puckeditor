'use client';

import { useState, useMemo } from 'react';
import type { CustomFieldProps } from '../types';
import { cn } from '../utils/cn';

export interface ColorPickerFieldProps extends CustomFieldProps {
	label?: string;
}

export function ColorPickerField({
	name,
	label,
	value,
	onChange,
	readOnly = false,
	className,
}: ColorPickerFieldProps): JSX.Element {
	const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

	const displayColor = useMemo(() => {
		if (!value) return '#000000';
		if (typeof value === 'string') {
			if (value.startsWith('#')) {
				return value;
			}
			if (value.startsWith('rgb')) {
				// Try to convert RGB/RGBA to hex
				try {
					const rgbMatch = value.match(/\d+/g);
					if (rgbMatch && rgbMatch.length >= 3) {
						const r = parseInt(rgbMatch[0]);
						const g = parseInt(rgbMatch[1]);
						const b = parseInt(rgbMatch[2]);
						return `#${[r, g, b]
							.map((x) => {
								const hex = x.toString(16);
								return hex.length === 1 ? '0' + hex : hex;
							})
							.join('')}`;
					}
				} catch {
					return '#000000';
				}
			}
			return value;
		}
		return '#000000';
	}, [value]);

	const handleColorChange = (newColor: string) => {
		try {
			// Convert hex to rgba if needed
			if (newColor.startsWith('#')) {
				const hex = newColor.replace('#', '');
				const r = parseInt(hex.substring(0, 2), 16);
				const g = parseInt(hex.substring(2, 4), 16);
				const b = parseInt(hex.substring(4, 6), 16);
				const rgbaString = `rgba(${r}, ${g}, ${b}, 1)`;
				onChange(rgbaString);
			} else {
				onChange(newColor);
			}
			setIsColorPickerOpen(false);
		} catch {
			onChange(newColor);
			setIsColorPickerOpen(false);
		}
	};

	return (
		<div className={cn('flex flex-col gap-2', className)}>
			{label && (
				<label htmlFor={name} className='text-xs font-medium'>
					{label}
				</label>
			)}
			<div className='relative'>
				<button
					type='button'
					role='button'
					tabIndex={-1}
					aria-label={`${label || name} color picker`}
					onClick={() => !readOnly && setIsColorPickerOpen(!isColorPickerOpen)}
					disabled={readOnly}
					className={cn(
						'p-0 bg-white h-8 w-full rounded-sm shadow-xs border border-gray-200 hover:border-gray-300 transition-colors',
						readOnly && 'cursor-not-allowed opacity-50'
					)}
				>
					<div
						style={{
							backgroundColor: (value as string) || '#000000',
						}}
						className='h-6 w-full mx-1 rounded-xs'
					/>
				</button>
				{isColorPickerOpen && !readOnly && (
					<div className='absolute z-50 mt-1 p-3 bg-white border border-gray-200 rounded-md shadow-lg min-w-[200px]'>
						<div className='space-y-2'>
							<input
								type='color'
								value={displayColor}
								onChange={(e) => handleColorChange(e.target.value)}
								className='w-full h-32 cursor-pointer rounded border border-gray-300'
							/>
							<input
								type='text'
								value={displayColor}
								onChange={(e) => handleColorChange(e.target.value)}
								placeholder='#000000'
								className='w-full h-8 px-2 text-xs border border-gray-300 rounded focus:outline-hidden focus:ring-2 focus:ring-blue-500'
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
