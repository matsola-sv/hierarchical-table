import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
// Models
import { TreeModelNode } from "models/tree";
import { HierarchyState } from "./hierarchyTypes";
// Services and utils
import { getPublicUrl } from "utils/url";
import { cloneTreeExcludingNode } from "services/treeService";
import HierarchyService, {SearchResult} from "services/hierarchyService";

/**
 * Service to load and store the tree in memory,
 * reducing the load on Redux and avoiding storing large structures in the state.
 * The service also provides access to the tree and allows fetching child nodes.
 */
const hierarchyService = new HierarchyService(
    getPublicUrl("/database/example-large-data.json")
);

/**
 * Loads nodes from the root level of the hierarchy in chunks, using pagination.
 *
 * If offset === 0 — the first chunk is loaded (initial load).
 * In other cases — the next batch of nodes is loaded (e.g., on scroll).
 * Returns an array of nodes, total count, and the current offset.
 */
export const fetchRootNodesChunk = createAsyncThunk(
    "hierarchy/fetchRootNodes",
    async ({ offset }: { offset: number }, { rejectWithValue, getState }) => {
        try {
            // getState() returns the entire Redux state, so we need to specify the type to access the specific 'hierarchy'.
            const { limit } = (getState() as { hierarchy: HierarchyState }).hierarchy.pagination;
            const result: SearchResult<any> = await hierarchyService
                .getChildren(0, offset, limit);

            return { ...result, offset };
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

/**
 * Returns a clone of the hierarchical tree with the node to be removed (and its descendants) excluded.
 */
export const removeHierarchyBranchAsync = createAsyncThunk(
    'hierarchy/removeHierarchyBranchAsync',
    async (nodeId: number, { getState, rejectWithValue }) => {
        try {
            // getState() returns the entire Redux state, so we need to specify the type to access the specific 'hierarchy'.
            const {hierarchy} = (getState() as { hierarchy: HierarchyState });

            // Clones the hierarchical tree, excluding the node that needs to be removed.
            return cloneTreeExcludingNode<TreeModelNode<any>>(
                hierarchy.data, nodeId
            );

        } catch (error) {
            return rejectWithValue("Failed to remove hierarchy branch");
        }
    }
);

const initialState: HierarchyState = {
    data: [],
    loading: false,
    error: null,

    // Pagination object for root elements
    pagination: {
        loadedRootCount: 0, // Total number of already loaded root elements
        limit: 10,           // Limit of items to load per request
        hasMore: true,      // Flag indicating if there are more root elements to load
        totalCount: 0,      // Total number of root elements
    }
};

const hierarchySlice = createSlice({
    name: "hierarchy",
    initialState,
    reducers: {
        // Note: Any asynchronous update to Redux state via thunk causes the entire state object to be replaced.
        // Even if only a small part (e.g. `loading`) changes, it triggers re-renders due to a new reference.
        // TODO Temp avoid async node removal — thunk updates entire state and collapses sub tables.
        removeHierarchyBranch(state, action: PayloadAction<number>) {
            // Returns a clone of the hierarchical tree with the node to be removed (and its descendants) excluded.
            state.data = cloneTreeExcludingNode<TreeModelNode<any>>(
                state.data, action.payload
            );
        },
    },
    extraReducers: (builder) => {
        builder
            // Loading root nodes for hierarchical data
            .addCase(fetchRootNodesChunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRootNodesChunk.fulfilled, (state, action) => {
                const { nodes, totalCount, offset } = action.payload;

                if (offset === 0) {
                    state.pagination.totalCount = totalCount;
                    state.data = nodes;
                } else {
                    state.data = [...state.data, ...nodes];
                }

                state.pagination.loadedRootCount += nodes.length;
                state.pagination.hasMore = state.pagination.loadedRootCount < totalCount;
                state.loading = false;
            })
            .addCase(fetchRootNodesChunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to load root nodes";
            })
    }
});
export const { removeHierarchyBranch } = hierarchySlice.actions;
export default hierarchySlice.reducer;