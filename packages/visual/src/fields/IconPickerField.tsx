'use client';

import { useState, useRef, useEffect } from 'react';
import type { CustomFieldRender } from '@measured/puck';
import * as LucideIcons from 'lucide-react';
import { Search, X } from 'lucide-react';

type IconPickerFieldProps = Parameters<CustomFieldRender<string>>[0];

// Common lucide-react icons to display in the picker
const COMMON_ICONS = [
	'Heart',
	'Star',
	'Home',
	'User',
	'Mail',
	'Phone',
	'Search',
	'Menu',
	'X',
	'Check',
	'Plus',
	'Minus',
	'ArrowRight',
	'ArrowLeft',
	'ArrowUp',
	'ArrowDown',
	'ChevronRight',
	'ChevronLeft',
	'ChevronUp',
	'ChevronDown',
	'Download',
	'Upload',
	'Edit',
	'Trash',
	'Settings',
	'Bell',
	'Camera',
	'Image',
	'File',
	'Folder',
	'Link',
	'Share',
	'Copy',
	'Lock',
	'Unlock',
	'Eye',
	'EyeOff',
	'Calendar',
	'Clock',
	'MapPin',
	'Globe',
	'Github',
	'Twitter',
	'Facebook',
	'Instagram',
	'Linkedin',
	'Youtube',
	'Play',
	'Pause',
	'Volume2',
	'VolumeX',
	'Music',
	'Video',
	'Book',
	'Bookmark',
	'Tag',
	'Filter',
	'Grid',
	'List',
	'Layout',
	'Zap',
	'Battery',
	'Wifi',
	'Bluetooth',
	'Cloud',
	'Database',
	'Server',
	'Code',
	'Terminal',
	'Package',
	'Box',
	'Gift',
	'ShoppingCart',
	'CreditCard',
	'DollarSign',
	'Percent',
	'BarChart',
	'LineChart',
	'PieChart',
	'Target',
	'Flag',
	'Shield',
	'Key',
	'MessageSquare',
	'MessageCircle',
	'Users',
	'UserPlus',
	'UserMinus',
	'ThumbsUp',
	'ThumbsDown',
	'Smile',
	'Frown',
	'AlertCircle',
	'AlertTriangle',
	'Info',
	'HelpCircle',
	'CheckCircle',
	'XCircle',
	'Loader',
	'RefreshCw',
	'RotateCw',
	'Move',
	'Maximize',
	'Minimize',
	'Maximize2',
	'Minimize2',
] as const;

export const IconPickerField: CustomFieldRender<string> = (props) => {
	const { value = '', onChange, field } = props;
	const [isOpen, setIsOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const containerRef = useRef<HTMLDivElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Get the icon component from lucide-react
	const getIconComponent = (iconName: string) => {
		const IconComponent = (LucideIcons as any)[iconName];
		return IconComponent || null;
	};

	// Filter icons based on search query and remove duplicates
	const filteredIcons = Array.from(
		new Set(
			COMMON_ICONS.filter((iconName) =>
				iconName.toLowerCase().includes(searchQuery.toLowerCase())
			)
		)
	);

	// Get current icon component
	const CurrentIcon = value ? getIconComponent(value) : null;

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node) &&
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
				setSearchQuery('');
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}
	}, [isOpen]);

	// Calculate dropdown position to keep it on screen
	useEffect(() => {
		if (isOpen && containerRef.current && dropdownRef.current) {
			const containerRect = containerRef.current.getBoundingClientRect();
			const dropdownHeight = 400; // Approximate dropdown height
			const padding = 8;

			let top = containerRect.bottom + padding;
			let left = containerRect.left;

			// Check if dropdown would go off bottom of screen
			if (top + dropdownHeight > window.innerHeight) {
				top = containerRect.top - dropdownHeight - padding;
				if (top < padding) {
					top = window.innerHeight - dropdownHeight - padding;
				}
			}

			// Check if dropdown would go off right of screen
			const dropdownWidth = 320; // Approximate dropdown width
			if (left + dropdownWidth > window.innerWidth - padding) {
				left = window.innerWidth - dropdownWidth - padding;
			}

			// Check if dropdown would go off left of screen
			if (left < padding) {
				left = padding;
			}

			// Ensure top is not negative
			if (top < padding) {
				top = padding;
			}

			dropdownRef.current.style.top = `${top}px`;
			dropdownRef.current.style.left = `${left}px`;
		}
	}, [isOpen]);

	const handleIconSelect = (iconName: string) => {
		onChange(iconName);
		setIsOpen(false);
		setSearchQuery('');
	};

	return (
		<div>
			<label
				style={{
					display: 'block',
					marginBottom: '8px',
					fontSize: '14px',
					fontWeight: '500',
					color: '#111827',
				}}
			>
				{field.label || 'Icon'}
			</label>
			<div style={{ position: 'relative' }} ref={containerRef}>
				<button
					type='button'
					onClick={() => setIsOpen(!isOpen)}
					style={{
						width: '100%',
						height: '40px',
						border: '2px solid #e5e7eb',
						borderRadius: '6px',
						cursor: 'pointer',
						padding: '0 12px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						background: '#ffffff',
						gap: '8px',
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
						{CurrentIcon ? (
							<CurrentIcon size={20} style={{ color: '#6b7280' }} />
						) : (
							<div
								style={{
									width: '20px',
									height: '20px',
									border: '1px dashed #d1d5db',
									borderRadius: '4px',
								}}
							/>
						)}
						<span
							style={{
								fontSize: '14px',
								color: value ? '#111827' : '#9ca3af',
							}}
						>
							{value || 'Select an icon'}
						</span>
					</div>
					{isOpen ? (
						<X size={16} style={{ color: '#6b7280' }} />
					) : (
						<Search size={16} style={{ color: '#6b7280' }} />
					)}
				</button>

				{isOpen && (
					<div
						ref={dropdownRef}
						style={{
							position: 'fixed',
							zIndex: 1000,
							background: '#ffffff',
							border: '1px solid #e5e7eb',
							borderRadius: '8px',
							boxShadow:
								'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
							width: '320px',
							maxHeight: '400px',
							display: 'flex',
							flexDirection: 'column',
						}}
						onClick={(e) => e.stopPropagation()}
					>
						{/* Search input */}
						<div
							style={{
								padding: '12px',
								borderBottom: '1px solid #e5e7eb',
							}}
						>
							<div
								style={{
									position: 'relative',
									display: 'flex',
									alignItems: 'center',
								}}
							>
								<Search
									size={16}
									style={{
										position: 'absolute',
										left: '12px',
										color: '#9ca3af',
									}}
								/>
								<input
									type='text'
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									placeholder='Search icons...'
									style={{
										width: '100%',
										padding: '8px 12px 8px 36px',
										border: '1px solid #d1d5db',
										borderRadius: '6px',
										fontSize: '14px',
										outline: 'none',
									}}
									autoFocus
								/>
							</div>
						</div>

						{/* Icons grid */}
						<div
							style={{
								padding: '12px',
								overflowY: 'auto',
								maxHeight: '340px',
							}}
						>
							{filteredIcons.length > 0 ? (
								<div
									style={{
										display: 'grid',
										gridTemplateColumns: 'repeat(6, 1fr)',
										gap: '8px',
									}}
								>
									{filteredIcons.map((iconName) => {
										const IconComponent = getIconComponent(iconName);
										if (!IconComponent) return null;

										const isSelected = value === iconName;

										return (
											<button
												key={iconName}
												type='button'
												onClick={() => handleIconSelect(iconName)}
												style={{
													width: '100%',
													aspectRatio: '1',
													border: isSelected
														? '2px solid #3b82f6'
														: '1px solid #e5e7eb',
													borderRadius: '6px',
													background: isSelected
														? '#eff6ff'
														: '#ffffff',
													cursor: 'pointer',
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													transition: 'all 0.2s',
												}}
												onMouseEnter={(e) => {
													if (!isSelected) {
														e.currentTarget.style.background = '#f9fafb';
														e.currentTarget.style.borderColor = '#d1d5db';
													}
												}}
												onMouseLeave={(e) => {
													if (!isSelected) {
														e.currentTarget.style.background = '#ffffff';
														e.currentTarget.style.borderColor = '#e5e7eb';
													}
												}}
												title={iconName}
											>
												<IconComponent
													size={20}
													style={{
														color: isSelected ? '#3b82f6' : '#6b7280',
													}}
												/>
											</button>
										);
									})}
								</div>
							) : (
								<div
									style={{
										padding: '24px',
										textAlign: 'center',
										color: '#9ca3af',
										fontSize: '14px',
									}}
								>
									No icons found
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

