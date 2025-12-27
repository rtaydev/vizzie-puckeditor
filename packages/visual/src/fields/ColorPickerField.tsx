'use client';

import { useState, useEffect } from 'react';
import type { CustomFieldRender } from '@measured/puck';
import { Palette } from 'lucide-react';
import { ChromePicker, type ColorResult } from 'react-color';

export const ColorPickerField: CustomFieldRender<string> = (props) => {
	const { value = '', onChange, field } = props;
	const [showPicker, setShowPicker] = useState(false);
	const [hexValue, setHexValue] = useState(value || '#000000');

	// Convert rgba to hex with alpha
	const rgbaToHex = (r: number, g: number, b: number, a: number): string => {
		const toHex = (n: number) => {
			const hex = Math.round(n).toString(16);
			return hex.length === 1 ? '0' + hex : hex;
		};
		const alphaHex = Math.round(a * 255)
			.toString(16)
			.padStart(2, '0');
		return `#${toHex(r)}${toHex(g)}${toHex(b)}${alphaHex}`.toUpperCase();
	};

	// Convert hex with alpha to rgba object
	const hexToRgba = (
		hex: string
	): { r: number; g: number; b: number; a: number } => {
		if (!hex) return { r: 0, g: 0, b: 0, a: 1 };
		hex = hex.replace('#', '');

		// Handle 3-digit hex
		if (hex.length === 3) {
			hex = hex
				.split('')
				.map((char) => char + char)
				.join('');
		}

		// Handle 6-digit hex (no alpha)
		if (hex.length === 6) {
			const r = parseInt(hex.substring(0, 2), 16);
			const g = parseInt(hex.substring(2, 4), 16);
			const b = parseInt(hex.substring(4, 6), 16);
			return { r, g, b, a: 1 };
		}

		// Handle 8-digit hex (with alpha)
		if (hex.length === 8) {
			const r = parseInt(hex.substring(0, 2), 16);
			const g = parseInt(hex.substring(2, 4), 16);
			const b = parseInt(hex.substring(4, 6), 16);
			const a = parseInt(hex.substring(6, 8), 16) / 255;
			return { r, g, b, a };
		}

		return { r: 0, g: 0, b: 0, a: 1 };
	};

	// Normalize hex value (supports 6 or 8 digit hex)
	const normalizeHexWithAlpha = (hex: string): string => {
		if (!hex) return '#000000';
		hex = hex.replace('#', '').toUpperCase();

		// If 3 characters, expand to 6
		if (hex.length === 3) {
			hex = hex
				.split('')
				.map((char) => char + char)
				.join('');
		}

		// If 4 characters (3 + alpha), expand to 8
		if (hex.length === 4) {
			const rgb = hex.substring(0, 3);
			const alpha = hex.substring(3, 4);
			hex =
				rgb
					.split('')
					.map((char) => char + char)
					.join('') +
				alpha +
				alpha;
		}

		// Return with # prefix
		if (hex.length === 6 || hex.length === 8) {
			return `#${hex}`;
		}

		return '#000000';
	};

	const handleColorChange = (color: ColorResult) => {
		// Use rgba if alpha is less than 1, otherwise use hex
		if (color.rgb && color.rgb.a !== undefined && color.rgb.a < 1) {
			const hexWithAlpha = rgbaToHex(
				color.rgb.r,
				color.rgb.g,
				color.rgb.b,
				color.rgb.a
			);
			setHexValue(hexWithAlpha);
			onChange(hexWithAlpha);
		} else {
			const hex = color.hex || '#000000';
			setHexValue(hex);
			onChange(hex);
		}
	};

	const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let inputValue = e.target.value;
		// Allow partial input while typing (supports 6 or 8 digit hex)
		setHexValue(inputValue);
		// Only update onChange if it's a valid hex (6 or 8 digits)
		if (/^#?[0-9A-Fa-f]{0,8}$/.test(inputValue)) {
			if (
				inputValue.length === 6 ||
				inputValue.length === 7 ||
				inputValue.length === 8 ||
				inputValue.length === 9
			) {
				const normalized = normalizeHexWithAlpha(inputValue);
				onChange(normalized);
			}
		}
	};

	const handleHexInputBlur = () => {
		// Normalize on blur
		const normalized = normalizeHexWithAlpha(hexValue);
		setHexValue(normalized);
		onChange(normalized);
	};

	// Sync hexValue with value prop when it changes externally
	useEffect(() => {
		const normalized = normalizeHexWithAlpha(value || '#000000');
		if (normalized !== hexValue) {
			setHexValue(normalized);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	return (
		<div>
			<label
				style={{
					display: 'block',
					marginBottom: '8px',
					fontSize: '14px',
					fontWeight: '500',
					color: '#111827',
				}}
			>
				{field.label || 'Color'}
			</label>

			<div
				style={{
					display: 'flex',
					gap: '8px',
					alignItems: 'center',
				}}
			>
				{/* Color preview and picker */}
				<div style={{ position: 'relative' }}>
					<button
						type='button'
						onClick={() => setShowPicker(!showPicker)}
						style={{
							width: '40px',
							height: '40px',
							border: '2px solid #e5e7eb',
							borderRadius: '6px',
							cursor: 'pointer',
							padding: 0,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							position: 'relative',
							overflow: 'hidden',
							background: value
								? (() => {
										const rgba = hexToRgba(value);
										return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
								  })()
								: '#000000',
						}}
						title='Click to pick color'
					>
						{/* Checkerboard pattern for transparency */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								backgroundImage:
									'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
								backgroundSize: '8px 8px',
								backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
								zIndex: 0,
							}}
						/>
						<div
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								background: value
									? (() => {
											const rgba = hexToRgba(value);
											return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
									  })()
									: '#FFFFFF',
								zIndex: 1,
							}}
						/>

						<Palette
							size={20}
							style={{
								color: value ? '#FFFFFF' : '#9ca3af',
								position: 'absolute',
								zIndex: 2,
							}}
						/>
					</button>
					{showPicker && (
						<div
							style={{
								position: 'absolute',
								top: '48px',
								right: 0,
								zIndex: 1000,
							}}
							onClick={(e) => e.stopPropagation()}
						>
							<ChromePicker
								color={hexToRgba(value || '#000000')}
								onChange={handleColorChange}
							/>
						</div>
					)}
				</div>

				{/* Hex input */}
				<div style={{ flex: 1 }}>
					<input
						type='text'
						value={hexValue}
						onChange={handleHexInputChange}
						onBlur={handleHexInputBlur}
						placeholder='#000000 or #000000FF'
						style={{
							width: '100%',
							padding: '8px 12px',
							border: '1px solid #d1d5db',
							borderRadius: '6px',
							fontSize: '14px',
							fontFamily: 'monospace',
						}}
					/>
				</div>
			</div>

			{/* Close picker when clicking outside */}
			{showPicker && (
				<div
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						zIndex: 999,
					}}
					onClick={() => setShowPicker(false)}
				/>
			)}
		</div>
	);
};
