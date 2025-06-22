import type { TableRowProps } from '@mui/material';

import { type TreeModelNode } from '@/models/tree';

export interface ExpandableRowProps extends TableRowProps {
	row: TreeModelNode<any>;
	columns: string[];
	background?: string;
}
