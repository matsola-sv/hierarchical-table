import {TreeModelNode} from "models/tree";

export interface HierarchyTableProps {
    data: TreeModelNode<any>[];
    stickyHeader?: boolean;    // Stick the header to the top during table scroll
    evenRowBg?: string;        // Background for even rows
    oddRowBg?: string;         // Background for odd rows
    headerBg?: string;
}