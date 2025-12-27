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
			label: 'Image Upload',
			// @ts-ignore
			render: ImageUploadField,
		},
		imageUrl: {
			type: 'text',
			label: 'Or Image URL',
			placeholder: 'https://example.com/image.jpg',
		},
		alt: {
			type: 'text',
			label: 'Alt Text',
			placeholder: 'Describe the image',
		},
		width: {
			type: 'text',
			label: 'Width',
			placeholder: 'e.g., 100%, 500px, auto',
		},
		height: {
			type: 'text',
			label: 'Height',
			placeholder: 'e.g., auto, 300px',
		},
		objectFit: {
			type: 'select',
			label: 'Object Fit',
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
			label: 'Alignment',
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
		layout: {
			padding: '8px',
		},
	},
	render: ({
		src,
		imageUrl,
		alt,
		width,
		height,
		objectFit,
		align,
		sectionBackgroundColor,
		sectionBackgroundColorCustom,
		sectionPaddingTop,
		sectionPaddingBottom,
		sectionTextAlign,
		sectionMaxWidth,
	}) => {
		const backgroundColor =
			sectionBackgroundColor === 'custom'
				? sectionBackgroundColorCustom
				: sectionBackgroundColor;

		const imageSrc = src || imageUrl;

		if (!imageSrc) {
			return (
				<Section
					backgroundColor={backgroundColor}
					paddingTop={sectionPaddingTop}
					paddingBottom={sectionPaddingBottom}
					textAlign={sectionTextAlign}
					maxWidth={sectionMaxWidth}
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
				paddingTop={sectionPaddingTop}
				paddingBottom={sectionPaddingBottom}
				textAlign={sectionTextAlign}
				maxWidth={sectionMaxWidth}
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
