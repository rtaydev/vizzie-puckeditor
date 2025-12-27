import { forwardRef, ImgHTMLAttributes } from 'react';
import styles from './styles.module.css';
import { getClassNameFactory } from '../../utils';

const getClassName = getClassNameFactory('Image', styles);

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
	src: string;
	alt?: string;
	width?: string | number;
	height?: string | number;
	objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
};

export const Image = forwardRef<HTMLImageElement, ImageProps>(
	(
		{
			src,
			alt = '',
			width,
			height,
			objectFit = 'cover',
			className,
			style,
			...props
		},
		ref
	) => {
		return (
			<img
				ref={ref}
				src={src}
				alt={alt}
				className={getClassName(className)}
				style={{
					width: width || '100%',
					height: height || 'auto',
					objectFit,
					...style,
				}}
				{...props}
			/>
		);
	}
);

Image.displayName = 'Image';

