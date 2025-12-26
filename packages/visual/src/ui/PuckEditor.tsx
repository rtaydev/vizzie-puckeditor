'use client';

import type { ReactElement } from 'react';
import { Config, Puck } from '@measured/puck';
import { createPuckConfig } from '../config/createPuckConfig';
import { PuckEditorProps } from '../config/types';

export const PuckEditor = ({
	data,
	onPublish,
	options = {},
}: PuckEditorProps): ReactElement => {
	const config: Config = createPuckConfig(options) as unknown as Config;
	return (
		<Puck
			config={config}
			data={data}
			onPublish={onPublish as (next: any) => Promise<any>}
		/>
	);
};
