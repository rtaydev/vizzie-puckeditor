'use client';

import { useState } from 'react';
import { Puck } from '@measured/puck';

type Tab = 'components' | 'fields' | 'outline';

const tabs: { id: Tab; label: string }[] = [
	{ id: 'components', label: 'Components' },
	{ id: 'fields', label: 'Fields' },
	{ id: 'outline', label: 'Outline' },
];

export const TabbedSidebar = () => {
	const [activeTab, setActiveTab] = useState<Tab>('components');

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				background: '#ffffff',
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
						onClick={() => setActiveTab(tab.id)}
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
				}}
			>
				{activeTab === 'components' && <Puck.Components />}
				{activeTab === 'fields' && <Puck.Fields />}
				{activeTab === 'outline' && <Puck.Outline />}
			</div>
		</div>
	);
};
