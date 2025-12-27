export type PuckOptions = {
	sidebarPosition?: 'left' | 'right' | 'top' | 'bottom';
	enableLocalStorage?: boolean;
	localStorageKey?: string;
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
