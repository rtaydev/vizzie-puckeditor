import { PuckOptions } from './types';
import type { Config } from '@measured/puck';
import { HeadingBlock } from '../blocks/heading';

export const createPuckConfig = (options: PuckOptions): Config => {
	return {
		components: {
			HeadingBlock: HeadingBlock,
		},
		categories: {
			typography: {
				components: ['HeadingBlock'],
			},
		},
	} as unknown as Config;
};
