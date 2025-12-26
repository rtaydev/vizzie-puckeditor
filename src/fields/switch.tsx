'use client';

import type { CustomFieldProps } from '../types';
import { cn } from '../utils/cn';

export function SwitchField({
	name,
	label,
	value,
	onChange,
	readOnly = false,
	className,
}: CustomFieldProps): JSX.Element {
	const isChecked = Boolean(value);

	return (
		<div className={cn('flex items-center justify-between gap-2', className)}>
			{label && (
				<label htmlFor={name} className='text-sm font-medium'>
					{label}
				</label>
			)}
			<button
				type='button'
				role='switch'
				aria-checked={isChecked}
				id={name}
				onClick={() => !readOnly && onChange(!isChecked)}
				disabled={readOnly}
				className={cn(
					'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
					isChecked ? 'bg-blue-500' : 'bg-gray-300',
					readOnly && 'cursor-not-allowed opacity-50'
				)}
			>
				<span
					className={cn(
						'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
						isChecked ? 'translate-x-6' : 'translate-x-1'
					)}
				/>
			</button>
		</div>
	);
}
