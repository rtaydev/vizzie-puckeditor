'use client';

import { useState, useRef, useCallback } from 'react';
import type { CustomFieldProps } from '../types';
import { cn } from '../utils/cn';

export interface ImageUploadFieldProps extends CustomFieldProps {
	onUpload?: (file: File) => Promise<string>;
	onDelete?: (url: string) => Promise<void>;
	maxFileSize?: number; // in bytes
	accept?: string;
}

export function ImageUploadField({
	name,
	label,
	value,
	onChange,
	readOnly = false,
	className,
	onUpload,
	onDelete,
	maxFileSize = 5 * 1024 * 1024, // 5MB default
	accept = 'image/*',
}: ImageUploadFieldProps): JSX.Element {
	const [isUploading, setIsUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const inputRef = useRef<HTMLInputElement>(null);
	const abortControllerRef = useRef<AbortController | null>(null);

	const handleFileSelect = useCallback(
		async (file: File) => {
			if (!file) return;

			// Validate file type
			if (!file.type.startsWith('image/')) {
				alert('Please select an image file');
				return;
			}

			// Validate file size
			if (file.size > maxFileSize) {
				alert(
					`File size exceeds maximum allowed (${Math.round(
						maxFileSize / (1024 * 1024)
					)}MB)`
				);
				return;
			}

			setIsUploading(true);
			setUploadProgress(0);

			// Create abort controller for cancellation
			abortControllerRef.current = new AbortController();

			try {
				let url: string;
				if (onUpload) {
					url = await onUpload(file);
				} else {
					// Fallback: create object URL
					url = URL.createObjectURL(file);
				}
				onChange(url);
			} catch (error) {
				if (error instanceof Error && error.message !== 'Upload cancelled') {
					alert(`Upload failed: ${error.message}`);
				}
			} finally {
				setIsUploading(false);
				setUploadProgress(0);
				abortControllerRef.current = null;
			}
		},
		[onChange, onUpload, maxFileSize]
	);

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];
			if (file) {
				handleFileSelect(file);
			}
			// Reset input so same file can be selected again
			if (inputRef.current) {
				inputRef.current.value = '';
			}
		},
		[handleFileSelect]
	);

	const handleButtonClick = useCallback(() => {
		if (inputRef.current && !readOnly) {
			inputRef.current.click();
		}
	}, [readOnly]);

	const handleRemove = useCallback(
		async (e: React.MouseEvent) => {
			e.stopPropagation();
			if (readOnly) return;

			const imageUrl = value as string;
			if (imageUrl && onDelete) {
				try {
					await onDelete(imageUrl);
				} catch (error) {
					console.error('Failed to delete image:', error);
				}
			}
			onChange('');
		},
		[onChange, onDelete, value, readOnly]
	);

	const handleCancel = useCallback(() => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}
	}, []);

	return (
		<div className={cn('flex flex-col gap-2', className)}>
			{label && (
				<label htmlFor={name} className='text-xs font-medium mb-2'>
					{label}
				</label>
			)}
			<input
				ref={inputRef}
				id={name}
				type='file'
				accept={accept}
				onChange={handleInputChange}
				disabled={isUploading || readOnly}
				style={{ display: 'none' }}
			/>
			{value ? (
				<div className='space-y-2'>
					<div className='relative w-full h-24 rounded-md border border-gray-200 overflow-hidden bg-gray-50'>
						<div
							className='w-full h-full bg-cover bg-center bg-no-repeat'
							style={{ backgroundImage: `url(${value})` }}
						/>
						{!readOnly && (
							<button
								type='button'
								onClick={handleRemove}
								aria-label='Remove image'
								className='absolute top-1 right-1 h-6 w-6 p-0 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center justify-center'
							>
								<svg
									className='h-3 w-3'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M6 18L18 6M6 6l12 12'
									/>
								</svg>
							</button>
						)}
					</div>
					{!readOnly && (
						<button
							type='button'
							onClick={handleButtonClick}
							disabled={isUploading}
							className='w-full h-8 px-3 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2'
						>
							<svg
								className='h-4 w-4'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
								/>
							</svg>
							Replace Image
						</button>
					)}
				</div>
			) : isUploading ? (
				<div className='space-y-2'>
					<div className='relative w-full h-24 rounded-md border border-gray-200 overflow-hidden bg-gray-50'>
						<div className='absolute inset-0 flex items-center justify-center'>
							<div className='w-full h-full bg-gray-100 relative'>
								<div
									className='h-full bg-blue-500 transition-all duration-300'
									style={{ width: `${uploadProgress}%` }}
								/>
								<div className='absolute inset-0 flex items-center justify-center'>
									<span className='text-sm font-medium text-gray-700'>
										{uploadProgress}%
									</span>
								</div>
							</div>
						</div>
					</div>
					<button
						type='button'
						onClick={handleCancel}
						disabled={!isUploading}
						className='w-full h-8 px-3 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
					>
						Cancel Upload
					</button>
				</div>
			) : (
				<button
					type='button'
					onClick={handleButtonClick}
					disabled={isUploading || readOnly}
					className='w-full h-8 px-3 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2'
				>
					<svg
						className='h-4 w-4'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
						/>
					</svg>
					Upload Image
				</button>
			)}
		</div>
	);
}
