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
import GridActionBar from '../activebars/grid';

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

	const config: Config = useMemo(
		() => createPuckConfig(options) as unknown as Config,
		[options]
	);

	const isInternalUpdateRef = useRef(false);
	const latestDataRef = useRef(data);

	const enableLocalStorage = options.enableLocalStorage ?? false;
	const localStorageKey = options.localStorageKey || DEFAULT_LOCAL_STORAGE_KEY;

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
			overrides: {
				actionBar: GridActionBar,
			},
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
