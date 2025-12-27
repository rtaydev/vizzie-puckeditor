import { CSSProperties, forwardRef, ReactNode } from 'react';
import styles from './styles.module.css';
import { getClassNameFactory } from '../../utils';

const getClassName = getClassNameFactory('Section', styles);

const joinClasses = (...classes: (string | undefined | null | false)[]): string => {
	return classes.filter((cls): cls is string => Boolean(cls)).join(' ');
};

export type SectionProps = {
	className?: string;
	children: ReactNode;
	maxWidth?: string;
	style?: CSSProperties;
};

export const Section = forwardRef<HTMLDivElement, SectionProps>(
	({ children, className, maxWidth = '1280px', style = {} }, ref) => {
		return (
			<div
				className={joinClasses(getClassName(), className)}
				style={{
					...style,
				}}
				ref={ref}
			>
				<div className={getClassName('inner')} style={{ maxWidth }}>
					{children}
				</div>
			</div>
		);
	}
);
