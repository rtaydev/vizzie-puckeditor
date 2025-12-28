'use client';

import type { ReactElement } from 'react';
import { Config, Puck } from '@measured/puck';
import { createPuckConfig } from '../config/createPuckConfig';
import { PuckEditorProps, PuckTheme } from '../config/types';
import { TabbedSidebar } from './TabbedSidebar';
import {
	useState,
	useCallback,
	useEffect,
	useMemo,
	startTransition,
	useRef,
} from 'react';
import { PuckRenderer } from '../render/PuckRenderer';
import { ArrowLeft, File, Palette, Save } from 'lucide-react';
import GridActionBar from '../activebars/grid';
import { defaultPuckTheme } from '../config/defaultTheme';
import { applyTheme, mergeThemes, setTheme, getTheme } from '../utils/theme';
import { ThemeEditor } from './ThemeEditor';

const DEFAULT_LOCAL_STORAGE_KEY = 'puck-editor-data';
const ACTION_TYPE_SET_DATA = 'setData';

export const PuckEditor = ({
	data,
	onPublish,
	options = {},
}: PuckEditorProps): ReactElement => {
	const [showPreview, setShowPreview] = useState(false);
	const [currentData, setCurrentData] = useState(data);
	const [previewData, setPreviewData] = useState(data);
	const [showThemeEditor, setShowThemeEditor] = useState(false);
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

	const isInternalUpdateRef = useRef(false);
	const latestDataRef = useRef(data);

	const enableLocalStorage = options.enableLocalStorage ?? false;
	const localStorageKey = options.localStorageKey || DEFAULT_LOCAL_STORAGE_KEY;

	const themeStyles = useMemo(() => applyTheme(currentTheme), [currentTheme]);
	const themeClassName =
		`${options.theme?.className} puck-editor` || 'puck-editor';
	const customCss = options.theme?.customCss;

	useEffect(() => {
		if (!isInternalUpdateRef.current) {
			setCurrentData(data);
			setPreviewData(data);
			latestDataRef.current = data;
		}
		Promise.resolve().then(() => {
			isInternalUpdateRef.current = false;
		});
	}, [data]);

	const handleChange = useCallback((newData: any) => {
		latestDataRef.current = newData;
	}, []);

	const handleAction = useCallback((action: { type: string; data?: any }) => {
		if (action.type === ACTION_TYPE_SET_DATA && action.data) {
			isInternalUpdateRef.current = true;
			latestDataRef.current = action.data;
			startTransition(() => {
				setCurrentData(action.data);
			});
		}
	}, []);

	const handlePublish = useCallback(
		async (next: any) => {
			isInternalUpdateRef.current = true;
			setCurrentData(next);
			setPreviewData(next);
			await onPublish(next);
		},
		[onPublish]
	);

	const saveData = useCallback(
		async (dataToSave: any) => {
			setCurrentData(dataToSave);

			if (enableLocalStorage && typeof window !== 'undefined') {
				try {
					localStorage.setItem(localStorageKey, JSON.stringify(dataToSave));
				} catch (error) {
					console.error('Error saving data to localStorage:', error);
				}
			}

			await handlePublish(dataToSave);
		},
		[handlePublish, enableLocalStorage, localStorageKey]
	);

	const handlePreview = useCallback(async () => {
		const dataToSave = latestDataRef.current;
		await saveData(dataToSave);
		setPreviewData(dataToSave);
		setShowPreview(true);
	}, [saveData]);

	const handleSave = useCallback(async () => {
		const dataToSave = latestDataRef.current;
		await saveData(dataToSave);
	}, [saveData]);

	const handleSetTheme = useCallback((newTheme: PuckTheme) => {
		setCurrentTheme(newTheme);
		setTheme(newTheme);
	}, []);

	const headerStyle = useMemo(
		() => ({
			display: 'flex' as const,
			alignItems: 'center' as const,
			justifyContent: 'flex-end' as const,
			gap: 'var(--puck-spacing-md)',
			padding: '12px var(--puck-spacing-md)',
			borderBottom: '1px solid var(--puck-color-header-border)',
			background: 'var(--puck-color-header-background)',
		}),
		[]
	);

	const previewHeaderStyle = useMemo(
		() => ({
			display: 'flex' as const,
			alignItems: 'center' as const,
			justifyContent: 'space-between' as const,
			padding: '12px var(--puck-spacing-md)',
			borderBottom: '1px solid var(--puck-color-header-border)',
			background: 'var(--puck-color-header-background)',
		}),
		[]
	);

	const buttonBaseStyle = useMemo(
		() => ({
			display: 'flex' as const,
			alignItems: 'center' as const,
			gap: 'var(--puck-spacing-sm)',
			fontSize: 'var(--puck-font-size-small)',
			padding: 'var(--puck-spacing-xs) var(--puck-spacing-sm)',
			borderRadius: 'var(--puck-border-radius-sm)',
			border: 'none' as const,
			cursor: 'pointer' as const,
		}),
		[]
	);

	const previewButtonStyle = useMemo(
		() => ({
			...buttonBaseStyle,
			color: 'var(--puck-color-button-secondary-text)',
			background: 'var(--puck-color-button-secondary)',
		}),
		[buttonBaseStyle]
	);

	const saveButtonStyle = useMemo(
		() => ({
			...buttonBaseStyle,
			color: 'var(--puck-color-button-primary-text)',
			background: 'var(--puck-color-button-primary)',
		}),
		[buttonBaseStyle]
	);

	const editorGridStyle = useMemo(
		() => ({
			display: 'grid' as const,
			gridTemplateColumns:
				options.sidebarPosition === 'left' ? '320px 1fr' : '1fr 320px',
			gridGap: 'var(--puck-spacing-md)',
		}),
		[options.sidebarPosition]
	);

	const puckProps = useMemo(
		() => ({
			iframe: { enabled: false } as const,
			config,
			data: currentData,
			onChange: handleChange,
			onAction: handleAction,
			onPublish: handlePublish,
			dnd: { disableAutoScroll: true } as const,
			overrides: {
				actionBar: GridActionBar,
			},
		}),
		[config, currentData, handleChange, handleAction, handlePublish]
	);

	const rootStyle = useMemo(
		() => ({
			...themeStyles,
		}),
		[themeStyles]
	);

	return (
		<div style={rootStyle} className={themeClassName}>
			{customCss && (
				<style
					dangerouslySetInnerHTML={{
						__html: customCss,
					}}
				/>
			)}
			{!showPreview ? (
				<Puck {...puckProps}>
					<header style={headerStyle}>
						<div></div>
						<button
							type='button'
							onClick={() => setShowThemeEditor(true)}
							style={saveButtonStyle}
						>
							<Palette size={14} />
							Theme
						</button>
						<button
							type='button'
							onClick={handlePreview}
							style={previewButtonStyle}
						>
							<File size={14} />
							Preview
						</button>
						<button type='button' onClick={handleSave} style={saveButtonStyle}>
							<Save size={14} />
							Save
						</button>
					</header>
					<div style={editorGridStyle}>
						{options.sidebarPosition === 'left' ? (
							<TabbedSidebar options={options} />
						) : null}
						<Puck.Preview />
						{options.sidebarPosition === 'right' ? (
							<TabbedSidebar options={options} />
						) : null}
					</div>
				</Puck>
			) : (
				<div>
					<header style={previewHeaderStyle}>
						<h2>Preview</h2>
						<button
							type='button'
							onClick={() => setShowPreview(false)}
							style={saveButtonStyle}
						>
							<ArrowLeft size={14} />
							Back to Editor
						</button>
					</header>
					<PuckRenderer data={previewData} options={options} />
				</div>
			)}
			<ThemeEditor
				showThemeEditor={showThemeEditor}
				setShowThemeEditor={setShowThemeEditor}
				theme={currentTheme}
				setTheme={handleSetTheme}
			/>
		</div>
	);
};
