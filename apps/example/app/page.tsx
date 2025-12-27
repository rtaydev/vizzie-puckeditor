'use client';

import {
	PuckEditor,
	defaultPuckTheme,
	mergeThemes,
	type PuckTheme,
} from '@puck-editor/visual';
import { useState, useEffect, useMemo } from 'react';

export const dynamic = 'force-dynamic';

const STORAGE_KEY = 'puck-editor-data';
const DEFAULT_DATA = { content: [], root: { props: {} } };

export default function Home() {
	const [data, setData] = useState<any>(DEFAULT_DATA);
	const [isLoaded, setIsLoaded] = useState(false);

	// Load data from localStorage on mount
	useEffect(() => {
		if (typeof window !== 'undefined') {
			try {
				const savedData = localStorage.getItem(STORAGE_KEY);
				if (savedData) {
					const parsedData = JSON.parse(savedData);
					setData(parsedData);
				}
			} catch (error) {
				console.error('Error loading data from localStorage:', error);
			} finally {
				setIsLoaded(true);
			}
		}
	}, []);

	// handlePublish is called when:
	// 1. User clicks the custom "Save" button (via handleSave -> handlePublish)
	// 2. Puck's built-in publish action (via onPublish prop)
	const handlePublish = async (next: any) => {
		setData(next);
	};

	// Example: Custom theme extending the default theme
	const customTheme = useMemo(
		() =>
			mergeThemes(defaultPuckTheme, {
				colors: {
					primary: '#6366f1',
					buttonPrimary: '#6366f1',
				},
			} as Partial<PuckTheme>),
		[]
	);

	if (!isLoaded) {
		return (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100vh',
				}}
			>
				Loading...
			</div>
		);
	}

	return (
		<div className='h-screen'>
			<PuckEditor
				data={data}
				onPublish={handlePublish}
				options={{
					sidebarPosition: 'left',
					enableLocalStorage: true,
					localStorageKey: STORAGE_KEY,
					theme: {
						theme: customTheme,
						className: 'my-custom-puck-editor',
					},
				}}
			/>
		</div>
	);
}
