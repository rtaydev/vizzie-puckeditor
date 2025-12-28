'use client';

import type { ReactElement } from 'react';
import { Render, Config } from '@measured/puck';
import { PuckRendererProps } from '../config/types';
import { createPuckConfig } from '../config/createPuckConfig';
import { defaultPuckTheme } from '../config/defaultTheme';
import { applyTheme, mergeThemes } from '../utils/theme';
import { useMemo } from 'react';

export const PuckRenderer = ({
	data,
	options = {},
}: PuckRendererProps): ReactElement => {
	const config: Config = useMemo(
		() => createPuckConfig(options) as unknown as Config,
		[options]
	);

	const theme = useMemo(() => {
		if (options.theme?.theme) {
			return mergeThemes(defaultPuckTheme, options.theme.theme);
		}
		return defaultPuckTheme;
	}, [options.theme]);

	const themeStyles = useMemo(() => applyTheme(theme), [theme]);
	const themeClassName =
		`${options.theme?.className} puck-renderer` || 'puck-renderer';
	const customCss = options.theme?.customCss;

	return (
		<div style={themeStyles} className={themeClassName}>
			{customCss && (
				<style
					dangerouslySetInnerHTML={{
						__html: customCss,
					}}
				/>
			)}
			<Render config={config} data={data} />
		</div>
	);
};
