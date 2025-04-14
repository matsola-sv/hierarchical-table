import {TreeModelNode} from "models/tree";

export interface ExpandableRowProps {
    row: TreeModelNode<any>;
    columns: string[];
    background?: string;
}