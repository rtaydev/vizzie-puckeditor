'use client';

import { useState, useRef, useEffect } from 'react';
import type { CustomFieldRender } from '@measured/puck';
import { Upload } from 'lucide-react';

export const ImageUploadField: CustomFieldRender<string | undefined> = (
	props
) => {
	const { value, onChange, field } = props;
	const [uploading, setUploading] = useState(false);
	const [preview, setPreview] = useState<string | null>(value || null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setPreview(value || null);
	}, [value]);

	const handleFileSelect = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (!file) return;

		// Validate file type
		if (!file.type.startsWith('image/')) {
			alert('Please select an image file');
			return;
		}

		setUploading(true);

		try {
			// Create a preview URL
			const previewUrl = URL.createObjectURL(file);
			setPreview(previewUrl);

			// Convert to base64 for storage (or upload to your server)
			const reader = new FileReader();
			reader.onloadend = () => {
				const base64String = reader.result as string;
				onChange(base64String);
				setUploading(false);
			};
			reader.onerror = () => {
				alert('Error reading file');
				setUploading(false);
			};
			reader.readAsDataURL(file);
		} catch (error) {
			console.error('Error uploading image:', error);
			alert('Error uploading image');
			setUploading(false);
		}
	};

	const handleRemove = () => {
		setPreview(null);
		onChange('');
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
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
				{field.label || 'Image Upload'}
			</label>

			{preview ? (
				<div
					style={{
						position: 'relative',
						marginBottom: '8px',
						border: '1px solid #e5e7eb',
						borderRadius: '8px',
						overflow: 'hidden',
					}}
				>
					<img
						src={preview}
						alt='Preview'
						style={{
							width: '100%',
							height: 'auto',
							display: 'block',
						}}
					/>
					<button
						type='button'
						onClick={handleRemove}
						style={{
							position: 'absolute',
							top: '8px',
							right: '8px',
							background: 'rgba(0, 0, 0, 0.7)',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							padding: '4px 8px',
							cursor: 'pointer',
							fontSize: '12px',
						}}
					>
						Remove
					</button>
				</div>
			) : (
				<div
					style={{
						border: '2px dashed #d1d5db',
						borderRadius: '8px',
						padding: '24px',
						textAlign: 'center',
						background: '#f9fafb',
						cursor: 'pointer',
						transition: 'all 0.2s',
					}}
					onClick={() => fileInputRef.current?.click()}
					onMouseEnter={(e) => {
						e.currentTarget.style.borderColor = '#9ca3af';
						e.currentTarget.style.background = '#f3f4f6';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.borderColor = '#d1d5db';
						e.currentTarget.style.background = '#f9fafb';
					}}
				>
					<Upload size={32} style={{ color: '#6b7280', marginBottom: '8px' }} />
					<div style={{ color: '#6b7280', fontSize: '14px' }}>
						{uploading ? 'Uploading...' : 'Click to upload image'}
					</div>
					<div style={{ color: '#9ca3af', fontSize: '12px', marginTop: '4px' }}>
						PNG, JPG, GIF up to 10MB
					</div>
				</div>
			)}

			<input
				ref={fileInputRef}
				type='file'
				accept='image/*'
				onChange={handleFileSelect}
				style={{ display: 'none' }}
				disabled={uploading}
			/>

			<input
				type='text'
				value={value || ''}
				onChange={(e) => onChange(e.target.value)}
				placeholder='Or enter image URL'
				style={{
					width: '100%',
					padding: '8px 12px',
					border: '1px solid #d1d5db',
					borderRadius: '6px',
					fontSize: '14px',
					marginTop: '8px',
				}}
			/>
		</div>
	);
};
