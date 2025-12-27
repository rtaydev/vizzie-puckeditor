'use client';

import type { ReactElement } from 'react';
import { Config, Puck } from '@measured/puck';
import { createPuckConfig } from '../config/createPuckConfig';
import { PuckEditorProps } from '../config/types';
import { TabbedSidebar } from './TabbedSidebar';
import { useState, useEffect } from 'react';
import { PuckRenderer } from '../render/PuckRenderer';
import { ArrowLeft, File, Save } from 'lucide-react';

export const PuckEditor = ({
	data,
	onPublish,
	options = {},
}: PuckEditorProps): ReactElement => {
	const [showPreview, setShowPreview] = useState(false);
	const [currentData, setCurrentData] = useState(data);
	const [previewData, setPreviewData] = useState(data);
	const config: Config = createPuckConfig(options) as unknown as Config;

	const enableLocalStorage = options.enableLocalStorage ?? false;
	const localStorageKey = options.localStorageKey || 'puck-editor-data';

	// Load data from localStorage on mount
	useEffect(() => {
		if (enableLocalStorage && typeof window !== 'undefined') {
			try {
				const savedData = localStorage.getItem(localStorageKey);
				if (savedData) {
					const parsedData = JSON.parse(savedData);
					setCurrentData(parsedData);
					setPreviewData(parsedData);
				}
			} catch (error) {
				console.error('Error loading data from localStorage:', error);
			}
		}
	}, [enableLocalStorage, localStorageKey]);

	// Save data to localStorage when it changes
	useEffect(() => {
		if (enableLocalStorage && typeof window !== 'undefined') {
			try {
				localStorage.setItem(localStorageKey, JSON.stringify(currentData));
			} catch (error) {
				console.error('Error saving data to localStorage:', error);
			}
		}
	}, [currentData, enableLocalStorage, localStorageKey]);

	const handlePreview = async () => {
		// Save current data before previewing
		await onPublish(currentData);
		setPreviewData(currentData);
		setShowPreview(true);
	};

	const handleSave = async () => {
		await onPublish(currentData);
	};

	return (
		<>
			{!showPreview ? (
				<Puck
					iframe={{
						enabled: false,
					}}
					config={config}
					data={currentData}
					onChange={(newData) => setCurrentData(newData)}
					onPublish={onPublish as (next: any) => Promise<any>}
					dnd={{
						disableAutoScroll: true,
					}}
				>
					<header
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-end',
							gap: 16,
							padding: '12px 16px',
							borderBottom: '1px solid #e5e7eb',
							background: '#ffffff',
						}}
					>
						<div></div>
						<button
							type='button'
							onClick={handlePreview}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 8,
								fontSize: 12,
								color: '#000000',
								background: '#f0f0f0',
								padding: '4px 8px',
								borderRadius: 4,
								border: 'none',
								cursor: 'pointer',
							}}
						>
							<File size={14} />
							Preview
						</button>
						<button
							type='button'
							onClick={handleSave}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 8,
								fontSize: 12,
								color: 'white',
								background: 'blueviolet',
								padding: '4px 8px',
								borderRadius: 4,
								border: 'none',
								cursor: 'pointer',
							}}
						>
							<Save size={14} />
							Save
						</button>
					</header>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: '1fr 320px',
							gridGap: 16,
						}}
					>
						{/* Render the drag-and-drop preview */}
						<Puck.Preview />

						{/* Render the component list */}
						<TabbedSidebar />
					</div>
				</Puck>
			) : (
				<div>
					<header
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							padding: '12px 16px',
							borderBottom: '1px solid #e5e7eb',
							background: '#ffffff',
						}}
					>
						<h2>Preview</h2>
						<button
							type='button'
							onClick={() => setShowPreview(false)}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 8,
								fontSize: 12,
								color: 'white',
								background: 'blueviolet',
								padding: '4px 8px',
								borderRadius: 4,
								border: 'none',
								cursor: 'pointer',
							}}
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
