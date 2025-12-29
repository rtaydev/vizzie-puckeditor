'use client';

import type { ReactElement } from 'react';
import { Render, Config } from '@measured/puck';
import { PuckRendererProps, PuckTheme } from '../config/types';
import { createPuckConfig } from '../config/createPuckConfig';
import { defaultPuckTheme } from '../config/defaultTheme';
import { applyTheme, getTheme, mergeThemes } from '../utils/theme';
import { useMemo, useState } from 'react';

export const PuckRenderer = ({
	data,
	options = {},
}: PuckRendererProps): ReactElement => {
	const [currentTheme, setCurrentTheme] = useState<PuckTheme>(() => {
		// Try to load from localStorage first
		const savedTheme = getTheme();
		if (savedTheme !== defaultPuckTheme) {
			return savedTheme;
		}
		// Fall back to options theme or default
		if (options.theme?.theme) {
			return mergeThemes(defaultPuckTheme, options.theme.theme);
		}
		return defaultPuckTheme;
	});

	const config: Config = useMemo(
		() => createPuckConfig(options) as unknown as Config,
		[options]
	);

	const themeStyles = useMemo(() => applyTheme(currentTheme), [currentTheme]);
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
