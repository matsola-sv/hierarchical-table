import type { TableRowProps } from '@mui/material';

import { type TreeModelNode } from '@/models/tree';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ExpandableRowProps extends TableRowProps {
	row: TreeModelNode<any>;
	columns: string[];
	background?: string;
}
