import { PuckOptions } from './types';
import type { Config } from '@measured/puck';

export const createPuckConfig = (options: PuckOptions): Config => {
	return {
		components: {},
	} as Config;
};
