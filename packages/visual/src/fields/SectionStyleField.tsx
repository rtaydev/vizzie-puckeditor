'use client';

import { useState, useEffect } from 'react';
import type { CustomFieldRender } from '@measured/puck';
import {
	AlignVerticalJustifyStart,
	AlignVerticalJustifyCenter,
	AlignVerticalJustifyEnd,
	Maximize,
	Palette,
} from 'lucide-react';
import { ChromePicker, type ColorResult } from 'react-color';
import { spacingOptions } from '../config/options';

type SectionStyleValue = {
	backgroundColor?: string;
	backgroundColorCustom?: string;
	paddingTop?: string;
	paddingBottom?: string;
	alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
	maxWidth?: string;
};

export const SectionStyleField: CustomFieldRender<SectionStyleValue> = (
	props
) => {
	const { value = {}, onChange, field } = props;
	const [showColorPicker, setShowColorPicker] = useState(false);
	const [hexValue, setHexValue] = useState(
		value.backgroundColorCustom || '#000000'
	);

	// Sync hexValue when value prop changes
	useEffect(() => {
		if (value.backgroundColorCustom) {
			setHexValue(value.backgroundColorCustom);
		}
	}, [value.backgroundColorCustom]);

	const updateValue = (updates: Partial<SectionStyleValue>) => {
		onChange({ ...value, ...updates });
	};

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

		if (hex.length === 3) {
			hex = hex
				.split('')
				.map((char) => char + char)
				.join('');
		}

		if (hex.length === 6) {
			const r = parseInt(hex.substring(0, 2), 16);
			const g = parseInt(hex.substring(2, 4), 16);
			const b = parseInt(hex.substring(4, 6), 16);
			return { r, g, b, a: 1 };
		}

		if (hex.length === 8) {
			const r = parseInt(hex.substring(0, 2), 16);
			const g = parseInt(hex.substring(2, 4), 16);
			const b = parseInt(hex.substring(4, 6), 16);
			const a = parseInt(hex.substring(6, 8), 16) / 255;
			return { r, g, b, a };
		}

		return { r: 0, g: 0, b: 0, a: 1 };
	};

	const handleColorChange = (color: ColorResult) => {
		if (color.rgb && color.rgb.a !== undefined && color.rgb.a < 1) {
			const hexWithAlpha = rgbaToHex(
				color.rgb.r,
				color.rgb.g,
				color.rgb.b,
				color.rgb.a
			);
			setHexValue(hexWithAlpha);
			updateValue({
				backgroundColorCustom: hexWithAlpha,
				backgroundColor: 'custom',
			});
		} else {
			const hex = color.hex || '#000000';
			setHexValue(hex);
			updateValue({ backgroundColorCustom: hex, backgroundColor: 'custom' });
		}
	};

	const backgroundColor = value.backgroundColor || '';
	const isCustomColor = backgroundColor === 'custom';

	return (
		<div>
			<label
				style={{
					display: 'block',
					marginBottom: '12px',
					fontSize: '14px',
					fontWeight: '500',
					color: '#111827',
				}}
			>
				{field.label || 'Section Styles'}
			</label>

			<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
				{/* Background Color */}
				<div>
					<label
						style={{
							display: 'block',
							marginBottom: '6px',
							fontSize: '12px',
							fontWeight: '500',
							color: '#6b7280',
						}}
					>
						Background Color
					</label>
					<div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
						<select
							value={backgroundColor}
							onChange={(e) => {
								const newBg = e.target.value;
								if (newBg !== 'custom') {
									updateValue({
										backgroundColor: newBg,
										backgroundColorCustom: undefined,
									});
								} else {
									updateValue({ backgroundColor: 'custom' });
								}
							}}
							style={{
								flex: 1,
								padding: '6px 8px',
								border: '1px solid #d1d5db',
								borderRadius: '6px',
								fontSize: '13px',
							}}
						>
							<option value=''>None</option>
							<option value='white'>White</option>
							<option value='gray'>Gray</option>
							<option value='gray-dark'>Gray Dark</option>
							<option value='black'>Black</option>
							<option value='custom'>Custom</option>
						</select>
						{isCustomColor && (
							<div style={{ position: 'relative' }}>
								<button
									type='button'
									onClick={() => setShowColorPicker(!showColorPicker)}
									style={{
										width: '36px',
										height: '36px',
										border: '2px solid #e5e7eb',
										borderRadius: '6px',
										background: (() => {
											const rgba = hexToRgba(hexValue);
											return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
										})(),
										cursor: 'pointer',
										padding: 0,
										position: 'relative',
										overflow: 'hidden',
									}}
									title='Pick custom color'
								>
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
											background: (() => {
												const rgba = hexToRgba(hexValue);
												return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
											})(),
											zIndex: 1,
										}}
									/>
								</button>
								{showColorPicker && (
									<div
										style={{
											position: 'absolute',
											top: '44px',
											right: 0,
											zIndex: 1000,
										}}
										onClick={(e) => e.stopPropagation()}
									>
										<ChromePicker
											color={hexToRgba(hexValue)}
											onChange={handleColorChange}
										/>
									</div>
								)}
							</div>
						)}
					</div>
					{showColorPicker && (
						<div
							style={{
								position: 'fixed',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								zIndex: 999,
							}}
							onClick={() => setShowColorPicker(false)}
						/>
					)}
				</div>

				{/* Padding Top & Bottom */}
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						gap: '8px',
					}}
				>
					<div>
						<label
							style={{
								display: 'block',
								marginBottom: '6px',
								fontSize: '12px',
								fontWeight: '500',
								color: '#6b7280',
							}}
						>
							Padding Top
						</label>
						<select
							value={value.paddingTop || '0px'}
							onChange={(e) => updateValue({ paddingTop: e.target.value })}
							style={{
								width: '100%',
								padding: '6px 8px',
								border: '1px solid #d1d5db',
								borderRadius: '6px',
								fontSize: '13px',
							}}
						>
							<option value='0px'>0px</option>
							{spacingOptions.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{opt.label}
								</option>
							))}
						</select>
					</div>
					<div>
						<label
							style={{
								display: 'block',
								marginBottom: '6px',
								fontSize: '12px',
								fontWeight: '500',
								color: '#6b7280',
							}}
						>
							Padding Bottom
						</label>
						<select
							value={value.paddingBottom || '0px'}
							onChange={(e) => updateValue({ paddingBottom: e.target.value })}
							style={{
								width: '100%',
								padding: '6px 8px',
								border: '1px solid #d1d5db',
								borderRadius: '6px',
								fontSize: '13px',
							}}
						>
							<option value='0px'>0px</option>
							{spacingOptions.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{opt.label}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* Align Items */}
				<div>
					<label
						style={{
							display: 'block',
							marginBottom: '6px',
							fontSize: '12px',
							fontWeight: '500',
							color: '#6b7280',
						}}
					>
						Align Items
					</label>
					<select
						value={value.alignItems || 'stretch'}
						onChange={(e) => updateValue({ alignItems: e.target.value as any })}
						style={{
							width: '100%',
							padding: '6px 8px',
							border: '1px solid #d1d5db',
							borderRadius: '6px',
							fontSize: '13px',
						}}
					>
						<option value='stretch'>Stretch</option>
						<option value='flex-start'>Start</option>
						<option value='center'>Center</option>
						<option value='flex-end'>End</option>
						<option value='baseline'>Baseline</option>
					</select>
				</div>

				{/* Max Width */}
				<div>
					<label
						style={{
							display: 'block',
							marginBottom: '6px',
							fontSize: '12px',
							fontWeight: '500',
							color: '#6b7280',
						}}
					>
						Max Width
					</label>
					<input
						type='text'
						value={value.maxWidth || ''}
						onChange={(e) => updateValue({ maxWidth: e.target.value })}
						placeholder='e.g., 1280px, 100%'
						style={{
							width: '100%',
							padding: '6px 8px',
							border: '1px solid #d1d5db',
							borderRadius: '6px',
							fontSize: '13px',
						}}
					/>
				</div>
			</div>
		</div>
	);
};
