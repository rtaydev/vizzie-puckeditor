import { CSSProperties, forwardRef, ReactNode } from 'react';
import styles from './styles.module.css';
import { getClassNameFactory } from '../../utils';

const getClassName = getClassNameFactory('Section', styles);

const joinClasses = (
	...classes: (string | undefined | null | false)[]
): string => {
	return classes.filter((cls): cls is string => Boolean(cls)).join(' ');
};

export type SectionProps = {
	className?: string;
	children: ReactNode;
	maxWidth?: string;
	style?: CSSProperties;
	backgroundColor?: string;
	paddingTop?: string;
	paddingBottom?: string;
	alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
};

export const Section = forwardRef<HTMLDivElement, SectionProps>(
	(
		{
			children,
			className,
			maxWidth = '100%',
			style = {},
			backgroundColor,
			paddingTop,
			paddingBottom,
			alignItems,
		},
		ref
	) => {
		const getBackgroundClass = (bg?: string): string | undefined => {
			if (!bg || bg === '') return undefined;
			const bgMap: Record<string, string | undefined> = {
				white: styles['Section--bg-white'],
				gray: styles['Section--bg-gray'],
				'gray-dark': styles['Section--bg-gray-dark'],
				black: styles['Section--bg-black'],
			};
			return bgMap[bg];
		};

		const backgroundClass = getBackgroundClass(backgroundColor);
		const shouldUseInlineBackground =
			backgroundColor && backgroundColor !== '' && !backgroundClass;

		const sectionStyle: CSSProperties = {
			...style,
			...(shouldUseInlineBackground && { backgroundColor }),
			...(paddingTop && { paddingTop }),
			...(paddingBottom && { paddingBottom }),
		};

		const innerStyle: CSSProperties = {
			maxWidth,
			display: 'flex',
			flexDirection: 'column',
			...(alignItems && { alignItems }),
		};

		const sectionClasses = joinClasses(
			getClassName(),
			backgroundClass,
			className
		);

		const innerClasses = getClassName('inner');

		return (
			<div className={sectionClasses} style={sectionStyle} ref={ref}>
				<div className={innerClasses} style={innerStyle}>
					{children}
				</div>
			</div>
		);
	}
);
