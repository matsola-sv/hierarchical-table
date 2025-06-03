import { type TreeModelNode } from '@/models/tree';

export interface SearchResult<T> {
	nodes: TreeModelNode<T>[];
	totalCount: number;
}

interface DataNode<T> {
	data: T;
	children: {
		[key: string]: {
			records: object[];
		};
	};
}

export default class HierarchyService<T> {
	private readonly dataUrl: string; // URL for loading data (tree), set only once
	private forest: TreeModelNode<T>[] = [];
	private idCounter: number = 1; // Counter for generating unique node IDs per node of tree

	/**
	 * URL for loading data (tree), set only once
	 * @param dataUrl
	 */
	constructor(dataUrl: string) {
		this.dataUrl = dataUrl;
	}

	/**
	 * Load the tree from a JSON file and convert it into a proper tree structure
	 */
	async loadTree(): Promise<void> {
		if (this.isTree()) {
			return;
		}

		const response = await fetch(this.dataUrl);
		const json = await response.json();

		// Generate unique node id using instance-specific counter
		const generateId = () => this.idCounter++;

		this.forest = json.map((rootNode: DataNode<T>) => {
			return this.convertToTreeModelNode(rootNode, generateId);
		});
	}

	/**
	 * Fetching all descendants of the node, along with their sub-descendants
	 * parentId = 0 - root node
	 */
	async getChildren(parentId: number, offset = 0, limit = 10): Promise<SearchResult<T>> {
		// Loads the tree if it hasn't been loaded yet
		await this.loadTree();

		// Returning the root elements
		if (parentId === 0) {
			return {
				totalCount: this.forest.length,
				nodes: this.forest.slice(offset, offset + limit),
			};
		}

		let foundNode: TreeModelNode<T> | null = null;

		// Iterating through the array of root nodes
		for (const root of this.forest) {
			foundNode = this.findNodeById(root, parentId);
			if (foundNode) break;
		}

		if (!foundNode || foundNode.children.length === 0) {
			return { totalCount: 0, nodes: [] };
		}
		return {
			totalCount: foundNode.children.length,
			nodes: foundNode.children.slice(offset, offset + limit),
		};
	}

	private isTree(): boolean {
		return this.forest.length !== 0;
	}

	/**
	 * Converts data from a JSON file format into the structure required for the TreeModel.
	 * The function processes each node and its children recursively, generating a unique ID for each node.
	 */
	private convertToTreeModelNode(
		node: DataNode<T>,
		generateUniqueId: () => number,
	): TreeModelNode<T> {
		const children: TreeModelNode<T>[] = [];

		// Iterate through child relations and convert records to tree nodes
		for (const key in node.children) {
			const relation = node.children[key];

			if (relation?.records?.length) {
				const records = relation.records as DataNode<T>[];
				records.forEach(record => {
					children.push(this.convertToTreeModelNode(record, generateUniqueId));
				});
			}
		}

		return {
			model: {
				id: generateUniqueId(), //  Generate a unique ID for each node in the tree
				data: node.data,
			},
			children,
		};
	}

	private findNodeById(node: TreeModelNode<T>, id: number): TreeModelNode<T> | null {
		if (node.model.id === id) {
			return node;
		}

		for (const child of node.children) {
			const found = this.findNodeById(child, id);
			if (found) return found;
		}
		return null;
	}
}
