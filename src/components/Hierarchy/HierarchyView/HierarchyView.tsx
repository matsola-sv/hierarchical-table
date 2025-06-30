import { type FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

// MUI
import { Alert, Box, TableContainer } from '@mui/material';

// Models

// Hooks
import { useTypedSelector } from '@/hooks/useTypedSelector';

// Redux
import { type AppDispatch } from '@/store';
import { fetchRootNodesChunk } from '@/store/hierarchy/hierarchySlice';

// Components
import FullscreenToggle from '@/components/Common/Controls/FullscreenToggle/FullscreenToggle';
import EmptyState from '@/components/Common/EmptyState/EmptyState';
import AppAsyncButton from '@/components/Common/UI/Buttons/AppAsyncButton/AppAsyncButton';
import OverlaySpinner from '@/components/Common/UI/Spinners/OverlaySpinner/OverlaySpinner';
import HierarchyTable from '@/components/Hierarchy/HierarchyTable/HierarchyTable';

const HierarchyView: FC = () => {
	const tableContainerRef = useRef<HTMLDivElement>(null);

	const { t } = useTranslation();
	const dispatch = useDispatch<AppDispatch>();
	const { data, loading, error } = useTypedSelector(state => state.hierarchy);
	const { loadedRootCount, hasMore } = useTypedSelector(state => state.hierarchy.pagination);

	const noDataMessage: string = t('components.hierarchy.hierarchyView.noData');

	// Loads the first chunk of rows for the root hierarchy table.
	useEffect(() => {
		dispatch(fetchRootNodesChunk({ offset: 0 }));
	}, [dispatch]);

	// After loading new data, scroll smoothly to the end of the table
	useEffect(() => {
		if (tableContainerRef.current) {
			const container = tableContainerRef.current;
			container.scrollTop = container.scrollHeight;
		}
	}, [data]);

	const handleLoadMore = () => {
		const offset = loadedRootCount;

		// Loads the next chunk of rows for the root hierarchy table
		dispatch(fetchRootNodesChunk({ offset }));
	};

	if (loading) {
		return <OverlaySpinner />;
	}

	if (error) {
		return <Alert severity='error'>{error}</Alert>;
	}

	if (!data.length) {
		return <EmptyState message={noDataMessage} />;
	}

	return (
		<Box
			height='100%'
			display='flex'
			flexDirection='column'
		>
			{/* Scrollable content (table with sticky header) */}
			{/* and a fullscreen button in the table's first column */}
			<TableContainer
				sx={{ flex: 1, overflow: 'auto' }} // Fill all height. ' Just flex={1} props don't work!
				ref={tableContainerRef}
			>
				<HierarchyTable
					data={data}
					stickyHeader
					headerFirstCell={
						<FullscreenToggle
							iconSx={{
								fontSize: { xs: 35, lg: 40 },
							}}
						/>
					}
				/>
			</TableContainer>

			{/* Sticky footer button (outside scrollable area) */}
			{hasMore && !loading && (
				<Box
					display='flex'
					justifyContent='center'
					p={2}
				>
					{/* Full-width button on mobile screens */}
					<Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
						<AppAsyncButton
							size='small'
							onClick={handleLoadMore}
							fullWidth
						>
							{t('common.buttons.loadMore.title')}
						</AppAsyncButton>
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default HierarchyView;
