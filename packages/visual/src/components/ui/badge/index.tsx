export type BadgeProps = {
	variant: 'default' | 'outline';
	children: React.ReactNode;
};

export const Badge = ({ variant, children }: BadgeProps) => {
	return (
		<div
			style={{
				backgroundColor: variant === 'outline' ? 'transparent' : 'blueviolet',
				color: variant === 'outline' ? 'blueviolet' : 'white',
				borderRadius: '4px',
				padding: '4px 8px',
				fontSize: '12px',
				fontWeight: '500',
			}}
		>
			{children}
		</div>
	);
};
