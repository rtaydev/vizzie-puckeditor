import { PuckOptions } from './types';
import { type Config } from '@measured/puck';
import { HeadingBlock } from '../blocks/heading';
import { GridBlock } from '../blocks/grid';
import { FlexBlock } from '../blocks/flex';
import { TextBlock } from '../blocks/text';
import { ImageBlock } from '../blocks/image';
import { IconBlock } from '../blocks/icon';
import { ButtonBlock } from '../blocks/button';
import { SpacerBlock } from '../blocks/spacer';
import { ListBlock } from '../blocks/list';
import { QuoteBlock } from '../blocks/quote';
import { VideoBlock } from '../blocks/video';
import { CardBlock } from '../blocks/card';
import { HeroOneBlock } from '../blocks/hero-one';
import { HeroTwoBlock } from '../blocks/hero-two';
import { HeroThreeBlock } from '../blocks/hero-three';
import { FeaturesOneBlock } from '../blocks/features/one';
import { FeaturesTwoBlock } from '../blocks/features/two';
import { ContactOneBlock } from '../blocks/contact/one';
import { PricingOneBlock } from '../blocks/pricing/one';
import { DynamicItemBlock } from '../blocks/dynamic-item-block';

export const createPuckConfig = (options: PuckOptions): Config => {
	return {
		components: {
			HeadingBlock,
			GridBlock,
			FlexBlock,
			TextBlock,
			ImageBlock,
			IconBlock,
			ButtonBlock,
			SpacerBlock,
			ListBlock,
			QuoteBlock,
			VideoBlock,
			CardBlock,
			HeroOneBlock,
			HeroTwoBlock,
			HeroThreeBlock,
			FeaturesOneBlock,
			FeaturesTwoBlock,
			ContactOneBlock,
			PricingOneBlock,
			DynamicItemBlock,
		},
		categories: {
			typography: {
				components: ['HeadingBlock', 'TextBlock', 'QuoteBlock', 'ListBlock'],
			},
			layout: {
				components: ['GridBlock', 'FlexBlock', 'SpacerBlock', 'CardBlock'],
				defaultExpanded: false,
			},
			media: {
				components: ['ImageBlock', 'IconBlock', 'VideoBlock'],
				defaultExpanded: false,
			},
			interactive: {
				components: ['ButtonBlock', 'DynamicItemBlock'],
				defaultExpanded: false,
			},
			templates: {
				components: [
					'HeroOneBlock',
					'HeroTwoBlock',
					'HeroThreeBlock',
					'FeaturesOneBlock',
					'FeaturesTwoBlock',
					'ContactOneBlock',
					'PricingOneBlock',
				],
				defaultExpanded: false,
			},
		},
	} as unknown as Config;
};
