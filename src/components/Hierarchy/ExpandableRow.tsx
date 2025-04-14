import { FC, useState } from "react";
import {useDispatch} from "react-redux";
// MUI
import { TableRow, TableCell, Collapse, IconButton, Box } from "@mui/material";
import { Delete, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
// Models
import {TreeModelNode} from "models/tree";
// Redux
import {AppDispatch} from "store";
import {removeHierarchyBranch} from "store/hierarchy/hierarchySlice";
// Components
import HierarchyTable from "components/Hierarchy/HierarchyTable";

interface ExpandableRowProps {
    row: TreeModelNode<any>;
    columns: string[];
    background?: string;
}

const ExpandableRow: FC<ExpandableRowProps> = ({ row, columns, background = "#f1f6f6" }) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const hasChildren = Array.isArray(row.children) && row.children.length > 0;
    const children = row.children ?? [];

    const handleDelete = () => {
        dispatch(removeHierarchyBranch(row.model.id));
    };

    return (
        <>
            <TableRow sx={{ background }}>
                <TableCell>
                    {hasChildren ? (
                        <IconButton size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>
                    ) : null}
                </TableCell>

                {columns.map((col) => (
                    <TableCell key={col}>
                        {row.model.data[col]}
                    </TableCell>
                ))}

                <TableCell>
                    <IconButton size="small" onClick={handleDelete} color="error">
                        <Delete />
                    </IconButton>
                </TableCell>
            </TableRow>

            {hasChildren && (
                <TableRow>
                    <TableCell colSpan={columns.length + 1} sx={{ p: 0 }}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <HierarchyTable data={children}/>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            )}
        </>
    );
};

export default ExpandableRow;