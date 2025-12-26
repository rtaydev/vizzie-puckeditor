'use client';

import { PuckEditor } from '@puck-editor/visual';
import { useState } from 'react';

export default function Home() {
	const [data, setData] = useState<any>({ content: [], root: { props: {} } });

	return (
		<div style={{ height: '100vh' }}>
			<PuckEditor
				data={data}
				onPublish={async (next: any) => {
					setData(next);
				}}
				options={{
					sidebarPosition: 'left',
				}}
			/>
		</div>
	);
}
