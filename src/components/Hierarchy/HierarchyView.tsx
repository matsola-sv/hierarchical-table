import {FC, useEffect, useRef} from "react";
import { useDispatch } from "react-redux";
// MUI
import {Box, Button, CircularProgress, Typography} from "@mui/material";
// Redux
import { AppDispatch } from "store";
import {fetchRootNodesChunk} from "store/hierarchy/hierarchySlice";
// Hooks
import {useTypedSelector} from "hooks/useTypedSelector";
// Components
import HierarchyTable from "components/Hierarchy/HierarchyTable";
import EmptyState from "components/Common/EmptyState/EmptyState";

const HierarchyView: FC = () => {
    const noDataMessage: string = "You have removed the entire hierarchy. Reload the page to restore it.";

    const tableContainerRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, error } = useTypedSelector(state => state.hierarchy);
    const { loadedRootCount, hasMore } = useTypedSelector(state => state.hierarchy.pagination);

    // Loads the first chunk of rows for the root hierarchy table.
    useEffect(() => {
        dispatch(fetchRootNodesChunk({ offset: 0 }));
    }, [dispatch]);

    const handleLoadMore = () => {
        const offset = loadedRootCount;

        // Loads the next chunk of rows for the root hierarchy table
        dispatch(fetchRootNodesChunk({ offset }));
    };

    // After loading new data, scroll smoothly to the end of the table
    useEffect(() => {
        if (tableContainerRef.current) {
            const container = tableContainerRef.current;
            container.scrollTop = container.scrollHeight;
        }
    }, [data]);

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    if (!data.length) {
        return <EmptyState message={noDataMessage} />;
    }

    return (
        <Box margin={2}>
            {/* Container with ref for scrolling */}
            <Box ref={tableContainerRef} maxHeight="70vh" overflow="auto">
                <HierarchyTable
                    data={data}
                    stickyHeader={true}
                />
            </Box>

            {hasMore && !loading && (
                <Box display="flex" justifyContent="center" mt={1}>
                    <Button onClick={handleLoadMore} size="small">
                        Load more
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default HierarchyView;