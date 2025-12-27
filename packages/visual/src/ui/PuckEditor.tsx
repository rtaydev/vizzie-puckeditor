'use client';

import type { ReactElement } from 'react';
import { Config, Puck } from '@measured/puck';
import { createPuckConfig } from '../config/createPuckConfig';
import { PuckEditorProps } from '../config/types';
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
import { ArrowLeft, File, Save } from 'lucide-react';

// Constants
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

	// Memoize config to prevent recreation on every render
	const config: Config = useMemo(
		() => createPuckConfig(options) as unknown as Config,
		[options]
	);

	const isInternalUpdateRef = useRef(false);
	// Store latest data in ref to avoid rerenders during contentEditable editing
	const latestDataRef = useRef(data);

	const enableLocalStorage = options.enableLocalStorage ?? false;
	const localStorageKey = options.localStorageKey || DEFAULT_LOCAL_STORAGE_KEY;

	// Sync currentData when external data prop changes (but not from internal updates)
	useEffect(() => {
		if (!isInternalUpdateRef.current) {
			setCurrentData(data);
			setPreviewData(data);
			latestDataRef.current = data;
		}
		// Reset flag after a microtask to allow state updates to complete
		Promise.resolve().then(() => {
			isInternalUpdateRef.current = false;
		});
	}, [data]);

	const handleChange = useCallback((newData: any) => {
		// Store in ref to avoid rerenders - this allows contentEditable to work smoothly
		latestDataRef.current = newData;
		// Only update state on specific actions or when needed
		// This prevents rerenders during typing
	}, []);

	const handleAction = useCallback((action: { type: string; data?: any }) => {
		// onAction fires on specific actions (like contentEditable blur)
		// Update state when actions occur, using the latest data from ref
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
			// Mark as internal update to prevent sync loop
			isInternalUpdateRef.current = true;
			setCurrentData(next);
			setPreviewData(next);
			await onPublish(next);
		},
		[onPublish]
	);

	// Shared function to save data (used by both preview and save)
	const saveData = useCallback(
		async (dataToSave: any) => {
			// Update state with latest data
			setCurrentData(dataToSave);

			// Save to localStorage if enabled
			if (enableLocalStorage && typeof window !== 'undefined') {
				try {
					localStorage.setItem(localStorageKey, JSON.stringify(dataToSave));
				} catch (error) {
					console.error('Error saving data to localStorage:', error);
				}
			}

			// Call handlePublish to update parent and trigger onPublish
			await handlePublish(dataToSave);
		},
		[handlePublish, enableLocalStorage, localStorageKey]
	);

	const handlePreview = useCallback(async () => {
		// Use latest data from ref to ensure we save all contentEditable changes
		const dataToSave = latestDataRef.current;
		await saveData(dataToSave);
		setPreviewData(dataToSave);
		setShowPreview(true);
	}, [saveData]);

	const handleSave = useCallback(async () => {
		// Use latest data from ref to ensure we save all contentEditable changes
		const dataToSave = latestDataRef.current;
		await saveData(dataToSave);
	}, [saveData]);

	// Memoize style objects to prevent recreation on every render
	const headerStyle = useMemo(
		() => ({
			display: 'flex' as const,
			alignItems: 'center' as const,
			justifyContent: 'flex-end' as const,
			gap: 16,
			padding: '12px 16px',
			borderBottom: '1px solid #e5e7eb',
			background: '#ffffff',
		}),
		[]
	);

	const previewHeaderStyle = useMemo(
		() => ({
			display: 'flex' as const,
			alignItems: 'center' as const,
			justifyContent: 'space-between' as const,
			padding: '12px 16px',
			borderBottom: '1px solid #e5e7eb',
			background: '#ffffff',
		}),
		[]
	);

	const buttonBaseStyle = useMemo(
		() => ({
			display: 'flex' as const,
			alignItems: 'center' as const,
			gap: 8,
			fontSize: 12,
			padding: '4px 8px',
			borderRadius: 4,
			border: 'none' as const,
			cursor: 'pointer' as const,
		}),
		[]
	);

	const previewButtonStyle = useMemo(
		() => ({
			...buttonBaseStyle,
			color: '#000000',
			background: '#f0f0f0',
		}),
		[buttonBaseStyle]
	);

	const saveButtonStyle = useMemo(
		() => ({
			...buttonBaseStyle,
			color: 'white',
			background: 'blueviolet',
		}),
		[buttonBaseStyle]
	);

	const editorGridStyle = useMemo(
		() => ({
			display: 'grid' as const,
			gridTemplateColumns: '1fr 320px',
			gridGap: 16,
		}),
		[]
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
		}),
		[config, currentData, handleChange, handleAction, handlePublish]
	);

	return (
		<>
			{!showPreview ? (
				<Puck {...puckProps}>
					<header style={headerStyle}>
						<div></div>
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
						<Puck.Preview />
						<TabbedSidebar />
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
		</>
	);
};
