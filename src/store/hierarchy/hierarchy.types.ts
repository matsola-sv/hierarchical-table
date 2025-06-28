import type { TreeModelNode } from '@/models/tree';

export interface PaginationMeta {
	loadedRootCount: number; // Total number of already loaded node children
	limit: number; // Limit of items to load per request
	totalCount: number; // Total number of node children
	hasMore: boolean; // Flag indicating if there are more elements to load
}

export interface HierarchyContent<T> {
	data: T[];
	loading: boolean;
	error: string | null;
	pagination: PaginationMeta;
}
/** Hierarchy row data: object with string keys and unknown values */
export type HierarchyItem = Record<string, unknown>;
export type HierarchyState = HierarchyContent<TreeModelNode<HierarchyItem>>;
