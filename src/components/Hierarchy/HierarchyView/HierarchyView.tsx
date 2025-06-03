import { type FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

// MUI
import { Box, Button, CircularProgress, Typography } from '@mui/material';

// Models
import { IconFontSize } from '@/models/ui';

// Hooks
import { useTypedSelector } from '@/hooks/useTypedSelector';

// Redux
import { type AppDispatch } from '@/store';
import { fetchRootNodesChunk } from '@/store/hierarchy/hierarchySlice';

// Components
import FullscreenToggle from '@/components/Common/Controls/FullscreenToggle/FullscreenToggle';
import EmptyState from '@/components/Common/EmptyState/EmptyState';
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
		return (
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				height='100vh'
			>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				height='100vh'
			>
				<Typography color='error'>{error}</Typography>
			</Box>
		);
	}

	if (!data.length) {
		return <EmptyState message={noDataMessage} />;
	}

	return (
		<Box
			margin={0}
			height='100vh'
			display='flex'
			flexDirection='column'
		>
			{/* Container for the table that fills the available screen height */}
			{/* and a fullscreen button in the table's first column */}
			<Box
				ref={tableContainerRef}
				flex='1' // Fill all height
				overflow='auto'
			>
				<HierarchyTable
					data={data}
					stickyHeader={true}
					headerFirstCell={<FullscreenToggle iconSize={IconFontSize.large} />}
				/>
			</Box>

			{hasMore && !loading && (
				<Box
					display='flex'
					justifyContent='center'
					mt={1}
				>
					<Button
						onClick={handleLoadMore}
						size='small'
					>
						{t('common.buttons.loadMore.title')}
					</Button>
				</Box>
			)}
		</Box>
	);
};

export default HierarchyView;
