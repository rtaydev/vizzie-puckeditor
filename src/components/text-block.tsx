'use client';

import { ComponentConfig } from '@measured/puck';
import {
	CommonStylingProps,
	getCommonStylingFields,
	applyCommonStyles,
	TextGroup,
} from '../lib/styling-fields';
import { useCallback } from 'react';

export interface TextBlockProps extends CommonStylingProps {
	text: {
		content?: string;
		align?: 'left' | 'center' | 'right' | 'justify';
		size?: 'h1' | 'h2' | 'h3' | 'h4' | 'p';
		fontFamily?: string;
		color?: string;
	};
}

export const TextBlock: ComponentConfig<TextBlockProps> = {
	fields: {
		text: {
			type: 'custom',
			label: 'Text',
			render: ({
				value,
				onChange,
				label = 'Text',
			}: {
				value: any;
				onChange: (value: any) => void;
				label?: string;
			}) => <TextGroup value={value} onChange={onChange} label={label} />,
		},
		...getCommonStylingFields(),
	},
	defaultProps: {
		text: {
			content: '',
			align: 'left',
			size: 'p',
			fontFamily: 'Inter',
		},
	},
	render: ({ text, ...stylingProps }) => {
		if (!text || typeof text !== 'object' || Array.isArray(text)) {
			return (
				<div style={applyCommonStyles(stylingProps)}>
					<p className='text-left text-base'>
						<span className='opacity-50 text-gray-500'>Enter text...</span>
					</p>
				</div>
			);
		}

		const content = text.content || '';
		const align = text.align || 'left';
		const size = text.size || 'p';
		const fontFamily = text.fontFamily || 'Inter';

		const alignClass = {
			left: 'text-left',
			center: 'text-center',
			right: 'text-right',
			justify: 'text-justify',
		}[align];

		// Map size to Tailwind classes
		const sizeClass = {
			h1: 'text-4xl font-bold',
			h2: 'text-3xl font-bold',
			h3: 'text-2xl font-semibold',
			h4: 'text-xl font-semibold',
			p: 'text-base',
		}[size];

		const styles = applyCommonStyles(stylingProps);

		const textColor = text.color || styles.color || '#000000';

		const Tag = useCallback((): React.ReactNode => {
			switch (size) {
				case 'h1':
					return (
						<h1
							className={`${alignClass} ${sizeClass}`}
							style={{
								minHeight: '1em',
								display: 'block',
								color: textColor,
								fontFamily: fontFamily,
							}}
						>
							{content || (
								<span className='opacity-50 text-gray-500'>Enter text...</span>
							)}
						</h1>
					);
				case 'h2':
					return (
						<h2
							className={`${alignClass} ${sizeClass}`}
							style={{
								minHeight: '1em',
								display: 'block',
								color: textColor,
								fontFamily: fontFamily,
							}}
						>
							{content || (
								<span className='opacity-50 text-gray-500'>Enter text...</span>
							)}
						</h2>
					);
				case 'h3':
					return (
						<h3
							className={`${alignClass} ${sizeClass}`}
							style={{
								minHeight: '1em',
								display: 'block',
								color: textColor,
								fontFamily: fontFamily,
							}}
						>
							{content || (
								<span className='opacity-50 text-gray-500'>Enter text...</span>
							)}
						</h3>
					);
				case 'h4':
					return (
						<h4
							className={`${alignClass} ${sizeClass}`}
							style={{
								minHeight: '1em',
								display: 'block',
								color: textColor,
								fontFamily: fontFamily,
							}}
						>
							{content || (
								<span className='opacity-50 text-gray-500'>Enter text...</span>
							)}
						</h4>
					);
				default:
					return (
						<p
							className={`${alignClass} ${sizeClass}`}
							style={{
								minHeight: '1em',
								display: 'block',
								color: textColor,
								fontFamily: fontFamily,
							}}
						>
							{content || (
								<span className='opacity-50 text-gray-500'>Enter text...</span>
							)}
						</p>
					);
			}
		}, [size, alignClass, sizeClass, textColor, fontFamily, content]);

		return (
			<div style={styles}>
				<Tag />
			</div>
		);
	},
};
