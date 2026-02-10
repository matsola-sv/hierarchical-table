import typicodeClient from '../client';

import type { Post } from './types';

export const postsKeys = {
	all: ['posts'] as const,
};

export const fetchPosts = async (): Promise<Post[]> => {
	const response = await typicodeClient.get<Post[]>('/posts');
	return response.data;
};
