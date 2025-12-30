import { ComponentConfig, CustomField } from '@measured/puck';
import { Maximize } from 'lucide-react';
import { Section } from '../../components/section';
import { WithLayout, withLayout } from '../../components/layout';
import {
	sectionFields,
	type SectionStyleProps,
} from '../../config/sectionFields';
import { RemSliderField } from '../../fields/RemSliderField';

export type SpacerProps = WithLayout<
	SectionStyleProps & {
		height: number; // Height in rem units
	}
>;

const SpacerInner: ComponentConfig<SpacerProps> = {
	fields: {
		height: {
			type: 'custom',
			label: 'Height',
			labelIcon: <Maximize size={16} />,
			render: (props) => <RemSliderField {...props} />,
			min: 0,
			max: 10,
			step: 0.25,
		} as CustomField<number>,
		...sectionFields,
	},
	defaultProps: {
		height: 2, // 2rem default
	},
	render: ({ height, sectionStyle }) => {
		const backgroundColor =
			sectionStyle?.backgroundColor === 'custom'
				? sectionStyle?.backgroundColorCustom
				: sectionStyle?.backgroundColor;

		return (
			<Section
				backgroundColor={backgroundColor}
				backgroundSize={sectionStyle?.backgroundSize}
				backgroundRepeat={sectionStyle?.backgroundRepeat}
				backgroundPosition={sectionStyle?.backgroundPosition}
				paddingVertical={sectionStyle?.paddingVertical}
				alignItems={sectionStyle?.alignItems}
				maxWidth={sectionStyle?.maxWidth}
			>
				<div
					style={{
						height: `${height}rem`,
						width: '100%',
					}}
				/>
			</Section>
		);
	},
};

export const SpacerBlock: ComponentConfig<SpacerProps> =
	withLayout(SpacerInner);
