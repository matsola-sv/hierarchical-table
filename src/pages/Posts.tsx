import type { FC } from 'react';

import { Box } from '@mui/material';

import { PostsList } from '@/components/Posts';

const PostsPage: FC = () => {
	return (
		<Box height='100%'>
			<PostsList />
		</Box>
	);
};

export default PostsPage;
