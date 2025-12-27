import { ActionBar, createUsePuck } from '@measured/puck';
import { Plus, Minus, PanelLeft, PanelRight, Columns } from 'lucide-react';

const usePuck = createUsePuck();

const GridActionBar = ({
	children,
	label,
	parentAction,
}: {
	children: React.ReactNode;
	label?: string;
	parentAction: React.ReactNode;
}) => {
	// Use usePuck with selectors to get reactive state
	const selectedItem = usePuck((s) => s.selectedItem);
	const dispatch = usePuck((s) => s.dispatch);
	const appState = usePuck((s) => s.appState);
	const data = (appState as any)?.data;

	// Only show column controls if GridBlock is selected
	const isGridBlock = selectedItem?.type === 'GridBlock';
	const currentColumns = isGridBlock ? selectedItem?.props?.numColumns || 4 : 0;
	const currentSidebarLayout = isGridBlock
		? selectedItem?.props?.sidebarLayout || 'none'
		: 'none';

	const handleAddColumn = () => {
		if (!isGridBlock || !selectedItem || !dispatch || !data) return;
		const newColumns = Math.min(currentColumns + 1, 12);
		const selectedId = (selectedItem as any).id;

		// Update the content array with new props
		const updatedContent = (data as any).content.map((item: any) => {
			if (item.id === selectedId) {
				return {
					...item,
					props: {
						...item.props,
						numColumns: newColumns,
					},
				};
			}
			return item;
		});

		dispatch({
			type: 'setData',
			data: {
				...(data as any),
				content: updatedContent,
			},
		} as any);
	};

	const handleRemoveColumn = () => {
		if (!isGridBlock || !selectedItem || !dispatch || !data) return;
		const newColumns = Math.max(currentColumns - 1, 1);
		const selectedId = (selectedItem as any).id;

		// Update the content array with new props
		const updatedContent = (data as any).content.map((item: any) => {
			if (item.id === selectedId) {
				return {
					...item,
					props: {
						...item.props,
						numColumns: newColumns,
						sidebarLayout: 'none', // Reset sidebar layout when manually changing columns
					},
				};
			}
			return item;
		});

		dispatch({
			type: 'setData',
			data: {
				...(data as any),
				content: updatedContent,
			},
		} as any);
	};

	const handleSetSidebarLayout = (layout: 'left' | 'right' | 'none') => {
		if (!isGridBlock || !selectedItem || !dispatch || !data) return;
		const selectedId = (selectedItem as any).id;

		// Update the content array with new props
		const updatedContent = (data as any).content.map((item: any) => {
			if (item.id === selectedId) {
				return {
					...item,
					props: {
						...item.props,
						sidebarLayout: layout,
						numColumns: layout !== 'none' ? 2 : item.props.numColumns, // Set to 2 columns for sidebar layouts
					},
				};
			}
			return item;
		});

		dispatch({
			type: 'setData',
			data: {
				...(data as any),
				content: updatedContent,
			},
		} as any);
	};

	return (
		<ActionBar label={label}>
			{parentAction}
			{isGridBlock && (
				<>
					<ActionBar.Group>
						<ActionBar.Action
							onClick={() => handleSetSidebarLayout('none')}
							label='Equal columns layout'
						>
							<Columns
								size={14}
								style={{
									opacity: currentSidebarLayout === 'none' ? 1 : 0.6,
									color:
										currentSidebarLayout === 'none'
											? 'white'
											: 'rgba(255, 255, 255, 0.6)',
								}}
							/>
						</ActionBar.Action>
						<ActionBar.Action
							onClick={() => handleSetSidebarLayout('left')}
							label='Left sidebar layout'
						>
							<PanelLeft
								size={14}
								style={{
									opacity: currentSidebarLayout === 'left' ? 1 : 0.6,
									color:
										currentSidebarLayout === 'left'
											? 'white'
											: 'rgba(255, 255, 255, 0.6)',
								}}
							/>
						</ActionBar.Action>
						<ActionBar.Action
							onClick={() => handleSetSidebarLayout('right')}
							label='Right sidebar layout'
						>
							<PanelRight
								size={14}
								style={{
									opacity: currentSidebarLayout === 'right' ? 1 : 0.6,
									color:
										currentSidebarLayout === 'right'
											? 'white'
											: 'rgba(255, 255, 255, 0.6)',
								}}
							/>
						</ActionBar.Action>
					</ActionBar.Group>
					<ActionBar.Group>
						<ActionBar.Action
							onClick={handleRemoveColumn}
							label='Remove column'
						>
							<Minus
								size={14}
								style={{
									opacity: currentColumns <= 1 ? 0.5 : 1,
									color: 'white',
								}}
							/>
						</ActionBar.Action>
						<span
							style={{ fontSize: '12px', color: 'white', padding: '0 8px' }}
						>
							{currentColumns} cols
						</span>
						<ActionBar.Action onClick={handleAddColumn} label='Add column'>
							<Plus
								size={14}
								style={{
									opacity: currentColumns >= 12 ? 0.5 : 1,
									color: 'white',
								}}
							/>
						</ActionBar.Action>
					</ActionBar.Group>
				</>
			)}
			<ActionBar.Group>{children}</ActionBar.Group>
		</ActionBar>
	);
};
export default GridActionBar;
