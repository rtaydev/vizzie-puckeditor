export type PuckTheme = {
	colors: {
		primary: string;
		secondary: string;
		background: string;
		backgroundSecondary: string;
		backgroundTertiary: string;
		text: string;
		textSecondary: string;
		textTertiary: string;
		border: string;
		borderSecondary: string;
		borderTertiary: string;
		buttonPrimary: string;
		buttonPrimaryText: string;
		buttonSecondary: string;
		buttonSecondaryText: string;
		inputBackground: string;
		inputBorder: string;
		inputText: string;
		previewBackground: string;
		headerBackground: string;
		headerBorder: string;
	};
	typography: {
		fontSans: string;
		fontMono: string;
		fontSizeBase: string;
		fontSizeSmall: string;
		fontSizeLarge: string;
		fontWeightNormal: string;
		fontWeightMedium: string;
		fontWeightBold: string;
	};
	spacing: {
		xs: string;
		sm: string;
		md: string;
		lg: string;
		xl: string;
	};
	borderRadius: {
		sm: string;
		md: string;
		lg: string;
	};
	shadows: {
		sm: string;
		md: string;
		lg: string;
	};
};

export type PuckThemeOptions = {
	theme?: PuckTheme;
	className?: string;
	customCss?: string;
};

export type PuckOptions = {
	sidebarPosition?: 'left' | 'right' | 'top' | 'bottom';
	enableLocalStorage?: boolean;
	localStorageKey?: string;
	theme?: PuckThemeOptions;
};

export type PuckEditorProps = {
	data: any;
	onPublish: (data: any) => void | Promise<void>;
	options?: PuckOptions;
};

export type PuckRendererProps = {
	data: any;
	options?: PuckOptions;
};
