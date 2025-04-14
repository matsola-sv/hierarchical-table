import { FC } from "react";
// MUI
import { Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
// Models
import {TreeModelNode} from "models/tree";
// Components
import ExpandableRow from "components/Hierarchy/ExpandableRow/ExpandableRow";

interface HierarchyTableProps {
    data: TreeModelNode<any>[];
    stickyHeader?: boolean;  // Stick the header to the top during table scroll
    evenRowBg?: string;      // Background for even rows
    oddRowBg?: string;       // Background for odd rows
    headerBg?: string;
}

const HierarchyTable: FC<HierarchyTableProps> = (props) => {
    const {
        data,
        stickyHeader = false,
        headerBg = "#51efd7",
        oddRowBg = "#faf6f6",
        evenRowBg = "#ffffff"
    } = props;

    if (!data || data.length === 0) {
        return null;
    }

    // Styles for sticking the table header to the top during scrolling
    const stickyHeaderStyle = stickyHeader
        ? { position: "sticky", top: 0, zIndex: 1 }
        : {};

    const getRowBgColor = (index: number): string => index % 2 === 0
        ? evenRowBg  : oddRowBg;

    const columns = Object.keys(data[0].model.data);

    return (
        <>
            <Table size="small">
                <TableHead sx={{ backgroundColor: headerBg, ...stickyHeaderStyle }}>
                    <TableRow>
                        <TableCell />
                        {columns.map((col) => (
                            <TableCell key={col} sx={{ fontWeight: "bold" }}>
                                {col}
                            </TableCell>
                        ))}
                        <TableCell />
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map((node, index) => (
                        <ExpandableRow
                            key={node.model.id}
                            row={node}
                            columns={columns}
                            background={getRowBgColor(index)}
                        />
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default HierarchyTable;