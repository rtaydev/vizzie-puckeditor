import { PuckOptions } from './types';
import { type Config } from '@measured/puck';
import { HeadingBlock } from '../blocks/heading';
import { GridBlock } from '../blocks/grid';
import { FlexBlock } from '../blocks/flex';
import { TextBlock } from '../blocks/text';
import { ImageBlock } from '../blocks/image';

export const createPuckConfig = (options: PuckOptions): Config => {
	return {
		components: {
			HeadingBlock,
			GridBlock,
			FlexBlock,
			TextBlock,
			ImageBlock,
		},
		categories: {
			typography: {
				components: ['HeadingBlock', 'TextBlock'],
			},
			layout: {
				components: ['GridBlock', 'FlexBlock'],
			},
			media: {
				components: ['ImageBlock'],
			},
		},
	} as unknown as Config;
};
