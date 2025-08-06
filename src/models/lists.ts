export interface Pagination {
	limit: number; // Limit of items to load per request/page
	totalCount: number; // Total number of items in the list
	hasMore: boolean; // Whether there are more data (pages, elements) to load
}

export interface PaginationDetails<T = number> extends Pagination {
	nextItem: T | null; // Null if there is no next item
	prevItem: T | null; // Null if there is no previous item
	currentItem: T; // The current active item
	currentPage: T; // The current page number
	totalPages: number; // Total number of pages available
}
/**
 * Use Partial, Omit, and Pick to flexibly control which fields are required or optional.
 * For example, 'search' is required, and all other fields are optional:
 * type Search = Pick<ListFilter, 'search'> & Partial<Omit<ListFilter, 'search'>>
 */
export interface ListFilter {
	search: string;
	limit: number;
	offset: number;
}
