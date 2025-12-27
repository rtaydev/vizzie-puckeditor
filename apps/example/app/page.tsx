'use client';

import { PuckEditor } from '@puck-editor/visual';
import { useState, useEffect } from 'react';

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

	// Save data to localStorage when it changes
	useEffect(() => {
		if (isLoaded && typeof window !== 'undefined') {
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
			} catch (error) {
				console.error('Error saving data to localStorage:', error);
			}
		}
	}, [data, isLoaded]);

	const handlePublish = async (next: any) => {
		setData(next);
	};

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
		<div>
			<PuckEditor
				data={data}
				onPublish={handlePublish}
				options={{
					sidebarPosition: 'left',
					enableLocalStorage: true,
					localStorageKey: STORAGE_KEY,
				}}
			/>
		</div>
	);
}
