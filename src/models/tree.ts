export interface TreeModelNode<T> {
	model: {
		id: number;
		data: T;
	};
	children: TreeModelNode<T>[];
}
