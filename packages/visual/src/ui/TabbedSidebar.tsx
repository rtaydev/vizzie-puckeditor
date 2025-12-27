'use client';

import { useState, useEffect, useRef } from 'react';
import { Puck, createUsePuck } from '@measured/puck';
import { PuckOptions } from '../config/types';

const usePuck = createUsePuck();

type Tab = 'components' | 'fields' | 'outline';

const tabs: { id: Tab; label: string }[] = [
	{ id: 'components', label: 'Components' },
	{ id: 'fields', label: 'Fields' },
	{ id: 'outline', label: 'Outline' },
];

export const TabbedSidebar = ({ options }: { options: PuckOptions }) => {
	const [activeTab, setActiveTab] = useState<Tab>('components');
	const selectedItem = usePuck((s) => s.selectedItem);
	const previousSelectedItem = useRef<any>(selectedItem);
	const [hasManuallyChangedTab, setHasManuallyChangedTab] = useState(false);

	// Switch to fields tab when a block is selected unless the user has manually changed the tab
	useEffect(() => {
		if (previousSelectedItem.current !== selectedItem) {
			previousSelectedItem.current = selectedItem;
			setHasManuallyChangedTab(false);
		}
		if (selectedItem && activeTab !== 'fields' && !hasManuallyChangedTab) {
			setActiveTab('fields');
			setHasManuallyChangedTab(true);
		}
	}, [selectedItem, activeTab, hasManuallyChangedTab]);

	const handleTabChange = (tab: Tab) => {
		setActiveTab(tab);
		setHasManuallyChangedTab(true);
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				background: '#ffffff',
				...(options.sidebarPosition === 'left'
					? {
							borderRight: '1px solid #e5e7eb',
					  }
					: {
							borderLeft: '1px solid #e5e7eb',
					  }),
			}}
		>
			<div
				style={{
					display: 'flex',
					borderBottom: '1px solid #e5e7eb',
					background: '#f9fafb',
				}}
			>
				{tabs.map((tab) => (
					<button
						key={tab.id}
						type='button'
						onClick={() => handleTabChange(tab.id)}
						style={{
							flex: 1,
							padding: '12px 16px',
							background: 'transparent',
							border: 'none',
							borderBottom:
								activeTab === tab.id
									? '2px solid #3b82f6'
									: '2px solid transparent',
							cursor: 'pointer',
							fontSize: '14px',
							fontWeight: activeTab === tab.id ? '600' : '500',
							color: activeTab === tab.id ? '#3b82f6' : '#6b7280',
							transition: 'all 0.2s',
						}}
					>
						{tab.label}
					</button>
				))}
			</div>
			<div
				style={{
					flex: 1,
					overflowY: 'auto',
					margin: '8px',
				}}
			>
				{activeTab === 'components' && <Puck.Components />}
				{activeTab === 'fields' && <Puck.Fields />}
				{activeTab === 'outline' && <Puck.Outline />}
			</div>
		</div>
	);
};
