'use client';

import { PuckEditor, defaultBlocks } from '@puck-editor/nextjs';
import type { Config, Data } from '@measured/puck';
import { useState } from 'react';

// Custom block component
function CallToAction({
	title,
	description,
	buttonText,
	buttonLink,
}: {
	title: string;
	description: string;
	buttonText: string;
	buttonLink: string;
}): JSX.Element {
	return (
		<div className='bg-linear-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg text-center'>
			<h2 className='text-3xl font-bold mb-4'>{title}</h2>
			<p className='text-lg mb-6 opacity-90'>{description}</p>
			<a
				href={buttonLink}
				className='inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors'
			>
				{buttonText}
			</a>
		</div>
	);
}

// Custom config with default blocks + custom block
const config: Config = {
	components: {
		...defaultBlocks,
		CallToAction: {
			fields: {
				title: {
					type: 'text',
					label: 'Title',
				},
				description: {
					type: 'textarea',
					label: 'Description',
				},
				buttonText: {
					type: 'text',
					label: 'Button Text',
				},
				buttonLink: {
					type: 'text',
					label: 'Button Link',
				},
			},
			defaultProps: {
				title: 'Get Started Today',
				description:
					'Join thousands of users who are already using our platform.',
				buttonText: 'Sign Up',
				buttonLink: '#',
			},
			render: ({ title, description, buttonText, buttonLink }) => (
				<CallToAction
					title={title}
					description={description}
					buttonText={buttonText}
					buttonLink={buttonLink}
				/>
			),
		},
	},
};

const initialData: Data = {
	root: { props: {} },
	content: [
		{
			type: 'Heading',
			props: {
				text: 'Custom Blocks Example',
				level: 1,
				align: 'center',
			},
		},
		{
			type: 'CallToAction',
			props: {
				title: 'Get Started Today',
				description:
					'Join thousands of users who are already using our platform.',
				buttonText: 'Sign Up',
				buttonLink: '#',
			},
		},
	],
};

export default function CustomPage(): JSX.Element {
	const [data, setData] = useState<Data>(initialData);

	return (
		<div className='min-h-screen p-8'>
			<div className='max-w-7xl mx-auto'>
				<h1 className='text-3xl font-bold mb-4'>Custom Blocks Example</h1>
				<p className='text-muted-foreground mb-6'>
					This example shows how to create and use custom blocks. The
					CallToAction block is a custom block that extends the default blocks.
				</p>
				<PuckEditor
					config={config}
					data={data}
					onChange={setData}
					headerTitle='Custom Blocks Editor'
				/>
			</div>
		</div>
	);
}
