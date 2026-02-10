import { useQuery } from '@tanstack/react-query';

import { fetchPosts, postsKeys } from './postsApi';

export const usePosts = () => {
	return useQuery({
		queryKey: postsKeys.all,
		queryFn: fetchPosts,
	});
};
