'use client';

import { createContext, useContext, ReactNode } from 'react';

interface EditorModeProviderProps {
	children: ReactNode;
	isEditor?: boolean;
}

const EditorModeContext = createContext<boolean | null>(null);

export const EditorModeProvider = ({
	children,
	isEditor = false,
}: EditorModeProviderProps) => {
	return (
		<EditorModeContext.Provider value={isEditor}>
			{children}
		</EditorModeContext.Provider>
	);
};

export const useIsEditorMode = (): boolean => {
	const context = useContext(EditorModeContext);

	if (context === null) {
		throw new Error(
			'useIsEditorMode must be used within an EditorModeProvider'
		);
	}

	return context;
};
