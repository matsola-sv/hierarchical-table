import { type TreeModelNode } from '@/models/tree';

export const cloneTreeExcludingNode = <T>(
	nodes: TreeModelNode<T>[],
	nodeId: number,
): TreeModelNode<T>[] => {
	return nodes
		.filter(node => node.model.id !== nodeId)
		.map(node => {
			const updatedChildren = node.children?.length
				? cloneTreeExcludingNode(node.children, nodeId)
				: [];

			return {
				...node,
				children: updatedChildren,
			};
		});
};
