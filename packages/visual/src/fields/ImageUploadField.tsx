'use client';

import { useState, useRef, useEffect } from 'react';
import type { CustomFieldRender } from '@measured/puck';
import { Upload } from 'lucide-react';

const MAX_BYTES = 10 * 1024 * 1024; // 10MB

// IMPORTANT: we intentionally do NOT allow SVG via data: to reduce XSS risk.
// If you need SVG, treat it as untrusted content and serve it with correct headers from your own backend.
const SAFE_DATA_IMAGE_PREFIXES = [
	'data:image/png;base64,',
	'data:image/jpeg;base64,',
	'data:image/jpg;base64,',
	'data:image/gif;base64,',
	'data:image/webp;base64,',
	'data:image/bmp;base64,',
	'data:image/avif;base64,',
] as const;

function sanitizeImageSrc(input: string | undefined | null): string | null {
	if (!input) return null;

	const trimmed = input.trim();
	if (!trimmed) return null;

	// Allow safe data URLs (base64 only) for a strict set of image mime types (NO SVG).
	const lower = trimmed.toLowerCase();
	if (SAFE_DATA_IMAGE_PREFIXES.some((p) => lower.startsWith(p))) return trimmed;

	// Allow blob: created via URL.createObjectURL
	if (lower.startsWith('blob:')) return trimmed;

	// For normal URLs, require http(s) and a valid absolute URL.
	// This also blocks javascript:, file:, vbscript:, etc.
	try {
		const url = new URL(trimmed);
		if (url.protocol === 'http:' || url.protocol === 'https:') return url.toString();
		return null;
	} catch {
		return null;
	}
}

export const ImageUploadField: CustomFieldRender<string | undefined> = (props) => {
	const { value, onChange, field } = props;

	const [uploading, setUploading] = useState(false);
	const [preview, setPreview] = useState<string | null>(() => sanitizeImageSrc(value) ?? null);

	const fileInputRef = useRef<HTMLInputElement>(null);

	// Track blob preview so we can revoke it and avoid leaks.
	const lastBlobPreviewRef = useRef<string | null>(null);

	useEffect(() => {
		const next = sanitizeImageSrc(value) ?? null;

		// If we previously created a blob preview and we're moving away from it, revoke it.
		if (lastBlobPreviewRef.current && lastBlobPreviewRef.current !== next) {
			URL.revokeObjectURL(lastBlobPreviewRef.current);
			lastBlobPreviewRef.current = null;
		}

		setPreview(next);
	}, [value]);

	useEffect(() => {
		// Cleanup on unmount
		return () => {
			if (lastBlobPreviewRef.current) {
				URL.revokeObjectURL(lastBlobPreviewRef.current);
				lastBlobPreviewRef.current = null;
			}
		};
	}, []);

	const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		// Validate file type (block SVG specifically)
		const type = (file.type || '').toLowerCase();
		if (!type.startsWith('image/')) {
			alert('Please select an image file');
			return;
		}
		if (type === 'image/svg+xml') {
			alert('SVG uploads are not allowed for security reasons');
			return;
		}

		// Validate size
		if (file.size > MAX_BYTES) {
			alert('Image must be 10MB or less');
			return;
		}

		setUploading(true);

		try {
			// Create a preview URL (blob:)
			const previewUrl = URL.createObjectURL(file);

			// Revoke previous blob preview if any
			if (lastBlobPreviewRef.current) {
				URL.revokeObjectURL(lastBlobPreviewRef.current);
			}
			lastBlobPreviewRef.current = previewUrl;

			setPreview(previewUrl);

			// Convert to base64 for storage (or upload to your server)
			const reader = new FileReader();

			reader.onloadend = () => {
				const base64String = String(reader.result || '');

				// Extra guard: only persist safe base64 data URLs (no SVG)
				const safe = sanitizeImageSrc(base64String);
				if (!safe || !SAFE_DATA_IMAGE_PREFIXES.some((p) => base64String.toLowerCase().startsWith(p))) {
					alert('Unsupported image format');
					setUploading(false);
					return;
				}

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
		// Revoke blob preview if present
		if (lastBlobPreviewRef.current) {
			URL.revokeObjectURL(lastBlobPreviewRef.current);
			lastBlobPreviewRef.current = null;
		}

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
						alt="Preview"
						// defense-in-depth: avoid sending referrer to arbitrary user URLs
						referrerPolicy="no-referrer"
						loading="lazy"
						style={{
							width: '100%',
							height: 'auto',
							display: 'block',
						}}
						onError={() => {
							// If the URL is invalid/broken, don’t keep trying to render it
							setPreview(null);
						}}
					/>
					<button
						type="button"
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
				type="file"
				accept="image/*"
				onChange={handleFileSelect}
				style={{ display: 'none' }}
				disabled={uploading}
			/>

			<input
				type="text"
				value={value || ''}
				onChange={(e) => {
					const raw = e.target.value;
					const safe = sanitizeImageSrc(raw);

					// Persist only safe URLs/data URLs; otherwise store empty (or keep raw if you prefer).
					onChange(safe ?? '');
				}}
				placeholder="Or enter image URL (http/https only)"
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
