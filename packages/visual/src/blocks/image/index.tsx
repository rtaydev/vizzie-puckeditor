import type { ComponentConfig } from '@measured/puck';
import { withLayout, type WithLayout } from '../../components/layout';
import { Section } from '../../components/section';
import {
	Image as _Image,
	type ImageProps as _ImageProps,
} from '../../components/image';
import {
	sectionFields,
	type SectionStyleProps,
} from '../../config/sectionFields';
import { ImageUploadField } from '../../fields/ImageUploadField';
import { AlignLeft, Link, Maximize } from 'lucide-react';

export type ImageBlockProps = WithLayout<
	SectionStyleProps & {
		src?: string;
		imageUrl?: string;
		alt?: string;
		width?: string;
		height?: string;
		objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
		align?: 'left' | 'center' | 'right';
	}
>;

const ImageBlockInternal: ComponentConfig<ImageBlockProps> = {
	fields: {
		src: {
			type: 'custom',
			label: 'Upload',
			// @ts-ignore
			render: ImageUploadField,
		},
		imageUrl: {
			type: 'text',
			label: 'URL',
			labelIcon: <Link size={16} />,
			placeholder: 'https://example.com/image.jpg',
		},
		alt: {
			type: 'text',
			label: 'Alt',
			placeholder: 'Describe the image',
		},
		width: {
			type: 'text',
			label: 'Width',
			labelIcon: <Maximize size={16} />,
			placeholder: 'e.g., 100%, 500px, auto',
		},
		height: {
			type: 'text',
			label: 'Height',
			labelIcon: <Maximize size={16} />,
			placeholder: 'e.g., auto, 300px',
		},
		objectFit: {
			type: 'select',
			label: 'Fit',
			labelIcon: <Maximize size={16} />,
			options: [
				{ label: 'Cover', value: 'cover' },
				{ label: 'Contain', value: 'contain' },
				{ label: 'Fill', value: 'fill' },
				{ label: 'None', value: 'none' },
				{ label: 'Scale Down', value: 'scale-down' },
			],
		},
		align: {
			type: 'radio',
			label: 'Align',
			labelIcon: <AlignLeft size={16} />,
			options: [
				{ label: 'Left', value: 'left' },
				{ label: 'Center', value: 'center' },
				{ label: 'Right', value: 'right' },
			],
		},
		...sectionFields,
	},
	defaultProps: {
		src: '',
		alt: '',
		objectFit: 'cover',
		align: 'center',
	},
	render: ({
		src,
		imageUrl,
		alt,
		width,
		height,
		objectFit,
		align,
		sectionStyle,
	}) => {
		const backgroundColor =
			sectionStyle?.backgroundColor === 'custom'
				? sectionStyle?.backgroundColorCustom
				: sectionStyle?.backgroundColor;

		const imageSrc = src || imageUrl;

		if (!imageSrc) {
			return (
				<Section
					backgroundColor={backgroundColor}
					paddingTop={sectionStyle?.paddingTop}
					paddingBottom={sectionStyle?.paddingBottom}
					alignItems={sectionStyle?.alignItems}
					maxWidth={sectionStyle?.maxWidth}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							minHeight: '200px',
							background: '#f3f4f6',
							border: '2px dashed #d1d5db',
							borderRadius: '8px',
							color: '#6b7280',
						}}
					>
						No image URL provided
					</div>
				</Section>
			);
		}

		const alignStyle =
			align === 'center'
				? { margin: '0 auto' }
				: align === 'right'
				? { marginLeft: 'auto' }
				: { marginRight: 'auto' };

		return (
			<Section
				backgroundColor={backgroundColor}
				paddingTop={sectionStyle?.paddingTop}
				paddingBottom={sectionStyle?.paddingBottom}
				alignItems={sectionStyle?.alignItems}
				maxWidth={sectionStyle?.maxWidth}
			>
				<div
					style={{
						display: 'flex',
						justifyContent: align,
						width: '100%',
						/* Prevent layout shift from Puck hover styles */
						border: '2px solid transparent',
						boxSizing: 'border-box',
					}}
				>
					<_Image
						src={imageSrc}
						alt={alt}
						width={width}
						height={height}
						objectFit={objectFit}
						style={alignStyle}
					/>
				</div>
			</Section>
		);
	},
};

export const ImageBlock: ComponentConfig<ImageBlockProps> =
	withLayout(ImageBlockInternal);
