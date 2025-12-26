'use client';

import { ImageUploadField, ImageUploadFieldProps } from './image-upload';

export function BackgroundImageUploadField(
	props: ImageUploadFieldProps
): JSX.Element {
	return (
		<ImageUploadField {...props} label={props.label || 'Background Image'} />
	);
}
