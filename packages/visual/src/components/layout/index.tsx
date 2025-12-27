import { CSSProperties, forwardRef, ReactNode } from 'react';
import type {
	ComponentConfig,
	DefaultComponentProps,
	ObjectField,
} from '@measured/puck';
import { getClassNameFactory } from '../../utils';
import styles from './styles.module.css';
import { LayoutGrid } from 'lucide-react';

type LayoutFieldProps = {
	spanCol?: number;
	spanRow?: number;
	grow?: boolean;
};

const getClassName = getClassNameFactory('Layout', styles);

export type WithLayout<Props extends DefaultComponentProps> = Props & {
	layout?: LayoutFieldProps;
};

export type LayoutProps = WithLayout<{
	children: ReactNode;
	className?: string;
	style?: CSSProperties;
}>;

export const layoutField: ObjectField<LayoutFieldProps> = {
	type: 'object',
	label: 'Layout',
	labelIcon: <LayoutGrid size={16} />,
	objectFields: {
		spanCol: {
			label: 'Grid Columns',
			type: 'number',
			min: 1,
			max: 12,
		},
		spanRow: {
			label: 'Grid Rows',
			type: 'number',
			min: 1,
			max: 12,
		},
		grow: {
			label: 'Flex Grow',
			type: 'radio',
			options: [
				{ label: 'true', value: true },
				{ label: 'false', value: false },
			],
		},
	},
};

const Layout = forwardRef<HTMLDivElement, LayoutProps>(
	({ children, className, layout, style }, ref) => {
		return (
			<div
				className={className}
				style={{
					gridColumn: layout?.spanCol
						? `span ${Math.max(Math.min(layout.spanCol, 12), 1)}`
						: undefined,
					gridRow: layout?.spanRow
						? `span ${Math.max(Math.min(layout.spanRow, 12), 1)}`
						: undefined,
					flex: layout?.grow ? '1 1 0' : undefined,
					...style,
				}}
				ref={ref}
			>
				{children}
			</div>
		);
	}
);

Layout.displayName = 'Layout';

export { Layout };

export function withLayout<
	ThisComponentConfig extends ComponentConfig<any> = ComponentConfig
>(componentConfig: ThisComponentConfig): ThisComponentConfig {
	return {
		...componentConfig,
		fields: {
			...componentConfig.fields,
			layout: layoutField,
		},
		defaultProps: {
			...componentConfig.defaultProps,
			layout: {
				spanCol: 1,
				spanRow: 1,
				grow: false,
				...componentConfig.defaultProps?.layout,
			},
		},
		resolveFields: (_, params) => {
			if (params.parent?.type === 'Grid') {
				return {
					...componentConfig.fields,
					layout: {
						...layoutField,
						objectFields: {
							spanCol: layoutField.objectFields.spanCol,
							spanRow: layoutField.objectFields.spanRow,
						},
					},
				};
			}
			if (params.parent?.type === 'Flex') {
				return {
					...componentConfig.fields,
					layout: {
						...layoutField,
						objectFields: {
							grow: layoutField.objectFields.grow,
						},
					},
				};
			}

			// For non-grid/flex parents, hide layout field entirely
			return {
				...componentConfig.fields,
			};
		},
		inline: true,
		render: (props) => (
			<Layout
				className={getClassName(props.className)}
				layout={props.layout as LayoutFieldProps}
				ref={props.puck.dragRef}
			>
				{componentConfig.render(props)}
			</Layout>
		),
	};
}
