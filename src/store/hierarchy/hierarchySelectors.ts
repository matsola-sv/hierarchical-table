import type { HierarchyState } from './hierarchy.types';

import type { RootState } from '@/store';

export const selectHierarchy = (state: RootState): HierarchyState => {
	return state.hierarchy;
};
