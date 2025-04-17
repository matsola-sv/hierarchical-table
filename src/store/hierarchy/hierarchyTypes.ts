import { SearchResult } from "services/hierarchyService";

export interface PaginationMeta {
    loadedRootCount: number; // Total number of already loaded node children
    limit: number;           // Limit of items to load per request
    totalCount: number;      // Total number of node children
    hasMore: boolean;        // Flag indicating if there are more elements to load
}

export interface HierarchyState<T> {
    data: T[];
    loading: boolean;
    error: string | null;
    pagination: PaginationMeta;
}