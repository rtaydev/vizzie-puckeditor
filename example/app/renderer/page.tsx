import { PuckRendererServer, defaultBlocks } from '@puck-editor/nextjs/server';
import type { Config, Data } from '@measured/puck';

const config: Config = {
	components: defaultBlocks,
};

// Example data - in a real app, this would come from your database/API
const exampleData: Data = {
	root: { props: {} },
	content: [
		{
			type: 'Heading',
			props: {
				text: 'Welcome to Puck Editor',
				level: 1,
				align: 'center',
				id: 'heading-1',
			},
		},
		{
			type: 'Paragraph',
			props: {
				text: 'This is an example of rendered content using the PuckRendererServer component. This component runs on the server and can be used in Next.js Server Components.',
				align: 'left',
				id: 'paragraph-1',
			},
		},
		{
			type: 'Image',
			props: {
				src: 'https://picsum.photos/800/400',
				alt: 'Example image',
				width: 800,
				height: 400,
				id: 'image-1',
			},
		},
		{
			type: 'Heading',
			props: {
				text: 'Container Block Example',
				level: 2,
				align: 'left',
				id: 'heading-2',
			},
		},
		{
			type: 'Paragraph',
			props: {
				text: 'This content demonstrates how blocks can be composed together. The Container block provides layout control with padding and max-width options.',
				align: 'left',
				id: 'paragraph-2',
			},
		},
	],
};

export default function RendererPage(): JSX.Element {
	return (
		<div className='min-h-screen p-8'>
			<div className='max-w-7xl mx-auto'>
				<h1 className='text-3xl font-bold mb-4'>
					Puck Renderer (Server Component)
				</h1>
				<p className='text-muted-foreground mb-6'>
					This page demonstrates server-side rendering of Puck content using the
					PuckRendererServer component.
				</p>
				<div className='border rounded-lg p-8 bg-background'>
					<PuckRendererServer config={config} data={exampleData} />
				</div>
			</div>
		</div>
	);
}
