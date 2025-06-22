import { type FC, useState } from 'react';
import { useDispatch } from 'react-redux';

// MUI
import { Delete, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Box, Collapse, IconButton, TableCell, TableRow } from '@mui/material';

// Models
import { type ExpandableRowProps } from './ExpandableRow.types';

import { type AppDispatch } from '@/store';
import { removeHierarchyBranch } from '@/store/hierarchy/hierarchySlice';

// Components
import HierarchyTable from '@/components/Hierarchy/HierarchyTable/HierarchyTable';

const ExpandableRow: FC<ExpandableRowProps> = ({ row, columns, background = '#f1f6f6', sx }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const dispatch = useDispatch<AppDispatch>();

	const hasChildren = Array.isArray(row.children) && row.children.length > 0;
	const children = row.children ?? [];

	const handleDelete = () => {
		dispatch(removeHierarchyBranch(row.model.id));
	};

	return (
		<>
			<TableRow sx={{ background, ...sx }}>
				<TableCell>
					{hasChildren ? (
						<IconButton
							size='small'
							onClick={() => setIsOpen(!isOpen)}
						>
							{isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
						</IconButton>
					) : null}
				</TableCell>

				{columns.map(col => (
					<TableCell key={col}>{row.model.data[col]}</TableCell>
				))}

				<TableCell>
					<IconButton
						size='small'
						onClick={handleDelete}
						color='error'
					>
						<Delete />
					</IconButton>
				</TableCell>
			</TableRow>

			{hasChildren && (
				<TableRow>
					<TableCell
						colSpan={columns.length + 1}
						sx={{ p: 0 }}
					>
						<Collapse
							in={isOpen}
							timeout='auto'
							unmountOnExit
						>
							<Box margin={1}>
								<HierarchyTable data={children} />
							</Box>
						</Collapse>
					</TableCell>
				</TableRow>
			)}
		</>
	);
};

export default ExpandableRow;
