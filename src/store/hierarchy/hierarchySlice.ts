import { type PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type {
	FetchArgs,
	FetchNodesConditionFn,
	FetchNodesFn,
	FetchResult,
	HierarchyItem,
	HierarchyState,
	HierarchyThunk,
} from './hierarchy.types';

import { normalizeError } from '@/utils/error';
import { getPublicUrl } from '@/utils/url';

// Services and utils
import HierarchyService from '@/services/hierarchy/hierarchyService';
import { cloneTreeExcludingNode } from '@/services/tree/treeService';

/**
 * Service to load and store the tree in memory,
 * reducing the load on Redux and avoiding storing large structures in the state.
 * The service also provides access to the tree and allows fetching child nodes.
 */
const hierarchyService = new HierarchyService<HierarchyItem>(
	getPublicUrl('/database/example-large-data.json'),
);

/**
 * Loads nodes from the root level of the hierarchy in chunks, using pagination.
 *
 * If offset === 0 — the first chunk is loaded (initial load).
 * In other cases — the next batch of nodes is loaded (e.g., on scroll).
 * Returns an array of nodes, total count, and the current offset.
 */
const fetchRootNodes: FetchNodesFn = async (args, { getState, rejectWithValue }) => {
	try {
		const { offset, parentId = 0 } = args;
		const { limit } = getState().hierarchy.pagination;
		const result = await hierarchyService.getChildren(parentId, offset, limit);

		return { ...result, offset: offset };
	} catch (err: unknown) {
		return rejectWithValue(normalizeError(err, '[fetchHierarchy]: unknown error').message);
	}
};

/**
 * Condition to run the thunk: returns true to proceed with fetching, false to skip.
 * Prevents duplicate loads by checking if loading is in progress or data chunk already loaded.
 */
const fetchNodesCondition: FetchNodesConditionFn = ({ offset }, { getState }) => {
	const { loading, pagination } = getState().hierarchy;
	const { limit, loadedRootCount } = pagination;

	if (loading) return false;
	if (offset + limit <= loadedRootCount) return false;

	return true;
};

export const fetchRootNodesThunk = createAsyncThunk<FetchResult, FetchArgs, HierarchyThunk>(
	'hierarchy/fetchRootNodes',
	fetchRootNodes,
	{ condition: fetchNodesCondition },
);

const initialState: HierarchyState = {
	data: [],
	loading: false,
	error: null,

	// Pagination object for root elements
	pagination: {
		loadedRootCount: 0, // Total number of already loaded root elements
		limit: 10, // Limit of items to load per request
		hasMore: true, // Flag indicating if there are more root elements to load
		totalCount: 0, // Total number of root elements
	},
};

const hierarchySlice = createSlice({
	name: 'hierarchy',
	initialState,
	reducers: {
		// Note: Any asynchronous update to Redux state via thunk causes the entire state object to be replaced.
		// Even if only a small part (e.g. `loading`) changes, it triggers re-renders due to a new reference.
		// TODO Temp avoid async node removal — thunk updates entire state and collapses sub tables.
		removeHierarchyBranch(state, action: PayloadAction<number>) {
			// Returns a clone of the hierarchical tree with the node to be removed (and its descendants) excluded.
			state.data = cloneTreeExcludingNode<HierarchyItem>(state.data, action.payload);
		},
	},
	extraReducers: builder => {
		builder
			// Loading root nodes for hierarchical data
			.addCase(fetchRootNodesThunk.pending, state => {
				state.loading = true;
			})
			.addCase(fetchRootNodesThunk.fulfilled, (state, action) => {
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
			.addCase(fetchRootNodesThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to load root nodes';
			});
	},
});
export const { removeHierarchyBranch } = hierarchySlice.actions;
export default hierarchySlice.reducer;
