'use client';

import type { ReactElement } from 'react';
import { Render, Config } from '@measured/puck';
import { PuckRendererProps } from '../config/types';
import { createPuckConfig } from '../config/createPuckConfig';

export const PuckRenderer = ({ data, options = {} }: PuckRendererProps): ReactElement => {
	const config: Config = createPuckConfig(options) as unknown as Config;
	return <Render config={config} data={data} />;
};
