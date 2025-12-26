import { PuckOptions } from './types';

export const createPuckConfig = (options: PuckOptions) => {
	return {
		sidebarPosition: options.sidebarPosition || 'left',
	};
};
