import { PuckRendererServer, defaultBlocks } from '@puck-editor/nextjs/server';
import type { Config, Data } from '@measured/puck';
import { getContent } from '../lib/content-store';

const config: Config = {
	components: defaultBlocks,
};

// Fallback data if no content is saved
const fallbackData: Data = {
	root: { props: {} },
	content: [
		{
			type: 'Heading',
			props: {
				text: 'Welcome to Puck Editor',
				level: 1,
				align: 'center',
			},
		},
		{
			type: 'Paragraph',
			props: {
				text: 'No content has been published yet. Go to the editor to create and publish content.',
				align: 'left',
			},
		},
	],
};

export default async function RendererPage(): Promise<JSX.Element> {
	// Fetch content from the store (in a real app, this would be your database)
	const savedContent = await getContent();
	const content = savedContent || fallbackData;

	return (
		<div className='min-h-screen p-8'>
			<div className='max-w-7xl mx-auto'>
				<h1 className='text-3xl font-bold mb-4'>
					Puck Renderer (Server Component)
				</h1>
				<p className='text-muted-foreground mb-6'>
					This page demonstrates server-side rendering of Puck content using the
					PuckRendererServer component. Content is fetched from the API route.
				</p>
				<div className='border rounded-lg p-8 bg-background'>
					<PuckRendererServer config={config} data={content} />
				</div>
				<div className='mt-4 text-sm text-muted-foreground'>
					<a href='/editor' className='underline'>
						Edit content
					</a>
				</div>
			</div>
		</div>
	);
}
