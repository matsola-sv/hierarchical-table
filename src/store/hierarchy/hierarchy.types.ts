import type { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';

import type { Pagination } from '@/models/lists';
import type { TreeModelNode } from '@/models/tree';
import type { RejectValue, ThunkCondition, ThunkConfig } from '@/store/thunk.types';

import type { SearchResult } from '@/services/hierarchy/hierarchyService';

export interface HierarchyPagination extends Pagination {
	loadedRootCount: number; // Total number of already loaded node children
}

export interface HierarchyContent<T> {
	data: T[];
	loading: boolean;
	error: string | null;
	pagination: HierarchyPagination;
}

/** Hierarchy row data: object with string keys and unknown values */
export type HierarchyItem = Record<string, unknown>;
export type HierarchyState = HierarchyContent<TreeModelNode<HierarchyItem>>;

/** Hierarchy fetch nodes thunk */
type State = { hierarchy: HierarchyState };

export type FetchArgs = { offset: number; parentId?: number };
export type FetchResult = SearchResult<HierarchyItem> & { offset: number };
export type HierarchyThunk = ThunkConfig<State>;
export type FetchNodesFn = AsyncThunkPayloadCreator<
	FetchResult,
	FetchArgs,
	{ state: State; rejectValue: RejectValue }
>;

export type FetchNodesConditionFn = ThunkCondition<FetchArgs, State>;
