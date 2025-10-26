import { type ReactNode } from 'react';

import { type TreeModelNode } from '@/models/tree';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HierarchyTableProps {
	data: TreeModelNode<any>[];
	stickyHeader?: boolean; // Stick the header to the top during table scroll
	evenRowBg?: string; // Background for even rows
	oddRowBg?: string; // Background for odd rows
	headerBg?: string;
	headerFirstCell?: ReactNode; // Allow passing content into the always-empty first column
}
