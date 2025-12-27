import { PuckOptions } from './types';
import { type Config } from '@measured/puck';
import { HeadingBlock } from '../blocks/heading';
import { GridBlock } from '../blocks/grid';
import { FlexBlock } from '../blocks/flex';
import { TextBlock } from '../blocks/text';
import { ImageBlock } from '../blocks/image';
import { IconBlock } from '../blocks/icon';

export const createPuckConfig = (options: PuckOptions): Config => {
	return {
		components: {
			HeadingBlock,
			GridBlock,
			FlexBlock,
			TextBlock,
			ImageBlock,
			IconBlock,
		},
		categories: {
			typography: {
				components: ['HeadingBlock', 'TextBlock'],
			},
			layout: {
				components: ['GridBlock', 'FlexBlock'],
			},
			media: {
				components: ['ImageBlock', 'IconBlock'],
			},
		},
	} as unknown as Config;
};
